<template>
  <div class="post-page">
    <div class="container">
      <article v-if="post" class="post-article">
        <!-- 文章头部 -->
        <header class="post-header">
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
          
          <h1 class="post-title">{{ post.title }}</h1>
          
          <div class="post-tags">
            <router-link 
              v-for="tag in post.tags" 
              :key="tag"
              :to="`/posts?tag=${tag}`"
              class="post-tag"
            >
              {{ tag }}
            </router-link>
          </div>
        </header>
        
        <!-- 文章内容 -->
        <div class="post-content" v-html="renderedContent"></div>
        
        <!-- 文章底部 -->
        <footer class="post-footer">
          <div class="post-actions">
            <button class="action-btn" @click="sharePost">
              <i class="fas fa-share-alt"></i>
              分享文章
            </button>
            <button class="action-btn" @click="toggleBookmark">
              <i :class="['fas', isBookmarked ? 'fa-bookmark' : 'fa-bookmark-o']"></i>
              {{ isBookmarked ? '已收藏' : '收藏' }}
            </button>
          </div>
          
          <!-- 导航到上一篇/下一篇 -->
          <nav class="post-navigation">
            <router-link 
              v-if="prevPost" 
              :to="`/post/${prevPost.slug}`"
              class="nav-link prev"
            >
              <i class="fas fa-chevron-left"></i>
              <div>
                <span class="nav-label">上一篇</span>
                <span class="nav-title">{{ prevPost.title }}</span>
              </div>
            </router-link>
            
            <router-link 
              v-if="nextPost" 
              :to="`/post/${nextPost.slug}`"
              class="nav-link next"
            >
              <div>
                <span class="nav-label">下一篇</span>
                <span class="nav-title">{{ nextPost.title }}</span>
              </div>
              <i class="fas fa-chevron-right"></i>
            </router-link>
          </nav>
        </footer>
      </article>
      
      <!-- 加载状态 -->
      <div v-else-if="loading" class="loading-state">
        <div class="loading"></div>
        <p>加载中...</p>
      </div>
      
      <!-- 文章未找到 -->
      <div v-else class="not-found">
        <i class="fas fa-file-alt"></i>
        <h2>文章未找到</h2>
        <p>您要查看的文章不存在或已被删除</p>
        <router-link to="/posts" class="btn btn-primary">
          返回文章列表
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { renderMarkdown } from '../utils/markdown'

