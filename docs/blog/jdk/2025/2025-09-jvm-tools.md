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
  jmap -dump:format=b,file=heapdump.hprof <pid>
  ```

- 使用JVM参数自动导出（如发生OOM）：
  
  ```shell
  -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/path/to/heapdump.hprof
  ```

#### 2. 常用堆分析工具

- **MAT（Memory Analyzer Tool）**  
  Eclipse出品的堆分析工具，支持分析大文件，查找内存泄漏、查看对象引用关系等。

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

---

如需更深入的堆内存分析，可结合GC日志、线程Dump等信息综合排查。