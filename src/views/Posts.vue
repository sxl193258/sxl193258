<template>
  <div class="posts-page">
    <div class="container">
      <!-- 页面标题 -->
      <div class="page-header">
        <h1 class="page-title">技术文章</h1>
        <p class="page-description">
          探索前端技术的深度文章和实践经验分享
        </p>
      </div>
      
      <!-- 搜索和筛选 -->
      <div class="posts-filters">
        <div class="search-box">
          <i class="fas fa-search"></i>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="搜索文章..."
            class="search-input"
            @input="filterPosts"
          >
        </div>
        
        <div class="filter-tags">
          <button 
            :class="['tag-filter', { active: selectedTag === '' }]"
            @click="setTagFilter('')"
          >
            全部
          </button>
          <button 
            v-for="tag in availableTags" 
            :key="tag"
            :class="['tag-filter', { active: selectedTag === tag }]"
            @click="setTagFilter(tag)"
          >
            {{ tag }}
          </button>
        </div>
      </div>
      
      <!-- 文章列表 -->
      <div class="posts-list">
        <transition-group name="post-list" tag="div">
          <article 
            v-for="post in filteredPosts" 
            :key="post.slug"
            class="post-item"
          >
            <div class="post-meta">
              <span class="post-date">
                <i class="fas fa-calendar"></i>
                {{ post.date }}
              </span>
              <span class="reading-time">
                <i class="fas fa-clock"></i>
                {{ post.readingTime }}分钟阅读
              </span>
            </div>
            
            <h2 class="post-title">
              <router-link :to="`/post/${post.slug}`">
                {{ post.title }}
              </router-link>
            </h2>
            
            <p class="post-excerpt">{{ post.excerpt }}</p>
            
            <div class="post-tags">
              <span 
                v-for="tag in post.tags" 
                :key="tag"
                class="post-tag"
                @click="setTagFilter(tag)"
              >
                {{ tag }}
              </span>
            </div>
            
            <div class="post-footer">
              <router-link :to="`/post/${post.slug}`" class="read-more-btn">
                阅读全文 <i class="fas fa-arrow-right"></i>
              </router-link>
            </div>
          </article>
        </transition-group>
        
        <!-- 空状态 -->
        <div v-if="filteredPosts.length === 0" class="empty-state">
          <i class="fas fa-search"></i>
          <h3>没有找到相关文章</h3>
          <p>尝试调整搜索条件或浏览其他标签</p>
        </div>
      </div>
      
      <!-- 分页（如果需要） -->
      <div v-if="totalPages > 1" class="pagination">
        <button 
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
          class="page-btn"
        >
          <i class="fas fa-chevron-left"></i>
        </button>
        
        <span 
          v-for="page in totalPages" 
          :key="page"
          :class="['page-number', { active: page === currentPage }]"
          @click="changePage(page)"
        >
          {{ page }}
        </span>
        
        <button 
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
          class="page-btn"
        >
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'

export default {
  name: 'Posts',
  setup() {
    const searchQuery = ref('')
    const selectedTag = ref('')
    const currentPage = ref(1)
    const postsPerPage = 6
    
    // 模拟文章数据
    const allPosts = ref([
      {
        slug: 'vue3-composition-api',
        title: 'Vue 3 Composition API 深度解析',
        excerpt: '深入理解 Vue 3 Composition API 的设计理念和使用技巧，提升代码复用性和维护性。探索响应式系统的新特性。',
        date: '2024-12-20',
        tags: ['Vue 3', 'JavaScript', 'Composition API'],
        readingTime: 8
      },
      {
        slug: 'typescript-advanced',
        title: 'TypeScript 高级类型系统',
        excerpt: '探索 TypeScript 的高级类型特性，构建类型安全的大型应用。包括泛型、条件类型、映射类型等高级概念。',
        date: '2024-12-18',
        tags: ['TypeScript', '类型系统', '前端工程化'],
        readingTime: 12
      },
      {
        slug: 'web-performance',
        title: 'Web 性能优化最佳实践',
        excerpt: '从加载速度到运行时性能，全方位提升Web应用的用户体验。涵盖网络优化、代码分割、懒加载等技术。',
        date: '2024-12-15',
        tags: ['性能优化', 'Web', '用户体验'],
        readingTime: 10
      },
      {
        slug: 'react-hooks-patterns',
        title: 'React Hooks 设计模式',
        excerpt: 'React Hooks 的常见设计模式和最佳实践，提升组件复用性和代码质量。包括自定义Hooks的设计技巧。',
        date: '2024-12-12',
        tags: ['React', 'Hooks', '设计模式'],
        readingTime: 9
      },
      {
        slug: 'css-grid-layout',
        title: 'CSS Grid 布局完全指南',
        excerpt: 'CSS Grid 布局的完整学习指南，从基础概念到高级技巧。掌握现代Web布局的强大工具。',
        date: '2024-12-10',
        tags: ['CSS', '布局', 'Grid'],
        readingTime: 7
      },
      {
        slug: 'javascript-async-programming',
        title: 'JavaScript 异步编程进阶',
        excerpt: '深入理解JavaScript异步编程模型，从Promise到async/await，再到并发控制和错误处理。',
        date: '2024-12-08',
        tags: ['JavaScript', '异步编程', 'Promise'],
        readingTime: 11
      }
    ])
    
    // 可用标签
    const availableTags = computed(() => {
      const tags = new Set()
      allPosts.value.forEach(post => {
        post.tags.forEach(tag => tags.add(tag))
      })
      return Array.from(tags).sort()
    })
    
    // 过滤后的文章
    const filteredPosts = computed(() => {
      let posts = allPosts.value
      
      // 按标签过滤
      if (selectedTag.value) {
        posts = posts.filter(post => post.tags.includes(selectedTag.value))
      }
      
      // 按搜索关键词过滤
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        posts = posts.filter(post => 
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some(tag => tag.toLowerCase().includes(query))
        )
      }
      
      // 分页
      const start = (currentPage.value - 1) * postsPerPage
      const end = start + postsPerPage
      
      return posts.slice(start, end)
    })
    
    // 总页数
    const totalPages = computed(() => {
      let posts = allPosts.value
      
      if (selectedTag.value) {
        posts = posts.filter(post => post.tags.includes(selectedTag.value))
      }
      
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        posts = posts.filter(post => 
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some(tag => tag.toLowerCase().includes(query))
        )
      }
      
      return Math.ceil(posts.length / postsPerPage)
    })
    
    // 设置标签过滤
    const setTagFilter = (tag) => {
      selectedTag.value = tag
      currentPage.value = 1
    }
    
    // 过滤文章
    const filterPosts = () => {
      currentPage.value = 1
    }
    
    // 切换页面
    const changePage = (page) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
    
    return {
      searchQuery,
      selectedTag,
      currentPage,
      allPosts,
      availableTags,
      filteredPosts,
      totalPages,
      setTagFilter,
      filterPosts,
      changePage
    }
  }
}
</script>

