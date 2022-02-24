import { demoBlockPlugin } from 'vitepress-theme-demoblock'
import { EP_PKG } from '../../build/utils/constants'
import sidebar from './config/sidebar'

export default {
  title: EP_PKG,
  description: '快速开发中后台项目的 UI 组件库',

  themeConfig: {
    repo: 'http://192.168.0.20:8929/zhouyangyang/tz-ui',
    repoLabel: 'GitHub',
    docsDir: 'docs',
    docsBranch: 'main',
    editLinks: false,
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',
    nav: [
      // { text: '指南', link: '/guide/' },

      { text: '组件', link: '/' },
    ],

    // sidebar: {
    // 	'/guide/': [
    // 		{
    // 			text: '指南',
    // 			collapsable: false,
    // 			children: [
    // 				{ text: '介绍', link: '/guide/' },
    // 				{ text: '安装', link: '/guide/installation' },
    // 				{ text: '快速上手', link: '/guide/quickstart' },
    // 			]
    // 		}
    // 	],
    // 	'/components/': [
    // 		{
    // 			text: '更新日志',
    // 			link: '/components/changelog',
    // 		},
    // 		{
    // 			text: '基础组件',
    // 			collapsable: false,
    // 			children: [
    // 				{ text: '文本省略 Ellipsis', link: '/components/ellipsis' },
    // 				{ text: '计时器 Timer', link: '/components/timer' },
    // 			]
    // 		},
    // 		{
    // 			text: '数据录入组件',
    // 			collapsable: false,
    // 			children: [
    // 				{ text: '表格 Table', link: '/components/table' },
    // 			]
    // 		}
    // 	]
    // }
    sidebar,
  },

  markdown: {
    config: (md) => {
      md.use(demoBlockPlugin)
    },
  },
}
