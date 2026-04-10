<template>
  <div class="path-viewer" id="PathViewer">
    <div class="title-box">
      <div class="title">
        <div class="title-row">
          <span
            class="collapse-arrow"
            @click="toggleCollapse"
            :aria-label="isListCollapsed ? '展开文件列表' : '折叠文件列表'"
          >
            {{ isListCollapsed ? '▶' : '▼' }}
          </span>
          <span class="title-text">文件列表</span>
        </div>
        <div class="config-hint">
          配置后文件列表将自动拼接为完整路径，点击“复制”按钮即可复制路径
        </div>
      </div>
      <div>
        <button class="config-btn" @click="openConfigDialog">配置软件根路径</button>
      </div>
    </div>

    <!-- 文件列表（支持折叠/展开） -->
    <div class="file-list-wrapper" v-show="!isListCollapsed">
      <div v-if="rootPath" class="root-status">
        <span class="label">ATK 根路径：</span>
        <span>{{ rootPath }}</span>
      </div>
     <template v-if="!rootPath">
        <div class="tip-alert">
          当前未配置软件安装路径，展示的是相对路径，配置后可获取完整绝对路径
        </div>
        <!-- 如果检测到路径但未配置，显示快速配置提示 -->
        <div v-if="isLocalFile && autoDetectedPath && !rootPath" class="quick-config-hint">
          🔍 检测到可能的软件路径：{{ autoDetectedPath }}
          <button class="quick-config-btn" @click="quickFillAndOpen">点击配置</button>
        </div>
      </template>
  
      <div class="file-list">
        <div v-if="displayPaths.length === 0" class="empty-state">
          📂 暂无文件列表
        </div>
        <div v-else v-for="(item, index) in displayPaths" :key="index" class="list-item">
          <div class="path-content">
            <span class="path-icon" v-html="getIconHtml(item)"></span>
            <div class="path-info">
              <div class="display-name" v-if="item.displayName !== item.fullPath">
                {{ item.displayName }}
              </div>
              <div class="full-path" :class="{ 'no-name': item.displayName === item.fullPath }">
                {{ item.fullPath }}
              </div>
            </div>
          </div>
          <button class="copy-btn" @click="copyPath(item.fullPath, index)" title="复制完整路径">
            复制路径
          </button>
        </div>
      </div>
    </div>

    <!-- 配置弹窗 -->
    <div v-if="showDialog" class="modal-overlay" @click.self="closeDialog">
      <div class="modal-container">
        <h3>配置软件根路径</h3>
        <p class="modal-desc">
          请输入软件安装目录的绝对路径，之后文件列表会自动拼接为完整路径。
        </p>
        <div class="input-group">
          <input
            v-model="modalPath"
            type="text"
            placeholder="例如: D:\ProgramTool\ATK-4.0-rc.4"
            @keyup.enter="saveConfig"
          />
          <!-- 只在本地 file:// 协议下显示自动获取按钮 -->
          <button
            v-if="isLocalFile"
            class="btn-auto-fetch"
            @click="autoFetchFromUrl"
            title="从当前页面URL自动提取软件根路径"
          >
            自动获取
          </button>
        </div>
        <div v-if="autoDetectedPath && isLocalFile" class="auto-detect-hint">
          🔍 检测到可能的软件路径：{{ autoDetectedPath }}
        </div>
        <!-- 新增的功能示例提示 -->
        <div class="example-hint">
          💡 <strong>使用示例：</strong>假设您输入根路径 <code>D:\ProgramTool\ATK-4.0-rc.4</code>，
          文件列表中如有路径 <code>Help\Examples\01-入门案例</code>，
          系统会自动拼接为 <code>D:\ProgramTool\ATK-4.0-rc.4\Help\Examples\01-入门案例</code>，
          点击对应项的“复制路径”按钮即可一键复制完整路径。
        </div>
        <div class="modal-actions">
          <button class="btn-clear" @click="clearAndClose">清除配置</button>
          <button class="btn-save" @click="saveConfig">保存</button>
          <button class="btn-cancel" @click="closeDialog">取消</button>
        </div>
      </div>
    </div>

    <!-- 全局提示 -->
    <transition name="fade">
      <div v-if="message" class="toast-message">
        {{ message }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
// import scenarioIcon from './images/scenario.png'

// ==================== 工具函数 ====================
/**
 * 将路径中的正斜杠统一转换为反斜杠，并去除末尾多余的反斜杠
 * @param {string} path - 原始路径
 * @returns {string} 规范化后的路径
 */
const normalizePath = (path) => {
  if (!path) return ''
  let normalized = path.replace(/\//g, '\\')
  if (normalized.endsWith('\\')) normalized = normalized.slice(0, -1)
  return normalized
}

/**
 * 拼接根路径和相对路径，生成完整路径
 * @param {string} root - 根路径（可能为空）
 * @param {string} relative - 相对路径
 * @returns {string} 完整路径
 */
const joinPath = (root, relative) => {
  if (!root) return relative
  let rel = relative
  if (rel.startsWith('\\')) rel = rel.slice(1)
  const normalizedRoot = normalizePath(root)
  return `${normalizedRoot}\\${rel}`
}

/**
 * 判断路径是否为文件（包含扩展名且不是以点开头的隐藏文件）
 * @param {string} path - 路径
 * @returns {boolean}
 */
const isFilePath = (path) => {
  if (!path) return false
  let trimmed = path
  if (trimmed.endsWith('\\')) trimmed = trimmed.slice(0, -1)
  const lastPart = trimmed.split('\\').pop()
  return lastPart.includes('.') && !lastPart.startsWith('.')
}

/**
 * 提取文件名（基础名称）
 * @param {string} path - 完整路径
 * @returns {string} 文件名或最后一段
 */
const extractBaseName = (path) => {
  if (!path) return ''
  let trimmed = path
  if (trimmed.endsWith('\\')) trimmed = trimmed.slice(0, -1)
  const parts = trimmed.split('\\')
  return parts[parts.length - 1] || ''
}

/**
 * 获取文件扩展名（小写）
 * @param {string} path - 文件路径
 * @returns {string} 扩展名（如 '.atk'），若没有则返回空字符串
 */
const getFileExtension = (path) => {
  const fileName = extractBaseName(path)
  const lastDotIndex = fileName.lastIndexOf('.')
  if (lastDotIndex === -1) return ''
  return fileName.substring(lastDotIndex).toLowerCase()
}

/**
 * 判断是否为图片文件（基于扩展名）
 * @param {string} path - 文件路径
 * @param {Array} imageExtensions - 图片扩展名列表
 * @returns {boolean}
 */
const isImageFile = (path, imageExtensions) => {
  const ext = getFileExtension(path)
  return imageExtensions.includes(ext)
}

/**
 * 从当前页面的 file:// URL 中提取软件根路径
 * 策略：优先查找 'help' 目录，取 help 的父目录作为根路径；如果未找到，则查找包含 softwareIdentifier 的目录段
 * @param {string} url - 当前页面 URL
 * @param {string} softwareIdentifier - 软件标识关键词
 * @returns {string|null} 提取的根路径，失败返回 null
 */
const extractRootPathFromUrl = (url, softwareIdentifier) => {
  if (!url || !url.startsWith('file://')) return null
  try {
    // 去掉 file:// 前缀，并解码 URL 编码的中文
    let path = url.replace(/^file:\/\/\/?/, '')
    path = decodeURIComponent(path)
    path = normalizePath(path)

    const pathParts = path.split('\\')

    // 策略1：优先查找 'help' 目录，取 help 的父目录作为根路径
    for (let i = 0; i < pathParts.length; i++) {
      const part = pathParts[i]
      if (part && part.toLowerCase() === 'help') {
        if (i > 0) return pathParts.slice(0, i).join('\\')
        break
      }
    }

    // 策略2：查找包含软件标识的目录
    for (let i = 0; i < pathParts.length; i++) {
      const part = pathParts[i]
      if (part && part.includes(softwareIdentifier)) {
        return pathParts.slice(0, i + 1).join('\\')
      }
    }

    return null
  } catch (error) {
    console.error('提取根路径失败:', error)
    return null
  }
}

// ==================== Props 定义 ====================
const props = defineProps({
  relativePaths: {
    type: Array,
  },
  storageKey: {
    type: String,
    default: 'ATK_root_path',
  },
  softwareIdentifier: {
    type: String,
    default: 'ATK',
  },
  iconConfig: {
    type: Object,
    default: () => ({
      fileTypeIcons: {
        '.atk': '<svg t="1775133327450" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12975" width="256" height="256"><path d="M98.9 577.2h350v350h-350zM98.9 112.6h350v350h-350zM567.3 577.2h350v350h-350zM520.493 287.543L742.31 65.725l221.818 221.818L742.31 509.36z" fill="#ff9212" p-id="12976"></path></svg>',
        '.xml': '<svg t="1775133327450" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12975" width="256" height="256"><path d="M98.9 577.2h350v350h-350zM98.9 112.6h350v350h-350zM567.3 577.2h350v350h-350zM520.493 287.543L742.31 65.725l221.818 221.818L742.31 509.36z" fill="#ff9212" p-id="12976"></path></svg>'
      },
      defaultFileIcon: '📄',
      defaultFolderIcon: '📁',
      defaultImgIcon: '🖼️',
      imageExtensions: ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.bmp'],
    }),
  },
})
 
// ==================== 响应式状态 ====================
const rootPath = ref('') // 用户配置的根路径
const message = ref('') // 提示消息文本
const showDialog = ref(false) // 是否显示配置弹窗
const modalPath = ref('') // 弹窗中输入的临时路径
const isListCollapsed = ref(false) // 文件列表是否折叠
const isLocalFile = ref(false) // 当前是否在 file:// 协议下
const autoDetectedPath = ref('') // 自动检测到的软件根路径

let messageTimer = null // 消息定时器句柄

// ==================== 辅助方法 ====================
/**
 * 显示短暂提示消息（5秒后自动消失）
 * @param {string} msg - 消息内容
 */
const showMessage = (msg) => {
  if (messageTimer) clearTimeout(messageTimer)
  message.value = msg
  messageTimer = setTimeout(() => {
    message.value = ''
    messageTimer = null
  }, 5000)
}

/**
 * 获取文件/文件夹对应的图标 HTML
 * @param {Object} item - 包含 fullPath 和 isFile 属性的对象
 * @returns {string} HTML 字符串或文本图标
 */
const getIconHtml = (item) => {
  if (!item.isFile) return props.iconConfig.defaultFolderIcon

  const ext = getFileExtension(item.fullPath)
  const customIcon = props.iconConfig.fileTypeIcons[ext]
  if (customIcon) {
    // 如果是 URL 或绝对路径，使用 img 标签
    if (customIcon.startsWith('/') || customIcon.startsWith('http')) {
      return `<img src="${customIcon}" alt="${ext}图标" class="icon-img" />`
    }
    return customIcon
  }

  if (isImageFile(item.fullPath, props.iconConfig.imageExtensions)) {
    return props.iconConfig.defaultImgIcon
  }

  return props.iconConfig.defaultFileIcon
}

/**
 * 保存根路径到 localStorage，并更新状态
 * @param {string} path - 新的根路径
 */
const setRootPathValue = (newPath) => {
  const normalized = normalizePath(newPath)
  rootPath.value = normalized
  try {
    if (normalized) {
      localStorage.setItem(props.storageKey, normalized)
    } else {
      localStorage.removeItem(props.storageKey)
    }
  } catch (error) {
    console.error('保存本地配置失败:', error)
  }
  if (normalized) {
    showMessage(`✅ 根路径已设置: ${normalized}`)
  } else {
    showMessage('🔄 已清除根路径配置，现显示原始相对路径')
  }
}

/**
 * 检测当前环境并尝试自动获取软件根路径（仅检测，不自动保存）
 */
const detectAndAutoFetch = () => {
  const currentUrl = window.location.href
  // 测试用固定 URL 进行调试
  // const currentUrl = "file:///D:/ProgramTool/ATK-4.0-rc.4/Help/html/3.案例教程/1-入门案例.html";
  if (currentUrl.startsWith('file://')) {
    isLocalFile.value = true
    const detectedPath = extractRootPathFromUrl(currentUrl, props.softwareIdentifier)
    if (detectedPath) {
      autoDetectedPath.value = detectedPath
      if (!rootPath.value) {
        showMessage(`🔍 检测到软件根路径: ${detectedPath}，请点击“配置软件根路径”并保存`)
      }
    } else {
      autoDetectedPath.value = ''
    }
  } else {
    isLocalFile.value = false
    autoDetectedPath.value = ''
  }
}

/**
 * 从 localStorage 加载已保存的根路径配置
 */
const loadRootPath = () => {
  try {
    const saved = localStorage.getItem(props.storageKey)
    if (saved) {
      rootPath.value = saved
    }
  } catch (error) {
    console.error('读取本地配置失败:', error)
  }
  // 无论是否有保存的配置，都执行检测（用于显示自动获取按钮和提示）
  detectAndAutoFetch()
}

// ==================== 事件处理（用户交互） ====================
/** 打开配置弹窗，预填当前值或检测到的路径 */
const openConfigDialog = () => {
  if (rootPath.value) {
    modalPath.value = rootPath.value
  } else if (autoDetectedPath.value) {
    modalPath.value = autoDetectedPath.value
  } else {
    modalPath.value = ''
  }
  showDialog.value = true
}

/** 关闭配置弹窗 */
const closeDialog = () => {
  showDialog.value = false
}

/** 保存配置弹窗中的路径 */
const saveConfig = () => {
  const newPath = modalPath.value.trim()
  setRootPathValue(newPath)
  closeDialog()
}

/** 清除配置并关闭弹窗 */
const clearAndClose = () => {
  setRootPathValue('')
  closeDialog()
}

/** 自动获取路径（仅填充到输入框，不自动保存） */
const autoFetchFromUrl = () => {
  const currentUrl = window.location.href
  // 测试用固定 URL 进行调试
  // const currentUrl = "file:///D:/ProgramTool/ATK-4.0-rc.4/Help/html/3.案例教程/1-入门案例.html";
  if (!currentUrl.startsWith('file://')) {
    showMessage('❌ 当前不在本地文件环境，无法自动获取')
    return
  }
  const detectedPath = extractRootPathFromUrl(currentUrl, props.softwareIdentifier)
  if (detectedPath) {
    modalPath.value = detectedPath
    autoDetectedPath.value = detectedPath // 更新检测到的路径
    showMessage(`✅ 已自动获取软件路径: ${detectedPath}，请点击“保存”生效`)
  } else {
    showMessage('❌ 未能自动识别软件根路径，请手动输入')
  }
}

/** 快速填充并打开弹窗（用于未配置时的快捷配置） */
const quickFillAndOpen = () => {
  if (autoDetectedPath.value) {
    modalPath.value = autoDetectedPath.value
    showDialog.value = true
  } else {
    openConfigDialog()
  }
}

/** 折叠/展开文件列表 */
const toggleCollapse = () => {
  isListCollapsed.value = !isListCollapsed.value
}

/**
 * 复制文本到剪贴板（支持降级方案）
 * @param {string} text - 要复制的文本
 */
const copyPath = async (text) => {
  const fallbackCopy = () => {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    const success = document.execCommand('copy')
    document.body.removeChild(textarea)
    if (success) {
      showMessage(`✅ 复制成功: ${text}`)
    } else {
      showMessage('❌ 复制失败，请手动复制')
    }
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      showMessage(`✅ 复制成功: ${text}`)
    } catch (err) {
      console.error('Clipboard API 复制失败:', err)
      fallbackCopy()
    }
  } else {
    fallbackCopy()
  }
}

// ==================== 计算属性 ====================
/**
 * 生成最终展示的文件列表
 * 将相对路径与根路径拼接，并附加显示名称、是否为文件等信息
 */
const displayPaths = computed(() => {
  if (!props.relativePaths || props.relativePaths.length === 0) return []

  return props.relativePaths
    .map((item) => {
      let originalPath = ''
      let customName = null

      if (typeof item === 'string') {
        originalPath = item
      } else if (item && typeof item === 'object') {
        originalPath = item.path || ''
        customName = item.name || null
      } else {
        console.warn('无效的路径项:', item)
        return null
      }

      const fullPath = joinPath(rootPath.value, originalPath)
      const isFile = isFilePath(fullPath)

      let displayName = ''
      if (customName !== null && customName !== '') {
        displayName = customName
      } else {
        displayName = extractBaseName(fullPath)
        if (!displayName) displayName = fullPath
      }

      return { original: originalPath, fullPath, displayName, isFile }
    })
    .filter((item) => item !== null)
})

// ==================== 生命周期 ====================
onMounted(() => {
  loadRootPath()
})
</script>

<style scoped>
.quick-config-hint {
  margin-top: 8px;
  font-size: 12px;
  color: #28a745;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  background: #d4edda;
  padding: 6px 10px;
  border-radius: 4px;
}

.quick-config-btn {
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 2px 10px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.quick-config-btn:hover {
  background: #218838;
}
/* 整体容器 */
.path-viewer {
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  background: #ffffff;
  border-radius: 10px;
  border: 2px solid #edf1fa;
  padding: 20px;
  margin: 20px auto;
  transition: all 0.2s ease;
}

.title-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.title {
  flex: 1;
  min-width: 0;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.collapse-arrow {
  font-size: 14px;
  cursor: pointer;
  user-select: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  transition: background-color 0.2s;
  color: #495057;
}

.collapse-arrow:hover {
  background-color: #e9ecef;
  color: #1c7ed6;
}

.title-text {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a202c;
}

.config-hint {
  font-size: 12px;
  color: #868e96;
  padding-left: 32px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.config-btn {
  padding: 6px 12px;
  border: 1px solid #007bff;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  background: #007bff;
  color: #fff;
  flex-shrink: 0;
  align-self: flex-start;
}

.config-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.root-status {
  font-size: 14px;
  color: #213545;
  background: #f3f4f6;
  font-weight: bold;
  padding: 8px 14px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  word-break: break-all;
  margin: 16px 0;
}

.tip-alert {
  margin: 16px 0;
  background: #ecf5ff;
  color: #409eff;
  border-radius: 4px;
  font-size: 12px;
  padding: 6px 10px;
}

/* 文件列表区域包装器（用于折叠过渡） */
.file-list-wrapper {
  transition: all 0.2s ease;
}

/* 文件列表区域 */
.file-list {
  max-height: 320px;
  overflow-y: auto;
  border-radius: 8px;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #adb5bd;
  font-size: 14px;
  background: #f8f9fa;
  border-radius: 8px;
}

.icon-img {
  width: 18px;
  height: 18px;
  object-fit: contain;
  vertical-align: middle;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 16px;
  background: #ffffff;
  border-radius: 0px;
  transition: all 0.2s;
  border-bottom: 1px solid #f1f3f5;
}

.list-item:hover {
  background: #f8f9fa;
  border-color: #e9ecef;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
}

.path-content {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.path-icon {
  font-size: 18px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  overflow: hidden;
}

.path-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.path-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.display-name {
  font-size: 14px;
  font-weight: 500;
  color: #212529;
  line-height: 1.4;
  word-break: break-word;
}

.full-path {
  font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
  font-size: 11px;
  color: #868e96;
  word-break: break-all;
  line-height: 1.4;
}

.full-path.no-name {
  font-size: 13px;
  color: #212529;
  font-weight: normal;
}

.copy-btn {
  background: none;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 500;
  color: #495057;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
  flex-shrink: 0;
  margin-left: 12px;
}

.copy-btn:hover {
  background: #e7f5ff;
  border-color: #4dabf7;
  color: #228be6;
  transform: scale(0.98);
}

/* 弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
}

.modal-container {
  background: #ffffff;
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  padding: 24px;
  box-shadow: 0 20px 35px rgba(0, 0, 0, 0.2);
  animation: modalSlideIn 0.2s ease;
}

.modal-container h3 {
  margin: 0 0 8px 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #212529;
}

.modal-desc {
  font-size: 0.85rem;
  color: #6c757d;
  margin-bottom: 20px;
}

.input-group {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.modal-container input {
  flex: 1;
  padding: 12px 14px;
  border: 1px solid #dee2e6;
  border-radius: 10px;
  font-size: 14px;
  font-family: 'SF Mono', 'Fira Code', monospace;
  transition: all 0.2s;
  box-sizing: border-box;
}

.modal-container input:focus {
  outline: none;
  border-color: #4dabf7;
  box-shadow: 0 0 0 3px rgba(77, 171, 247, 0.1);
}

.btn-auto-fetch {
  padding: 0 16px;
  background: #f0f2f5;
  border: 1px solid #dee2e6;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 500;
  color: #495057;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.btn-auto-fetch:hover {
  background: #e9ecef;
  border-color: #adb5bd;
}

.auto-detect-hint {
  font-size: 12px;
  color: #28a745;
  margin-bottom: 12px;
  padding: 6px 10px;
  background: #d4edda;
  border-radius: 6px;
  word-break: break-all;
}

/* 新增示例提示样式 */
.example-hint {
  font-size: 12px;
  background: #f0f7ff;
  border-left: 3px solid #0083fe;
  padding: 10px 12px;
  border-radius: 8px;
  margin: 12px 0;
  color: #2c3e50;
  line-height: 1.5;
  word-break: break-word;
}
.example-hint code {
  background: #e9ecef;
  padding: 2px 4px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 11px;
  color: #d63384;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
}

.modal-actions button {
  padding: 6px 18px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-save {
  background: #0083fe;
  color: white;
}

.btn-save:hover {
  background: #0053cc;
}

.btn-clear {
  background: #ff284b;
  color: #ffffff;
  border: 1px solid #dee2e6;
}

.btn-clear:hover {
  background: #e90023;
  border-color: #dc3545;
}

.btn-cancel {
  background: #f5f5f5;
  color: #495057;
  border: 1px solid #dee2e6;
}

.btn-cancel:hover {
  background: #ebebeb;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Toast 提示 */
.toast-message {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: #2c3e50;
  color: white;
  padding: 10px 20px;
  border-radius: 40px;
  font-size: 13px;
  font-weight: 500;
  z-index: 1100;
  pointer-events: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(4px);
  white-space: nowrap;
  max-width: 90vw;
  white-space: normal;
  word-break: break-all;
  text-align: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 滚动条样式 */
.file-list::-webkit-scrollbar {
  width: 6px;
}

.file-list::-webkit-scrollbar-track {
  background: #fff !important;
  border-radius: 10px;
}

.file-list::-webkit-scrollbar-thumb {
  background: #adb5bd;
  border-radius: 10px;
}

.file-list::-webkit-scrollbar-thumb:hover {
  background: #9ba2aa;
}
</style>