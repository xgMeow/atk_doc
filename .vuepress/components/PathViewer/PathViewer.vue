<template>
  <div class="path-viewer">
    <div class="title-box">
      <div class="title">
        <!-- 折叠箭头 + 标题文字 -->
        <div class="title-row">
          <span class="collapse-arrow" @click="toggleCollapse" :aria-label="isListCollapsed ? '展开文件列表' : '折叠文件列表'">
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
      <!-- 简洁配置栏 -->
      <div v-if="rootPath" class="root-status">
        <span class="label">ATK 根路径：</span>
        <span :class="{ 'placeholder': !rootPath }">
          {{ rootPath || '未配置' }}
        </span>
      </div>
      <div v-if="!rootPath" class="tip-alert">
        当前未配置软件安装路径，展示的是相对路径，配置后可获取完整绝对路径
      </div>
      <div class="file-list">
        <div v-if="displayPaths.length === 0" class="empty-state">
          📂 暂无文件列表
        </div>
        <div v-else v-for="(item, index) in displayPaths" :key="index" class="list-item">
          <div class="path-content">
            <!-- 动态图标 -->
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
          <input v-model="modalPath" type="text" placeholder="例如: D:\ProgramTool\ATK-4.0-rc.4"
            @keyup.enter="saveConfig" />
          <button class="btn-auto-fetch" @click="autoFetchUrl" title="自动获取当前页面URL">自动获取</button>
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
import { ref, computed, onMounted } from 'vue';
import scenarioIcon from './images/scenario.png'; // 根据实际路径调整

// ==================== Props 定义 ====================
const props = defineProps({
  /**
   * 相对路径列表
   * 支持两种格式：
   * 1. 字符串：直接作为路径使用
   * 2. 对象：{ path: string, name?: string }
   * 例如：
      const files = [
        // 纯字符串，显示路径最后一段作为名称
        'SimpleExample\\SimpleExample.atk',
        // 带自定义名称的对象
        { path: 'SimpleExample\\SimpleExample.txt', name: '入门案例想定' },
        // 文件夹路径（没有扩展名），会显示文件夹图标
        'plugins\\',
        // 自定义名称的文件夹
        { path: 'docs\\', name: '文档目录' }
      ];
   */
  relativePaths: {
    type: Array,
    default: () => ['SimpleExample\\SimpleExample.atk']
  },

  /**
   * 存储根路径的 localStorage key
   */
  storageKey: {
    type: String,
    default: 'app_software_root_path'
  },

  /**
   * 自定义图标配置
   */
  iconConfig: {
    type: Object,
    default: () => ({
      // 特定文件扩展名对应的图标
      fileTypeIcons: {
        '.atk': scenarioIcon,
        '.xml': scenarioIcon,
      },
      // 默认文件图标（可替换为图片路径或emoji）
      defaultFileIcon: '📄',
      // 默认文件夹图标
      defaultFolderIcon: '📁',
      // 图片文件扩展名列表（这些文件会显示图片预览）
      imageExtensions: ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.bmp'],
    })
  }
});

// ==================== 响应式状态 ====================
const rootPath = ref('');        // 当前生效的根路径
const message = ref('');         // 提示消息
const showDialog = ref(false);   // 弹窗显示控制
const modalPath = ref('');       // 弹窗内临时输入的路径
const isListCollapsed = ref(false); // 文件列表折叠状态（默认展开）

// 用于管理提示消息的定时器
let messageTimer = null;

// ==================== 辅助函数 ====================
/**
 * 标准化路径分隔符并去除尾部斜杠
 * @param {string} path 原始路径
 * @returns {string} 标准化后的路径
 */
