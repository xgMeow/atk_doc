<template>
  <div class="atk-architecture-container">
    <!-- 动态渲染所有模块 -->
    <div 
      v-for="(module, index) in modulesData" 
      :key="index" 
      class="module-wrapper"
    >
      <div class="module-hexagon">
        <span class="module-title" v-html="module.title"></span>
        <div class="hexagon-glow"></div>
      </div>
      <div class="module-content">
        <div 
          v-for="(row, rowIndex) in module.rows" 
          :key="rowIndex" 
          class="content-row"
        >
          <template v-for="(item, itemIndex) in row" :key="itemIndex">
            <a 
              v-if="item.link" 
              :href="getLink(item.link)" 
              class="content-item link-item"
            >
              {{ item.name }}
            </a>
            <div v-else class="content-item">
              {{ item.name }}
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { siteBase } from '../../shared/config.js'

const getLink = (path) => {
  const normalizedBase = siteBase.replace(/\/+$/, '')
  const normalizedPath = path.replace(/\/+/g, '/')
  return normalizedBase + normalizedPath
}

// 模块数据配置
const modulesData = ref([
  {
    title: "标准<br>平台",
    rows: [
      [
        { name: "内核算法库", link: null },
        { name: "二维可视化", link: "/03-基础使用指南/05-二三维地图/02-二维地图/" }
      ],
      [
        { name: "仿真平台", link: null },
        { name: "三维可视化", link: "/03-基础使用指南/05-二三维地图/03-三维地图/" }
      ],
      [
        { name: "对象管理", link: "/03-基础使用指南/03-对象管理/" },
        { name: "矢量几何", link: "/5.专业使用指南/10-矢量几何工具.html" }
      ],
      [
        { name: "图文报告", link: "/03-基础使用指南/01-主菜单栏/05-输出.html" },
        { name: "模型管理", link: null }
      ]
    ]
  },
  {
    title: "可见性<br>与覆盖",
    rows: [
      [
        { name: "可见性分析", link: "/5.专业使用指南/01-可见性工具.html" },
        { name: "区域覆盖", link: "/5.专业使用指南/03-区域覆盖分析.html" }
      ],
      [
        { name: "覆盖分析", link: "/5.专业使用指南/02-覆盖性工具.html" },
        { name: "通信链路", link: null }
      ]
    ]
  },
  {
    title: "任务<br>分析",
    rows: [
      [
        { name: "接近分析", link: "/5.专业使用指南/07-接近分析.html" },
        { name: "批量坐标转换", link: "/5.专业使用指南/04-批量坐标转换工具.html" }
      ],
      [
        { name: "高级接近", link: "/5.专业使用指南/20-高级接近分析模块.html" },
        { name: "偏差分析", link: "/5.专业使用指南/12-偏差分析.html" }
      ],
      [
        { name: "发射窗口接近", link: "/5.专业使用指南/19-发射窗口接近分析工具.html" },
        { name: "寿命预报", link: "/5.专业使用指南/11-卫星工具/16-寿命预报模块.html" }
      ],
      [
        { name: "碰撞规避", link: "/5.专业使用指南/08-碰撞规避.html" },
        { name: "卫星系统", link: "/03-基础使用指南/03-对象管理/02-属性配置/卫星系统.html" }
      ]
    ]
  },
  {
    title: "轨道<br>设计",
    rows: [
      [
        { name: "机动规划", link: "/5.专业使用指南/13-轨道机动规划工具/" },
        { name: "高级星座", link: "/5.专业使用指南/06-高级星座设计.html" }
      ],
      [
        { name: "RPO工具", link: "/5.专业使用指南/13-RPO功能模块.html" },
        { name: "巨型星座", link: "/5.专业使用指南/11-巨型星座设计模块.html" }
      ],
      [
        { name: "星座设计", link: "/5.专业使用指南/05-星座设计工具.html" }
      ]
    ]
  },
  {
    title: "二次<br>开发",
    rows: [
      [
        { name: "ATK.Component", link: "/二次开发教程/4-二次开发COMPONENT模式/" },
        { name: "ATK.MBSE", link: "/二次开发教程/3-MBSE接口/" }
      ],
      [
        { name: "ATK.Connect", link: "/二次开发教程/2-二次开发CONNECT模式/" },
        { name: "内置脚本", link: "/5.专业使用指南/18-脚本工具/" }
      ]
    ]
  }
])
</script>

