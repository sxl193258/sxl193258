import MarkdownIt from 'markdown-it'
import Prism from 'prismjs'

// 导入Prism语言支持
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-rust'

// 导入Prism主题样式
import 'prismjs/themes/prism-tomorrow.css'

// 创建Markdown解析器实例
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  highlight: function (str, lang) {
    if (lang && Prism.languages[lang]) {
      try {
        const highlighted = Prism.highlight(str, Prism.languages[lang], lang)
        return `<pre class="language-${lang} code-block"><code class="language-${lang}">${highlighted}</code></pre>`
      } catch (error) {
        console.warn('Syntax highlighting failed:', error)
      }
    }
    
    // 如果没有指定语言或高亮失败，返回转义的普通代码块
    return `<pre class="code-block"><code>${md.utils.escapeHtml(str)}</code></pre>`
  }
})

// 自定义渲染规则

// 自定义代码块渲染
md.renderer.rules.fence = function (tokens, idx, options, env, renderer) {
  const token = tokens[idx]
  const info = token.info ? md.utils.unescapeAll(token.info).trim() : ''
  let langName = ''
  let langAttrs = ''

  if (info) {
    const arr = info.split(/(\s+)/g)
    langName = arr[0]
    if (arr.length === 2) {
      langAttrs = arr[1]
    }
  }

  let highlighted
  if (options.highlight) {
    highlighted = options.highlight(token.content, langName, langAttrs) || md.utils.escapeHtml(token.content)
  } else {
    highlighted = md.utils.escapeHtml(token.content)
  }

  if (highlighted.indexOf('<pre') === 0) {
    return highlighted + '\n'
  }

  // 添加复制按钮和语言标签
  return `<div class="code-container">
    <div class="code-header">
      <span class="code-lang">${langName || 'text'}</span>
      <button class="copy-btn" onclick="copyCode(this)" title="复制代码">
        <i class="fas fa-copy"></i>
      </button>
    </div>
    <pre class="language-${langName} code-block"><code class="language-${langName}">${highlighted}</code></pre>
  </div>\n`
}

// 自定义链接渲染 - 添加外部链接图标
const defaultLinkOpenRenderer = md.renderer.rules.link_open || function(tokens, idx, options, env, renderer) {
  return renderer.renderToken(tokens, idx, options)
}

md.renderer.rules.link_open = function (tokens, idx, options, env, renderer) {
  const token = tokens[idx]
  const href = token.attrGet('href')
  
  // 检查是否为外部链接
  if (href && (href.startsWith('http') || href.startsWith('//'))) {
    token.attrSet('target', '_blank')
    token.attrSet('rel', 'noopener noreferrer')
    token.attrJoin('class', 'external-link')
  }
  
  return defaultLinkOpenRenderer(tokens, idx, options, env, renderer)
}

// 自定义表格渲染
md.renderer.rules.table_open = function() {
  return '<div class="table-container"><table class="markdown-table">\n'
}

md.renderer.rules.table_close = function() {
  return '</table></div>\n'
}

// 自定义引用块渲染
md.renderer.rules.blockquote_open = function() {
  return '<blockquote class="markdown-blockquote">\n'
}

// 自定义标题渲染 - 添加锚点
md.renderer.rules.heading_open = function(tokens, idx) {
  const token = tokens[idx]
  const level = token.tag.slice(1) // h1 -> 1, h2 -> 2, etc.
  const content = tokens[idx + 1].content
  const anchor = content.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-')
  
  return `<${token.tag} id="${anchor}" class="heading-${level}">
    <a href="#${anchor}" class="heading-anchor" aria-hidden="true">
      <i class="fas fa-link"></i>
    </a>`
}

// Markdown解析和渲染函数
export function renderMarkdown(content) {
  if (!content) return ''
  
  try {
    let rendered = md.render(content)
    
    // 后处理：添加一些增强功能
    rendered = addImageLightbox(rendered)
    rendered = addCodeCopyFunction(rendered)
    
    return rendered
  } catch (error) {
    console.error('Markdown rendering failed:', error)
    return `<p>渲染失败: ${error.message}</p>`
  }
}

// 添加图片灯箱功能
function addImageLightbox(html) {
  return html.replace(
    /<img([^>]+)>/g,
    '<div class="image-container"><img$1 class="lightbox-image" onclick="openImageLightbox(this)"></div>'
  )
}

