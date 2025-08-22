# sxl193258的技术博客

一个基于Vue 3构建的现代化科技感博客系统，专注于前端技术分享和探索。

## ✨ 特性

- 🎨 **科技感UI设计** - 采用现代化的科技感主题，包含霓虹发光、矩阵背景等特效
- 🚀 **Vue 3 + Vite** - 基于最新的Vue 3 Composition API和Vite构建工具
- 📝 **Markdown支持** - 完整的Markdown渲染和语法高亮支持
- 🏷️ **标签分类** - 智能的标签分类和文章筛选功能
- 📱 **响应式设计** - 完美适配桌面端和移动端设备
- ⚡ **性能优化** - 代码分割、懒加载等性能优化策略
- 🎭 **交互动效** - 丰富的动画效果和用户交互体验

## 🛠️ 技术栈

- **前端框架**: Vue 3
- **构建工具**: Vite
- **路由管理**: Vue Router 4
- **样式方案**: SCSS + CSS Variables
- **Markdown渲染**: Markdown-it
- **语法高亮**: Prism.js
- **图标库**: Font Awesome
- **字体**: JetBrains Mono

## 🚀 快速开始

### 环境要求

- Node.js >= 20.19.0
- npm >= 8.0.0

### 安装依赖

\`\`\`bash
npm install
\`\`\`

### 开发模式

\`\`\`bash
npm run dev
\`\`\`

### 构建生产版本

\`\`\`bash
npm run build
\`\`\`

### 预览生产版本

\`\`\`bash
npm run preview
\`\`\`

## 📁 项目结构

\`\`\`
vue-tech-blog/
├── public/                 # 静态资源
├── src/
│   ├── assets/            # 资源文件
│   │   ├── css/          # 样式文件
│   │   ├── js/           # JS工具库
│   │   └── images/       # 图片资源
│   ├── components/        # 公共组件
│   │   ├── Navbar.vue    # 导航栏
│   │   ├── Footer.vue    # 页脚
│   │   └── TechParticles.vue # 科技感粒子效果
│   ├── views/            # 页面组件
│   │   ├── Home.vue      # 首页
│   │   ├── Posts.vue     # 文章列表
│   │   ├── Post.vue      # 文章详情
│   │   ├── Tags.vue      # 标签页面
│   │   ├── About.vue     # 关于页面
│   │   └── NotFound.vue  # 404页面
│   ├── router/           # 路由配置
│   ├── utils/            # 工具函数
│   │   └── markdown.js   # Markdown处理
│   ├── App.vue           # 根组件
│   └── main.js           # 入口文件
├── index.html            # HTML模板
├── vite.config.js        # Vite配置
└── package.json          # 项目配置
\`\`\`

## 🎨 主题特色

### 科技感设计元素

- **霓虹发光效果**: 使用CSS阴影和渐变实现的霓虹灯效果
- **矩阵雨背景**: Canvas绘制的动态矩阵字符雨
- **网格背景动画**: CSS动画实现的移动网格背景
- **粒子系统**: 互动式的浮动粒子效果
- **故障艺术**: 文字和元素的glitch效果

### 色彩方案

- **主色调**: #6366f1 (现代紫蓝色)
- **次要色**: #8b5cf6 (紫色)
- **强调色**: #06b6d4 (青色)
- **背景**: 深色渐变背景

## 📱 响应式支持

- **桌面端**: >= 1200px
- **平板端**: 768px - 1199px
- **移动端**: < 768px

所有组件和布局都经过精心设计，确保在不同设备上都有良好的用户体验。

## 🔧 自定义配置

### 主题配置

可以通过修改 \`src/assets/css/style.css\` 中的CSS变量来自定义主题：

\`\`\`css
:root {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  --accent-color: #06b6d4;
  /* 更多变量... */
}
\`\`\`

### Markdown配置

在 \`src/utils/markdown.js\` 中可以自定义Markdown渲染行为：

- 语法高亮主题
- 代码块增强功能
- 自定义渲染规则

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交Issue和Pull Request！

---

⭐ 如果这个项目对你有帮助，请给个Star支持一下！