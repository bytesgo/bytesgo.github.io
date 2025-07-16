---
date: 2025-07-16
tags: 
 - okhttp
categories:
 - okhttp
---

# okhttp async call

时间有限，先说结论。在服务器端，不适合使用okhttp的异步请求，因为okhttp的异步请求会占用很多线程，导致服务器性能下降。

## Show Case

```java
    OkHttpClient client = new OkHttpClient.Builder().build();
    Request.Builder requestBuilder = new Request.Builder().url("https://www.baidu.com");
    // enqueue是这次需要关注的部分
    client.newCall(requestBuilder.build()).enqueue(new Callback() {

      @Override
      public void onResponse(Call arg0, Response arg1) throws IOException {

      }

      @Override
      public void onFailure(Call arg0, IOException arg1) {

      }
    });
```

enqueue部分源码

```java
  override fun enqueue(responseCallback: Callback) {
    check(executed.compareAndSet(false, true)) { "Already Executed" }

    callStart()
    client.dispatcher.enqueue(AsyncCall(responseCallback))
  }
```

再看client.dispatcher.enqueue

```java
   internal fun enqueue(call: AsyncCall) {
    synchronized(this) {
      readyAsyncCalls.add(call)

      // Mutate the AsyncCall so that it shares the AtomicInteger of an existing running call to
      // the same host.
      if (!call.call.forWebSocket) {
        val existingCall = findExistingCallWithHost(call.host)
        if (existingCall != null) call.reuseCallsPerHostFrom(existingCall)
      }
    }
    promoteAndExecute()// 这里
  }
```

继续看promoteAndExecute

```kotlin
private fun promoteAndExecute(): Boolean {
    this.assertThreadDoesntHoldLock()

    val executableCalls = mutableListOf<AsyncCall>()
    val isRunning: Boolean
    synchronized(this) {
      val i = readyAsyncCalls.iterator()
      while (i.hasNext()) {
        val asyncCall = i.next()

        if (runningAsyncCalls.size >= this.maxRequests) break // Max capacity.
        if (asyncCall.callsPerHost.get() >= this.maxRequestsPerHost) continue // Host max capacity.

        i.remove()
        asyncCall.callsPerHost.incrementAndGet()
        executableCalls.add(asyncCall)
        runningAsyncCalls.add(asyncCall)
      }
      isRunning = runningCallsCount() > 0
    }

    for (i in 0 until executableCalls.size) {
      val asyncCall = executableCalls[i]
      asyncCall.executeOn(executorService)
    }

    return isRunning
  }
```

重点来了：asyncCall.executeOn(executorService)

```kotlin
    fun executeOn(executorService: ExecutorService) {
      client.dispatcher.assertThreadDoesntHoldLock()

      var success = false
      try {
        executorService.execute(this)
        success = true
      } catch (e: RejectedExecutionException) {
        val ioException = InterruptedIOException("executor rejected")
        ioException.initCause(e)
        noMoreExchanges(ioException)
        responseCallback.onFailure(this@RealCall, ioException)
      } finally {
        if (!success) {
          client.dispatcher.finished(this) // This call is no longer running!
        }
      }
    }
```

重点看executorService的定义

```kotlin
  @get:Synchronized
  @get:JvmName("executorService") val executorService: ExecutorService
    get() {
      if (executorServiceOrNull == null) {
        executorServiceOrNull = ThreadPoolExecutor(0, Int.MAX_VALUE, 60, TimeUnit.SECONDS,
            SynchronousQueue(), threadFactory("$okHttpName Dispatcher", false))
      }
      return executorServiceOrNull!!
    }
```

线程池的初始化，默认的线程池大小为0，最大线程池大小为Int.MAX_VALUE，线程存活时间为60秒，队列为SynchronousQueue，线程工厂为DispatcherThreadFactory。

默认情况下，如果并发请求量大的话，那么线程池中的线程就会不断创建，最终导致OOM。

虽然可以通过控制线程池的参数，来控制最大线程数，但是，又会有别的问题：例如导致请求堆积在任务队列中，从而导致服务无响应。

基于以上原因，不建议在并发量高的场景下使用okhttp的异步功能。

