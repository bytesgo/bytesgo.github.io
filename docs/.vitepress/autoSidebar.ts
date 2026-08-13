import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// 当前文件所在目录（docs/.vitepress）
const __dirname = path.dirname(fileURLToPath(import.meta.url))
// 博客文章根目录（docs/blog）
const blogDir = path.resolve(__dirname, '../blog')

interface SidebarLink {
  text: string
  link: string
}

interface SidebarGroup {
  text: string
  collapsed?: boolean
  items: (SidebarLink | SidebarGroup)[]
}

interface SubCategory {
  dir: string
  text: string
}

interface Category {
  dir: string
  text: string
  subs: SubCategory[]
}

/**
 * 博客分类体系：大类 → 小类（顺序即导航/侧边栏展示顺序）
 * dir 为大类/小类的物理目录名，text 为展示用中文名
 */
export const CATEGORIES: Category[] = [
  {
    dir: 'backend',
    text: '后端',
    subs: [
      { dir: 'ddd', text: 'DDD' },
      { dir: 'httpclient', text: 'HTTP Client' },
      { dir: 'okhttp', text: 'OkHttp' },
      { dir: 'grpc', text: 'gRPC' },
      { dir: 'jdk', text: 'JDK' },
      { dir: 'openjdk', text: 'OpenJDK' },
    ],
  },
  {
    dir: 'database',
    text: '数据库',
    subs: [{ dir: 'mysql', text: 'MySQL' }],
  },
  {
    dir: 'ops',
    text: '运维',
    subs: [
      { dir: 'linux', text: 'Linux' },
      { dir: 'kubernetes', text: 'Kubernetes' },
    ],
  },
  {
    dir: 'network',
    text: '网络',
    subs: [{ dir: 'computer-networks', text: '计算机网络' }],
  },
  {
    dir: 'algorithm',
    text: '算法',
    subs: [{ dir: 'leet-code', text: '力扣题解' }],
  },
  {
    dir: 'ai',
    text: 'AI',
    subs: [
      { dir: 'ide', text: 'AI 编程工具' },
      { dir: 'tensorflow', text: 'TensorFlow' },
    ],
  },
  {
    dir: 'mobile',
    text: '移动端',
    subs: [{ dir: 'android', text: 'Android' }],
  },
  {
    dir: 'finance',
    text: '金融',
    subs: [{ dir: 'coin', text: '加密货币' }],
  },
]

/** 从 frontmatter 中提取标量字段值（如 chapter: 数组） */
function readFrontmatterField(content: string, key: string): string | undefined {
  const m = content.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))
  if (!m) return undefined
  return m[1].trim().replace(/^['"]|['"]$/g, '')
}

/** 从文件名（如 "704.二分查找"）提取题号用于排序；非数字开头排到最后 */
function extractNumber(name: string): number {
  const m = name.match(/^(\d+)/)
  return m ? parseInt(m[1], 10) : Number.MAX_SAFE_INTEGER
}

/** 力扣题解 chapter 分组（顺序即展示顺序，与 frontmatter 的 chapter 字段对应） */
const CHAPTERS = [
  { key: '数组', text: '数组' },
  { key: '链表', text: '链表' },
  { key: '哈希表', text: '哈希表' },
  { key: '字符串', text: '字符串' },
  { key: '栈与队列', text: '栈与队列' },
  { key: '二叉树', text: '二叉树' },
] as const

/** 扫描小类目录下所有文章（排除 index.md），返回按中文排序的链接 */
function scanPosts(catDir: string, subDir: string): SidebarLink[] {
  const dir = path.join(blogDir, catDir, subDir)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md') && f !== 'index.md')
    .map((f) => {
      const name = f.replace(/\.md$/, '')
      return { text: name, link: `/blog/${catDir}/${subDir}/${name}` }
    })
    .sort((a, b) => a.text.localeCompare(b.text, 'zh'))
}

/** 力扣题解：按 frontmatter 的 chapter 字段自动分组 */
function getLeetCodeGroups(catDir: string, subDir: string): SidebarGroup[] {
  const dir = path.join(blogDir, catDir, subDir)
  const buckets = new Map<string, SidebarLink[]>(CHAPTERS.map((c) => [c.key, []]))
  const orphans: SidebarLink[] = []

  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.md') || f === 'index.md') continue
    const name = f.replace(/\.md$/, '')
    const content = fs.readFileSync(path.join(dir, f), 'utf-8')
    const chapter = readFrontmatterField(content, 'chapter')
    const item: SidebarLink = { text: name, link: `/blog/${catDir}/${subDir}/${name}` }
    const bucket = chapter ? buckets.get(chapter) : undefined
    if (bucket) {
      bucket.push(item)
    } else {
      orphans.push(item)
    }
  }

  // 组内按题号升序，非数字题号（如剑指Offer）排最后
  const byNumber = (a: SidebarLink, b: SidebarLink) =>
    extractNumber(a.text) - extractNumber(b.text) || a.text.localeCompare(b.text, 'zh')

  const result: SidebarGroup[] = []
  for (const c of CHAPTERS) {
    const items = buckets.get(c.key) ?? []
    items.sort(byNumber)
    if (items.length) result.push({ text: c.text, collapsed: true, items })
  }
  // 未声明 chapter 的文章兜底放到「其他」组
  if (orphans.length) {
    result.push({ text: '其他', collapsed: true, items: orphans.sort(byNumber) })
  }
  return result
}

/**
 * 生成全站博客侧边栏：key 为大类路径，值为「大类 → 小类 → 文章」两级结构
 * 进入某大类下的文章时，侧边栏展示该大类的完整分类
 */
export function getBlogSidebar(): Record<string, SidebarGroup[]> {
  const result: Record<string, SidebarGroup[]> = {}
  for (const cat of CATEGORIES) {
    const subGroups: SidebarGroup[] = cat.subs.map((sub) => {
      if (sub.dir === 'leet-code') {
        return { text: sub.text, collapsed: true, items: getLeetCodeGroups(cat.dir, sub.dir) }
      }
      return { text: sub.text, collapsed: true, items: scanPosts(cat.dir, sub.dir) }
    })
    result[`/blog/${cat.dir}/`] = [{ text: cat.text, collapsed: true, items: subGroups }]
  }
  return result
}
