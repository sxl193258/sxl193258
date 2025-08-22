<template>
  <div class="tags-page">
    <div class="container">
      <!-- 页面标题 -->
      <div class="page-header">
        <h1 class="page-title">标签分类</h1>
        <p class="page-description">
          按技术标签浏览文章，快速找到感兴趣的内容
        </p>
      </div>
      
      <!-- 标签云 -->
      <section class="tag-cloud-section">
        <div class="tag-cloud">
          <span 
            v-for="tag in tagsWithCount" 
            :key="tag.name"
            :class="['tag-item', `tag-size-${getTagSize(tag.count)}`]"
            :style="getTagStyle(tag.count)"
            @click="selectTag(tag.name)"
          >
            {{ tag.name }}
            <span class="tag-count">{{ tag.count }}</span>
          </span>
        </div>
      </section>
      
      <!-- 选中的标签 -->
      <div v-if="selectedTag" class="selected-tag-section">
        <div class="selected-tag-header">
          <h2 class="selected-tag-title">
            标签: <span class="tag-name">{{ selectedTag }}</span>
          </h2>
          <button @click="clearSelection" class="clear-btn">
            <i class="fas fa-times"></i>
            清除选择
          </button>
        </div>
        
        <!-- 标签相关的文章 -->
        <div class="tag-posts">
          <article 
            v-for="post in filteredPosts" 
            :key="post.slug"
            class="post-card"
          >
            <div class="post-meta">
              <span class="post-date">
                <i class="fas fa-calendar"></i>
                {{ post.date }}
              </span>
              <span class="reading-time">
                <i class="fas fa-clock"></i>
                {{ post.readingTime }}分钟
              </span>
            </div>
            
            <h3 class="post-title">
              <router-link :to="`/post/${post.slug}`">
                {{ post.title }}
              </router-link>
            </h3>
            
            <p class="post-excerpt">{{ post.excerpt }}</p>
            
            <div class="post-tags">
              <span 
                v-for="tag in post.tags" 
                :key="tag"
                :class="['post-tag', { active: tag === selectedTag }]"
                @click="selectTag(tag)"
              >
                {{ tag }}
              </span>
            </div>
          </article>
        </div>
      </div>
      
      <!-- 未选择标签时的状态 -->
      <div v-else class="no-selection">
        <div class="stats-overview">
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-number">{{ totalPosts }}</div>
              <div class="stat-label">总文章数</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">{{ totalTags }}</div>
              <div class="stat-label">标签数量</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">{{ mostUsedTag?.count || 0 }}</div>
              <div class="stat-label">最多使用</div>
            </div>
          </div>
        </div>
        
        <!-- 标签分类 -->
        <div class="tag-categories">
          <div 
            v-for="category in tagCategories" 
            :key="category.name"
            class="tag-category"
          >
            <h3 class="category-title">
              <i :class="category.icon"></i>
              {{ category.name }}
            </h3>
            <div class="category-tags">
              <span 
                v-for="tag in category.tags" 
                :key="tag.name"
                class="category-tag"
                @click="selectTag(tag.name)"
              >
                {{ tag.name }}
                <span class="tag-count">{{ tag.count }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'Tags',
  setup() {
    const selectedTag = ref('')
    
    // 模拟文章数据
    const allPosts = [
      {
        slug: 'vue3-composition-api',
        title: 'Vue 3 Composition API 深度解析',
        excerpt: '深入理解 Vue 3 Composition API 的设计理念和使用技巧',
        date: '2024-12-20',
        tags: ['Vue 3', 'JavaScript', 'Composition API'],
        readingTime: 8
      },
      {
        slug: 'typescript-advanced',
        title: 'TypeScript 高级类型系统',
        excerpt: '探索 TypeScript 的高级类型特性，构建类型安全的大型应用',
        date: '2024-12-18',
        tags: ['TypeScript', '类型系统', '前端工程化'],
        readingTime: 12
      },
      {
        slug: 'web-performance',
        title: 'Web 性能优化最佳实践',
        excerpt: '从加载速度到运行时性能，全方位提升Web应用的用户体验',
        date: '2024-12-15',
        tags: ['性能优化', 'Web', '用户体验'],
        readingTime: 10
      },
      {
        slug: 'react-hooks-patterns',
        title: 'React Hooks 设计模式',
        excerpt: 'React Hooks 的常见设计模式和最佳实践',
        date: '2024-12-12',
        tags: ['React', 'Hooks', '设计模式'],
        readingTime: 9
      },
      {
        slug: 'css-grid-layout',
        title: 'CSS Grid 布局完全指南',
        excerpt: 'CSS Grid 布局的完整学习指南，从基础概念到高级技巧',
        date: '2024-12-10',
        tags: ['CSS', '布局', 'Grid'],
        readingTime: 7
      },
      {
        slug: 'javascript-async-programming',
        title: 'JavaScript 异步编程进阶',
        excerpt: '深入理解JavaScript异步编程模型',
        date: '2024-12-08',
        tags: ['JavaScript', '异步编程', 'Promise'],
        readingTime: 11
      }
    ]
    
    // 计算标签统计
    const tagsWithCount = computed(() => {
      const tagMap = new Map()
      
      allPosts.forEach(post => {
        post.tags.forEach(tag => {
          tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
        })
      })
      
      return Array.from(tagMap.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
    })
    
    // 总文章数
    const totalPosts = computed(() => allPosts.length)
    
    // 总标签数
    const totalTags = computed(() => tagsWithCount.value.length)
    
    // 最多使用的标签
    const mostUsedTag = computed(() => tagsWithCount.value[0])
    
    // 根据标签筛选的文章
    const filteredPosts = computed(() => {
      if (!selectedTag.value) return allPosts
      return allPosts.filter(post => post.tags.includes(selectedTag.value))
    })
    
    // 标签分类
    const tagCategories = computed(() => {
      const categories = [
        {
          name: '前端框架',
          icon: 'fab fa-vuejs',
          keywords: ['Vue', 'React', 'Angular', 'Svelte']
        },
        {
          name: '编程语言',
          icon: 'fas fa-code',
          keywords: ['JavaScript', 'TypeScript', 'Python', 'Go']
        },
        {
          name: '样式技术',
          icon: 'fab fa-css3-alt',
          keywords: ['CSS', '布局', 'Sass', 'Tailwind']
        },
        {
          name: '开发工具',
          icon: 'fas fa-tools',
          keywords: ['Webpack', 'Vite', 'Git', '工程化']
        },
        {
          name: '其他技术',
          icon: 'fas fa-layer-group',
          keywords: ['性能优化', '设计模式', '用户体验', 'Promise', 'Hooks', 'API']
        }
      ]
      
      return categories.map(category => ({
        ...category,
        tags: tagsWithCount.value.filter(tag => 
          category.keywords.some(keyword => 
            tag.name.toLowerCase().includes(keyword.toLowerCase())
          )
        )
      })).filter(category => category.tags.length > 0)
    })
    
    // 获取标签大小等级
    const getTagSize = (count) => {
      const max = Math.max(...tagsWithCount.value.map(t => t.count))
      const ratio = count / max
      
      if (ratio >= 0.8) return 5
      if (ratio >= 0.6) return 4
      if (ratio >= 0.4) return 3
      if (ratio >= 0.2) return 2
      return 1
    }
    
    // 获取标签样式
    const getTagStyle = (count) => {
      const max = Math.max(...tagsWithCount.value.map(t => t.count))
      const ratio = count / max
      const opacity = 0.6 + (ratio * 0.4)
      
      return {
        opacity: opacity.toString()
      }
    }
    
    // 选择标签
    const selectTag = (tag) => {
      selectedTag.value = tag
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    
    // 清除选择
    const clearSelection = () => {
      selectedTag.value = ''
    }
    
    return {
      selectedTag,
      allPosts,
      tagsWithCount,
      totalPosts,
      totalTags,
      mostUsedTag,
      filteredPosts,
      tagCategories,
      getTagSize,
      getTagStyle,
      selectTag,
      clearSelection
    }
  }
}
</script>

<style scoped>
.tags-page {
  padding-top: 100px;
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.page-title {
  font-size: 3rem;
  margin-bottom: var(--spacing-md);
  background: var(--gradient-primary);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.page-description {
  font-size: 1.2rem;
  color: #94a3b8;
  max-width: 600px;
  margin: 0 auto;
}

/* 标签云 */
.tag-cloud-section {
  margin-bottom: var(--spacing-2xl);
  padding: var(--spacing-xl);
  background: var(--gradient-card);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.tag-item {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 20px;
  color: var(--primary-color);
  cursor: pointer;
  transition: all var(--transition-normal) ease;
  font-family: var(--font-family-mono);
  position: relative;
  overflow: hidden;
}

.tag-item::before {
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

.tag-item:hover::before {
  left: 0;
}

.tag-item:hover {
  border-color: var(--primary-color);
  transform: scale(1.1);
  box-shadow: var(--shadow-neon);
}

.tag-size-1 { font-size: 0.8rem; }
.tag-size-2 { font-size: 0.9rem; }
.tag-size-3 { font-size: 1rem; }
.tag-size-4 { font-size: 1.1rem; }
.tag-size-5 { font-size: 1.2rem; font-weight: 600; }

.tag-count {
  background: rgba(99, 102, 241, 0.2);
  border-radius: 10px;
  padding: 2px 6px;
  font-size: 0.7rem;
  color: var(--accent-color);
}

/* 选中标签区域 */
.selected-tag-section {
  margin-bottom: var(--spacing-2xl);
}

.selected-tag-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-lg);
  background: var(--gradient-card);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 12px;
}

.selected-tag-title {
  margin: 0;
  color: #f8fafc;
}

.tag-name {
  color: var(--primary-color);
  font-family: var(--font-family-mono);
}

.clear-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 6px;
  color: #ef4444;
  cursor: pointer;
  transition: all var(--transition-normal) ease;
  font-size: 0.9rem;
}

.clear-btn:hover {
  background: rgba(239, 68, 68, 0.2);
  border-color: #ef4444;
}

/* 标签文章列表 */
.tag-posts {
  display: grid;
  gap: var(--spacing-lg);
}

.post-card {
  background: var(--gradient-card);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 12px;
  padding: var(--spacing-lg);
  transition: all var(--transition-normal) ease;
}

.post-card:hover {
  transform: translateY(-3px);
  border-color: var(--primary-color);
  box-shadow: var(--shadow-neon);
}

.post-meta {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-sm);
  font-size: 0.85rem;
  color: #64748b;
  font-family: var(--font-family-mono);
}

.post-meta i {
  margin-right: var(--spacing-xs);
  color: var(--accent-color);
}

.post-title {
  margin-bottom: var(--spacing-sm);
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
  margin-bottom: var(--spacing-md);
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.post-tag {
  padding: var(--spacing-xs) var(--spacing-sm);
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 4px;
  font-size: 0.75rem;
  color: var(--primary-color);
  cursor: pointer;
  transition: all var(--transition-normal) ease;
}

.post-tag:hover,
.post-tag.active {
  background: rgba(99, 102, 241, 0.2);
  border-color: var(--primary-color);
}

/* 未选择状态 */
.no-selection {
  margin-bottom: var(--spacing-2xl);
}

.stats-overview {
  margin-bottom: var(--spacing-2xl);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--spacing-lg);
  max-width: 600px;
  margin: 0 auto;
}

.stat-item {
  text-align: center;
  padding: var(--spacing-lg);
  background: var(--gradient-card);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 12px;
  transition: all var(--transition-normal) ease;
}

.stat-item:hover {
  transform: translateY(-3px);
  border-color: var(--primary-color);
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
  font-family: var(--font-family-mono);
}

.stat-label {
  color: #64748b;
  font-size: 0.9rem;
  margin-top: var(--spacing-xs);
}

/* 标签分类 */
.tag-categories {
  display: grid;
  gap: var(--spacing-xl);
}

.tag-category {
  background: var(--gradient-card);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 12px;
  padding: var(--spacing-xl);
  transition: all var(--transition-normal) ease;
}

.tag-category:hover {
  border-color: var(--primary-color);
}

.category-title {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  color: var(--secondary-color);
}

.category-title i {
  font-size: 1.2rem;
  color: var(--primary-color);
}

.category-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.category-tag {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background: rgba(15, 15, 35, 0.8);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 6px;
  color: var(--primary-color);
  cursor: pointer;
  transition: all var(--transition-normal) ease;
  font-size: 0.9rem;
}

.category-tag:hover {
  background: rgba(99, 102, 241, 0.1);
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

.category-tag .tag-count {
  background: rgba(99, 102, 241, 0.2);
  border-radius: 8px;
  padding: 1px 5px;
  font-size: 0.7rem;
  color: var(--accent-color);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .selected-tag-header {
    flex-direction: column;
    gap: var(--spacing-md);
    text-align: center;
  }
  
  .post-meta {
    flex-direction: column;
    gap: var(--spacing-xs);
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .tag-cloud {
    justify-content: flex-start;
  }
  
  .category-tags {
    justify-content: flex-start;
  }
}
</style>