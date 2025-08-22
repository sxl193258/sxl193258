<template>
  <div class="home">
    <!-- 英雄区域 -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">
              <span class="typing-text" ref="typingText"></span>
              <span class="cursor">|</span>
            </h1>
            <p class="hero-description">
              专注于前端技术分享，探索现代Web开发的无限可能
            </p>
            <div class="hero-actions">
              <router-link to="/posts" class="btn btn-primary">
                <i class="fas fa-rocket"></i>
                开始探索
              </router-link>
              <router-link to="/about" class="btn btn-outline">
                <i class="fas fa-user"></i>
                了解更多
              </router-link>
            </div>
          </div>
          
          <div class="hero-visual">
            <div class="tech-cube">
              <div class="cube-face front"></div>
              <div class="cube-face back"></div>
              <div class="cube-face right"></div>
              <div class="cube-face left"></div>
              <div class="cube-face top"></div>
              <div class="cube-face bottom"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 特色区域 -->
    <section class="features">
      <div class="container">
        <h2 class="section-title">技术特色</h2>
        <div class="features-grid">
          <div 
            v-for="(feature, index) in features" 
            :key="index"
            class="feature-card"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="feature-icon">
              <i :class="feature.icon"></i>
            </div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-description">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 最新文章 -->
    <section class="latest-posts">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">最新文章</h2>
          <router-link to="/posts" class="view-all-link">
            查看全部 <i class="fas fa-arrow-right"></i>
          </router-link>
        </div>
        
        <div class="posts-grid">
          <article 
            v-for="(post, index) in latestPosts" 
            :key="index"
            class="post-card"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="post-header">
              <span class="post-date">{{ post.date }}</span>
              <div class="post-tags">
                <span 
                  v-for="tag in post.tags" 
                  :key="tag"
                  class="post-tag"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
            
            <h3 class="post-title">
              <router-link :to="`/post/${post.slug}`">
                {{ post.title }}
              </router-link>
            </h3>
            
            <p class="post-excerpt">{{ post.excerpt }}</p>
            
            <div class="post-footer">
              <router-link :to="`/post/${post.slug}`" class="read-more">
                阅读更多 <i class="fas fa-chevron-right"></i>
              </router-link>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'

export default {
  name: 'Home',
  setup() {
    const typingText = ref(null)
    
    const features = [
      {
        icon: 'fas fa-code',
        title: '现代前端',
        description: 'Vue 3, React, TypeScript 等现代前端技术深度解析'
      },
      {
        icon: 'fas fa-mobile-alt',
        title: '响应式设计',
        description: '移动优先的响应式设计理念和最佳实践'
      },
      {
        icon: 'fas fa-rocket',
        title: '性能优化',
        description: 'Web性能优化技巧和工程化解决方案'
      },
      {
        icon: 'fas fa-brain',
        title: 'AI集成',
        description: '前端与AI技术结合的创新应用探索'
      }
    ]
    
    const latestPosts = [
      {
        slug: 'vue3-composition-api',
        title: 'Vue 3 Composition API 深度解析',
        excerpt: '深入理解 Vue 3 Composition API 的设计理念和使用技巧，提升代码复用性和维护性。',
        date: '2024-12-20',
        tags: ['Vue 3', 'JavaScript']
      },
      {
        slug: 'typescript-advanced',
        title: 'TypeScript 高级类型系统',
        excerpt: '探索 TypeScript 的高级类型特性，构建类型安全的大型应用。',
        date: '2024-12-18',
        tags: ['TypeScript', '类型系统']
      },
      {
        slug: 'web-performance',
        title: 'Web 性能优化最佳实践',
        excerpt: '从加载速度到运行时性能，全方位提升Web应用的用户体验。',
        date: '2024-12-15',
        tags: ['性能优化', 'Web']
      }
    ]
    
    const initTypingAnimation = () => {
      const texts = [
        'sxl193258的技术博客',
        'Frontend Developer',
        'Tech Enthusiast',
        '代码改变世界'
      ]
      
      let textIndex = 0
      let charIndex = 0
      let isDeleting = false
      
      const typeWriter = () => {
        const currentText = texts[textIndex]
        const displayText = isDeleting 
          ? currentText.substring(0, charIndex - 1)
          : currentText.substring(0, charIndex + 1)
        
        if (typingText.value) {
          typingText.value.textContent = displayText
        }
        
        if (!isDeleting && charIndex === currentText.length) {
          setTimeout(() => {
            isDeleting = true
          }, 2000)
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false
          textIndex = (textIndex + 1) % texts.length
        }
        
        charIndex += isDeleting ? -1 : 1
        
        const speed = isDeleting ? 50 : 100
        setTimeout(typeWriter, speed)
      }
      
      typeWriter()
    }
    
    onMounted(() => {
      initTypingAnimation()
    })
    
    return {
      typingText,
      features,
      latestPosts
    }
  }
}
</script>

