<template>
  <div class="about-page">
    <div class="container">
      <!-- 个人简介区域 -->
      <section class="hero-section">
        <div class="profile-container">
          <div class="profile-avatar">
            <div class="avatar-ring"></div>
            <img src="https://via.placeholder.com/150x150/6366f1/ffffff?text=SXL" alt="sxl193258" class="avatar-img">
          </div>
          
          <div class="profile-info">
            <h1 class="profile-name">sxl193258</h1>
            <p class="profile-title">Frontend Developer & Tech Enthusiast</p>
            <p class="profile-description">
              专注于现代前端技术栈，热衷于探索新技术，分享开发经验。
              致力于构建高质量的用户界面和用户体验。
            </p>
            
            <div class="social-links">
              <a href="https://github.com" target="_blank" class="social-link">
                <i class="fab fa-github"></i>
                <span>GitHub</span>
              </a>
              <a href="mailto:contact@example.com" class="social-link">
                <i class="fas fa-envelope"></i>
                <span>Email</span>
              </a>
              <a href="https://twitter.com" target="_blank" class="social-link">
                <i class="fab fa-twitter"></i>
                <span>Twitter</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <!-- 技能栈 -->
      <section class="skills-section">
        <h2 class="section-title">技术栈</h2>
        <div class="skills-grid">
          <div 
            v-for="(category, index) in skillCategories" 
            :key="category.name"
            class="skill-category"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="category-header">
              <i :class="category.icon"></i>
              <h3>{{ category.name }}</h3>
            </div>
            <div class="skills-list">
              <span 
                v-for="skill in category.skills" 
                :key="skill.name"
                class="skill-tag"
                :style="{ '--skill-level': skill.level + '%' }"
              >
                {{ skill.name }}
                <span class="skill-level">{{ skill.level }}%</span>
              </span>
            </div>
          </div>
        </div>
      </section>
      
      <!-- 经历时间线 -->
      <section class="timeline-section">
        <h2 class="section-title">学习经历</h2>
        <div class="timeline">
          <div 
            v-for="(item, index) in timelineItems" 
            :key="index"
            class="timeline-item"
            :class="{ 'timeline-item-left': index % 2 === 0 }"
          >
            <div class="timeline-marker">
              <i :class="item.icon"></i>
            </div>
            <div class="timeline-content">
              <div class="timeline-date">{{ item.date }}</div>
              <h3 class="timeline-title">{{ item.title }}</h3>
              <p class="timeline-description">{{ item.description }}</p>
              <div v-if="item.technologies" class="timeline-technologies">
                <span 
                  v-for="tech in item.technologies" 
                  :key="tech"
                  class="tech-tag"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- 项目展示 -->
      <section class="projects-section">
        <h2 class="section-title">精选项目</h2>
        <div class="projects-grid">
          <div 
            v-for="(project, index) in featuredProjects" 
            :key="project.name"
            class="project-card"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="project-header">
              <h3 class="project-name">{{ project.name }}</h3>
              <div class="project-links">
                <a v-if="project.github" :href="project.github" target="_blank" class="project-link">
                  <i class="fab fa-github"></i>
                </a>
                <a v-if="project.demo" :href="project.demo" target="_blank" class="project-link">
                  <i class="fas fa-external-link-alt"></i>
                </a>
              </div>
            </div>
            
            <p class="project-description">{{ project.description }}</p>
            
            <div class="project-technologies">
              <span 
                v-for="tech in project.technologies" 
                :key="tech"
                class="tech-tag"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </section>
      
      <!-- 联系方式 -->
      <section class="contact-section">
        <h2 class="section-title">联系我</h2>
        <div class="contact-content">
          <div class="contact-text">
            <p>如果你有任何问题或者想要交流技术，欢迎通过以下方式联系我：</p>
          </div>
          
          <div class="contact-methods">
            <div class="contact-item">
              <i class="fas fa-envelope"></i>
              <div>
                <span class="contact-label">邮箱</span>
                <a href="mailto:contact@example.com" class="contact-value">contact@example.com</a>
              </div>
            </div>
            
            <div class="contact-item">
              <i class="fab fa-github"></i>
              <div>
                <span class="contact-label">GitHub</span>
                <a href="https://github.com" target="_blank" class="contact-value">github.com/sxl193258</a>
              </div>
            </div>
            
            <div class="contact-item">
              <i class="fas fa-map-marker-alt"></i>
              <div>
                <span class="contact-label">位置</span>
                <span class="contact-value">中国, 北京</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      skillCategories: [
        {
          name: '前端框架',
          icon: 'fab fa-vuejs',
          skills: [
            { name: 'Vue.js', level: 90 },
            { name: 'React', level: 85 },
            { name: 'Angular', level: 70 },
            { name: 'Svelte', level: 60 }
          ]
        },
        {
          name: '编程语言',
          icon: 'fas fa-code',
          skills: [
            { name: 'JavaScript', level: 95 },
            { name: 'TypeScript', level: 90 },
            { name: 'Python', level: 80 },
            { name: 'Go', level: 65 }
          ]
        },
        {
          name: '样式技术',
          icon: 'fab fa-css3-alt',
          skills: [
            { name: 'CSS3', level: 90 },
            { name: 'Sass/SCSS', level: 85 },
            { name: 'Tailwind CSS', level: 80 },
            { name: 'CSS-in-JS', level: 75 }
          ]
        },
        {
          name: '工具链',
          icon: 'fas fa-tools',
          skills: [
            { name: 'Webpack', level: 85 },
            { name: 'Vite', level: 90 },
            { name: 'Git', level: 90 },
            { name: 'Docker', level: 70 }
          ]
        }
      ],
      
      timelineItems: [
        {
          date: '2024',
          title: '深入Vue 3生态',
          description: '系统学习Vue 3 Composition API、Pinia状态管理，构建现代化前端应用',
          icon: 'fab fa-vuejs',
          technologies: ['Vue 3', 'Pinia', 'Vite', 'TypeScript']
        },
        {
          date: '2023',
          title: '全栈开发探索',
          description: '学习Node.js后端开发，掌握全栈开发技能，构建完整的Web应用',
          icon: 'fas fa-server',
          technologies: ['Node.js', 'Express', 'MongoDB', 'RESTful API']
        },
        {
          date: '2022',
          title: '前端工程化深入',
          description: '深入学习前端工程化，包括构建工具、代码规范、自动化部署等',
          icon: 'fas fa-cogs',
          technologies: ['Webpack', 'ESLint', 'Prettier', 'CI/CD']
        },
        {
          date: '2021',
          title: '开始前端学习',
          description: '开始系统学习前端开发，掌握HTML、CSS、JavaScript基础知识',
          icon: 'fas fa-graduation-cap',
          technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap']
        }
      ],
      
      featuredProjects: [
        {
          name: '科技感博客系统',
          description: '基于Vue 3构建的现代化博客系统，具有科技感UI设计和完整的文章管理功能',
          technologies: ['Vue 3', 'Vite', 'Markdown-it', 'Prism.js'],
          github: 'https://github.com',
          demo: 'https://demo.example.com'
        },
        {
          name: '前端组件库',
          description: '自主开发的Vue 3组件库，包含常用UI组件和业务组件，支持TypeScript',
          technologies: ['Vue 3', 'TypeScript', 'Rollup', 'Storybook'],
          github: 'https://github.com'
        },
        {
          name: '数据可视化平台',
          description: '基于D3.js和Canvas的数据可视化平台，支持多种图表类型和实时数据展示',
          technologies: ['D3.js', 'Canvas', 'WebGL', 'WebSocket'],
          github: 'https://github.com',
          demo: 'https://demo.example.com'
        }
      ]
    }
  }
}
</script>

