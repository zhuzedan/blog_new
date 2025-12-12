# Vue 3 博客项目

一个基于 Vue 3 + Vite + Ant Design Vue 构建的现代化博客系统，样式参考 [liuyuyang.net](https://liuyuyang.net/)。

## 技术栈

- **框架**: Vue 3 (Composition API + `<script setup>`)
- **构建工具**: Vite
- **UI 组件库**: Ant Design Vue
- **状态管理**: Pinia
- **路由**: Vue Router
- **包管理器**: pnpm
- **代码规范**: ESLint + Prettier
- **Git 钩子**: Husky + lint-staged

## 项目特性

✨ 现代化的博客界面设计
📱 响应式布局，支持移动端
🎨 渐变色主题，美观大方
📝 文章列表、详情页、关于页
💬 评论功能（UI 已实现）
🔍 文章分类和标签
⚡️ Vite 快速开发体验
🛠 完善的代码规范配置

## 开始使用

### 安装依赖

```bash
pnpm install
```

### 开发环境运行

```bash
pnpm dev
```

访问 http://localhost:5173 查看效果。

### 生产环境构建

```bash
pnpm build
```

### 预览生产构建

```bash
pnpm preview
```

## 代码规范

### 代码检查

```bash
pnpm lint
```

### 代码格式化

```bash
pnpm format
```

### Git 提交

项目配置了 Husky 和 lint-staged，每次提交代码时会自动运行 ESLint 和 Prettier 进行代码检查和格式化。

## 项目结构

```
blog_new/
├── .husky/              # Git hooks
├── .vscode/             # VSCode 配置
├── public/              # 静态资源
├── src/
│   ├── assets/          # 资源文件
│   ├── components/      # 公共组件
│   ├── router/          # 路由配置
│   ├── store/           # Pinia 状态管理
│   ├── views/           # 页面组件
│   │   ├── Home.vue     # 首页
│   │   ├── Article.vue  # 文章详情页
│   │   └── About.vue    # 关于页面
│   ├── App.vue          # 根组件
│   ├── main.js          # 入口文件
│   └── style.css        # 全局样式
├── .editorconfig        # 编辑器配置
├── .prettierrc          # Prettier 配置
├── .prettierignore      # Prettier 忽略文件
├── eslint.config.js     # ESLint 配置
├── package.json         # 项目依赖
└── vite.config.js       # Vite 配置
```

## 推荐的 IDE 设置

推荐使用 [VSCode](https://code.visualstudio.com/) + 以下插件：

- [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

## 说明

- 图片使用了 Unsplash 开源图片作为占位符
- 博客数据存储在 Pinia Store 中，可以根据需要接入后端 API
- 样式设计参考了 liuyuyang.net，并进行了适当调整

## License

MIT
