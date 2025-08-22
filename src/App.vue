<template>
  <div id="app">
    <!-- 矩阵雨背景 -->
    <canvas class="matrix-bg" ref="matrixCanvas"></canvas>
    
    <!-- 主布局 -->
    <div class="app-layout">
      <!-- 导航栏 -->
      <Navbar />
      
      <!-- 主内容区 -->
      <main class="main-content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
      
      <!-- 页脚 -->
      <Footer />
    </div>
    
    <!-- 科技感粒子效果 -->
    <TechParticles />
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import TechParticles from './components/TechParticles.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    TechParticles
  },
  setup() {
    const matrixCanvas = ref(null)
    
    const initMatrixBackground = () => {
      const canvas = matrixCanvas.value
      if (!canvas) return
      
      const ctx = canvas.getContext('2d')
      
      // 设置canvas尺寸
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      
      // 矩阵字符
      const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?'
      const chars = matrixChars.split('')
      
      const fontSize = 14
      const columns = canvas.width / fontSize
      const drops = []
      
      // 初始化雨滴位置
      for (let i = 0; i < columns; i++) {
        drops[i] = 1
      }
      
      const draw = () => {
        // 半透明黑色背景，创造拖尾效果
        ctx.fillStyle = 'rgba(15, 15, 35, 0.05)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        // 设置文字样式
        ctx.fillStyle = '#6366f1'
        ctx.font = `${fontSize}px JetBrains Mono`
        
        // 绘制字符
        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)]
          ctx.fillText(text, i * fontSize, drops[i] * fontSize)
          
          // 随机重置雨滴位置
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0
          }
          
          drops[i]++
        }
      }
      
      // 启动动画
      setInterval(draw, 100)
    }
    
    // 响应窗口大小变化
    const handleResize = () => {
      const canvas = matrixCanvas.value
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }
    
    onMounted(() => {
      initMatrixBackground()
      window.addEventListener('resize', handleResize)
    })
    
    return {
      matrixCanvas
    }
  }
}
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
}

.main-content {
  flex: 1;
  padding: var(--spacing-xl) 0;
}

.matrix-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: -1;
  opacity: 0.1;
}
</style>