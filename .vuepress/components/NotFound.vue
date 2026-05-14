<template>
  <div class="not-found">
    <!-- 背景太空元素 -->
    <div class="space-bg">
      <!-- 抽象星球 -->
      <div class="planet planet-1"></div>
      <div class="planet planet-2"></div>
      <div class="planet planet-3"></div>
      
      <!-- 轨道线 -->
      <div class="orbit-line orbit-1"></div>
      <div class="orbit-line orbit-2"></div>
      
      <!-- 星尘粒子 -->
      <div class="stardust">
        <span v-for="i in 20" :key="i" class="dust" :style="getDustStyle(i)"></span>
      </div>
      
      <!-- 光晕 -->
      <div class="glow glow-1"></div>
      <div class="glow glow-2"></div>
    </div>

    <!-- 主内容卡片 - 毛玻璃效果 -->
    <div class="content-card">
      <div class="icon-container">
        <img src="/images/404-icon.png" alt="404" class="main-icon" />
      </div>
      
      <h1 class="title">信号丢失 · 轨道偏离</h1>
      <p class="desc">
        哎呀，目标页面似乎已经脱离轨道，飞向遥远的太空深处了。
        <br />
        <span class="hint">检查一下URL是否正确，或者返回首页重新定位</span>
      </p>

      <div class="actions">
        <router-link to="/" class="btn btn-primary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          返回首页
        </router-link>
        <button @click="goBack" class="btn btn-secondary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回上页
        </button>
      </div>

      <div class="footer-tip">
       <svg t="1775743538044" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="5976" width="256" height="256">
          <path
            d="M512 992C246.912 992 32 777.088 32 512 32 246.912 246.912 32 512 32c265.088 0 480 214.912 480 480 0 265.088-214.912 480-480 480z m0-64c229.76 0 416-186.24 416-416S741.76 96 512 96 96 282.24 96 512s186.24 416 416 416z"
            fill="#94a3b8" p-id="5977"></path>
          <path
            d="M552 601.696v22.432h-80v-22.432c0-51.296 24.192-99.808 58.816-136.704 26.464-28.224 25.728-27.424 33.28-36.384 19.968-23.776 27.904-40.768 27.904-60.608a80 80 0 1 0-160 0H352a160 160 0 0 1 320 0c0 41.664-15.68 75.2-46.656 112.064-5.216 6.208-10.88 12.576-17.856 20.096-2.688 2.88-5.44 5.888-9.152 9.792l-9.152 9.76c-21.952 23.36-37.184 53.92-37.184 81.984zM545.856 717.984c9.44 9.312 14.144 20.672 14.144 34.016 0 13.6-4.704 24.992-14.144 34.208A46.784 46.784 0 0 1 512 800c-13.12 0-24.448-4.608-33.856-13.792A45.856 45.856 0 0 1 464 752c0-13.344 4.704-24.704 14.144-34.016A46.464 46.464 0 0 1 512 704c13.12 0 24.448 4.672 33.856 13.984z"
            fill="#94a3b8" p-id="5978"></path>
        </svg>
        如果问题持续存在，请联系技术支持
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  methods: {
    goBack() {
      if (window.history.length > 1) {
        this.$router.go(-1)
      } else {
        this.$router.push('/')
      }
    },
    getDustStyle(i) {
      const size = Math.random() * 3 + 1
      const x = Math.random() * 100
      const y = Math.random() * 100
      const delay = Math.random() * 5
      const duration = Math.random() * 3 + 2
      return {
        width: size + 'px',
        height: size + 'px',
        left: x + '%',
        top: y + '%',
        animationDelay: delay + 's',
        animationDuration: duration + 's'
      }
    }
  }
}
</script>

<style scoped>
/* 基础容器 */
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%);
  position: relative;
  overflow: hidden;
}

/* ====== 背景太空元素 ====== */
.space-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

/* 抽象星球 - 拟态风格 */
.planet {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(145deg, #f0f4f8, #dde4ed);
  box-shadow: 
    20px 20px 60px #c8d0d8,
    -20px -20px 60px #ffffff;
}

.planet::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255,255,255,0.8), transparent);
}

