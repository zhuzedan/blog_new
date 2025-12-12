import { defineStore } from 'pinia'

export const useBlogStore = defineStore('blog', {
  state: () => ({
    articles: [
      {
        id: 1,
        title: 'ThriveX 3.0 来袭，不忘初心，保持热爱',
        summary:
          'ThriveX 3.0 版本全新发布，带来前端新增页面与功能、控制端管理优化、全新UI设计等多项升级，项目地址同步更新。',
        cover: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800',
        date: '2025-06-15',
        views: 2270,
        category: '开发历程',
        content: `
# ThriveX 3.0 项目介绍

ThriveX 3.0 版本全新发布，这是一个全新的升级版本。

## 主要更新

### 前端功能

- 新增页面与功能优化
- 全新的UI设计系统
- 性能大幅提升

### 后端优化

控制端管理系统进行了全面升级：

1. 数据管理更加便捷
2. 权限系统更加完善
3. API性能优化

## 技术栈

使用的主要技术包括：

\`\`\`javascript
const tech = {
  frontend: 'Vue 3 + Vite',
  backend: 'Node.js + Express',
  database: 'MongoDB'
}
\`\`\`

## 安装指南

安装非常简单，只需要执行：

\`\`\`bash
npm install
npm run dev
\`\`\`

### 注意事项

> 请确保 Node.js 版本在 16.0 以上

## 总结

这次更新带来了许多新特性，期待您的使用反馈！
        `
      },
      {
        id: 7,
        title: '无标题文章测试',
        summary: '这是一篇没有标题的文章，用于测试TOC功能',
        cover: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800',
        date: '2025-12-11',
        views: 100,
        category: '测试',
        content: `
这是一篇没有标题的文章，用于测试TOC功能。

这篇文章没有任何的 H1、H2 或 H3 标题，
应该在文章详情页显示 "暂无目录" 而不是隐藏整个目录卡片。

让我们添加一些更多的内容来使文章看起来更完整。

- 这是一个列表项
- 这是另一个列表项

我们还可以添加一些代码示例：

\`\`\`javascript
console.log('Hello World');
\`\`\`

或者一段引用：

> 这是一段引用文本，用来测试Markdown渲染效果。
        `
      },
      {
        id: 2,
        title: 'ThriveX 官网全新发布 🎉',
        summary: 'ThriveX 官网全新发布，带来更好的用户体验和功能。',
        cover: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
        date: '2025-01-21',
        views: 1850,
        category: '开发历程',
        content: `
          <h2>全新官网</h2>
          <p>ThriveX 官网经过全新设计，带来更好的用户体验。</p>
        `
      },
      {
        id: 3,
        title: '心态好了，人生就顺了',
        summary: '关于人生态度和心态调整的思考与感悟。',
        cover: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800',
        date: '2025-04-22',
        views: 1680,
        category: '生活随笔',
        content: `
          <h2>心态的重要性</h2>
          <p>人生在世，心态决定一切。保持积极乐观的心态，生活会变得更加美好。</p>
        `
      },
      {
        id: 4,
        title: '对 AI 的看法与思考',
        summary:
          '从 6 月份到现在只更新了一篇文章，断更了大半年。今天就水一篇文章，来谈一谈我对 AI 的感悟',
        cover: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
        date: '2025-12-04',
        views: 152,
        category: '生活随笔',
        content: `
          <h2>AI 时代的思考</h2>
          <p>在以前上学时期还没有 AI，写代码纯手搓，我们可以通过反复实践、阅读源码、死磕疑难杂症来提升技术。</p>
        `
      },
      {
        id: 5,
        title: '欢聚后的空荡：不信人间有别离',
        summary: '文章通过对比昨日欢聚与今日独处的强烈反差，表达了面对离别时的失落与不舍。',
        cover: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800',
        date: '2025-06-24',
        views: 11882,
        category: '生活随笔',
        content: `
          <h2>离别的感伤</h2>
          <p>欢聚后的空荡，让人不禁感叹时光易逝，珍惜当下。</p>
        `
      },
      {
        id: 6,
        title: 'Spring Boot 自定义配置',
        summary: '在 Spring Boot 应用程序中，application.yml 是一个常用的配置文件格式。',
        cover: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
        date: '2025-01-22',
        views: 2030,
        category: '开发笔记',
        content: `
          <h2>Spring Boot 配置</h2>
          <p>介绍如何在 Spring Boot 中进行自定义配置。</p>
        `
      }
    ],
    authorInfo: {
      name: 'Zella',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200',
      motto: '再渺小的星光，也有属于他的光芒!',
      intro:
        '一直对网站开发领域很感兴趣，从小就希望有一个属于自己的网站，在17年时候成功进入站长圈，并通过各种自学，以及各种折腾，才有了你现在看到的这个网站'
    },
    dynamics: [
      { id: 1, content: '更新了博客样式', time: '2025-12-10 14:30' },
      { id: 2, content: '发布新文章：ThriveX 3.0', time: '2025-06-15 10:00' }
    ]
  }),

  getters: {
    getArticleById: (state) => (id) => {
      return state.articles.find((article) => article.id === parseInt(id))
    },

    recommendedArticles: (state) => {
      return state.articles.slice(0, 3)
    },

    latestArticles: (state) => {
      return [...state.articles].sort((a, b) => new Date(b.date) - new Date(a.date))
    }
  }
})
