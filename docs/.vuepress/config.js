// 侧边栏目录配置
const dirConfig = require('../../directoryConfig')

module.exports = {
  title: '刘一笔的博客',
  description: '博客，日常记录，JavaScript，CSS，LeetCode，Node，HTTP',
  serviceWorker: true,
  // base: '/blog/',
  plugins: ['@vuepress/back-to-top', '@vuepress/pwa', require('./plugin')],
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    [
      'script',
      {
        async: true,
        src: 'https://www.googletagmanager.com/gtag/js?id=G-0X7CLSMP1X',
      },
    ],
    [
      'script',
      {},
      [
        "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-0X7CLSMP1X');",
      ],
    ],
    ['link', {rel: 'icon', href: '/logo.jpg'}],// 增加一个自定义的 favicon(网页标签的图标)
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: '/logo.jpg' }],
    ['link', { rel: 'mask-icon', href: '/logo.jpg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/logo.jpg' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  // 这是部署到github相关的配置
  markdown: {
    // 代码块显示行号
    lineNumbers: true,
    extractHeaders: ['h2', 'h3', 'h4']
  },
  evergreen: true,
  home: true,
  themeConfig: {
    smoothScroll: true,
    lastUpdated: '一笔写于',
    // 导航栏配置
    nav: [
      {text: '技术学习', link: '/LearnTech/'},
      {text: '交易复盘', link: '/TradeReview/'},
      {text: '项目记录', link: '/Projects/'},
      {text: '年终回顾', link: '/YearReview/'},
      {text: '阅读记录', link: '/Reading/'},
      {text: '闪念', link: '/IdeaPills/'},
      {text: '编程工具', link: '/CodingTool/'},
      {text: 'Github', link: 'https://github.com/OrangeSAM'},
      {
        text: "友链",
        items: [
          {
            text: "若川博客",
            link: "https://www.lxchuan12.cn/"
          },
          {
            text: "森淼",
            link: "https://wind-nest.com/"
          },
          {
            text: "北风",
            link: "https://www.mybeifeng.com/"
          }
        ]
      }
    ],
    // 侧边栏配置
    sidebar: dirConfig
  }
};
