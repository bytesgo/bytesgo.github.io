import BlogTheme from '@sugarat/theme'

// 自定义样式重载
import './style.scss'

// 自定义主题色
// import './user-theme.css'

// 折叠量化日志(stock)页面的数据表格，减少首屏 DOM 体积
function collapseStockTables() {
    if (typeof window === 'undefined') return
    if (!window.location.pathname.startsWith('/stock/')) return
    window.document.querySelectorAll<HTMLTableElement>('.vp-doc table').forEach((table) => {
        if (table.dataset.stockCollapsed) return
        table.dataset.stockCollapsed = '1'
        // 表格前的分类名段落（如"科创股"/"沪深股"）作为折叠标题
        const prev = table.previousElementSibling
        const label = prev?.textContent?.trim() || '数据表'
        const count = table.rows.length - 1
        const details = document.createElement('details')
        const summary = document.createElement('summary')
        summary.textContent = `${label}（${count} 条，点击展开）`
        summary.style.cursor = 'pointer'
        summary.style.fontWeight = '600'
        details.appendChild(summary)
        table.parentNode?.insertBefore(details, table)
        // 移除表格前的分类名段落，避免与 summary 重复显示
        if (prev && prev.tagName === 'P' && prev.textContent?.trim()) {
            prev.remove()
        }
        details.appendChild(table)
    })
}

export default {
    extends: BlogTheme,
    enhanceApp({ app, router }) {
        router.onAfterRouteChange = () => {
            setTimeout(collapseStockTables, 0)
        }
        app.mixin({
            mounted() {
                if (typeof window !== 'undefined' && window.location.pathname.startsWith('/stock/')) {
                    setTimeout(collapseStockTables, 0)
                }
            }
        })
    }
}