<style scoped>
/* ==================== 全局容器 ==================== */
.atk-architecture-container {
  width: 85%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px 24px;
  font-family: "Microsoft YaHei", -apple-system, BlinkMacSystemFont, sans-serif;
}

/* ==================== 模块包装器 ==================== */
.module-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 36px;
  position: relative;
}

/* ==================== 六边形模块标题 ==================== */
.module-hexagon {
  width: 130px;
  height: 75px;
  background: linear-gradient(135deg, #1e3a8a 0%, #1551a3 50%, #1d4ed8 100%);
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.4;
  text-align: center;
  letter-spacing: 0.5px;
  box-shadow: 
    0 4px 12px rgba(21, 81, 163, 0.3),
    0 8px 24px rgba(21, 81, 163, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 六边形上下三角 */
.module-hexagon::before,
.module-hexagon::after {
  content: "";
  position: absolute;
  width: 0;
  border-left: 65px solid transparent;
  border-right: 65px solid transparent;
}

.module-hexagon::before {
  bottom: 100%;
  border-bottom: 37.5px solid #1551a3;
  filter: brightness(1.1);
}

.module-hexagon::after {
  top: 100%;
  border-top: 37.5px solid #1551a3;
  filter: brightness(0.95);
}

/* 六边形光晕效果 */
.hexagon-glow {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: radial-gradient(ellipse at center, rgba(0, 161, 233, 0.15) 0%, transparent 70%);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.module-hexagon:hover .hexagon-glow {
  opacity: 1;
}

/* ==================== 虚线连接框 ==================== */
.module-content {
  flex: 1;
  margin-left: 24px;
  padding: 28px 32px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.95) 100%);
  border: 2px dashed #00a1e9;
  border-radius: 16px;
  position: relative;
  z-index: 1;
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.04),
    0 4px 16px rgba(0, 0, 0, 0.02),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
}

.module-content:hover {
  border-color: #0891b2;
  box-shadow: 
    0 4px 12px rgba(0, 161, 233, 0.1),
    0 8px 24px rgba(0, 161, 233, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

/* ==================== 内容行 ==================== */
.content-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 14px;
  gap: 16px;
}

.content-row:last-child {
  margin-bottom: 0;
}

/* ==================== 内容项 ==================== */
.content-item {
  width: calc(50% - 8px);
  padding: 10px 18px;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, transparent 100%);
  border-radius: 8px;
  font-size: 17px;
  color: #1e293b;
  font-weight: 600;
  text-align: left;
  border: 1px solid transparent;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

/* 微光泽效果 */
.content-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  transition: left 0.5s ease;
}

.content-item:hover::before {
  left: 100%;
}

/* ==================== 链接项 ==================== */
.link-item {
  text-decoration: none;
  color: #1551a3;
  cursor: pointer;
  position: relative;
}

.link-item:hover {
  background: linear-gradient(135deg, #1551a3 0%, #0369a1 50%, #0891b2 100%);
  color: #fff;
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 
    0 4px 12px rgba(21, 81, 163, 0.25),
    0 2px 4px rgba(21, 81, 163, 0.1);
}

/* 链接箭头指示 */
.link-item::after {
  content: '→';
  position: absolute;
  right: 12px;
  opacity: 0;
  transform: translateX(-8px);
  transition: all 0.3s ease;
}

.link-item:hover::after {
  opacity: 1;
  transform: translateX(0);
}

/* ==================== 响应式适配 ==================== */
@media (max-width: 900px) {
  .atk-architecture-container {
    width: 95%;
    padding: 24px 16px;
  }
  
  .module-wrapper {
    flex-direction: column;
    align-items: flex-start;
  }

  .module-content {
    margin-left: 0;
    margin-top: 20px;
    width: 100%;
    padding: 20px 24px;
  }

  .content-item {
    font-size: 15px;
    padding: 8px 14px;
  }
  
  .module-hexagon {
    width: 110px;
    height: 63.5px;
    font-size: 18px;
  }
  
  .module-hexagon::before,
  .module-hexagon::after {
    border-left-width: 55px;
    border-right-width: 55px;
  }
  
  .module-hexagon::before {
    border-bottom-width: 31.75px;
  }
  
  .module-hexagon::after {
    border-top-width: 31.75px;
  }
}

@media (max-width: 600px) {
  .content-row {
    flex-direction: column;
    gap: 10px;
  }
  
  .content-item {
    width: 100%;
  }
}
</style>
