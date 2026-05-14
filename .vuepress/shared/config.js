// 文档站点的 base 路径，所有页面链接都相对于此路径
// 应该配置成GitHub Pages 部署路径，否则图片资源等会加载不正确。
// 例如仓库名是 atk_doc，所以网站在 /atk_doc/ 子目录下，那么base就要配置成'/atk_doc/'
// overview组件也要基于这个地址进行调整，否则在overview页面中点击链接会跳转到根路径下，导致资源加载失败。
export const siteBase = '/atk_doc/'
