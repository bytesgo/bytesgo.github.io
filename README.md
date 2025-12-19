<div align="center">

# BytesGo - 技术博客

[![VitePress](https://img.shields.io/badge/VitePress-1.5.0-646CFF?logo=vitepress)](https://vitepress.dev/)
[![Vue](https://img.shields.io/badge/Vue-3.5.12-4FC08D?logo=vue.js)](https://vuejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Website](https://img.shields.io/badge/Website-bytesgo.com-green)](https://www.bytesgo.com)

**为学应尽毕生力,攀高须贵少年时**

[在线访问](https://www.bytesgo.com) | [关于作者](https://www.bytesgo.com/about) | [技术文章](https://www.bytesgo.com/blog/)

</div>

---

## 📖 项目介绍

BytesGo 是 leeyazhou 的个人技术博客,基于 VitePress 构建,专注于分享软件开发、算法学习、系统设计等技术内容。博客采用现代化的静态站点生成技术,提供流畅的阅读体验和强大的搜索功能。

### ✨ 特性

- 🎨 **现代化设计** - 基于 [@sugarat/theme](https://theme.sugarat.top/) 主题,界面简洁美观
- 🔍 **全文搜索** - 集成 Pagefind 实现快速全文搜索
- 📱 **响应式布局** - 完美适配桌面端和移动端
- 🌍 **国际化支持** - 支持中英文双语切换
- 🎯 **分类导航** - 技术文章按主题分类,便于查找
- 💡 **代码高亮** - 优雅的代码展示和语法高亮
- 📊 **量化日志** - 记录投资和量化交易心得
- 🏆 **算法题解** - 力扣每日一题详细解析

### 📚 内容分类

- **技术随笔**
  - 计算机网络
  - MySQL 数据库
  - Linux 运维
  - JDK 源码分析
  - Kubernetes 容器编排
  - gRPC 微服务
  
- **算法学习**
  - 力扣每日一题
  - 数据结构与算法
  - 算法题解分析

- **量化投资**
  - 量化交易日志
  - 投资心得分享

## 🛠️ 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| [VitePress](https://vitepress.dev/) | 1.5.0 | 静态站点生成器 |
| [Vue](https://vuejs.org/) | 3.5.12 | 前端框架 |
| [@sugarat/theme](https://theme.sugarat.top/) | 0.5.2 | 博客主题 |
| [Element Plus](https://element-plus.org/) | 2.7.2 | UI 组件库 |
| [Pagefind](https://pagefind.app/) | 1.3.0 | 全文搜索引擎 |
| [TypeScript](https://www.typescriptlang.org/) | 5.1.6 | 类型系统 |
| [Sass](https://sass-lang.com/) | 1.64.1 | CSS 预处理器 |

## 📁 项目结构

```
bytesgo.com/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 自动部署配置
├── docs/
│   ├── .vitepress/
│   │   ├── config.mts          # VitePress 配置文件
│   │   └── blog-theme.ts       # 博客主题配置
│   ├── blog/                   # 博客文章目录
│   │   ├── ComputerNetworks/   # 计算机网络
│   │   ├── MySQL/              # MySQL 数据库
│   │   ├── Linux/              # Linux 运维
│   │   ├── leet-code/          # 力扣算法题
│   │   └── Life/               # 生活随笔
│   ├── stock/                  # 量化日志
│   ├── public/                 # 静态资源
│   ├── index.md                # 首页
│   ├── about.md                # 关于页面
│   └── timeline.md             # 时间线
├── package.json                # 项目依赖配置
├── deploy.sh                   # 部署脚本
└── README.md                   # 项目说明文档
```

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### 安装依赖

首先安装 pnpm 包管理器:

```bash
npm install -g pnpm
```

然后安装项目依赖:

```bash
pnpm install
```

### 本地开发

启动开发服务器:

```bash
pnpm docs:dev
```

访问 `http://localhost:5173` 查看效果。

### 构建生产版本

```bash
pnpm docs:build
```

构建产物将生成在 `docs/.vitepress/dist` 目录。

### 预览构建产物

```bash
pnpm docs:serve
```

## 📦 部署指南

### GitHub Pages 部署

#### 方式一: GitHub Actions 自动部署(推荐)

1. **开启 GitHub Pages**

   进入仓库 Settings → Pages → Build and deployment,选择 **GitHub Actions** 作为部署源。

2. **配置已包含**

   项目已包含 `.github/workflows/deploy.yml` 配置文件,无需额外配置。

3. **修改 base 路径**(如果需要)

   编辑 `docs/.vitepress/config.mts`:

   ```typescript
   export default defineConfig({
     base: '/仓库名/',  // 例如: '/bytesgo.github.io/'
     // ...其他配置
   })
   ```

4. **推送代码**

   推送到 `main` 分支即可自动触发部署:

   ```bash
   git add .
   git commit -m "update content"
   git push origin main
   ```

#### 方式二: 手动部署

```bash
# 构建
pnpm docs:build

# 进入构建产物目录
cd docs/.vitepress/dist

# 初始化 git 仓库并推送到 gh-pages 分支
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:用户名/仓库名.git main:gh-pages
```

### Gitee Pages 部署

1. **添加 SPA 支持文件**

   项目已在 `docs/public` 目录下包含 `.spa` 文件。

2. **构建项目**

   ```bash
   pnpm docs:build
   ```

3. **推送构建产物**

   将 `docs/.vitepress/dist` 目录内容推送到 `gh-pages` 分支。

4. **配置 Gitee Pages**

   在 Gitee 仓库的服务中选择 Pages,选择 `gh-pages` 分支进行部署。

   > ⚠️ 注意: Gitee Pages 需要实名认证,且需要人工审核。

### 自定义域名

1. 在 `docs/public` 目录下创建 `CNAME` 文件,内容为你的域名:

   ```
   www.bytesgo.com
   ```

2. 在域名服务商处添加 CNAME 记录指向 GitHub Pages 地址。

## ⚙️ 配置说明

### 站点配置

编辑 `docs/.vitepress/config.mts` 修改站点配置:

```typescript
export default defineConfig({
  title: '站点标题',
  description: '站点描述',
  lang: 'zh-cn',
  // ...更多配置
})
```

### 主题配置

编辑 `docs/.vitepress/blog-theme.ts` 自定义主题:

```typescript
export const blogTheme = getThemeConfig({
  author: '作者名',
  // ...更多配置
})
```

### 导航栏配置

在 `config.mts` 的 `themeConfig.nav` 中配置导航栏:

```typescript
nav: [
  { text: '首页', link: '/' },
  { text: '关于', link: '/about' },
  // ...更多导航项
]
```

## 📝 写作指南

### 创建新文章

1. 在 `docs/blog/` 对应分类目录下创建 Markdown 文件
2. 添加 Front Matter 元数据:

```markdown
---
title: 文章标题
date: 2024-12-19
tags:
  - 标签1
  - 标签2
categories:
  - 分类
---

# 文章标题

文章内容...
```

### 文章分类

- 将文章放在对应的分类目录下
- 在 `config.mts` 的 `sidebar` 中添加侧边栏配置

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request!

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 📄 开源协议

本项目采用 [MIT](LICENSE) 协议开源。

## 👨‍💻 关于作者

- **作者**: leeyazhou
- **邮箱**: bytesgo@163.com
- **GitHub**: [@leeyazhou](https://github.com/leeyazhou)
- **Twitter**: [@bytesgo](https://twitter.com/bytesgo)
- **网站**: [www.bytesgo.com](https://www.bytesgo.com)

### 开源贡献

- [Apache Tomcat](https://tomcat.apache.org/) - Contributor
- [Netty](https://github.com/netty/netty) - PR #10329
- [SOFA RPC](https://github.com/sofastack/sofa-rpc) - PR #866
- [Flower](https://github.com/zhihuili/flower) - 响应式微服务框架

## 💖 赞助支持

如果这个项目对你有帮助,欢迎[赞助支持](https://www.bytesgo.com/sponsor)!

---

<div align="center">

**⭐ 如果觉得不错,请给个 Star 支持一下吧! ⭐**

Made with ❤️ by [leeyazhou](https://github.com/leeyazhou)

</div>