<style scoped>
.posts-page {
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

/* 搜索和筛选 */
.posts-filters {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
  padding: var(--spacing-xl);
  background: var(--gradient-card);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.search-box {
  position: relative;
  max-width: 400px;
  margin: 0 auto;
}

.search-box i {
  position: absolute;
  left: var(--spacing-md);
  top: 50%;
  transform: translateY(-50%);
  color: var(--primary-color);
}

.search-input {
  width: 100%;
  padding: var(--spacing-md) var(--spacing-md) var(--spacing-md) var(--spacing-2xl);
  background: rgba(15, 15, 35, 0.8);
  border: 2px solid rgba(99, 102, 241, 0.3);
  border-radius: 8px;
  color: #f8fafc;
  font-family: var(--font-family-mono);
  font-size: 0.9rem;
  transition: all var(--transition-normal) ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: var(--shadow-neon);
}

.search-input::placeholder {
  color: #64748b;
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  justify-content: center;
}

.tag-filter {
  padding: var(--spacing-sm) var(--spacing-md);
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 20px;
  color: var(--primary-color);
  font-family: var(--font-family-mono);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all var(--transition-normal) ease;
}

.tag-filter:hover,
.tag-filter.active {
  background: var(--gradient-primary);
  color: white;
  transform: scale(1.05);
  box-shadow: var(--shadow-neon);
}

/* 文章列表 */
.posts-list {
  display: grid;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-2xl);
}

.post-item {
  background: var(--gradient-card);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 12px;
  padding: var(--spacing-xl);
  transition: all var(--transition-normal) ease;
  position: relative;
  overflow: hidden;
}

.post-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gradient-primary);
  opacity: 0;
  transition: opacity var(--transition-normal) ease;
}

.post-item:hover {
  transform: translateY(-5px);
  border-color: var(--primary-color);
  box-shadow: var(--shadow-neon);
}

.post-item:hover::before {
  opacity: 1;
}

.post-meta {
  display: flex;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
  font-size: 0.85rem;
  color: #64748b;
  font-family: var(--font-family-mono);
}

.post-meta i {
  margin-right: var(--spacing-xs);
  color: var(--accent-color);
}

.post-title {
  margin-bottom: var(--spacing-md);
}

.post-title a {
  color: #f8fafc;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.3;
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

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-lg);
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

.post-tag:hover {
  background: rgba(99, 102, 241, 0.2);
  transform: scale(1.05);
}

.post-footer {
  text-align: right;
}

.read-more-btn {
  color: var(--accent-color);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all var(--transition-normal) ease;
}

.read-more-btn:hover {
  color: var(--primary-color);
  transform: translateX(5px);
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: var(--spacing-2xl);
  color: #64748b;
}

.empty-state i {
  font-size: 3rem;
  margin-bottom: var(--spacing-lg);
  color: var(--primary-color);
  opacity: 0.5;
}

.empty-state h3 {
  margin-bottom: var(--spacing-md);
  color: #94a3b8;
}

/* 分页 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-sm);
}

.page-btn,
.page-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--gradient-card);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 8px;
  color: var(--primary-color);
  cursor: pointer;
  transition: all var(--transition-normal) ease;
  font-family: var(--font-family-mono);
  font-size: 0.9rem;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-number.active,
.page-btn:hover:not(:disabled),
.page-number:hover {
  background: var(--gradient-primary);
  color: white;
  box-shadow: var(--shadow-neon);
}

/* 动画 */
.post-list-enter-active,
.post-list-leave-active {
  transition: all var(--transition-normal) ease;
}

.post-list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.post-list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.post-list-move {
  transition: transform var(--transition-normal) ease;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .posts-filters {
    padding: var(--spacing-lg);
  }
  
  .filter-tags {
    justify-content: flex-start;
  }
  
  .post-meta {
    flex-direction: column;
    gap: var(--spacing-xs);
  }
  
  .post-title a {
    font-size: 1.3rem;
  }
  
  .pagination {
    flex-wrap: wrap;
  }
}
</style>