// 添加代码复制功能的全局函数
function addCodeCopyFunction(html) {
  // 在渲染完成后添加全局复制函数
  if (typeof window !== 'undefined' && !window.copyCode) {
    window.copyCode = function(button) {
      const codeBlock = button.parentElement.nextElementSibling.querySelector('code')
      const text = codeBlock.textContent || codeBlock.innerText
      
      navigator.clipboard.writeText(text).then(() => {
        const originalIcon = button.innerHTML
        button.innerHTML = '<i class="fas fa-check"></i>'
        button.classList.add('copied')
        
        setTimeout(() => {
          button.innerHTML = originalIcon
          button.classList.remove('copied')
        }, 2000)
      }).catch(err => {
        console.error('复制失败:', err)
        // 降级方案
        const textarea = document.createElement('textarea')
        textarea.value = text
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
        
        const originalIcon = button.innerHTML
        button.innerHTML = '<i class="fas fa-check"></i>'
        button.classList.add('copied')
        
        setTimeout(() => {
          button.innerHTML = originalIcon
          button.classList.remove('copied')
        }, 2000)
      })
    }
  }
  
  // 添加图片灯箱功能
  if (typeof window !== 'undefined' && !window.openImageLightbox) {
    window.openImageLightbox = function(img) {
      const lightbox = document.createElement('div')
      lightbox.className = 'image-lightbox'
      lightbox.innerHTML = `
        <div class="lightbox-content">
          <img src="${img.src}" alt="${img.alt || ''}" class="lightbox-img">
          <button class="lightbox-close" onclick="this.parentElement.parentElement.remove()">
            <i class="fas fa-times"></i>
          </button>
        </div>
      `
      
      lightbox.onclick = function(e) {
        if (e.target === lightbox) {
          lightbox.remove()
        }
      }
      
      document.body.appendChild(lightbox)
    }
  }
  
  return html
}

// 从Markdown内容中提取元数据
export function extractFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)
  
  if (!match) {
    return {
      metadata: {},
      content: content
    }
  }
  
  const frontmatter = match[1]
  const markdownContent = match[2]
  
  // 简单的YAML解析（仅支持基本键值对）
  const metadata = {}
  frontmatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':')
    if (colonIndex > -1) {
      const key = line.substring(0, colonIndex).trim()
      const value = line.substring(colonIndex + 1).trim().replace(/^['"]|['"]$/g, '')
      
      // 处理数组值（如tags）
      if (value.startsWith('[') && value.endsWith(']')) {
        metadata[key] = value.slice(1, -1).split(',').map(item => item.trim().replace(/^['"]|['"]$/g, ''))
      } else {
        metadata[key] = value
      }
    }
  })
  
  return {
    metadata,
    content: markdownContent
  }
}

// 生成文章摘要
export function generateExcerpt(content, maxLength = 200) {
  // 移除Markdown语法和HTML标签
  const plainText = content
    .replace(/^---[\s\S]*?---/, '') // 移除frontmatter
    .replace(/#+\s/g, '') // 移除标题标记
    .replace(/\*\*(.*?)\*\*/g, '$1') // 移除粗体
    .replace(/\*(.*?)\*/g, '$1') // 移除斜体
    .replace(/`(.*?)`/g, '$1') // 移除行内代码
    .replace(/```[\s\S]*?```/g, '') // 移除代码块
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 移除链接，保留文本
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1') // 移除图片，保留alt文本
    .replace(/>\s/g, '') // 移除引用标记
    .replace(/\n+/g, ' ') // 将换行替换为空格
    .replace(/\s+/g, ' ') // 合并多个空格
    .trim()
  
  return plainText.length > maxLength 
    ? plainText.substring(0, maxLength) + '...'
    : plainText
}

// 计算阅读时间（基于字数估算）
export function calculateReadingTime(content) {
  const plainText = content.replace(/```[\s\S]*?```/g, '') // 移除代码块
  const chineseChars = (plainText.match(/[\u4e00-\u9fa5]/g) || []).length
  const englishWords = (plainText.match(/[a-zA-Z]+/g) || []).length
  
  // 中文阅读速度：约400字/分钟，英文阅读速度：约200词/分钟
  const readingTime = Math.ceil((chineseChars / 400) + (englishWords / 200))
  
  return Math.max(1, readingTime) // 至少1分钟
}

export default {
  renderMarkdown,
  extractFrontmatter,
  generateExcerpt,
  calculateReadingTime
}