import { hopeTheme } from "vuepress-theme-hope";
import { useNavbar } from "./navbar.js";
import sidebar from "./sidebar.js";
import { redirect } from "vuepress-theme-hope";

export const useHopeTheme = ({ offline }) => hopeTheme({
  // 是否显示打印按钮
  print: true,
  //pure: true,
  darkmode: "switch", //"toggle",
  // 全屏按钮
  // fullscreen: true,
  // 当前网站部署到的域名
  hostname: "https://atkdocs.smsat.space",

  author: {
    name: "国防科技大学空天科学学院",
    email: "atk_nudt@163.com",
  },


  // iconAssets: "fontawesome-with-brands",

  logo: '/images/logo.png',
  logoDark: "/images/logoDark.png",

  // 用于在导航栏中显示仓库链接
  repo: "https://gitcode.com/jinke18/atk-doc",

  docsDir: "/",
  docsRepo:"https://gitcode.com/jinke18/atk-doc",
  docsBranch:"master",
  editLinkPattern:":repo/edit/:branch/:path",
  editLink: true,
  // 导航栏
  navbar: useNavbar({ offline }),
  sidebarSorter: ["readme", "order", "filename", "title"],
  // 侧边栏
  // sidebar,
  sidebar: {
    "/": "structure",
    "/二次开发教程/": "structure"
  },

  // 页脚
  footer: "加快工业软件国产化，服务航天强国建设",
  displayFooter: true,

  // 加密配置
  // encrypt: {
  //   config: {
  //     "/demo/encrypt.html": ["1234"],
  //   },
  // },

  // 多语言配置
  metaLocales: {
    /**
     * 编辑此页文字
     */
    // editLink: "在 GitHub 上编辑此页",
  },

  // 如果想要实时查看任何改变，启用它。注: 这对更新性能有很大负面影响
  // hotReload: true,

  // 在这里配置主题提供的插件
  plugins: {
    redirect:{

    },
    // 注意: 仅用于测试! 你必须自行生成并在生产环境中使用自己的评论服务
    // comment: {
    //   provider: "Giscus",
    //   repo: "vuepress-theme-hope/giscus-discussions",
    //   repoId: "R_kgDOG_Pt2A",
    //   category: "Announcements",
    //   categoryId: "DIC_kwDOG_Pt2M4COD69",
    // },
    git: {
      createdTime: true,
      contributors: false,
      updatedTime: false,
    },
    seo: !offline,
    sitemap: !offline,
    readingTime: false,
    // 开启搜索
    searchPro: offline ? false : {
      autoSuggestions: false,
      queryHistoryCount: 5,
      resultHistoryCount: 5,
      indexContent: true,
      worker: `search-pro-${Date.now()}.worker.js`,
    },
    search: !!offline,

    components: {
      components: ["Badge", "VPCard"],
    },


    // 此处开启了很多功能用于演示，你应仅保留用到的功能。
    mdEnhance: {
      align: true,
      attrs: true,
      codetabs: true,
      component: true,
      demo: true,
      figure: true,
      imgLazyload: true,
      imgSize: true,
      //imgMark: true,
      include: true,
      mark: true,
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      tasklist: true,
      vPre: true,

      // 在启用之前安装 chart.js
      // chart: true,

      // insert component easily

      // 在启用之前安装 echarts
      // echarts: true,

      // 在启用之前安装 flowchart.ts
      // flowchart: true,

      // gfm requires mathjax-full to provide tex support
      gfm: true,

      // 在启用之前安装 katex
      // katex: true,

      // 在启用之前安装 mathjax-full
      mathjax: {
        tex: {
          tags: "all"
        }
      },

      // 在启用之前安装 mermaid
      // mermaid: true,

      // playground: {
      //   presets: ["ts", "vue"],
      // },

      // 在启用之前安装 reveal.js
      // revealJs: {
      //   plugins: ["highlight", "math", "search", "notes", "zoom"],
      // },

      // 在启用之前安装 @vue/repl
      // vuePlayground: true,

      // install sandpack-vue3 before enabling it
      // sandpack: true,
    },

    // 如果你需要 PWA。安装 @vuepress/plugin-pwa 并取消下方注释
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cachePic: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  },
},
  // behavior
  {
    custom: true
  }
);