const normalizePath = (path) => {
  if (!path) return '';
  // 统一将正斜杠转为反斜杠（Windows风格）
  let normalized = path.replace(/\//g, '\\');
  // 去除尾部的反斜杠
  if (normalized.endsWith('\\')) {
    normalized = normalized.slice(0, -1);
  }
  return normalized;
};

/**
 * 拼接根路径和相对路径
 * @param {string} root 根路径（可能为空）
 * @param {string} relative 相对路径
 * @returns {string} 完整路径
 */
const joinPath = (root, relative) => {
  if (!root) return relative;
  // 去除相对路径开头的反斜杠
  let rel = relative;
  if (rel.startsWith('\\')) {
    rel = rel.slice(1);
  }
  const normalizedRoot = normalizePath(root);
  return `${normalizedRoot}\\${rel}`;
};

/**
 * 判断路径是否为文件（基于最后一部分是否包含扩展名）
 * @param {string} path 完整路径或相对路径
 * @returns {boolean}
 */
const isFilePath = (path) => {
  if (!path) return false;
  // 去除尾部斜杠（如果有）后再取最后一段
  let trimmed = path;
  if (trimmed.endsWith('\\')) {
    trimmed = trimmed.slice(0, -1);
  }
  const lastPart = trimmed.split('\\').pop();
  // 判断最后一段是否包含点，且不是以点开头（隐藏文件也算文件）
  return lastPart.includes('.') && !lastPart.startsWith('.');
};

/**
 * 从路径中提取文件扩展名
 * @param {string} path 路径
 * @returns {string} 扩展名（包含点，如 .atk）
 */
const getFileExtension = (path) => {
  if (!path) return '';
  const fileName = extractBaseName(path);
  const lastDotIndex = fileName.lastIndexOf('.');
  if (lastDotIndex === -1) return '';
  return fileName.substring(lastDotIndex).toLowerCase();
};

/**
 * 从路径中提取最后一段（文件名或文件夹名）
 * @param {string} path 路径
 * @returns {string}
 */
const extractBaseName = (path) => {
  if (!path) return '';
  let trimmed = path;
  if (trimmed.endsWith('\\')) {
    trimmed = trimmed.slice(0, -1);
  }
  const parts = trimmed.split('\\');
  return parts[parts.length - 1] || '';
};

/**
 * 判断是否为图片文件
 * @param {string} path 路径
 * @returns {boolean}
 */
const isImageFile = (path) => {
  const ext = getFileExtension(path);
  return props.iconConfig.imageExtensions.includes(ext);
};

/**
 * 获取文件图标HTML
 * @param {Object} item 文件项
 * @returns {string} 图标HTML
 */
const getIconHtml = (item) => {
  // 如果是文件夹，返回文件夹图标
  if (!item.isFile) {
    return props.iconConfig.defaultFolderIcon;
  }

  const ext = getFileExtension(item.fullPath);
  
  // 检查是否有特定文件类型的图标配置
  if (props.iconConfig.fileTypeIcons[ext]) {
    const iconUrl = props.iconConfig.fileTypeIcons[ext];
    // 如果是URL，返回img标签
    if (iconUrl.startsWith('/') || iconUrl.startsWith('http')) {
      return `<img src="${iconUrl}" alt="${ext}图标" class="icon-img" />`;
    }
    return iconUrl;
  }

  // 如果是图片文件，返回图片预览
  if (isImageFile(item.fullPath)) {
    // 这里返回img标签，显示图片预览（注意：实际路径可能不存在，使用onerror处理）
    return `<img src="${item.fullPath}" alt="图片预览" class="icon-img" onerror="this.style.display='none';this.parentElement.innerHTML='🖼️'" />`;
  }

  // 默认返回文件图标
  return props.iconConfig.defaultFileIcon;
};

/**
 * 显示短暂提示消息
 * @param {string} msg 消息内容
 */
const showMessage = (msg) => {
  // 清除之前的定时器
  if (messageTimer) {
    clearTimeout(messageTimer);
  }
  // 设置新消息
  message.value = msg;
  // 设置新定时器
  messageTimer = setTimeout(() => {
    message.value = '';
    messageTimer = null;
  }, 2000);
};

// ==================== 存储相关 ====================
/**
 * 从 localStorage 加载根路径
 */
const loadRootPath = () => {
  try {
    const saved = localStorage.getItem(props.storageKey);
    if (saved) {
      rootPath.value = saved;
    }
  } catch (error) {
    console.error('读取本地配置失败:', error);
  }
};

/**
 * 保存根路径到 localStorage
 * @param {string} path 要保存的路径
 */
const saveRootPath = (path) => {
  try {
    if (path) {
      localStorage.setItem(props.storageKey, path);
    } else {
      localStorage.removeItem(props.storageKey);
    }
  } catch (error) {
    console.error('保存本地配置失败:', error);
  }
};

/**
 * 设置根路径（内部使用，并持久化）
 * @param {string} newPath 新的根路径（空字符串表示清除）
 */
const setRootPathValue = (newPath) => {
  const normalized = normalizePath(newPath);
  rootPath.value = normalized;
  saveRootPath(normalized);
  if (normalized) {
    showMessage(`✅ 根路径已设置: ${normalized}`);
  } else {
    showMessage('🔄 已清除根路径配置，现显示原始相对路径');
  }
};

// ==================== 弹窗操作 ====================
/**
 * 打开配置弹窗
 */
const openConfigDialog = () => {
  modalPath.value = rootPath.value; // 预填当前路径
  showDialog.value = true;
};

/**
 * 关闭弹窗
 */
const closeDialog = () => {
  showDialog.value = false;
  console.log('弹窗已关闭');
};

/**
 * 保存配置（从弹窗输入）
 */
const saveConfig = () => {
  const newPath = modalPath.value.trim();
  setRootPathValue(newPath);
  closeDialog();
};

/**
 * 清除配置并关闭弹窗
 */
const clearAndClose = () => {
  setRootPathValue('');
  closeDialog();
};

// ==================== 自动获取 URL ====================
/**
 * 自动获取当前页面的 URL 并填充到输入框
 */
const autoFetchUrl = () => {
  try {
    let currentUrl = window.location.href;
    // 解码 URL 中的中文等特殊字符
    currentUrl = decodeURIComponent(currentUrl);
    // 将正斜杠转换为反斜杠，使路径格式统一
    currentUrl = currentUrl.replace(/\//g, '\\');
    modalPath.value = currentUrl;
    showMessage('🌐 已自动获取当前页面URL');
  } catch (error) {
    console.error('获取当前URL失败:', error);
    showMessage('❌ 获取URL失败，请手动输入');
  }
};

// ==================== 折叠/展开功能 ====================
/**
 * 切换文件列表折叠状态
 */
const toggleCollapse = () => {
  isListCollapsed.value = !isListCollapsed.value;
};

// ==================== 复制功能 ====================
/**
 * 复制路径到剪贴板
 * @param {string} text 要复制的文本
 */
const copyPath = async (text) => {
  const fallbackCopy = () => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    if (success) {
      showMessage(`✅ 复制成功: ${text}`);
    } else {
      showMessage('❌ 复制失败，请手动复制');
    }
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      showMessage(`✅ 复制成功: ${text}`);
    } catch (err) {
      console.error('Clipboard API 复制失败:', err);
      fallbackCopy();
    }
  } else {
    fallbackCopy();
  }
};

