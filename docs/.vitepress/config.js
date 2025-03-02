import { defineConfig } from 'vitepress'
import { generateSidebarConfig } from '../../generateSidebar.mjs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "刘一笔的博客",
  description: "Sam's Blog，techenical learning, project record, year review, reading record, idea pills, coding tool",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {text: 'Home', link: '/' },
      {text: '技术学习', link: '/LearnTech/readme'},
      {text: '项目记录', link: '/Projects/readme'},
      {text: '年终回顾', link: '/YearReview/readme'},
      {text: '阅读记录', link: '/Reading/readme'},
      {text: '闪念', link: '/IdeaPills/readme'},
      {text: '编程工具', link: '/CodingTool/readme'},
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
    sidebar: await generateSidebarConfig(),
    socialLinks: [
      { icon: 'github', link: 'https://github.com/OrangeSAM' }
    ]
  },
  sitemap: {
    hostname: 'https://blog.yibi.host/'
  },
  search: {
    provider: 'local'
  }
})
