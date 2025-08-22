<template>
  <div class="not-found-page">
    <div class="container">
      <div class="not-found-content">
        <!-- 404 动画效果 -->
        <div class="error-code">
          <span class="error-digit">4</span>
          <span class="error-digit glitch">0</span>
          <span class="error-digit">4</span>
        </div>
        
        <!-- 错误信息 -->
        <div class="error-message">
          <h1 class="error-title">页面未找到</h1>
          <p class="error-description">
            抱歉，您访问的页面可能已被删除、重命名或暂时不可用。
          </p>
        </div>
        
        <!-- 建议操作 */
        <div class="error-suggestions">
          <h3 class="suggestions-title">您可以尝试：</h3>
          <ul class="suggestions-list">
            <li>
              <i class="fas fa-home"></i>
              返回 <router-link to="/" class="suggestion-link">首页</router-link>
            </li>
            <li>
              <i class="fas fa-newspaper"></i>
              浏览 <router-link to="/posts" class="suggestion-link">文章列表</router-link>
            </li>
            <li>
              <i class="fas fa-tags"></i>
              查看 <router-link to="/tags" class="suggestion-link">标签分类</router-link>
            </li>
            <li>
              <i class="fas fa-search"></i>
              使用搜索功能查找内容
            </li>
          </ul>
        </div>
        
        <!-- 操作按钮 -->
        <div class="error-actions">
          <router-link to="/" class="btn btn-primary">
            <i class="fas fa-home"></i>
            返回首页
          </router-link>
          <button @click="goBack" class="btn btn-outline">
            <i class="fas fa-arrow-left"></i>
            返回上页
          </button>
        </div>
        
        <!-- 科技感装饰元素 -->
        <div class="tech-decoration">
          <div class="circuit-line"></div>
          <div class="circuit-line"></div>
          <div class="circuit-line"></div>
          <div class="floating-particles">
            <div v-for="i in 10" :key="i" class="particle"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'

export default {
  name: 'NotFound',
  setup() {
    const goBack = () => {
      if (window.history.length > 1) {
        window.history.back()
      } else {
        window.location.href = '/'
      }
    }
    
    // 添加页面动画效果
    onMounted(() => {
      // 故障效果动画
      const glitchElement = document.querySelector('.glitch')
      if (glitchElement) {
        setInterval(() => {
          glitchElement.classList.add('active')
          setTimeout(() => {
            glitchElement.classList.remove('active')
          }, 200)
        }, 2000)
      }
    })
    
    return {
      goBack
    }
  }
}
</script>

<style scoped>
.not-found-page {
  padding-top: 100px;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.not-found-content {
  text-align: center;
  max-width: 600px;
  position: relative;
  z-index: 2;
}

/* 404 错误代码 */
.error-code {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-2xl);
  font-family: var(--font-family-mono);
}

.error-digit {
  font-size: 8rem;
  font-weight: 900;
  background: var(--gradient-primary);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(99, 102, 241, 0.5);
  position: relative;
  animation: pulse 2s ease-in-out infinite;
}

.error-digit.glitch {
  position: relative;
}

.error-digit.glitch::before,
.error-digit.glitch::after {
  content: '0';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--gradient-primary);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0;
}

.error-digit.glitch::before {
  animation: glitch-1 0.3s ease-in-out infinite;
  color: #ff0000;
  transform: translateX(2px);
}

.error-digit.glitch::after {
  animation: glitch-2 0.3s ease-in-out infinite;
  color: #00ffff;
  transform: translateX(-2px);
}

.error-digit.glitch.active::before,
.error-digit.glitch.active::after {
  opacity: 0.8;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes glitch-1 {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(2px); }
  40% { transform: translateX(-2px); }
  60% { transform: translateX(2px); }
  80% { transform: translateX(-2px); }
}

@keyframes glitch-2 {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-2px); }
  40% { transform: translateX(2px); }
  60% { transform: translateX(-2px); }
  80% { transform: translateX(2px); }
}

/* 错误信息 */
.error-message {
  margin-bottom: var(--spacing-2xl);
}

.error-title {
  font-size: 2.5rem;
  margin-bottom: var(--spacing-md);
  color: var(--primary-color);
  text-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
}

