import { defineComponent, h, ref, watch } from "vue";
import { useRoute } from "vuepress/client";
import SidebarChild from "@theme-hope/modules/sidebar/components/SidebarChild";
import SidebarGroup from "@theme-hope/modules/sidebar/components/SidebarGroup";
import { isMatchedSidebarItem } from "@theme-hope/modules/sidebar/utils/index";
import "../styles/sidebar-links.scss";
export default defineComponent({
    name: "SidebarLinks",
    props: {
        /**
         * Sidebar links config
         *
         * 侧边栏链接配置
         */
        config: {
            type: Array,
            required: true,
        },
    },
    setup(props) {
        const route = useRoute();
        const openGroupIndex = ref({});
        const lastUpdateTime = ref(0);
        const toggleGroup = (index) => {
            if( Date.now() - lastUpdateTime.value > 100){
                openGroupIndex.value[index] = openGroupIndex.value[index] ? false: true;
                lastUpdateTime.value = Date.now();
            }
        };
        watch(() => route.path, () => {
            const index = props.config.findIndex((item) => isMatchedSidebarItem(route, item));
            if( Date.now() - lastUpdateTime.value > 100){
                openGroupIndex.value[index] = true;
                lastUpdateTime.value = Date.now();
            }
        }, { immediate: true, flush: "post" });
        return () => h("ul", { class: "vp-sidebar-links" }, props.config.map((config, index) => h("li", config.type === "group"
            ? h(SidebarGroup, {
                config,
                open: !!openGroupIndex.value[index],
                onToggle: () => toggleGroup(index),
            })
            : h(SidebarChild, { config }))));
    },
});