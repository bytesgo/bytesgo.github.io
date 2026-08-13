---
title: CC Switch：一款管理 8 款 AI 编程工具配置的桌面切换器
date: 2026-08-13
author: leeyazhou
categories:
    - AI编程工具
tags:
    - ClaudeCode
    - AI
    - 效率工具
    - 终端工具
---

# CC Switch：一款管理 8 款 AI 编程工具配置的桌面切换器

做 AI 编程的人，手上大概率不止一个工具：Claude Code、Codex、Gemini CLI、OpenCode、Grok Build……每个工具都有自己的一套配置格式——JSON、TOML、`.env`，切换 API 供应商意味着手动改文件、来回折腾。

[CC Switch](https://ccswitch.io) 就是为了终结这种折腾而生的。它是一个跨平台桌面应用（基于 Tauri 2），把 8 款主流 AI 编程工具的配置管理统一到一个图形界面里。

## 它支持哪些工具

CC Switch 目前支持 8 款工具：

| 工具 | 说明 |
| --- | --- |
| Claude Code | Anthropic 的终端编程助手 |
| Claude Desktop | Claude 桌面应用 |
| Codex | OpenAI 的编程代理 |
| Gemini CLI | Google 的终端 AI |
| Grok Build | xAI 的编程工具 |
| OpenCode | 终端 AI 编程助手 |
| OpenClaw | 开源 AI 代理 |
| Hermes Agent | 通用代理框架 |

> 官方仓库：[github.com/farion1231/cc-switch](https://github.com/farion1231/cc-switch)。唯一官网是 **ccswitch.io**。

## 核心功能

### 1. 一键导入 + 即时切换

内置 50+ 供应商预设（AWS Bedrock、NVIDIA NIM、社区中转等），复制 API Key 后一键导入。切换供应商只需选中 → 点「启用」，不用再手改配置文件。

### 2. 系统托盘快速切换

托盘菜单里直接点供应商名即可切换，无需打开完整应用。对频繁在不同供应商间横跳的人来说，这是最实用的功能。

### 3. 统一 MCP 与 Skills 管理

一个面板管理跨 Claude、Codex、Gemini、Grok Build、OpenCode、Hermes 的 MCP 服务器和 Skills，支持双向同步。

### 4. Prompts 同步

Markdown 编辑器管理 `CLAUDE.md` / `AGENTS.md` / `GEMINI.md` 等提示词文件，跨应用同步。

### 5. 云同步

通过 Dropbox、OneDrive、iCloud 或 WebDAV 在多台设备间同步供应商配置。

### 6. 可靠的存储

配置存 SQLite，原子写入，避免切换过程中配置损坏。

## 安装

- **macOS**：官网下载 `.dmg`，已由 Apple 签名和公证，直接安装即可。
- **Windows / Linux**：从 [GitHub Releases](https://github.com/farion1231/cc-switch/releases) 下载对应安装包。

## 使用流程

1. **添加供应商**：点「Add Provider」→ 选预设或自定义配置（填 API Key、Base URL、模型名）。
2. **切换供应商**：主界面选中 → 点「Enable」，或从系统托盘直接点。
3. **生效**：重启终端或对应 CLI（Claude Code 例外，支持热切换无需重启）。
4. **回到官方登录**：添加「Official Login」预设，重启 CLI 后走 OAuth 流程。

## 几个常见问题

**切换后插件配置消失了？** 这是「共享配置片段」（Shared Config Snippet）机制——在「Edit Provider → Shared Config Panel → Extract from Current Provider」把公共配置（插件等）提取保存，新建供应商时勾选「Write Shared Config」即可带上。

**为什么删不掉当前启用的供应商？** 这是「最小侵入」设计——即使卸载应用，CLI 也能正常工作。系统始终保留一个启用配置，因为删光配置会导致对应 CLI 不可用。

**配置存哪了？** 本地 SQLite + 可选的备份目录，可导出到设备级备份。

## CLI 版本

如果你更喜欢命令行，社区也有几个 CLI 实现：

- [bigwhite/cc-switch-cli](https://github.com/bigwhite/cc-switch-cli)：`add` / `list` / `use` / `current` 等子命令，原子写入 + 自动备份。
- [SaladDay/cc-switch-cli](https://github.com/SaladDay/cc-switch-cli)：CC Switch 的 CLI 分支，TUI + 脚本化，WebDAV 同步与上游兼容。

## 小结

CC Switch 的价值在于「一个界面管理所有 AI 工具的供应商配置」。如果你同时用多个 AI 编程工具、或者经常在不同 API 供应商（官方、第三方中转、本地 Ollama）之间切换，它能省下大量手动改配置的时间。

配合 [oh-my-openagent](./oh-my-openagent.md) 这样的编排插件，加上一个统一的配置切换器，AI 编程工作流的「工具层」就基本齐活了。

**相关链接**

- 官网：<https://ccswitch.io>
- GitHub：<https://github.com/farion1231/cc-switch>
