<template>
  <div class="atk-architecture-container">
    
    <!-- 标准平台模块 -->
    <div class="module-wrapper">
      <div class="module-hexagon">
        <span class="module-title">标准<br>平台</span>
      </div>
      <div class="module-content">
        <div class="content-row">
          <div class="content-item">内核算法库</div>
          <a href="/4.基础使用指南/可视化/二维可视化.html" class="content-item link-item">二维可视化</a>
        </div>
        <div class="content-row">
          <div class="content-item">仿真平台</div>
          <a href="/4.基础使用指南/可视化/三维可视化.html" class="content-item link-item">三维可视化</a>
        </div>
        <div class="content-row">
          <a href="/4.基础使用指南/2-插入对象/" class="content-item link-item">对象管理</a>
          <a href="/5.专业使用指南/17-矢量几何工具.html" class="content-item link-item">矢量几何</a>
        </div>
        <div class="content-row">
          <a href="/4.基础使用指南/0-ATK工作区介绍/01-菜单栏介绍/05-输出.html" class="content-item link-item">图文报告</a>
          <div class="content-item">模型管理</div>
        </div>
      </div>
    </div>

    <!-- 可见性与覆盖模块 -->
    <div class="module-wrapper">
      <div class="module-hexagon">
        <span class="module-title">可见性<br>与覆盖</span>
      </div>
      <div class="module-content">
        <div class="content-row">
          <a href="/5.专业使用指南/1-可见性工具.html" class="content-item link-item">可见性分析</a>
          <a href="/5.专业使用指南/9-区域覆盖模块.html" class="content-item link-item">区域覆盖</a>
        </div>
        <div class="content-row">
          <a href="/5.专业使用指南/2-覆盖工具.html" class="content-item link-item">覆盖分析</a>
          <div class="content-item">通信链路</div>
        </div>
      </div>
    </div>

    <!-- 任务分析模块 -->
    <div class="module-wrapper">
      <div class="module-hexagon">
        <span class="module-title">任务<br>分析</span>
      </div>
      <div class="module-content">
        <div class="content-row">
          <a href="/5.专业使用指南/5-接近分析工具.html" class="content-item link-item">接近分析</a>
          <a href="/5.专业使用指南/4-批量坐标转换工具.html" class="content-item link-item">批量坐标转换</a>
        </div>
        <div class="content-row">
          <a href="/5.专业使用指南/20-高级接近分析模块.html" class="content-item link-item">高级接近</a>
          <a href="/5.专业使用指南/12-偏差分析.html" class="content-item link-item">偏差分析</a>
        </div>
        <div class="content-row">
          <a href="/5.专业使用指南/19-发射窗口接近分析工具.html" class="content-item link-item">发射窗口接近</a>
          <a href="/5.专业使用指南/16-寿命预报模块.html" class="content-item link-item">寿命预报</a>
        </div>
        <div class="content-row">
          <a href="/5.专业使用指南/6-碰撞规避工具.html" class="content-item link-item">碰撞规避</a>
          <a href="/4.基础使用指南/2-插入对象/10-对象属性/卫星系统.html" class="content-item link-item">卫星系统</a>
        </div>
      </div>
    </div>

    <!-- 轨道设计模块 -->
    <div class="module-wrapper">
      <div class="module-hexagon">
        <span class="module-title">轨道<br>设计</span>
      </div>
      <div class="module-content">
        <div class="content-row">
          <a href="/5.专业使用指南/3-轨道机动规划工具/" class="content-item link-item">机动规划</a>
          <a href="/5.专业使用指南/11-高级星座设计功能模块.html" class="content-item link-item">高级星座</a>
        </div>
        <div class="content-row">
          <a href="/5.专业使用指南/13-RPO功能模块.html" class="content-item link-item">RPO工具</a>
          <a href="/5.专业使用指南/10-巨型星座设计模块.html" class="content-item link-item">巨型星座</a>
        </div>
        <div class="content-row">
          <a href="/5.专业使用指南/7-星座设计工具.html" class="content-item link-item">星座设计</a>
        </div>
      </div>
    </div>

    <!-- 二次开发模块 -->
    <div class="module-wrapper">
      <div class="module-hexagon">
        <span class="module-title">二次<br>开发</span>
      </div>
      <div class="module-content">
        <div class="content-row">
          <a href="/二次开发教程/4-二次开发COMPONENT模式/" class="content-item link-item">ATK.Component</a>
          <a href="/二次开发教程/3-MBSE接口/" class="content-item link-item">ATK.MBSE</a>
        </div>
        <div class="content-row">
          <a href="/二次开发教程/2-二次开发CONNECT模式/" class="content-item link-item">ATK.Connect</a>
          <a href="/5.专业使用指南/18-脚本工具/" class="content-item link-item">内置脚本</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 无额外逻辑，纯展示组件
</script>

<style scoped>
/* 全局容器样式 */
.atk-architecture-container {
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Microsoft YaHei", sans-serif;
}

/* 模块整体包装器 */
.module-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  position: relative;
}

/* 六边形模块标题样式 */
.module-hexagon {
  width: 120px;
  height: 69.28px;
  background-color: #1551a3;
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  line-height: 1.4;
  text-align: center;
}

.module-hexagon::before,
.module-hexagon::after {
  content: "";
  position: absolute;
  width: 0;
  border-left: 60px solid transparent;
  border-right: 60px solid transparent;
}

.module-hexagon::before {
  bottom: 100%;
  border-bottom: 34.64px solid #1551a3;
}

.module-hexagon::after {
  top: 100%;
  width: 0;
  border-top: 34.64px solid #1551a3;
}

/* 虚线连接框样式 */
.module-content {
  flex: 1;
  margin-left: 20px;
  padding: 25px 30px;
  border: 2px dashed #00a1e9;
  border-radius: 20px;
  position: relative;
  z-index: 1;
}

/* 内容行样式 */
.content-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.content-row:last-child {
  margin-bottom: 0;
}

/* 内容项样式 */
.content-item {
  width: 48%;
  padding: 8px 15px;
  background: linear-gradient(to right, #d4edfb, transparent);
  border-radius: 6px;
  font-size: 18px;
  color: #231916;
  font-weight: bold;
  text-align: left;
}

/* 链接项样式 */
.link-item {
  text-decoration: none;
  color: #1551a3;
  cursor: pointer;
  transition: all 0.3s ease;
}

.link-item:hover {
  background: linear-gradient(to right, #1551a3, #00a1e9);
  color: #fff;
}

/* 响应式适配 */
@media (max-width: 768px) {
  .module-wrapper {
    flex-direction: column;
    align-items: flex-start;
  }

  .module-content {
    margin-left: 0;
    margin-top: 15px;
    width: 100%;
  }

  .content-item {
    font-size: 16px;
  }
}
</style>
