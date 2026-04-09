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
          <div class="content-item">二维可视化</div>
        </div>
        <div class="content-row">
          <div class="content-item">仿真平台</div>
          <div class="content-item">三维可视化</div>
        </div>
        <div class="content-row">
          <div class="content-item">对象管理</div>
          <div class="content-item">矢量几何</div>
        </div>
        <div class="content-row">
          <div class="content-item">图文报告</div>
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
          <div class="content-item">可见性分析</div>
          <div class="content-item">区域覆盖</div>
        </div>
        <div class="content-row">
          <div class="content-item">覆盖分析</div>
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
          <div class="content-item">接近分析</div>
          <div class="content-item">批量坐标转换</div>
        </div>
        <div class="content-row">
          <div class="content-item">高级接近</div>
          <div class="content-item">偏差分析</div>
        </div>
        <div class="content-row">
          <div class="content-item">发射窗口接近</div>
          <div class="content-item">寿命预报</div>
        </div>
        <div class="content-row">
          <div class="content-item">碰撞规避</div>
          <div class="content-item">卫星系统</div>
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
          <div class="content-item">机动规划</div>
          <div class="content-item">高级星座</div>
        </div>
        <div class="content-row">
          <div class="content-item">RPO工具</div>
          <div class="content-item">巨型星座</div>
        </div>
        <div class="content-row">
          <div class="content-item">星座设计</div>
          <div class="content-item"></div>
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
          <div class="content-item">ATK.Component</div>
          <div class="content-item">ATK.MBSE</div>
        </div>
        <div class="content-row">
          <div class="content-item">ATK.Connect</div>
          <div class="content-item">内置脚本</div>
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
  width: 100%;
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
  background-color: #1a5fb4;
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
  border-bottom: 34.64px solid #1a5fb4;
}

.module-hexagon::after {
  top: 100%;
  width: 0;
  border-top: 34.64px solid #1a5fb4;
}

/* 虚线连接框样式 */
.module-content {
  flex: 1;
  margin-left: 20px;
  padding: 25px 30px;
  border: 2px dashed #66ccff;
  border-radius: 20px;
  background-color: #f8fbff;
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
  background-color: #e6f3ff;
  border-radius: 6px;
  font-size: 18px;
  color: #333;
  font-weight: 500;
  text-align: left;
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