<style scoped>
.about-page {
  padding-top: 100px;
  min-height: 100vh;
}

/* 个人简介区域 */
.hero-section {
  padding: var(--spacing-2xl) 0;
  text-align: center;
}

.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xl);
  max-width: 600px;
  margin: 0 auto;
}

.profile-avatar {
  position: relative;
  width: 150px;
  height: 150px;
}

.avatar-ring {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border: 2px solid var(--primary-color);
  border-radius: 50%;
  animation: rotate 10s linear infinite;
}

.avatar-ring::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border: 2px solid var(--accent-color);
  border-radius: 50%;
  opacity: 0.5;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  background: var(--gradient-primary);
}

.profile-name {
  font-size: 2.5rem;
  margin-bottom: var(--spacing-sm);
  background: var(--gradient-primary);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.profile-title {
  font-size: 1.2rem;
  color: var(--accent-color);
  margin-bottom: var(--spacing-md);
  font-family: var(--font-family-mono);
}

.profile-description {
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: var(--spacing-lg);
}

.social-links {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
}

.social-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--gradient-card);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 8px;
  color: var(--primary-color);
  text-decoration: none;
  transition: all var(--transition-normal) ease;
}

.social-link:hover {
  border-color: var(--primary-color);
  transform: translateY(-3px);
  box-shadow: var(--shadow-neon);
}

/* 技能栈 */
.skills-section {
  padding: var(--spacing-2xl) 0;
}

.section-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: var(--spacing-2xl);
  color: var(--primary-color);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
}

.skill-category {
  background: var(--gradient-card);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 12px;
  padding: var(--spacing-xl);
  transition: all var(--transition-normal) ease;
  animation: slideUp 0.6s ease-out both;
}

