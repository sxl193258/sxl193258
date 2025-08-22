<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-content">
        <!-- Logo -->
        <router-link to="/" class="navbar-brand">
          <span class="brand-text neon-glow">sxl193258</span>
          <span class="brand-subtitle">.tech</span>
        </router-link>
        
        <!-- 导航菜单 -->
        <div class="navbar-nav" :class="{ 'active': mobileMenuOpen }">
          <router-link 
            v-for="item in navItems" 
            :key="item.path"
            :to="item.path" 
            class="nav-link"
            @click="closeMobileMenu"
          >
            <i :class="item.icon"></i>
            <span>{{ item.text }}</span>
          </router-link>
        </div>
        
        <!-- 移动端菜单按钮 -->
        <button 
          class="mobile-menu-btn"
          @click="toggleMobileMenu"
          aria-label="切换菜单"
        >
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Navbar',
  setup() {
    const mobileMenuOpen = ref(false)
    
    const navItems = [
      { path: '/', text: '首页', icon: 'fas fa-home' },
      { path: '/posts', text: '文章', icon: 'fas fa-newspaper' },
      { path: '/tags', text: '标签', icon: 'fas fa-tags' },
      { path: '/about', text: '关于', icon: 'fas fa-user' }
    ]
    
    const toggleMobileMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value
    }
    
    const closeMobileMenu = () => {
      mobileMenuOpen.value = false
    }
    
    return {
      mobileMenuOpen,
      navItems,
      toggleMobileMenu,
      closeMobileMenu
    }
  }
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(15, 15, 35, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(99, 102, 241, 0.2);
  z-index: 1000;
  transition: all var(--transition-normal) ease;
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md) 0;
}

/* Logo品牌 */
.navbar-brand {
  display: flex;
  align-items: baseline;
  font-family: var(--font-family-mono);
  font-weight: 700;
  font-size: 1.5rem;
  text-decoration: none;
  color: var(--primary-color);
  transition: all var(--transition-normal) ease;
}

.brand-text {
  color: var(--primary-color);
  margin-right: 4px;
}

.brand-subtitle {
  font-size: 1rem;
  color: var(--accent-color);
  opacity: 0.8;
}

.navbar-brand:hover {
  transform: scale(1.05);
}

/* 导航菜单 */
.navbar-nav {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  font-family: var(--font-family-mono);
  font-size: 0.9rem;
  font-weight: 500;
  color: #cbd5e1;
  text-decoration: none;
  border-radius: 6px;
  transition: all var(--transition-normal) ease;
  position: relative;
  overflow: hidden;
}

.nav-link::before {
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

.nav-link:hover::before {
  left: 0;
}

.nav-link:hover {
  color: var(--primary-color);
  background: rgba(99, 102, 241, 0.1);
  transform: translateY(-2px);
}

.nav-link.router-link-active {
  color: var(--primary-color);
  background: var(--gradient-card);
  border: 1px solid rgba(99, 102, 241, 0.3);
  box-shadow: var(--shadow-neon);
}

.nav-link i {
  font-size: 0.8rem;
}

/* 移动端菜单按钮 */
.mobile-menu-btn {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
}

.hamburger-line {
  width: 100%;
  height: 2px;
  background: var(--primary-color);
  border-radius: 1px;
  transition: all var(--transition-normal) ease;
}

.mobile-menu-btn:hover .hamburger-line {
  background: var(--accent-color);
  box-shadow: 0 0 10px currentColor;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .navbar-content {
    padding: var(--spacing-sm) 0;
  }
  
  .navbar-brand {
    font-size: 1.3rem;
  }
  
  .mobile-menu-btn {
    display: flex;
  }
  
  .navbar-nav {
    position: fixed;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(15, 15, 35, 0.98);
    backdrop-filter: blur(20px);
    border-top: 1px solid rgba(99, 102, 241, 0.2);
    flex-direction: column;
    padding: var(--spacing-lg);
    gap: var(--spacing-sm);
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all var(--transition-normal) ease;
  }
  
  .navbar-nav.active {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }
  
  .nav-link {
    width: 100%;
    justify-content: flex-start;
    padding: var(--spacing-md);
    border-radius: 8px;
  }
  
  .nav-link:hover {
    transform: translateX(10px);
  }
}

/* 动画效果 */
@keyframes navSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.navbar {
  animation: navSlideIn 0.6s ease-out;
}
</style>