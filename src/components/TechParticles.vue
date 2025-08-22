<template>
  <canvas class="tech-particles" ref="particlesCanvas"></canvas>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'

export default {
  name: 'TechParticles',
  setup() {
    const particlesCanvas = ref(null)
    let animationId = null
    let particles = []
    
    const initParticles = () => {
      const canvas = particlesCanvas.value
      if (!canvas) return
      
      const ctx = canvas.getContext('2d')
      
      // 设置canvas尺寸
      const resizeCanvas = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
      
      resizeCanvas()
      window.addEventListener('resize', resizeCanvas)
      
      // 粒子类
      class Particle {
        constructor() {
          this.x = Math.random() * canvas.width
          this.y = Math.random() * canvas.height
          this.vx = (Math.random() - 0.5) * 0.5
          this.vy = (Math.random() - 0.5) * 0.5
          this.size = Math.random() * 2 + 1
          this.opacity = Math.random() * 0.5 + 0.2
          this.color = this.getRandomColor()
        }
        
        getRandomColor() {
          const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981']
          return colors[Math.floor(Math.random() * colors.length)]
        }
        
        update() {
          this.x += this.vx
          this.y += this.vy
          
          // 边界处理
          if (this.x < 0 || this.x > canvas.width) this.vx *= -1
          if (this.y < 0 || this.y > canvas.height) this.vy *= -1
          
          // 保持在画布范围内
          this.x = Math.max(0, Math.min(canvas.width, this.x))
          this.y = Math.max(0, Math.min(canvas.height, this.y))
        }
        
        draw() {
          ctx.save()
          ctx.globalAlpha = this.opacity
          ctx.fillStyle = this.color
          ctx.shadowBlur = 10
          ctx.shadowColor = this.color
          
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
          ctx.fill()
          
          ctx.restore()
        }
      }
      
      // 创建粒子
      const createParticles = () => {
        const particleCount = Math.min(50, Math.floor(canvas.width * canvas.height / 20000))
        particles = []
        
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle())
        }
      }
      
      // 绘制连接线
      const drawConnections = () => {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)
            
            if (distance < 100) {
              const opacity = (1 - distance / 100) * 0.2
              
              ctx.save()
              ctx.globalAlpha = opacity
              ctx.strokeStyle = '#6366f1'
              ctx.lineWidth = 1
              ctx.shadowBlur = 5
              ctx.shadowColor = '#6366f1'
              
              ctx.beginPath()
              ctx.moveTo(particles[i].x, particles[i].y)
              ctx.lineTo(particles[j].x, particles[j].y)
              ctx.stroke()
              
              ctx.restore()
            }
          }
        }
      }
      
      // 动画循环
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        // 更新和绘制粒子
        particles.forEach(particle => {
          particle.update()
          particle.draw()
        })
        
        // 绘制连接线
        drawConnections()
        
        animationId = requestAnimationFrame(animate)
      }
      
      // 鼠标交互
      const handleMouseMove = (event) => {
        const rect = canvas.getBoundingClientRect()
        const mouseX = event.clientX - rect.left
        const mouseY = event.clientY - rect.top
        
        particles.forEach(particle => {
          const dx = mouseX - particle.x
          const dy = mouseY - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 100) {
            const force = (100 - distance) / 1000
            particle.vx += dx * force
            particle.vy += dy * force
          }
        })
      }
      
      canvas.addEventListener('mousemove', handleMouseMove)
      
      // 初始化
      createParticles()
      animate()
      
      // 清理函数
      return () => {
        window.removeEventListener('resize', resizeCanvas)
        canvas.removeEventListener('mousemove', handleMouseMove)
        if (animationId) {
          cancelAnimationFrame(animationId)
        }
      }
    }
    
    onMounted(() => {
      const cleanup = initParticles()
      
      onUnmounted(() => {
        if (cleanup) cleanup()
      })
    })
    
    return {
      particlesCanvas
    }
  }
}
</script>

<style scoped>
.tech-particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: -1;
  opacity: 0.6;
}
</style>