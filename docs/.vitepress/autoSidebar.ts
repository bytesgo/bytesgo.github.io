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
  items: SidebarLink[]
}

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

/** 扫描目录生成扁平 sidebar（text 与 link 均取文件名，按中文排序） */
function getFlatSidebar(dir: string, basePath: string): SidebarLink[] {
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md') && f !== 'index.md')
    .map((f) => {
      const name = f.replace(/\.md$/, '')
      return { text: name, link: `${basePath}/${name}` }
    })
    .sort((a, b) => a.text.localeCompare(b.text, 'zh'))
}

/** leet-code 分组（顺序即侧边栏展示顺序，与 frontmatter 的 chapter 字段对应） */
const CHAPTERS = [
  { key: '数组', text: '数组' },
  { key: '链表', text: '链表' },
  { key: '哈希表', text: '哈希表' },
  { key: '字符串', text: '字符串' },
  { key: '栈与队列', text: '栈与队列' },
  { key: '二叉树', text: '二叉树' },
] as const

/** 按 frontmatter 的 chapter 字段自动分组生成力扣题解侧边栏 */
export function getLeetCodeSidebar(): SidebarGroup[] {
  const dir = path.join(blogDir, 'leet-code')
  const buckets = new Map<string, SidebarLink[]>(CHAPTERS.map((c) => [c.key, []]))
  const orphans: SidebarLink[] = []

  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.md') || f === 'index.md') continue
    const name = f.replace(/\.md$/, '')
    const content = fs.readFileSync(path.join(dir, f), 'utf-8')
    const chapter = readFrontmatterField(content, 'chapter')
    const item: SidebarLink = { text: name, link: `/blog/leet-code/${name}` }
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
    if (items.length) result.push({ text: c.text, collapsed: false, items })
  }
  // 未声明 chapter 的文章兜底放到「其他」组
  if (orphans.length) {
    result.push({ text: '其他', collapsed: false, items: orphans.sort(byNumber) })
  }
  return result
}

/** 其他博客分类（MySQL/Linux/ComputerNetworks）的扁平侧边栏 */
export function getFlatBlogSidebar(): Record<string, SidebarLink[]> {
  return {
    '/blog/MySQL/': getFlatSidebar(path.join(blogDir, 'MySQL'), '/blog/MySQL'),
    '/blog/Linux/': getFlatSidebar(path.join(blogDir, 'Linux'), '/blog/Linux'),
    '/blog/ComputerNetworks/': getFlatSidebar(
      path.join(blogDir, 'ComputerNetworks'),
      '/blog/ComputerNetworks'
    ),
  }
}