// ==================== 计算属性 ====================
/**
 * 展示的路径列表
 * 每个元素包含原始相对路径、完整路径、显示名称、是否为文件的标识
 */
const displayPaths = computed(() => {
  if (!props.relativePaths || props.relativePaths.length === 0) {
    return [];
  }

  return props.relativePaths.map((item) => {
    // 解析输入项：可以是字符串或对象
    let originalPath = '';
    let customName = null;

    if (typeof item === 'string') {
      originalPath = item;
    } else if (item && typeof item === 'object') {
      originalPath = item.path || '';
      customName = item.name || null;
    } else {
      console.warn('无效的路径项:', item);
      return null;
    }

    const fullPath = joinPath(rootPath.value, originalPath);
    // 判断是否为文件
    const isFile = isFilePath(fullPath);
    // 决定显示名称：优先使用自定义名称，否则从完整路径中提取基名
    let displayName = '';
    if (customName !== null && customName !== '') {
      displayName = customName;
    } else {
      // 没有自定义名称时，使用路径的最后一段作为显示名称
      displayName = extractBaseName(fullPath);
      // 如果提取后为空（例如根目录），则回退到完整路径
      if (!displayName) {
        displayName = fullPath;
      }
    }

    return {
      original: originalPath,
      fullPath: fullPath,
      displayName: displayName,
      isFile: isFile,
    };
  }).filter(item => item !== null); // 过滤掉无效项
});

// ==================== 生命周期 ====================
onMounted(() => {
  loadRootPath();
});
</script>

<style scoped>
/* 整体容器 */
.path-viewer {
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  background: #ffffff;
  border-radius: 10px;
  /* box-shadow: 0 2px 12px #eff2f5; */
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

.root-status .placeholder {
  color: #868e96;
  font-style: italic;
}

.tip-alert {
  margin: 16px 0;
  padding: 12px 16px;
  background: #ecf5ff;
  color: #409eff;
  border-radius: 4px;
  font-size: 14px;
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
  max-width: 480px;
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
  margin-bottom: 20px;
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

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
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