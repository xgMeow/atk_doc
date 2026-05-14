import { defineClientConfig } from 'vuepress/client'
import { useRoute, useRouter } from 'vue-router'
import { resolveRoute as _resolveRoute, resolveRoutePath as _resolveRoutePath } from 'vuepress/client';
import { useRoutes } from 'vuepress/client';
import { defineCatalogInfoGetter } from '@vuepress/plugin-catalog/client'
import EnhancedToc from './components/EnhancedToc.vue'
import NotFound from './components/NotFound.vue'

defineCatalogInfoGetter((meta) => {
    // console.log(meta);
    return meta;
});


var is_file_protocol = false;   // 是否是离线模型
var root_dir = "";              // 用于在离线模式下缓存当前文档所在的文件夹

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    // console.log("__VUEPRESS_SSR__=", __VUEPRESS_SSR__)
    if (!__VUEPRESS_SSR__) {
        if(location.href.startsWith("file://")){
            is_file_protocol = true;
        }
    }
    
    router.beforeEach((to) => {
        //console.log("beforeEach", {to});
    });
  
    router.afterEach((to) => {
        //console.log("afterEach", {to});
    }); 

    router.beforeResolve( async(to, from) => {
        //console.log(Date.now)
        //console.log("from", JSON.stringify(from))
        //console.log("to", JSON.stringify(to))

        if(is_file_protocol){
            if(to.fullPath.startsWith("#")){
                to.hash = to.fullPath;
                to.fullPath = from.fullPath + to.hash;
                to.path = from.path;
                return
            }
            let fullpath = to.fullPath;
            if(fullpath.startsWith("/"))
                fullpath = fullpath.slice(1);
            if(fullpath.indexOf("#") >= 0){
                fullpath = fullpath.split("#")[0]
            }
            let split_path = fullpath.split("/") || []; 

            // console.log("fullpath", fullpath)
            // console.log("split_path", split_path)

            for(let i=0;i<split_path.length;i++){
                let path_new = "/" + split_path.slice(i).join("/");
                let route = _resolveRoute(path_new);
                if(!route.notFound){
                    // 在离线模式下缓存当前文档所在的文件夹路径到root_dir
                    if(!root_dir || i>0){
                        // linux 下必须以/开头, 这样windows也没有问题
                        root_dir = "/" + split_path.slice(0, i).join("/")   
                        // router.options.history.base = "file:///" + root_dir;
                    }
                    // console.log(route)
                    const pageChunk = await route.loader();
                    // console.log(pageChunk)
                    to.path = route.path;

                    // 防止以/结尾时错误跳转的情况，在末尾加上index.html
                    let to_path = to.path;
                    if(to_path.endsWith("/")){
                        to_path = to_path + "index.html";
                    }
                    // console.log("root_dir", root_dir)
                    // console.log("to_path", to_path)
                    // console.log("to.hash", to.hash)

                    to.fullPath = root_dir + to_path + to.hash;

                    to.meta = {
                        // attach route meta
                        ...route.meta,
                        // attach page chunk route meta
                        _pageChunk: pageChunk
                    };
                    console.log(to, "hash=", to.hash);
                    break;
                }
            }
        }
    });
    
  },
  
  setup() {
    // 获取当前的路由位置
    const route = useRoute()
    // 或者 vue-router 实例
    const router = useRouter();
    let routes = useRoutes();
  },
  rootComponents: [EnhancedToc],
  layouts: {
    NotFound,
  },
})
