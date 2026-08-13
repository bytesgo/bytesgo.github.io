---
title: JVM分析常用工具
date: 2025-09-16
author: leeyazhou
tags:
 - jdk
 - jvm
categories: jdk
---

## JVM分析常用工具

### JVM堆内存分析教程

JVM堆内存是Java应用中最重要的内存区域之一，主要用于存放对象实例。堆内存分析可以帮助我们定位内存泄漏、内存溢出等问题。下面介绍常用的堆内存分析方法和工具。

#### 1. 导出堆内存快照（Heap Dump）

可以通过以下方式导出堆内存快照：

- 使用jmap命令：
  
  ```shell
  jmap -dump:live,format=b,file=heapdump.hprof <pid>
  ```

- 使用JVM参数自动导出（如发生OOM）：
  
  ```shell
  -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/usr/local/heapdump.hprof
  ```

#### 2. 常用堆分析工具

- **MAT（Memory Analyzer Tool）**  
  Eclipse出品的堆分析工具，支持分析大文件，查找内存泄漏、查看对象引用关系等。

- **JProfiler**  
  商业产品，支持插件扩展，功能丰富。这个工具适合高级用户，需要掌握JVM的内存管理机制。

- **VisualVM**  
  集成了堆快照分析、内存监控、GC分析等功能，支持插件扩展。

- **jhat**  
  JDK自带的堆分析工具，适合简单分析。

#### 3. MAT分析堆快照示例

1. 打开MAT，选择`File -> Open Heap Dump`，加载`.hprof`文件。
2. 使用`Dominator Tree`查看内存占用最多的对象。
3. 通过`Histogram`查看各类对象数量和大小。
4. 利用`Leak Suspects Report`自动分析潜在的内存泄漏。

#### 4. 常见分析思路

- 查找大对象、异常增长的对象类型。
- 分析对象引用链，定位无法回收的原因。
- 结合代码和业务场景，排查内存泄漏点。

#### 5. 参考命令

```shell
# 查看JVM进程
jps

# 导出堆快照
jmap -dump:format=b,file=heapdump.hprof <pid>

# 分析堆快照（MAT/VisualVM等工具打开heapdump.hprof文件）
```

#### 6. jmap 其他常用用法

`jmap` 不仅可以导出堆快照，还支持多种内存相关操作，常见用法如下：

- 查看堆内存概要信息：

  ```shell
  jmap -heap <pid>
  ```

- 查看对象实例统计（类似 MAT 的 Histogram）：

  ```shell
  jmap -histo <pid>
  ```

- 查看类的详细信息（包括类加载器）：

  ```shell
  jmap -clstats <pid>
  ```

- 查看 JVM 内存映射信息：

  ```shell
  jmap -mem <pid>
  ```

- 查看 finalizer 队列中的对象：

  ```shell
  jmap -finalizerinfo <pid>
  ```

> 注意：部分命令在不同 JDK 版本下可能略有差异，具体可通过 `jmap -help` 查看所有支持的参数。

#### 7. jstack 常用用法

`jstack` 是JDK自带的线程堆栈分析工具，常用于排查线程死锁、阻塞、CPU飙高等问题。常见用法如下：

- 查看指定Java进程的线程堆栈信息：

  ```shell
  jstack <pid>
  ```

- 将线程堆栈信息输出到文件：

  ```shell
  jstack <pid> > thread_dump.txt
  ```

- 多次采集线程堆栈（适合分析线程状态变化）：

  ```shell
  for i in {1..5}; do jstack <pid> > thread_dump_$i.txt; sleep 5; done
  ```

- 分析死锁：

  `jstack` 输出中如有 `Found one Java-level deadlock:` 字样，即表示检测到死锁。

> 注意：  
> - 建议用 root 或与目标进程相同用户执行。  
> - 对于高并发或生产环境，建议多次采集分析。  
> - 也可结合 `jps` 命令查找目标进程PID。

更多参数可通过 `jstack -help` 查看。
---

如需更深入的堆内存分析，可结合GC日志、线程Dump等信息综合排查。