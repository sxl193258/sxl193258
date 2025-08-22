import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'sxl193258的技术博客',
      description: '专注于前端技术分享的科技感博客'
    }
  },
  {
    path: '/posts',
    name: 'Posts',
    component: () => import('../views/Posts.vue'),
    meta: {
      title: '文章列表',
      description: '技术文章和学习笔记'
    }
  },
  {
    path: '/post/:slug',
    name: 'Post',
    component: () => import('../views/Post.vue'),
    meta: {
      title: '文章详情',
      description: '查看文章详细内容'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      title: '关于我',
      description: '个人简介和技术栈'
    }
  },
  {
    path: '/tags',
    name: 'Tags',
    component: () => import('../views/Tags.vue'),
    meta: {
      title: '标签',
      description: '按标签浏览文章'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: '页面未找到',
      description: '您访问的页面不存在'
    }
  }
]

const router = createRouter({
  history: createWebHistory('/sxl193258/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 路由守卫 - 更新页面标题
router.beforeEach((to) => {
  const title = to.meta.title ? `${to.meta.title} | sxl193258的技术博客` : 'sxl193258的技术博客'
  document.title = title
  
  // 更新meta描述
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription && to.meta.description) {
    metaDescription.setAttribute('content', to.meta.description)
  }
})

export default router