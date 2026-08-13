/**
 * 自动生成博客分类首页 index.md
 *
 * 扫描 docs/blog 目录结构，复用 autoSidebar.ts 的 CATEGORIES 配置，
 * 为每个大类/小类目录自动生成 index.md（分类聚合页），避免手动维护。
 *
 * 规则：
 * - 大类 index.md：列出其下小类目录（链接到 ./小类/）
 * - 普通小类 index.md：平铺列出文章，标题取 frontmatter title（回退文件名）
 * - leet-code 特殊：按 frontmatter chapter 字段分组（数组/链表/哈希表/...）
 *
 * 用法：node --experimental-strip-types docs/.vitepress/generateIndex.ts
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { CATEGORIES } from './autoSidebar.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const blogDir = path.resolve(__dirname, '../blog')

/** 所有 index.md 共用的 frontmatter（隐藏于列表、不参与阅读时长/日期等） */
const FRONTMATTER = [
  '---',
  'hidden: true',
  'readingTime: false',
  'date: false',
  'author: false',
  'recommend: false',
  '---',
].join('\n')

/** leet-code 首页特殊标题与副标题 */
const LEETCODE_TITLE = '力扣每日一题'
const LEETCODE_DESC = '积少成多，厚积薄发'

/** 力扣 chapter 分组顺序（与 autoSidebar.ts 的 CHAPTERS 保持一致） */
const LEETCODE_CHAPTERS = ['数组', '链表', '哈希表', '字符串', '栈与队列', '二叉树']

/** 从 frontmatter 提取标量字段值（如 title: xxx / chapter: 数组） */
function readField(content: string, key: string): string | undefined {
  const m = content.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))
  if (!m) return undefined
  return m[1].trim().replace(/^['"]|['"]$/g, '')
}

/** 从文件名（如 "704.二分查找"）提取题号用于排序；非数字开头排最后 */
function extractNumber(name: string): number {
  const m = name.match(/^(\d+)/)
  return m ? parseInt(m[1], 10) : Number.MAX_SAFE_INTEGER
}

/** 写入 index.md 到指定目录 */
function writeIndex(dir: string, body: string) {
  fs.writeFileSync(path.join(dir, 'index.md'), `${FRONTMATTER}\n\n${body.trim()}\n`)
}

/** 生成普通小类 index.md：平铺文章列表，标题取 frontmatter title（回退文件名） */
function generateSubIndex(catDir: string, subDir: string, subText: string) {
  const dir = path.join(blogDir, catDir, subDir)
  if (!fs.existsSync(dir)) return
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md') && f !== 'index.md')
    .sort((a, b) => a.localeCompare(b, 'zh'))
  const items = files.map((f) => {
    const title = readField(fs.readFileSync(path.join(dir, f), 'utf-8'), 'title') ?? f.replace(/\.md$/, '')
    return `- [${title}](./${f})`
  })
  writeIndex(dir, `# ${subText}\n\n${items.join('\n')}`)
}

/** 生成力扣 index.md：按 chapter 分组，标题取文件名（题号.标题） */
function generateLeetCodeIndex(catDir: string, subDir: string) {
  const dir = path.join(blogDir, catDir, subDir)
  if (!fs.existsSync(dir)) return
  const buckets = new Map<string, { name: string; item: string }[]>(LEETCODE_CHAPTERS.map((c) => [c, []]))
  const orphans: { name: string; item: string }[] = []
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.md') || f === 'index.md') continue
    const name = f.replace(/\.md$/, '')
    const chapter = readField(fs.readFileSync(path.join(dir, f), 'utf-8'), 'chapter')
    const entry = { name, item: `- [${name}](./${f})` }
    const bucket = chapter ? buckets.get(chapter) : undefined
    if (bucket) bucket.push(entry)
    else orphans.push(entry)
  }
  const byNumber = (a: { name: string }, b: { name: string }) =>
    extractNumber(a.name) - extractNumber(b.name) || a.name.localeCompare(b.name, 'zh')
  const sections: string[] = []
  for (const c of LEETCODE_CHAPTERS) {
    const items = buckets.get(c) ?? []
    items.sort(byNumber)
    if (items.length) sections.push(`## ${c}\n\n${items.map((e) => e.item).join('\n')}`)
  }
  if (orphans.length) {
    orphans.sort(byNumber)
    sections.push(`## 其他\n\n${orphans.map((e) => e.item).join('\n')}`)
  }
  writeIndex(dir, `# ${LEETCODE_TITLE}\n${LEETCODE_DESC}\n\n${sections.join('\n\n')}`)
}

/** 生成大类 index.md：列出其下小类目录 */
function generateCategoryIndex(cat: (typeof CATEGORIES)[number]) {
  const dir = path.join(blogDir, cat.dir)
  if (!fs.existsSync(dir)) return
  const items = cat.subs.map((sub) => `- [${sub.text}](./${sub.dir}/)`)
  writeIndex(dir, `# ${cat.text}\n\n${items.join('\n')}`)
}

function main() {
  for (const cat of CATEGORIES) {
    generateCategoryIndex(cat)
    for (const sub of cat.subs) {
      if (sub.dir === 'leet-code') {
        generateLeetCodeIndex(cat.dir, sub.dir)
      } else {
        generateSubIndex(cat.dir, sub.dir, sub.text)
      }
    }
  }
  console.log('✓ 已自动生成所有分类首页 index.md')
}

main()
