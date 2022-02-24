export default {
  '/': [
    {
      text: '开始',
      link: '/',
    },
    {
      text: '通用',
      children: [
        {
          text: '文本省略 Ellipsis',
          link: '/components/ellipsis/',
        },
        {
          text: '计时器 Timer',
          link: '/components/timer/',
        },
      ],
    },
    {
      text: '反馈组件',
      children: [
        {
          text: '抽屉 Drawer',
          link: '/components/drawer/',
        },
        {
          text: '弹出框 Modal',
          link: '/components/modal/',
        },
      ],
    },
    {
      text: '数据展示',
      children: [
        {
          text: '表格 Table',
          link: '/components/table/',
        },
      ],
    },
  ],
}