.planet-1 {
  width: 180px;
  height: 180px;
  top: 8%;
  right: 12%;
  opacity: 0.6;
  animation: float-slow 20s ease-in-out infinite;
}
.planet-1::after {
  width: 40px;
  height: 40px;
  top: 20%;
  left: 20%;
}

.planet-2 {
  width: 120px;
  height: 120px;
  bottom: 15%;
  left: 8%;
  opacity: 0.5;
  animation: float-slow 25s ease-in-out infinite reverse;
}
.planet-2::after {
  width: 30px;
  height: 30px;
  top: 25%;
  left: 25%;
}

.planet-3 {
  width: 80px;
  height: 80px;
  top: 60%;
  right: 8%;
  opacity: 0.4;
  animation: float-slow 18s ease-in-out infinite;
}
.planet-3::after {
  width: 20px;
  height: 20px;
  top: 20%;
  left: 20%;
}

/* 轨道线 - 淡雅弧线 */
.orbit-line {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(148, 163, 184, 0.2);
}

.orbit-1 {
  width: 600px;
  height: 300px;
  top: -100px;
  left: -200px;
  transform: rotate(-15deg);
}

.orbit-2 {
  width: 500px;
  height: 250px;
  bottom: -80px;
  right: -150px;
  transform: rotate(20deg);
}

/* 星尘粒子 */
.stardust .dust {
  position: absolute;
  background: radial-gradient(circle, rgba(148, 163, 184, 0.6), transparent);
  border-radius: 50%;
  animation: twinkle ease-in-out infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.2; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.2); }
}

/* 光晕效果 */
.glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
}

.glow-1 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(147, 197, 253, 0.4), transparent);
  top: 10%;
  right: 5%;
  animation: pulse-glow 8s ease-in-out infinite;
}

.glow-2 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(196, 181, 253, 0.3), transparent);
  bottom: 20%;
  left: 10%;
  animation: pulse-glow 10s ease-in-out infinite reverse;
}

@keyframes pulse-glow {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.1); opacity: 0.4; }
}

@keyframes float-slow {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

/* ====== 主内容卡片 - 毛玻璃效果 ====== */
.content-card {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 48px 40px;
  width: 60%;
  
  /* 毛玻璃效果 */
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(50px);
  
  /* 拟态阴影 */
  border-radius: 24px;
  box-shadow: 
    0 8px 32px rgba(148, 163, 184, 0.15),
    inset 0 1px 1px rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.5);
}

/* 图标容器 */
.icon-container {
  margin-bottom: 24px;
}

.main-icon {
  width: 520px;
  height: auto;
  animation: icon-float 4s ease-in-out infinite;
  filter: drop-shadow(0 10px 30px rgba(100, 116, 139, 0.15));
}

@keyframes icon-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

/* 标题 */
.title {
  font-size: 26px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 12px;
  letter-spacing: 1px;
  width: 100%;
}

/* 描述 */
.desc {
  font-size: 15px;
  color: #64748b;
  line-height: 1.8;
  margin: 0 0 28px;
}

.hint {
  font-size: 13px;
  color: #94a3b8;
}

/* 按钮组 */
.actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn svg {
  width: 16px;
  height: 16px;
}

.btn-primary {
  background: linear-gradient(135deg, #475569 0%, #334155 100%);
  color: #fff;
  box-shadow: 0 4px 14px rgba(71, 85, 105, 0.25);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(71, 85, 105, 0.35);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.8);
  color: #475569;
  border: 1px solid rgba(148, 163, 184, 0.3);
  box-shadow: 0 2px 8px rgba(148, 163, 184, 0.1);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.95);
  border-color: rgba(148, 163, 184, 0.5);
  transform: translateY(-2px);
}

/* 底部提示 */
.footer-tip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #94a3b8;
}

.footer-tip svg {
  width: 14px;
  height: 14px;
}

/* ====== 响应式 ====== */
@media (max-width: 640px) {
  .content-card {
    padding: 32px 24px;
  }
  
  .main-icon {
    width: 200px;
  }
  
  .title {
    font-size: 22px;
  }
  
  .actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 240px;
    justify-content: center;
  }
  
  .planet-1, .planet-2, .planet-3 {
    opacity: 0.3;
  }
}

@media (max-width: 480px) {
  .main-icon {
    width: 160px;
  }
  
  .title {
    font-size: 20px;
    letter-spacing: 0;
  }
}
</style>
