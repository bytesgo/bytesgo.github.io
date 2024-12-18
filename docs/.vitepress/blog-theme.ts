// 主题独有配置
import {getThemeConfig, SearchConfig} from '@sugarat/theme/node'

// 开启RSS支持（RSS配置）
// import type { Theme } from '@sugarat/theme'

// const baseUrl = 'https://sugarat.top'
// const RSS: Theme.RSSOptions = {
//   title: 'leeyazhou',
//   baseUrl,
//   copyright: 'Copyright (c) 2018-present, leeyazhou',
//   description: '自立立人, 兴安安国',
//   language: 'zh-cn',
//   image: 'https://img.cdn.sugarat.top/mdImg/MTY3NDk5NTE2NzAzMA==674995167030',
//   favicon: 'https://sugarat.top/favicon.ico',
// }

// 所有配置项，详见文档: https://theme.sugarat.top/
const blogTheme = getThemeConfig({
    // 开启RSS支持
    // RSS,

    // 搜索
    // 默认开启pagefind离线的全文搜索支持（如使用其它的可以设置为false）
    // 如果npx pagefind 时间过长，可以手动将其安装为项目依赖 pnpm add pagefind
    search: true,

    // 页脚
    footer: {
        // message 字段支持配置为HTML内容，配置多条可以配置为数组
        // message: '下面 的内容和图标都是可以修改的噢（当然本条内容也是可以隐藏的）',
        copyright: 'MIT License | leeyazhou',
        // icpRecord: {
        //   name: '蜀ICP备19011724号',
        //   link: 'https://beian.miit.gov.cn/'
        // },
        // securityRecord: {
        //   name: '公网安备xxxxx',
        //   link: 'https://www.beian.gov.cn/portal/index.do'
        // },
    },

    // 主题色修改
    themeColor: 'el-blue',

    // 文章默认作者
    author: 'leeyazhou',

    // 友链
    friend: [
        {
            nickname: 'Vitepress',
            des: 'Vite & Vue Powered Static Site Generator',
            avatar:
                'https://vitepress.dev/vitepress-logo-large.webp',
            url: 'https://vitepress.dev/',
        },
    ],

    // 公告
    popover: {
        title: '公告',
        duration: -1,
        mobileMinify: false,
        reopen: true,
        twinkle: false,
        body: [
            {type: 'text', content: '👇 我的微信 👇'},
            {
                type: 'image',
                src: 'img/wechat.png',
                style: 'display: inline-block;width:46%;padding-right:6px'
            },
            {
                type: 'text',
                content: '欢迎大家私信交流'
            }
        ],
    },

    // 热门文章
    hotArticle: {
        title: '🔥 精选文章',
        nextText: '换一组',
        pageSize: 9,
        empty: '暂无精选内容'
    },

    // 推荐文章的展示卡片
    recommend: false,

    // 评论插件
    comment: {
        repo: 'leeyazhou/leeyazhou.github.io',
        repoId: 'MDEwOlJlcG9zaXRvcnkyNDY1MTEyOTQ=',
        category: 'Announcements',
        categoryId: 'DIC_kwDODrF2vs4CgAF8',
        inputPosition: 'top'
    }
})

export {blogTheme}