export default {
  name: 'Post',
  setup() {
    const route = useRoute()
    const post = ref(null)
    const loading = ref(true)
    const isBookmarked = ref(false)
    
    // 模拟文章数据
    const allPosts = [
      {
        slug: 'vue3-composition-api',
        title: 'Vue 3 Composition API 深度解析',
        date: '2024-12-20',
        tags: ['Vue 3', 'JavaScript', 'Composition API'],
        readingTime: 8,
        content: `# Vue 3 Composition API 深度解析

## 前言

Vue 3 引入了全新的 Composition API，这是一个重要的特性更新，它为我们提供了更好的逻辑复用、类型推导以及更灵活的组件组织方式。

## 什么是 Composition API

Composition API 是一种基于函数的 API，它允许我们将组件的逻辑按功能进行组织，而不是按选项类型（data、methods、computed等）进行组织。

\`\`\`javascript
import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    // 响应式数据
    const count = ref(0)
    
    // 计算属性
    const doubleCount = computed(() => count.value * 2)
    
    // 方法
    const increment = () => {
      count.value++
    }
    
    // 生命周期
    onMounted(() => {
      console.log('组件已挂载')
    })
    
    return {
      count,
      doubleCount,
      increment
    }
  }
}
\`\`\`

## 核心概念

### 1. ref 和 reactive

\`ref\` 用于创建基本类型的响应式数据：

\`\`\`javascript
const count = ref(0)
const name = ref('Hello')
\`\`\`

\`reactive\` 用于创建对象的响应式数据：

\`\`\`javascript
const state = reactive({
  count: 0,
  name: 'Hello'
})
\`\`\`

### 2. computed

计算属性的使用方式：

\`\`\`javascript
const doubleCount = computed(() => count.value * 2)

// 可写的计算属性
const fullName = computed({
  get() {
    return firstName.value + ' ' + lastName.value
  },
  set(value) {
    [firstName.value, lastName.value] = value.split(' ')
  }
})
\`\`\`

## 与Options API的对比

| 特性 | Options API | Composition API |
|------|-------------|-----------------|
| 逻辑组织 | 按选项类型 | 按功能特性 |
| 代码复用 | Mixin | Composables |
| TypeScript支持 | 有限 | 完整 |
| 学习曲线 | 平缓 | 较陡 |

## 最佳实践

1. **按功能组织代码**: 将相关的逻辑放在一起
2. **创建可复用的组合函数**: 提取通用逻辑
3. **合理使用ref和reactive**: 选择合适的响应式API
4. **保持setup函数简洁**: 避免过于复杂的逻辑

## 总结

Composition API 为Vue 3带来了更强大的组合能力和更好的TypeScript支持。虽然学习曲线相对陡峭，但它提供的灵活性和可维护性使其成为大型项目的理想选择。

> 记住：Options API 在Vue 3中仍然完全支持，你可以根据项目需求选择合适的API风格。`
      },
      {
        slug: 'typescript-advanced',
        title: 'TypeScript 高级类型系统',
        date: '2024-12-18',
        tags: ['TypeScript', '类型系统', '前端工程化'],
        readingTime: 12,
        content: `# TypeScript 高级类型系统

## 简介
TypeScript的类型系统功能强大，本文将深入探讨高级类型特性。

## 泛型约束
\`\`\`typescript
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
\`\`\`

## 条件类型
\`\`\`typescript
type IsArray<T> = T extends Array<any> ? true : false;
\`\`\`

这些高级特性让TypeScript更加强大和灵活。`
      }
    ]
    
    // 获取当前文章
    const fetchPost = async (slug) => {
      loading.value = true
      
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const foundPost = allPosts.find(p => p.slug === slug)
      post.value = foundPost || null
      loading.value = false
    }
    
    // 渲染的Markdown内容
    const renderedContent = computed(() => {
      return post.value ? renderMarkdown(post.value.content) : ''
    })
    
    // 上一篇和下一篇文章
    const prevPost = computed(() => {
      if (!post.value) return null
      const currentIndex = allPosts.findIndex(p => p.slug === post.value.slug)
      return currentIndex > 0 ? allPosts[currentIndex - 1] : null
    })
    
    const nextPost = computed(() => {
      if (!post.value) return null
      const currentIndex = allPosts.findIndex(p => p.slug === post.value.slug)
      return currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
    })
    
    // 分享文章
    const sharePost = () => {
      if (navigator.share && post.value) {
        navigator.share({
          title: post.value.title,
          url: window.location.href
        })
      } else {
        // 降级方案：复制链接
        navigator.clipboard.writeText(window.location.href).then(() => {
          alert('链接已复制到剪贴板')
        })
      }
    }
    
    // 切换收藏状态
    const toggleBookmark = () => {
      isBookmarked.value = !isBookmarked.value
      // 这里可以调用API保存收藏状态
    }
    
    // 监听路由变化
    watch(() => route.params.slug, (newSlug) => {
      if (newSlug) {
        fetchPost(newSlug)
      }
    }, { immediate: true })
    
    onMounted(() => {
      // 确保代码高亮生效
      if (typeof window !== 'undefined' && window.Prism) {
        window.Prism.highlightAll()
      }
    })
    
    return {
      post,
      loading,
      isBookmarked,
      renderedContent,
      prevPost,
      nextPost,
      sharePost,
      toggleBookmark
    }
  }
}
</script>

<style scoped>
.post-page {
  padding-top: 100px;
  min-height: 100vh;
}

.post-article {
  max-width: 800px;
  margin: 0 auto;
}

/* 文章头部 */
.post-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
  padding-bottom: var(--spacing-xl);
  border-bottom: 1px solid rgba(99, 102, 241, 0.2);
}

.post-meta {
  display: flex;
  justify-content: center;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  font-size: 0.9rem;
  color: #64748b;
  font-family: var(--font-family-mono);
}

.post-meta i {
  margin-right: var(--spacing-xs);
  color: var(--accent-color);
}

.post-title {
  font-size: 2.5rem;
  margin-bottom: var(--spacing-lg);
  background: var(--gradient-primary);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
}

