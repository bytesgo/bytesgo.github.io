---
title: oh-my-openagent：OpenCode 的「全家桶」智能体编排插件
date: 2026-08-13
author: leeyazhou
categories:
    - AI编程工具
tags:
    - opencode
    - AI
    - 插件
    - 终端工具
---

# oh-my-openagent：OpenCode 的「全家桶」智能体编排插件

在之前的 [OpenCode 教程](./opencode-教程.md) 里，我介绍了 OpenCode 这个终端 AI 编程助手的基础用法。但原生 OpenCode 更像一个「单打独斗」的执行者——它缺少一套系统化的子代理分工、多模型编排和代码结构理解能力。

[oh-my-openagent](https://github.com/code-yeongyu/oh-my-openagent)（简称 OmO）正是为此而生。它自称 *"The Best AI Agent Harness"*，是一个 batteries-included 的 OpenCode 插件套件，把 OpenCode 从「会聊天的 CLI」升级成一个完整的智能体编排平台。

## 它解决了什么问题

原生 OpenCode 使用时的几个痛点：

1. **单一模型硬扛所有任务**——写前端、调架构、查资料、修 bug 全用一个模型，导致高难度任务力不从心、简单任务又浪费昂贵模型。
2. **没有分工**——查代码、搜外部文档、深度推理全都塞进一个上下文里，效率低还容易跑偏。
3. **缺乏代码结构理解**——编辑前看不到符号之间的调用关系和影响面，容易改坏。
4. **单人作战**——无法让多个代理并行协作，串行处理耗时。

OmO 针对性地提供了多模型编排、并行后台代理、LSP/AST 工具和 Team Mode 四大能力。

## 安装

OmO 是一个 OpenCode 插件，直接在 `opencode.json` 的 `plugin` 数组里声明即可：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": [
    "oh-my-openagent@v4.19.4"
  ]
}
```

也可以用命令行安装：

```bash
opencode plugin install oh-my-openagent
```

安装后会额外提供一个 `omo` 命令（等价于 `oh-my-opencode` / `oh-my-openagent`）。

## 核心能力

### 1. 多模型编排（Multi-Model Orchestration）

一个会话内可以在多个 provider（DeepSeek、Gemini、Claude、本地 Ollama 等）之间路由，按任务难度分配不同的模型。比如：

- 日常代码编写 → 便宜快速的模型
- 复杂架构设计 → 高智商推理模型
- 长上下文分析 → 大上下文窗口模型

模型价格每月都在降、能力每月都在涨，OmO 的思路是不把鸡蛋放在一个 provider 的篮子里，而是面向开放的模型市场做编排。

### 2. 内置智能体（Built-in Agents）

OmO 内置了一整套专职子代理，可以并行后台运行。它们各司其职，按角色可以分为四类：

#### 主编排器（Orchestrator）

| 代理 | 职责 | 定位 |
| --- | --- | --- |
| `sisyphus` | 主编排器 | 规划、委派给专家、以激进并行执行驱动任务完成 |
| `atlas` | 编排器 | 通过 `task()` 编排工作，把 todo 列表里所有任务推进到全部完成 |

#### 规划顾问（Planner & Advisor）

| 代理 | 职责 | 定位 |
| --- | --- | --- |
| `prometheus` | 战略规划器 | 面试式规划：提问、识别范围，在写代码前构建详细计划 |
| `metis` | 计划顾问 | 规划前分析请求，识别隐藏意图、歧义和 AI 失败点 |
| `momus` | 计划审查者 | 验证计划可执行性与引用有效性，只找阻塞性问题 |

#### 执行者（Worker）

| 代理 | 职责 | 定位 |
| --- | --- | --- |
| `hephaestus` | 自主深度工作者 | 给目标而非步骤，自主探索、研究、端到端执行 |
| `sisyphus-junior` | 专注任务执行器 | 直接执行委派任务，不派生子代理，按类别做领域优化 |

#### 顾问与检索（Consultant & Search）

| 代理 | 职责 | 定位 |
| --- | --- | --- |
| `oracle` | 只读高智商顾问 | 调试疑难 bug、架构权衡 |
| `librarian` | 外部资料检索 | 查开源库实现、官方文档 |
| `explore` | 代码库 grep | 定位代码、发现既有模式 |
| `multimodal-looker` | 多模态分析 | 解读 PDF、图片等媒体文件 |

这些代理可以同时启动、后台运行，主会话继续做不依赖它们的工作，完成后统一收集结果。这让「一边查资料一边写代码」成为可能。

实际使用时，主编排器（`sisyphus`）不会直接指定某个代理，而是按**类别（category）**委派——它只说「这是前端工作」，harness 自动把它映射到对应领域优化的模型，比如 `visual-engineering`（前端/UI）、`deep`（自主研究）、`quick`（单文件小改）、`ultrabrain`（硬逻辑/架构决策）。

### 3. LSP/AST 工具（Crafted LSP/AST Tools）

OmO 封装了 `lsp_*` 系列工具（跳转定义、查找引用、诊断、重命名、符号表）以及 AST 级代码工具。编辑一个符号前，先看它的定义、调用方、影响面，而不是靠 grep 猜。

#### LSP 是怎么实现的

OmO 的 LSP 能力来自它的 `packages/lsp-core` 子包，整体架构是「**一个独立 MCP server 子进程 + 一个语言服务器进程池**」：

1. **以独立 MCP server 的形式暴露**。LSP 能力通过一个名为 `lsp` 的 MCP server 注入 OpenCode（`mcp.ts` 里 `runJsonRpcStdioServer` 跑一个 JSON-RPC over stdio 的服务器），对外暴露 8 个工具，每个都带 `lsp_` 别名：

   | 工具 | 作用 |
   | --- | --- |
   | `lsp_status` | 列出已配置/激活的语言服务器，不启动新进程 |
   | `lsp_diagnostics` | 获取文件或目录的错误、警告、提示 |
   | `lsp_goto_definition` | 跳转到符号定义处 |
   | `lsp_find_references` | 跨工作区查找符号引用 |
   | `lsp_symbols` | 文档大纲 / 工作区符号搜索 |
   | `lsp_prepare_rename` | 检查某位置符号是否可安全重命名 |
   | `lsp_rename` | 跨工作区重命名并应用返回的 workspace edit |
   | `lsp_install_decision` | 记录用户是否允许安装缺失的语言服务器 |

2. **内置约 40 种语言服务器注册表**。`server-definitions.ts` 里 `BUILTIN_SERVERS` 把每种语言映射到「启动命令 + 文件扩展名」，例如 TypeScript 对应 `typescript-language-server --stdio`（`.ts/.tsx/.mts/...`）、Python 对应 `basedpyright-langserver --stdio`、Go 对应 `gopls`、Rust 对应 `rust-analyzer`。配套 `LSP_INSTALL_HINTS` 给出每种的安装命令（如 `npm install -g typescript-language-server`）。

3. **按需启动、空闲回收**。`manager.ts` 里的 `LspManager` 用引用计数（refCount）管理语言服务器进程：某语言的服务器只在第一次请求时 `spawn` 启动（`node:child_process`），空闲超过 5 分钟（`IDLE_TIMEOUT_MS`）或初始化超时（60s）就被 reaper 定时回收，避免常驻吃内存。

4. **标准 LSP 协议通信**。`connection.ts` 通过 stdio 与语言服务器进程通信——先发 `initialize` 请求做 capabilities 协商（声明 hover/definition/references/rename/publishDiagnostics 等能力），之后用 `textDocument/definition`、`textDocument/references`、`textDocument/publishDiagnostics` 等标准方法收发数据。

5. **文档状态与安全边界**。`LspClient` 维护一个 `WorkspaceDocumentState`（打开文档、版本号、诊断去重，`publishDiagnostics` 有 3 秒 freshness 超时）；`client-wrapper.ts` 通过 marker（`.git` 等）推断工作区根，并做路径限制——拒绝处理 cwd 之外的文件，防止越界读写。

这套设计的关键在于**解耦**：语言服务器作为子进程运行在独立的 `@oh-my-opencode/mcp-stdio-core` 宿主里，某个语言服务器崩了不会影响 OpenCode 主会话；而且 MCP server 只在被请求时才拉起对应的语言服务器，用完即回收，兼顾了「IDE 级精度」和「不常驻吃资源」。

### 4. Team Mode（团队协作）

如果说内置智能体是「一个代理 + 若干后台子代理」，Team Mode 则是把 OmO 升级成真正的**多代理系统**：一个领导代理（lead agent）协调一队按类别专业化的成员（最多 8 个并行），通过专用的 `team_*` 工具家族通信，并在 tmux 布局中同时观察每个成员的工作。

#### 4.1 开启

Team Mode **默认关闭**，需要时再开。在 OmO 的配置文件里声明：

```jsonc
// .opencode/oh-my-openagent.jsonc
{
  "team_mode": {
    "enabled": true,
    "max_parallel_members": 4,
    "tmux_visualization": true
  }
}
```

重启 opencode 后，`team_*` 工具家族就解锁了。完整配置字段：

| 字段 | 作用 | 说明 |
| --- | --- | --- |
| `enabled` | 开关 | 默认 `false`，按需开启 |
| `tmux_visualization` | tmux 可视化 | 每个成员占一个 tmux pane，实时观察 |
| `max_parallel_members` | 并行成员上限 | 默认 4，最大 8 |
| `max_members` | 团队总人数上限 | — |
| `max_messages_per_run` | 单次运行消息上限 | 防止失控 |
| `max_wall_clock_minutes` | 单次运行时长上限 | 墙钟时间兜底 |
| `max_member_turns` | 单个成员回合上限 | — |
| `message_payload_max_bytes` / `recipient_unread_max_bytes` / `mailbox_poll_interval_ms` | 消息负载/信箱轮询 | 通信调优 |
| `base_dir` | 团队状态基目录 | 可选 |

#### 4.2 `team_*` 工具家族

Team Mode 解锁一整套专用工具（12 个），按用途分四组：

| 工具 | 作用 |
| --- | --- |
| `team_create` | 创建团队（`teamName` 或 `inline_spec` 二选一） |
| `team_delete` | 删除已完成/已批准关闭的团队 |
| `team_list` / `team_status` | 列出已声明/活跃团队，查看完整状态 |
| `team_send_message` | 给成员发消息或广播到全队 |
| `team_task_create` / `team_task_list` / `team_task_get` / `team_task_update` | 团队任务：创建/列出/查询/更新状态（含认领） |
| `team_shutdown_request` / `team_approve_shutdown` / `team_reject_shutdown` | 关闭协作：成员请求下线 → 领导批准/拒绝 |

> 这些工具是领导代理**内部编排**用的，普通用户不需要手动调用——你的角色是「提需求 + 看结果」，建团队、分任务、收尾这些都由领导代理自动完成。

#### 4.3 如何触发

开启 Team Mode 后，有几种方式触发团队协作：

- **直接用现成技能**：`/hyperplan`（5 个敌对评论者从正交角度拆解你的计划，写代码前先接受多角度质疑）、`/security-research`（3 个漏洞猎手 + 2 个 PoC 工程师并行审计代码库，严重程度按「实际可利用性」校准）。这两个是打磨好的 Team Mode 编排，优先推荐。
- **意图关键词**：OmO 的 `keyword_detector` 会识别 `team` / `hyperplan` 等关键词，你在需求里提到「用团队来做 X」时，IntentGate 会把请求路由到团队协作模式。
- **自然语言描述**：直接说清目标，领导代理会判断是否值得拉起一个团队（比如「从代码、安全、性能三个角度同时审查这次改动」）。

#### 4.4 实战操作

**场景一：让 5 个「敌对评审」拆你的计划**

写代码前想先被多角度质疑，直接输入：

```
/hyperplan 我要给博客系统加一个全文搜索功能
```

领导代理会拉起 5 个敌对评论者，从架构、性能、安全、用户体验等正交角度分别攻击你的方案，再汇总成可落地的计划。适合立项前的方案验证。

**场景二：发布前做一次安全审计**

```
/security-research 审计当前项目
```

领导代理编排 3 个漏洞猎手 + 2 个 PoC 工程师并行扫描，发现的漏洞会按「实际可利用性」定级，而不是套用 CVE 分数。适合发版前的安全体检。

**场景三：自定义一个并行团队**

如果现成技能不满足，可以直接用 `inline_spec` 现场定义团队。比如同时从三个角度审查一次改动：

```jsonc
// 通过 team_create 传入（示意）
{
  "name": "review-squad",
  "members": [
    { "name": "code-reviewer", "category": "ultrabrain", "prompt": "审查代码正确性与边界条件" },
    { "name": "security-checker", "category": "deep", "prompt": "从安全角度找漏洞" },
    { "name": "perf-checker", "category": "quick", "prompt": "从性能角度找瓶颈" }
  ]
}
```

成员声明里 `category` 决定走哪个领域优化模型，`prompt` 是它的任务描述；领导代理负责建任务、分发、收尾。

**日常配置建议**

- **按需开启**：Team Mode 会把 hook 从 54 个增到 61 个并注入整套 `team_*` 工具，常态化开启徒增上下文噪声。日常小改用原生子代理就够，遇到「立项评审」「安全审计」「多角度审查」这类大任务再开。
- **别一上来就拉满**：`max_parallel_members` 保持默认 4，配合 `max_wall_clock_minutes` / `max_messages_per_run` 当保险丝，防团队失控空转。
- **优先复用技能**：`hyperplan` 和 `security-research` 是已经打磨好的 Team Mode 编排，能用它们就别从零造团队。
- **盯进度开 tmux**：`tmux_visualization: true` 让每个成员占一个 pane，领导代理在 focus + grid 窗口里同步展示，谁卡住一目了然。

### 5. Tmux 集成

除了给 Team Mode 做可视化，OmO 还把 tmux 深度集成为**真正的交互式终端环境**：Agent 可以在实时会话里跑 REPL、开调试器、操作 TUI 工具，进程持久运行不随会话结束而消失。

```jsonc
// .opencode/oh-my-openagent.jsonc
{
  "tmux": {
    "enabled": true,
    "layout": "main-horizontal",
    "isolation": "session"
  }
}
```

配置字段：

| 字段 | 作用 | 取值 |
| --- | --- | --- |
| `enabled` | 开关 | 默认 `false` |
| `layout` | 布局 | `even-horizontal` / `even-vertical` / `main-horizontal` / `main-vertical` / `tiled` |
| `main_pane_size` / `main_pane_min_width` / `agent_pane_min_width` | 主窗格与代理窗格尺寸 | 数值 |
| `isolation` | 隔离级别 | `inline`（同窗格）/ `session`（独立会话）/ `window`（独立窗口） |

- `layout` 决定多成员窗格的排列方式：`main-horizontal` 主窗格占左/上、代理窗格在右/下铺开；`tiled` 等分平铺。
- `isolation` 控制每个代理终端环境的隔离程度——`session` 给每个成员一个独立 tmux 会话，互不干扰，是最稳的选择。

这套集成的价值在于：OpenCode 的普通 `bash` 是「一次性命令」，而 tmux 让 Agent 拥有一个**持续存在的终端会话**——调试器断点、REPL 状态、TUI 应用都能跨轮次保留，不再每次重新起进程。

## 最佳实践

前面把能力拆开讲了一遍，这一节按「配置 OmO → 配置 Team Mode → 配置 Tmux」的顺序，给一条从零到实战的完整路径，最后用一个案例串起来。

### 1. 配置 OmO 本体

OmO 的配置写在 `.opencode/oh-my-openagent.jsonc`（项目级）或 `~/.config/opencode/oh-my-openagent.jsonc`（全局）。顶层字段控制整体行为，最常用的是这几个：

```jsonc
// .opencode/oh-my-openagent.jsonc
{
  // 默认编排器
  "default_run_agent": "sisyphus",

  // 代理选择优先级
  "agent_order": ["sisyphus", "atlas", "hephaestus"],

  // 按需裁剪：禁用用不到的 MCP/代理/技能/工具，降低注入开销
  "disabled_mcps": [],
  "disabled_agents": [],
  "disabled_skills": [],
  "disabled_tools": [],

  // 模型调用失败时自动回退到备用模型
  "model_fallback": true,

  // 关闭遥测
  "telemetry": false
}
```

- `default_run_agent`：默认跑的编排器，通常填 `sisyphus`。
- `agent_order`：代理的选择优先级，越靠前越优先。
- `disabled_*` 系列：OmO 默认注入大量 MCP、代理、技能和工具，用不到的在这里裁剪掉，能明显降低上下文噪声（这是「batteries-included」的代价，但也是可控的）。
- `model_fallback`：某个 provider 调用失败时自动回退到备用模型，生产环境建议开。

### 2. 配置 Team Mode

Team Mode 默认关闭，需要团队协作时再开（字段详解见上文 4.1）：

```jsonc
{
  "team_mode": {
    "enabled": true,
    "max_parallel_members": 4,
    "tmux_visualization": true
  }
}
```

三个字段就够起步：`enabled` 开总闸，`max_parallel_members` 控并行度（默认 4，最大 8），`tmux_visualization` 打开可视化。

### 3. 配置 Tmux

给 Agent 一个持续存在的终端会话（字段详解见上文第 5 节）：

```jsonc
{
  "tmux": {
    "enabled": true,
    "layout": "main-horizontal",
    "isolation": "session"
  }
}
```

`isolation: "session"` 给每个成员一个独立 tmux 会话，是最稳的选择。

### 4. 一个完整案例

给博客系统新增「全文搜索」功能后，发布前用 OmO 做一次系统体检。完整配置如下（`.opencode/oh-my-openagent.jsonc`）：

```jsonc
{
  "default_run_agent": "sisyphus",
  "model_fallback": true,
  "telemetry": false,
  "team_mode": {
    "enabled": true,
    "max_parallel_members": 4,
    "tmux_visualization": true
  },
  "tmux": {
    "enabled": true,
    "layout": "main-horizontal",
    "isolation": "session"
  }
}
```

然后三步走：

1. **立项前拆计划**——让 5 个敌对评审先攻击你的方案：

    ```
    /hyperplan 给博客系统加全文搜索
    ```

2. **发布前安全审计**——编排 3 个漏洞猎手 + 2 个 PoC 工程师并行扫描：

    ```
    /security-research 审计本次全文搜索改动
    ```

3. **多角度代码审查**——直接说清目标，让领导代理拉起团队：

    > 从代码正确性、安全、性能三个角度同时审查这次改动

领导代理会自动建团队、分任务、并行执行，你在 tmux 布局里实时观察每个成员的进度，完成后统一收结果。至此，OmO 的「配置 → 触发 → 执行 → 可视化」闭环就完整跑通了。

## 附带的 Skills

OmO 还附带了一批技能（Skills），开箱即用：

- `init-deep`：生成层级化的 `AGENTS.md` 知识库（根目录 + 按复杂度评分的子目录），帮助新会话快速理解项目。
- `security-research` / `security-review`：安全审计，编排 3 个漏洞猎手 + 2 个 PoC 工程师并行审计代码库，验证可利用性、分类根因。
- `customize-opencode`：编辑 opencode 自身的配置。

## 小结

如果你已经在用 OpenCode，但觉得它「不够聪明」或「太单打独斗」，oh-my-openagent 是一个值得一试的升级。它把多模型、子代理、代码结构理解和团队协作这些「高级编排能力」打包成一个插件，装上就能用。

不过它也不是没有代价：batteries-included 意味着更高的复杂度，`omo` 启动后会注入大量代理和工具，学习曲线比原生 OpenCode 陡。建议先熟悉 OpenCode 基础（见[教程](./opencode-教程.md)），再按需引入 OmO。

**相关链接**

- 项目主页：<https://github.com/code-yeongyu/oh-my-openagent>
