import { defineComponent, h, ref, watch, onMounted, onUnmounted } from "vue";
import { useRoute } from "vuepress/client";
import SidebarChild from "@theme-hope/modules/sidebar/components/SidebarChild";
import SidebarGroup from "@theme-hope/modules/sidebar/components/SidebarGroup";
import { isMatchedSidebarItem } from "@theme-hope/modules/sidebar/utils/index";
import "../styles/sidebar-links.scss";

export default defineComponent({
    name: "SidebarLinks",
    props: {
        config: {
            type: Array,
            required: true,
        },
        searchQuery: {
            type: String,
            default: "",
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

        // 监听全部折叠/展开事件
        const handleToggleAll = (event) => {
            const { collapsed } = event.detail;
            const newState = {};
            props.config.forEach((_, index) => {
                newState[index] = !collapsed;
            });
            openGroupIndex.value = newState;
            lastUpdateTime.value = Date.now();
        };

        // 监听搜索事件
        const handleSearch = (event) => {
            const { query } = event.detail;
            if (!query) return;

            const lowerQuery = query.toLowerCase();
            const newState = {};
            props.config.forEach((item, index) => {
                const hasMatch = (item) => {
                    if (item.text && item.text.toLowerCase().includes(lowerQuery)) {
                        return true;
                    }
                    if (item.children) {
                        return item.children.some(hasMatch);
                    }
                    return false;
                };
                newState[index] = hasMatch(item);
            });

            openGroupIndex.value = { ...openGroupIndex.value, ...newState };
        };

        onMounted(() => {
            if (typeof window !== "undefined") {
                window.addEventListener("sidebar-toggle-all", handleToggleAll);
                window.addEventListener("sidebar-search", handleSearch);
            }
        });

        onUnmounted(() => {
            if (typeof window !== "undefined") {
                window.removeEventListener("sidebar-toggle-all", handleToggleAll);
                window.removeEventListener("sidebar-search", handleSearch);
            }
        });

        watch(() => route.path, () => {
            const index = props.config.findIndex((item) => isMatchedSidebarItem(route, item));
            if( Date.now() - lastUpdateTime.value > 100){
                openGroupIndex.value[index] = true;
                lastUpdateTime.value = Date.now();
            }
        }, { immediate: true, flush: "post" });

        // 递归检查是否有匹配的子项
        const hasMatchedChild = (item) => {
            if (!props.searchQuery) return true;
            const lowerQuery = props.searchQuery.toLowerCase();
            if (item.text && item.text.toLowerCase().includes(lowerQuery)) {
                return true;
            }
            if (item.children) {
                return item.children.some(hasMatchedChild);
            }
            return false;
        };

        // 过滤配置
        const filteredConfig = props.config.map((item, index) => {
            if (!props.searchQuery) return { item, index };
            if (hasMatchedChild(item)) {
                return { item, index };
            }
            return null;
        }).filter(Boolean);

        return () => h("ul", { class: "vp-sidebar-links" }, filteredConfig.map(({ item, index }) => {
            return h("li", {
                class: ["sidebar-item-wrapper"]
            }, item.type === "group"
                ? h(SidebarGroup, {
                    config: item,
                    open: !!openGroupIndex.value[index],
                    onToggle: () => toggleGroup(index),
                })
                : h(SidebarChild, { config: item }));
        }));
    },
});
