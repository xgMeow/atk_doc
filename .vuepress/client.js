import { defineClientConfig } from 'vuepress/client'
import { useRoute, useRouter } from 'vue-router'
import { resolveRoute as _resolveRoute, resolveRoutePath as _resolveRoutePath } from 'vuepress/client';
import { useRoutes } from 'vuepress/client';
import { defineCatalogInfoGetter } from '@vuepress/plugin-catalog/client'

defineCatalogInfoGetter((meta) => {
    // console.log(meta);
    return meta;
});


var is_file_protocol = false;
var root_dir = "";

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
        // console.log(JSON.stringify({from}), from)
        // console.log(JSON.stringify({to}), to)

        if(is_file_protocol){
            if(to.fullPath.startsWith("#")){
                to.hash = to.fullPath;
                to.fullPath = from.fullPath;
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
            for(let i=0;i<split_path.length;i++){
                let path_new = "/" + split_path.slice(i).join("/");
                let route = _resolveRoute(path_new);
                if(!route.notFound){
                    if(!root_dir || i>0){
                        root_dir = split_path.slice(0, i).join("/")
                        // router.options.history.base = "file:///" + root_dir;
                    }
                    // console.log(route)
                    const pageChunk = await route.loader();
                    // console.log(pageChunk)
                    to.path = route.path;
                    to.fullPath = root_dir + to.path;
                    if(to.fullPath.endsWith("/")){
                        to.fullPath = to.fullPath + "index.html";
                    }
                    to.meta = {
                        // attach route meta
                        ...route.meta,
                        // attach page chunk route meta
                        _pageChunk: pageChunk
                    };
                    //console.log({to});
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
    // console.log(route);
    // console.log(router);
    // console.log(routes);
    // if (!__VUEPRESS_SSR__) {
    //     if(location.href.startsWith("file://") && !is_file_protocol){
    //         is_file_protocol = true;
    //     }
    //     console.log(route.fullPath);
    //     let fullpath = route.fullPath;
    //     console.log(fullpath)
    //     let split_path = fullpath.split("/") || []; 
    //     for(let i=0;i<split_path.length;i++){
    //         let path_new = "/" + split_path.slice(i).join("/");
    //         let _route = _resolveRoute(path_new);
    //         if(!_route.notFound){
    //             if(!root_dir || i>0){
    //                 root_dir = split_path.slice(0, i).join("/")
    //                 console.log(root_dir)
    //                 router.options.history.base = "file:///" + root_dir + "";
    //             }
    //         }
    //     }
    // }
  },
  rootComponents: [],
})