<style scoped>
.home {
  padding-top: 80px;
}

/* 英雄区域 */
.hero {
  min-height: 80vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-2xl);
  align-items: center;
}

.hero-text {
  z-index: 2;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: var(--spacing-lg);
  min-height: 120px;
}

.typing-text {
  display: inline-block;
}

.cursor {
  color: var(--primary-color);
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.hero-description {
  font-size: 1.2rem;
  color: #94a3b8;
  margin-bottom: var(--spacing-xl);
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: var(--spacing-lg);
  flex-wrap: wrap;
}

/* 3D立方体 */
.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
}

.tech-cube {
  width: 200px;
  height: 200px;
  position: relative;
  transform-style: preserve-3d;
  animation: rotateCube 20s infinite linear;
}

.cube-face {
  position: absolute;
  width: 200px;
  height: 200px;
  background: var(--gradient-card);
  border: 2px solid var(--primary-color);
  backdrop-filter: blur(10px);
  opacity: 0.8;
}

.front { transform: rotateY(0deg) translateZ(100px); }
.back { transform: rotateY(180deg) translateZ(100px); }
.right { transform: rotateY(90deg) translateZ(100px); }
.left { transform: rotateY(-90deg) translateZ(100px); }
.top { transform: rotateX(90deg) translateZ(100px); }
.bottom { transform: rotateX(-90deg) translateZ(100px); }

@keyframes rotateCube {
  0% { transform: rotateX(0) rotateY(0); }
  100% { transform: rotateX(360deg) rotateY(360deg); }
}

/* 特色区域 */
.features {
  padding: var(--spacing-2xl) 0;
  background: rgba(0, 0, 0, 0.2);
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: var(--spacing-2xl);
  color: var(--primary-color);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-xl);
}

.feature-card {
  text-align: center;
  padding: var(--spacing-xl);
  background: var(--gradient-card);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 12px;
  transition: all var(--transition-normal) ease;
  animation: slideUp 0.6s ease-out both;
}

.feature-card:hover {
  transform: translateY(-10px);
  border-color: var(--primary-color);
  box-shadow: var(--shadow-neon);
}

.feature-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto var(--spacing-lg);
  background: var(--gradient-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  box-shadow: var(--shadow-neon);
}

.feature-title {
  font-size: 1.3rem;
  color: var(--secondary-color);
  margin-bottom: var(--spacing-sm);
}

.feature-description {
  color: #94a3b8;
  line-height: 1.6;
}

/* 最新文章 */
.latest-posts {
  padding: var(--spacing-2xl) 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-2xl);
}

.view-all-link {
  color: var(--accent-color);
  text-decoration: none;
  font-weight: 500;
  transition: all var(--transition-normal) ease;
}

.view-all-link:hover {
  color: var(--primary-color);
  transform: translateX(5px);
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--spacing-xl);
}

.post-card {
  background: var(--gradient-card);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 12px;
  padding: var(--spacing-lg);
  transition: all var(--transition-normal) ease;
  animation: slideUp 0.6s ease-out both;
}

.post-card:hover {
  transform: translateY(-5px);
  border-color: var(--primary-color);
  box-shadow: var(--shadow-neon);
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.post-date {
  font-size: 0.85rem;
  color: #64748b;
  font-family: var(--font-family-mono);
}

.post-tags {
  display: flex;
  gap: var(--spacing-xs);
}

.post-tag {
  padding: var(--spacing-xs) var(--spacing-sm);
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 4px;
  font-size: 0.75rem;
  color: var(--primary-color);
}

.post-title {
  margin-bottom: var(--spacing-md);
}

.post-title a {
  color: #f8fafc;
  text-decoration: none;
  font-size: 1.3rem;
  font-weight: 600;
  transition: color var(--transition-normal) ease;
}

.post-title a:hover {
  color: var(--primary-color);
}

.post-excerpt {
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: var(--spacing-lg);
}

.post-footer {
  text-align: right;
}

.read-more {
  color: var(--accent-color);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all var(--transition-normal) ease;
}

.read-more:hover {
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
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: var(--spacing-xl);
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .tech-cube {
    width: 150px;
    height: 150px;
  }
  
  .cube-face {
    width: 150px;
    height: 150px;
  }
  
  .front, .back { transform: rotateY(0deg) translateZ(75px); }
  .right { transform: rotateY(90deg) translateZ(75px); }
  .left { transform: rotateY(-90deg) translateZ(75px); }
  .top { transform: rotateX(90deg) translateZ(75px); }
  .bottom { transform: rotateX(-90deg) translateZ(75px); }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .posts-grid {
    grid-template-columns: 1fr;
  }
  
  .section-header {
    flex-direction: column;
    gap: var(--spacing-md);
    text-align: center;
  }
}
</style>