.skill-category:hover {
  transform: translateY(-5px);
  border-color: var(--primary-color);
  box-shadow: var(--shadow-neon);
}

.category-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.category-header i {
  font-size: 1.5rem;
  color: var(--primary-color);
}

.category-header h3 {
  color: var(--secondary-color);
  margin: 0;
}

.skills-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.skill-tag {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-sm) var(--spacing-md);
  background: rgba(15, 15, 35, 0.8);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 6px;
  position: relative;
  overflow: hidden;
}

.skill-tag::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: var(--skill-level);
  background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
  opacity: 0.1;
  transition: width 1s ease-out;
}

.skill-level {
  font-size: 0.8rem;
  color: var(--accent-color);
  font-family: var(--font-family-mono);
}

/* 时间线 */
.timeline-section {
  padding: var(--spacing-2xl) 0;
  background: rgba(0, 0, 0, 0.2);
}

.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 100%;
  background: var(--gradient-primary);
}

.timeline-item {
  position: relative;
  margin-bottom: var(--spacing-2xl);
  display: flex;
  align-items: flex-start;
}

.timeline-item-left {
  flex-direction: row-reverse;
}

.timeline-marker {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 60px;
  background: var(--gradient-primary);
  border: 4px solid rgba(15, 15, 35, 1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.timeline-marker i {
  color: white;
  font-size: 1.2rem;
}

.timeline-content {
  width: calc(50% - 30px);
  padding: var(--spacing-lg);
  background: var(--gradient-card);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 12px;
  position: relative;
}

.timeline-item-left .timeline-content {
  margin-right: 60px;
}

.timeline-item:not(.timeline-item-left) .timeline-content {
  margin-left: 60px;
}

.timeline-date {
  color: var(--accent-color);
  font-family: var(--font-family-mono);
  font-size: 0.9rem;
  margin-bottom: var(--spacing-sm);
}

.timeline-title {
  color: var(--primary-color);
  margin-bottom: var(--spacing-sm);
}

.timeline-description {
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
}

.timeline-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.tech-tag {
  padding: var(--spacing-xs) var(--spacing-sm);
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 4px;
  font-size: 0.75rem;
  color: var(--primary-color);
}

/* 项目展示 */
.projects-section {
  padding: var(--spacing-2xl) 0;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
}

.project-card {
  background: var(--gradient-card);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 12px;
  padding: var(--spacing-xl);
  transition: all var(--transition-normal) ease;
  animation: slideUp 0.6s ease-out both;
}

.project-card:hover {
  transform: translateY(-5px);
  border-color: var(--primary-color);
  box-shadow: var(--shadow-neon);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.project-name {
  color: var(--secondary-color);
  margin: 0;
}

.project-links {
  display: flex;
  gap: var(--spacing-sm);
}

.project-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 6px;
  color: var(--primary-color);
  text-decoration: none;
  transition: all var(--transition-normal) ease;
}

.project-link:hover {
  background: rgba(99, 102, 241, 0.2);
  transform: scale(1.1);
}

.project-description {
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
}

.project-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

/* 联系方式 */
.contact-section {
  padding: var(--spacing-2xl) 0;
  background: rgba(0, 0, 0, 0.2);
}

.contact-content {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.contact-text {
  margin-bottom: var(--spacing-xl);
  color: #94a3b8;
  line-height: 1.6;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.contact-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: var(--gradient-card);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 12px;
  transition: all var(--transition-normal) ease;
}

.contact-item:hover {
  border-color: var(--primary-color);
  transform: translateY(-3px);
}

.contact-item i {
  font-size: 1.5rem;
  color: var(--primary-color);
  min-width: 24px;
}

.contact-item div {
  flex: 1;
  text-align: left;
}

.contact-label {
  display: block;
  font-size: 0.8rem;
  color: #64748b;
  margin-bottom: var(--spacing-xs);
}

.contact-value {
  color: var(--accent-color);
  text-decoration: none;
  font-family: var(--font-family-mono);
  transition: color var(--transition-normal) ease;
}

.contact-value:hover {
  color: var(--primary-color);
}

/* 动画 */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .timeline::before {
    left: 20px;
  }
  
  .timeline-marker {
    left: 20px;
    transform: none;
    width: 40px;
    height: 40px;
  }
  
  .timeline-content {
    width: calc(100% - 60px);
    margin-left: 60px !important;
    margin-right: 0 !important;
  }
  
  .timeline-item {
    flex-direction: row !important;
  }
  
  .profile-container {
    padding: 0 var(--spacing-md);
  }
  
  .social-links {
    flex-direction: column;
    align-items: center;
  }
  
  .contact-item {
    flex-direction: column;
    text-align: center;
  }
  
  .contact-item div {
    text-align: center;
  }
}
</style>