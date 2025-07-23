---
date: 2025-07-23
tags: 
 - Apache HttpClient5
categories:
 - httpclient5
---

# apache http client5的jdk版本要求

时间有限，先说结论。

apache httpclient5 最低jdk版本要求是 Java SE 8 Maintenance Release 3 （JSR 337）

## HttpClient5邮件咨询

Error occurred on java 1.8.0_202:

```java
Exception in thread "httpclient-dispatch-1" java.lang.NoSuchMethodError: javax.net.ssl.SSLParameters.setApplicationProtocols([Ljava/lang/String;)V
at org.apache.hc.client5.http.ssl.DefaultClientTlsStrategy.applyParameters(DefaultClientTlsStrategy.java:155)
at org.apache.hc.client5.http.ssl.AbstractClientTlsStrategy.lambda$upgrade$0(AbstractClientTlsStrategy.java:154)
at org.apache.hc.core5.reactor.ssl.SSLIOSession.initialize(SSLIOSession.java:299)
at org.apache.hc.core5.reactor.ssl.SSLIOSession.beginHandshake(SSLIOSession.java:274)
at org.apache.hc.core5.reactor.InternalDataChannel.startTls(InternalDataChannel.java:259)
at org.apache.hc.client5.http.impl.nio.DefaultManagedAsyncClientConnection.startTls(DefaultManagedAsyncClientConnection.java:171)
at org.apache.hc.client5.http.ssl.AbstractClientTlsStrategy.upgrade(AbstractClientTlsStrategy.java:127)
at org.apache.hc.client5.http.ssl.DefaultClientTlsStrategy.upgrade(DefaultClientTlsStrategy.java:48)
at org.apache.hc.client5.http.impl.nio.DefaultAsyncClientConnectionOperator$1.completed(DefaultAsyncClientConnectionOperator.java:142)
at org.apache.hc.client5.http.impl.nio.DefaultAsyncClientConnectionOperator$1.completed(DefaultAsyncClientConnectionOperator.java:122)
at org.apache.hc.core5.concurrent.BasicFuture.completed(BasicFuture.java:148)
at org.apache.hc.core5.concurrent.ComplexFuture.completed(ComplexFuture.java:72)
at org.apache.hc.client5.http.impl.nio.MultihomeIOSessionRequester$2$1.completed(MultihomeIOSessionRequester.java:153)
at org.apache.hc.client5.http.impl.nio.MultihomeIOSessionRequester$2$1.completed(MultihomeIOSessionRequester.java:145)
at org.apache.hc.core5.concurrent.BasicFuture.completed(BasicFuture.java:148)
at org.apache.hc.core5.reactor.IOSessionRequest.completed(IOSessionRequest.java:73)
at org.apache.hc.core5.reactor.InternalConnectChannel.onIOEvent(InternalConnectChannel.java:78)
at org.apache.hc.core5.reactor.InternalChannel.handleIOEvent(InternalChannel.java:51)
at org.apache.hc.core5.reactor.SingleCoreIOReactor.processEvents(SingleCoreIOReactor.java:176)
at org.apache.hc.core5.reactor.SingleCoreIOReactor.doExecute(SingleCoreIOReactor.java:125)
at org.apache.hc.core5.reactor.AbstractSingleCoreIOReactor.execute(AbstractSingleCoreIOReactor.java:92)
at org.apache.hc.core5.reactor.IOReactorWorker.run(IOReactorWorker.java:44)
at java.lang.Thread.run(Thread.java:748)
```

and SSLParameters.setApplicationProtocols is defined in Java SE 8 Maintenance Release 3.

@see https://docs.oracle.com/javase/8/docs/api/javax/net/ssl/SSLParameters.html?is-external=true#setApplicationProtocols-java.lang.String:A-
@see https://jdk.java.net/java-se-ri/8-MR3

### 回信1

Apache HttpClient 5.x requires Java SE 8 Maintenance Release 3 or newer
We are not going to put any effort into making it compatible with
earlier versions of Java JRE.

Oleg

意思是Apache HttpClient 5.x对jdk的最低版本依赖是Java SE 8 Maintenance Release 3
