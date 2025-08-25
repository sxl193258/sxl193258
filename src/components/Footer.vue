<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <!-- 主要信息 -->
        <div class="footer-main">
          <div class="footer-brand">
            <h3 class="brand-title neon-glow">sxl193258.tech</h3>
            <p class="brand-description">
              专注于前端技术分享的科技感博客
            </p>
          </div>
          
          <!-- 社交链接 -->
          <div class="social-links">
            <a 
              v-for="social in socialLinks" 
              :key="social.name"
              :href="social.url" 
              :title="social.name"
              class="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i :class="social.icon"></i>
            </a>
          </div>
        </div>
        
        <!-- 导航链接 -->
        <div class="footer-nav">
          <div class="nav-group">
            <h4 class="nav-title">内容</h4>
            <router-link to="/posts" class="nav-link">文章列表</router-link>
            <router-link to="/tags" class="nav-link">标签分类</router-link>
            <router-link to="/about" class="nav-link">关于我</router-link>
          </div>
          
          <div class="nav-group">
            <h4 class="nav-title">技术栈</h4>
            <span class="tech-item">Vue 3</span>
            <span class="tech-item">TypeScript</span>
            <span class="tech-item">Node.js</span>
            <span class="tech-item">Python</span>
          </div>
        </div>
      </div>
      
      <!-- 底部信息 -->
      <div class="footer-bottom">
        <div class="copyright">
          <p>&copy; {{ currentYear }} sxl193258. 基于 Vue 3 构建</p>
        </div>
        <div class="tech-info">
          <span class="tech-badge">Vue 3</span>
          <span class="tech-badge">Vite</span>
          <span class="tech-badge">科技感主题</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'Footer',
  setup() {
    const currentYear = computed(() => new Date().getFullYear())
    
    const socialLinks = [
      {
        name: 'GitHub',
        url: 'https://github.com',
        icon: 'fab fa-github'
      },
      {
        name: '知乎',
        url: 'https://zhihu.com',
        icon: 'fab fa-zhihu'
      },
      {
        name: '微博',
        url: 'https://weibo.com',
        icon: 'fab fa-weibo'
      },
      {
        name: 'Email',
        url: 'mailto:contact@example.com',
        icon: 'fas fa-envelope'
      }
    ]
    
    return {
      currentYear,
      socialLinks
    }
  }
}
</script>

<style scoped>
.footer {
  background: rgba(15, 15, 35, 0.95);
  border-top: 1px solid rgba(99, 102, 241, 0.2);
  backdrop-filter: blur(20px);
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: var(--spacing-2xl);
  padding: var(--spacing-2xl) 0;
  border-bottom: 1px solid rgba(99, 102, 241, 0.1);
}

/* 主要信息区域 */
.footer-main {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.footer-brand {
  max-width: 400px;
}

.brand-title {
  font-family: var(--font-family-mono);
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: var(--spacing-sm);
}

.brand-description {
  color: #94a3b8;
  line-height: 1.6;
  font-size: 0.9rem;
}

/* 社交链接 */
.social-links {
  display: flex;
  gap: var(--spacing-md);
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--gradient-card);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 8px;
  color: var(--accent-color);
  text-decoration: none;
  transition: all var(--transition-normal) ease;
  position: relative;
  overflow: hidden;
}

.social-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: var(--gradient-primary);
  opacity: 0.1;
  transition: left var(--transition-normal) ease;
}

.social-link:hover::before {
  left: 0;
}

.social-link:hover {
  color: var(--primary-color);
  border-color: var(--primary-color);
  transform: translateY(-3px);
  box-shadow: var(--shadow-neon);
}

.social-link i {
  font-size: 1.1rem;
}

/* 导航区域 */
.footer-nav {
  display: flex;
  gap: var(--spacing-xl);
}

.nav-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  min-width: 120px;
}

.nav-title {
  font-family: var(--font-family-mono);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--secondary-color);
  margin-bottom: var(--spacing-xs);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.nav-link {
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.85rem;
  transition: all var(--transition-normal) ease;
  padding: var(--spacing-xs) 0;
}

.nav-link:hover {
  color: var(--accent-color);
  padding-left: var(--spacing-xs);
}

.tech-item {
  color: #94a3b8;
  font-size: 0.85rem;
  padding: var(--spacing-xs) 0;
  cursor: default;
  transition: color var(--transition-normal) ease;
}

.tech-item:hover {
  color: var(--primary-color);
}

/* 底部信息 */
.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-lg) 0;
}

.copyright {
  color: #64748b;
  font-size: 0.85rem;
  font-family: var(--font-family-mono);
}

.tech-info {
  display: flex;
  gap: var(--spacing-sm);
}

.tech-badge {
  padding: var(--spacing-xs) var(--spacing-sm);
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 4px;
  font-size: 0.75rem;
  font-family: var(--font-family-mono);
  color: var(--primary-color);
  transition: all var(--transition-normal) ease;
}

.tech-badge:hover {
  background: rgba(99, 102, 241, 0.2);
  border-color: var(--primary-color);
  transform: scale(1.05);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
    padding: var(--spacing-xl) 0;
  }
  
  .footer-nav {
    gap: var(--spacing-lg);
  }
  
  .nav-group {
    min-width: 100px;
  }
  
  .footer-bottom {
    flex-direction: column;
    gap: var(--spacing-md);
    text-align: center;
  }
  
  .social-links {
    justify-content: center;
    flex-wrap: wrap;
  }
}

@media (max-width: 480px) {
  .footer-nav {
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  .tech-info {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>