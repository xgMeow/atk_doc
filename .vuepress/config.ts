import { defineUserConfig } from "vuepress";
import {useHopeTheme} from "./theme.js";
import { standaloneBundler } from './bundler-standalone/index.js'
import path from "path"
import viteBundler from "@vuepress/bundler-vite";

export const useConfig = ({type}) => {
  let standalone = type == "standalone";
  return defineUserConfig({
    base: "/",
    lang: "zh-CN",
    title: standalone ? "ATK 帮助文档(离线版)": "ATK 3.5 帮助文档",
    description: "加快工业软件国产化，服务航天强国建设",
    alias:{
      "@theme-hope/components/PageNav": path.resolve(__dirname,"./components/PageNav.js",),
      //"@theme-hope/components/transitions/index": path.resolve(__dirname,"./components/transitions/index",),
      "@theme-hope/modules/sidebar/components/Sidebar":  path.resolve(__dirname,"./modules/sidebar/components/Sidebar",),
      "@theme-hope/modules/sidebar/components/SidebarChild": path.resolve(__dirname,"./modules/sidebar/components/SidebarChild",),
      "@theme-hope/modules/sidebar/components/SidebarGroup": path.resolve(__dirname,"./modules/sidebar/components/SidebarGroup",),
      "@theme-hope/modules/sidebar/components/SidebarLinks": path.resolve(__dirname,"./modules/sidebar/components/SidebarLinks",),
    },
    markdown:{
      code:{
        lineNumbers: 5
      }
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
    theme: useHopeTheme({type}),

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
        // evergreen: true,
      }): 
      viteBundler()
    ,
    // 和 PWA 一起启用
    // shouldPrefetch: false,
  });
};

export default useConfig({type:"online"});