.error-description {
  font-size: 1.1rem;
  color: #94a3b8;
  line-height: 1.6;
  max-width: 500px;
  margin: 0 auto;
}

/* 建议操作 */
.error-suggestions {
  margin-bottom: var(--spacing-2xl);
  text-align: left;
  background: var(--gradient-card);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 12px;
  padding: var(--spacing-xl);
  backdrop-filter: blur(10px);
}

.suggestions-title {
  color: var(--secondary-color);
  margin-bottom: var(--spacing-lg);
  text-align: center;
}

.suggestions-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.suggestions-list li {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  color: #94a3b8;
  padding: var(--spacing-sm);
  border-radius: 6px;
  transition: all var(--transition-normal) ease;
}

.suggestions-list li:hover {
  background: rgba(99, 102, 241, 0.1);
  transform: translateX(10px);
}

.suggestions-list i {
  color: var(--accent-color);
  font-size: 1.1rem;
  min-width: 20px;
}

.suggestion-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  transition: color var(--transition-normal) ease;
}

.suggestion-link:hover {
  color: var(--accent-color);
  text-shadow: 0 0 10px currentColor;
}

/* 操作按钮 */
.error-actions {
  display: flex;
  gap: var(--spacing-lg);
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: var(--spacing-2xl);
}

/* 科技感装饰 */
.tech-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: -1;
}

.circuit-line {
  position: absolute;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(99, 102, 241, 0.3) 50%, 
    transparent 100%);
  height: 1px;
  animation: circuit-flow 3s linear infinite;
}

.circuit-line:nth-child(1) {
  top: 20%;
  left: -100%;
  width: 200%;
  animation-delay: 0s;
}

.circuit-line:nth-child(2) {
  top: 50%;
  right: -100%;
  width: 150%;
  animation-delay: 1s;
  animation-direction: reverse;
}

.circuit-line:nth-child(3) {
  top: 80%;
  left: -100%;
  width: 180%;
  animation-delay: 2s;
}

@keyframes circuit-flow {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* 浮动粒子 */
.floating-particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--primary-color);
  border-radius: 50%;
  opacity: 0.6;
  animation: float 6s ease-in-out infinite;
}

.particle:nth-child(odd) {
  animation-direction: reverse;
}

.particle:nth-child(1) { top: 10%; left: 10%; animation-delay: 0s; }
.particle:nth-child(2) { top: 20%; right: 15%; animation-delay: 1s; }
.particle:nth-child(3) { top: 30%; left: 80%; animation-delay: 2s; }
.particle:nth-child(4) { top: 40%; right: 20%; animation-delay: 3s; }
.particle:nth-child(5) { top: 50%; left: 5%; animation-delay: 4s; }
.particle:nth-child(6) { top: 60%; right: 10%; animation-delay: 5s; }
.particle:nth-child(7) { top: 70%; left: 70%; animation-delay: 0.5s; }
.particle:nth-child(8) { top: 80%; right: 5%; animation-delay: 1.5s; }
.particle:nth-child(9) { top: 90%; left: 20%; animation-delay: 2.5s; }
.particle:nth-child(10) { top: 85%; right: 30%; animation-delay: 3.5s; }

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.6;
  }
  25% {
    transform: translateY(-20px) rotate(90deg);
    opacity: 1;
  }
  50% {
    transform: translateY(-40px) rotate(180deg);
    opacity: 0.8;
  }
  75% {
    transform: translateY(-20px) rotate(270deg);
    opacity: 1;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .error-digit {
    font-size: 4rem;
  }
  
  .error-title {
    font-size: 2rem;
  }
  
  .error-description {
    font-size: 1rem;
  }
  
  .error-suggestions {
    text-align: center;
  }
  
  .suggestions-list {
    align-items: center;
  }
  
  .suggestions-list li {
    justify-content: center;
  }
  
  .suggestions-list li:hover {
    transform: translateY(-2px);
  }
  
  .error-actions {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .error-digit {
    font-size: 3rem;
  }
  
  .error-title {
    font-size: 1.5rem;
  }
  
  .error-suggestions {
    padding: var(--spacing-lg);
  }
}
</style>