.post-tags {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.post-tag {
  padding: var(--spacing-sm) var(--spacing-md);
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 20px;
  color: var(--primary-color);
  text-decoration: none;
  font-size: 0.85rem;
  transition: all var(--transition-normal) ease;
}

.post-tag:hover {
  background: rgba(99, 102, 241, 0.2);
  transform: scale(1.05);
}

/* 文章内容 */
.post-content {
  line-height: 1.8;
  color: #e2e8f0;
  margin-bottom: var(--spacing-2xl);
}

.post-content :deep(h1),
.post-content :deep(h2),
.post-content :deep(h3),
.post-content :deep(h4),
.post-content :deep(h5),
.post-content :deep(h6) {
  color: var(--primary-color);
  margin: var(--spacing-xl) 0 var(--spacing-md) 0;
  position: relative;
}

.post-content :deep(h2) {
  font-size: 1.8rem;
  border-bottom: 2px solid rgba(99, 102, 241, 0.3);
  padding-bottom: var(--spacing-sm);
}

.post-content :deep(h3) {
  font-size: 1.4rem;
}

.post-content :deep(p) {
  margin-bottom: var(--spacing-md);
}

.post-content :deep(blockquote) {
  border-left: 4px solid var(--primary-color);
  padding: var(--spacing-md) var(--spacing-lg);
  margin: var(--spacing-lg) 0;
  background: rgba(99, 102, 241, 0.05);
  border-radius: 0 8px 8px 0;
  font-style: italic;
}

.post-content :deep(code) {
  background: rgba(99, 102, 241, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: var(--font-family-mono);
  font-size: 0.9em;
  color: var(--primary-color);
}

.post-content :deep(pre) {
  background: rgba(15, 15, 35, 0.8) !important;
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 8px;
  padding: var(--spacing-lg);
  margin: var(--spacing-lg) 0;
  overflow-x: auto;
  position: relative;
}

.post-content :deep(pre code) {
  background: transparent;
  padding: 0;
  color: #f8fafc;
  font-size: 0.85rem;
}

.post-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: var(--spacing-lg) 0;
  background: rgba(99, 102, 241, 0.05);
  border-radius: 8px;
  overflow: hidden;
}

.post-content :deep(th),
.post-content :deep(td) {
  padding: var(--spacing-md);
  text-align: left;
  border-bottom: 1px solid rgba(99, 102, 241, 0.2);
}

.post-content :deep(th) {
  background: rgba(99, 102, 241, 0.1);
  color: var(--primary-color);
  font-weight: 600;
}

.post-content :deep(a) {
  color: var(--accent-color);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all var(--transition-normal) ease;
}

.post-content :deep(a:hover) {
  color: var(--primary-color);
  border-bottom-color: currentColor;
}

/* 文章底部 */
.post-footer {
  border-top: 1px solid rgba(99, 102, 241, 0.2);
  padding-top: var(--spacing-xl);
}

.post-actions {
  display: flex;
  justify-content: center;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.action-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-lg);
  background: var(--gradient-card);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 8px;
  color: var(--primary-color);
  cursor: pointer;
  transition: all var(--transition-normal) ease;
  font-family: var(--font-family-mono);
}

.action-btn:hover {
  background: rgba(99, 102, 241, 0.1);
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

/* 文章导航 */
.post-navigation {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-lg);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: var(--gradient-card);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 12px;
  text-decoration: none;
  transition: all var(--transition-normal) ease;
}

.nav-link:hover {
  border-color: var(--primary-color);
  transform: translateY(-3px);
  box-shadow: var(--shadow-neon);
}

.nav-link.prev {
  justify-content: flex-start;
}

.nav-link.next {
  justify-content: flex-end;
  grid-column: 2;
}

.nav-label {
  display: block;
  font-size: 0.8rem;
  color: #64748b;
  margin-bottom: var(--spacing-xs);
}

.nav-title {
  display: block;
  color: #f8fafc;
  font-weight: 500;
  font-size: 0.9rem;
}

.nav-link i {
  color: var(--primary-color);
  font-size: 1.2rem;
}

/* 加载和错误状态 */
.loading-state,
.not-found {
  text-align: center;
  padding: var(--spacing-2xl);
  color: #64748b;
}

.loading-state .loading {
  margin: 0 auto var(--spacing-lg);
}

.not-found i {
  font-size: 4rem;
  margin-bottom: var(--spacing-lg);
  color: var(--primary-color);
  opacity: 0.5;
}

.not-found h2 {
  margin-bottom: var(--spacing-md);
  color: #94a3b8;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .post-title {
    font-size: 2rem;
  }
  
  .post-meta {
    flex-direction: column;
    gap: var(--spacing-xs);
  }
  
  .post-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .post-navigation {
    grid-template-columns: 1fr;
  }
  
  .nav-link.next {
    grid-column: 1;
  }
  
  .post-content :deep(pre) {
    padding: var(--spacing-md);
    font-size: 0.8rem;
  }
  
  .post-content :deep(table) {
    font-size: 0.8rem;
  }
}
</style>