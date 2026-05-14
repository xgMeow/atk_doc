<template>
  <div class="enhanced-toc-wrapper">
    <!-- 组件会在 mounted 后注入内容到 .vp-toc-list -->
  </div>
</template>

<script setup>
import { onMounted, watch, nextTick, onUnmounted, computed } from 'vue'
import { useRoute, usePageFrontmatter } from 'vuepress/client'

const route = useRoute()
const frontmatter = usePageFrontmatter()

let scrollHandler = null
let headerElements = []
let tocItems = []
let tocWrapper = null
let tocMarker = null

// 获取标题层级
const getHeaderLevel = (el) => {
  const match = el.tagName.match(/H(\d)/)
  return match ? parseInt(match[1]) : 0
}

// 从 frontmatter 获取最大渲染层级
const getMaxLevel = () => {
  const tocConfig = frontmatter.value?.toc
  if (!tocConfig) return 6 // 默认渲染到 h6
  
  // 支持多种格式：
  // toc: 2 (数字)
  // toc: { levels: 2 }
  // toc: { levels: [2, 6] } - 取第一个作为最大层级
  // toc: { levels: "deep" } - 渲染到 h6
  
  if (typeof tocConfig === 'number') return tocConfig
  if (typeof tocConfig === 'object') {
    const levels = tocConfig.levels
    if (typeof levels === 'number') return levels
    if (levels === 'deep') return 6
    if (Array.isArray(levels)) return levels[0] || 6
  }
  return 6
}

// 生成 TOC 项目
const generateTocItems = () => {
  const contentContainer = document.querySelector('.theme-hope-content')
  if (!contentContainer) return []

  const maxLevel = getMaxLevel()
  const headers = contentContainer.querySelectorAll('h2, h3, h4, h5, h6')
  const items = []

  headers.forEach((header) => {
    const level = getHeaderLevel(header)
    if (level < 2) return
    if (level > maxLevel) return // 超过最大层级的不渲染

    const id = header.getAttribute('id')
    const text = header.textContent?.trim() || ''
    
    items.push({
      level,
      id,
      text,
      element: header
    })
  })

  return items
}

// 设置高亮
const setActiveById = (targetId) => {
  tocItems.forEach(item => {
    if (item.id === targetId) {
      item.li.classList.add('active')
    } else {
      item.li.classList.remove('active')
    }
  })
  updateMarkerPosition()
}

// 更新 marker 位置
const updateMarkerPosition = () => {
  if (!tocWrapper || !tocMarker) return
  
  const activeItem = document.querySelector('.vp-toc-item.active')
  if (!activeItem) {
    tocMarker.style.top = '-1.7rem'
    return
  }
  
  const wrapperRect = tocWrapper.getBoundingClientRect()
  const itemRect = activeItem.getBoundingClientRect()
  
  const top = itemRect.top - wrapperRect.top + tocWrapper.scrollTop
  tocMarker.style.top = `${top}px`
}

// 更新高亮状态
const updateActiveHighlight = () => {
  const scrollTop = window.scrollY
  const navbarHeight = 120

  let activeId = null
  let minDistance = Infinity

  headerElements.forEach((header) => {
    if (!header) return
    
    const rect = header.getBoundingClientRect()
    const headerTop = rect.top + scrollTop - navbarHeight
    
    if (rect.top <= navbarHeight + 50) {
      const distance = Math.abs(scrollTop - headerTop + navbarHeight)
      if (distance < minDistance) {
        minDistance = distance
        activeId = header.id
      }
    }
  })

  if (activeId) {
    setActiveById(activeId)
  }
}

// 更新 TOC
const updateToc = () => {
  const tocList = document.querySelector('.vp-toc-list')
  if (!tocList) return

  tocWrapper = document.querySelector('.vp-toc-wrapper')
  tocMarker = document.querySelector('.vp-toc-marker')

  const items = generateTocItems()
  
  tocList.innerHTML = ''
  headerElements = []
  tocItems = []

  items.forEach(item => {
    const li = document.createElement('li')
    li.className = `vp-toc-item`
    
    const a = document.createElement('a')
    a.className = `route-link vp-toc-link level${item.level}`
    a.href = `#${item.id}`
    a.textContent = item.text
    
    const indentMap = {
      2: '0.75em',
      3: '1.75em',
      4: '2.75em',
      5: '3.75em',
      6: '4.75em'
    }
    a.style.paddingLeft = indentMap[item.level] || '0.75em'
    
    const fontSizeMap = {
      2: '14px',
      3: '13px',
      4: '13px',
      5: '12px',
      6: '12px'
    }
    a.style.fontSize = fontSizeMap[item.level] || '14px'

    a.addEventListener('click', () => {
      setActiveById(item.id)
    })
    
    li.appendChild(a)
    tocList.appendChild(li)

    if (item.element) {
      headerElements.push(item.element)
      tocItems.push({ id: item.id, li })
    }
  })

  nextTick(() => {
    setTimeout(updateActiveHighlight, 100)
  })
}

onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      updateToc()
      
      scrollHandler = () => {
        requestAnimationFrame(updateActiveHighlight)
      }
      window.addEventListener('scroll', scrollHandler, { passive: true })
    }, 500)
  })
})

watch(
  () => route.path,
  () => {
    nextTick(() => {
      setTimeout(updateToc, 500)
    })
  }
)

watch(
  () => route.hash,
  (newHash) => {
    if (newHash) {
      const id = newHash.replace('#', '')
      setTimeout(() => {
        setActiveById(id)
      }, 300)
    }
  }
)

onUnmounted(() => {
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler)
  }
})
</script>

<style>
.enhanced-toc-wrapper {
  display: none;
}
.vp-toc-header{
  color: #3c3c43;
}
.vp-toc-item {
  position: relative;
  margin: 0;
  padding: 0.2em 0;
  list-style: none;
  border-radius: 0 12px 12px 0;
  transition: background-color 0.25s;
}

.vp-toc-item a {
  margin: 0;
}

.vp-toc-item.active {
  background: #f0f4ff;
}

.vp-toc-link {
  display: block;
  padding: 0;
  color: #67676c;
  line-height: 1.5;
  text-decoration: none;
  transition: color 0.25s;
}

.vp-toc-wrapper{
  margin:0;
}

.vp-toc-link:hover {
  color: var(--menu-color-blue, #1456f0);
}

.vp-toc-item.active .vp-toc-link {
  color: var(--menu-color-blue, #1456f0);
  font-weight: 500;
}

.vp-toc-link.level2 {
  font-weight: 500;
}

html[data-theme="dark"] .vp-toc-item.active {
  background: rgba(20, 86, 240, 0.15);
}

html[data-theme="dark"] .vp-toc-link {
  color: var(--text-color, #d8d8d8);
}

html[data-theme="dark"] .vp-toc-link:hover,
html[data-theme="dark"] .vp-toc-item.active .vp-toc-link {
  color: #fff;
}
</style>
