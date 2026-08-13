import { defineConfig } from 'vitepress'

// 导入主题的配置
import { blogTheme } from './blog-theme'
import { SponsorPlugin } from "vitepress-plugin-sponsor";
import { getLeetCodeSidebar, getFlatBlogSidebar } from './autoSidebar'

// 如果使用 GitHub/Gitee Pages 等公共平台部署
// 通常需要修改 base 路径，通常为“/仓库名/”
// const base = process.env.GITHUB_ACTIONS === 'true'
//   ? '/vitepress-blog-sugar-template/'
//   : '/'

// Vitepress 默认配置
// 详见文档：https://vitepress.dev/reference/site-config
export default defineConfig({
    // 忽略死链
    ignoreDeadLinks: true,
    // 继承博客主题(@sugarat/theme)
    extends: blogTheme,
    // 仓库名
    // base: '/leeyazhou.github.io/',
    lang: 'zh-cn',
    title: 'leeyazhou - 兴安安国, 自立立人',
    description: '为学应尽毕生力，攀高须贵少年时',
    lastUpdated: true,
    // 详见：https://vitepress.dev/zh/reference/site-config#head
    head: [
        // 配置网站的图标（显示在浏览器的 tab 上）
        // ['link', { rel: 'icon', href: `${base}favicon.ico` }], // 修改了 base 这里也需要同步修改
        ['link', { rel: 'icon', href: 'img/favicon.ico' }],
        // [
        //     'link',
        //     { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/lxgw-wenkai-screen-web/style.css' }
        // ],
        [
            'link',
            { rel: 'stylesheet', href: 'https://registry.npmmirror.com/lxgw-wenkai-screen-web/latest/files/style.css' }
        ],
        [
            'script',
            {},
            `
            var _hmt = _hmt || [];
            (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?13deb3118acd0041fe7f3fc5c44a48ef";
            var s = document.getElementsByTagName("script")[0]; 
            s.parentNode.insertBefore(hm, s);
            })();
            `,
          ],
    ],
    themeConfig: {
        // 展示 2,3 级标题在目录中
        outline: {
            level: [2, 3],
            label: '目录'
        },
        // 默认文案修改
        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '相关文章',
        lastUpdated: {
            text: '上次更新于'
        },
        // 设置logo
        logo: '/img/favicon.ico',
        // editLink: {
        //   pattern:
        //     'https://github.com/ATQQ/sugar-blog/tree/master/packages/blogpress/:path',
        //   text: '去 GitHub 上编辑内容'
        // },
        // 导航栏
        nav: [
            {
                text: '首页',
                link: '/'
            },
            {
                text: '关于',
                link: '/about'
            },
            {
                text: '技术随笔',
                items: [
                    { text: '计算机网络', link: '/blog/ComputerNetworks/' },
                    { text: 'MySQL', link: '/blog/MySQL/' },
                    { text: 'Linux', link: '/blog/Linux/' },
                ]
            },
            { text: '力扣每日一题', link: '/blog/leet-code/' },
            {text: '随笔',link: '/blog/Life/'},
            
            { text: '量化日志', link: '/stock/' },
            {
                text: '赞助',
                items: [
                    {
                        text: '成为赞助者',
                        link: '/sponsor'
                    }
                ]
            },
        ],
        // 友链
        socialLinks: [
            {
                icon: 'github',
                link: 'https://github.com/leeyazhou'
            }
        ],
        // 侧边栏
        sidebar: {
            "/blog/leet-code/": getLeetCodeSidebar(),
            ...getFlatBlogSidebar(),
        },
    },
    vite: {
        plugins: [
            // 打赏插件
            SponsorPlugin({
                /**
                 * 打赏模块样式
                 */
                type: 'simple',
                aliPayQR: 'https://www.bytesgo.com/img/aliPayQR.png',
                weChatQR: 'https://www.bytesgo.com/img/weChatQR.png'
            })
        ],
        ssr: {
            // vitepress-plugin-product-card 发布的是未编译的 .vue 文件，
            // 需让 vite 在 SSR 阶段编译它（@sugarat/theme 会自动追加 vitepress-plugin-tabs）
            noExternal: ['vitepress-plugin-product-card']
        }
    },
    sitemap: {
        hostname: 'https://www.bytesgo.com'
    },
    locales: {
        root: {
          label: '简体中文',
          lang: 'zh-cn'
        },
        en: {
          label: 'English',
          lang: 'en',
          link: '/en/'
        }
      }
})
