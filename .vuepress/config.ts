import { siteBase } from "./shared/config.js";
import { defineUserConfig } from "vuepress";
import {useHopeTheme} from "./theme.js";
import { standaloneBundler } from './bundler-standalone/index.js'
import path from "path"
import viteBundler from "@vuepress/bundler-vite";
import webpackBundler from "@vuepress/bundler-webpack";
import { include } from "@mdit/plugin-include";

export const useConfig = ({type, plat=""}) => {
  let standalone = type == "standalone";
  return defineUserConfig({
    // GitHub Pages 部署路径。仓库名是 atk_doc，所以网站在 /atk_doc/ 子目录下
    base: siteBase,
    lang: "zh-CN",
    title: standalone ? "ATK 帮助文档(离线版)": "ATK 帮助文档",
    description: "加快工业软件国产化，服务航天强国建设",
    // 配置网站图标
    head: [['link', { rel: 'icon', href: '/images/logo.png'}]],
    alias:{
      "@theme-hope/components/PageNav": path.resolve(__dirname,"./components/PageNav.js",),
      //"@theme-hope/components/transitions/index": path.resolve(__dirname,"./components/transitions/index",),
      "@theme-hope/modules/sidebar/components/Sidebar":  path.resolve(__dirname,"./modules/sidebar/components/Sidebar",),
      "@theme-hope/modules/sidebar/components/SidebarChild": path.resolve(__dirname,"./modules/sidebar/components/SidebarChild",),
      "@theme-hope/modules/sidebar/components/SidebarGroup": path.resolve(__dirname,"./modules/sidebar/components/SidebarGroup",),
      "@theme-hope/modules/sidebar/components/SidebarLinks": path.resolve(__dirname,"./modules/sidebar/components/SidebarLinks",),
      "@components": path.resolve(__dirname,"./components",),
    },
    markdown:{
      // toc: { includeLevel: [2, 3, 4, 5, 6] },
      headers: { level: [2, 6] },
      code:{
        lineNumbers: 5
      },
      // 新增：集成 include 插件
      extendsMarkdown: (md) => {
        md.use(include, {
          currentPath: (env) => env.filePath,
        });
      },
    },
    extendsPage: (page) => {
      let order = page.frontmatter.order;
      if(!order){
        let name;
        if(page.slug.toUpperCase() == "README"){
          name = path.basename(path.dirname(page.filePathRelative))
        }else{
          name = page.slug;
        }
        let res = name.match(/([0-9\.]*)/);
        if(res && res[1]){
          let chapter = res[1].replace(/\.$/, "");
          let list = chapter.split(".");
          order = parseInt( list[list.length-1] )|| undefined;
        }
      }
      // 在 routeMeta 中设置目录信息
      page.routeMeta = {
        ...page.routeMeta,
        // 目录标题
        title: page.title,
        order: order
      }
    },
    shouldPrefetch: false,
    theme: useHopeTheme({type, plat}),

    bundler: standalone?
      standaloneBundler({
        configureWebpack(config, isServer){
          if(!isServer && standalone){
            if(!config.output){
              config.output = {};
            }
            config.output.asyncChunks = false;
            // config.optimization.splitChunks= {chunks:"all"};
          }
        },
        chainWebpack(config, isServer, isBuild) {
          if(!isServer)
          {
            config.module
            .rule('js')
            .test(/\.js$/)
            .use("babel-loader")
            .loader("babel-loader")
            .end()
          }

        },
        // evergreen: true,
      }): 
      viteBundler()
    ,
    // 和 PWA 一起启用
    // shouldPrefetch: false,
  });
};

export default useConfig({type:"online"});