import { defineComponent, h, onMounted, shallowRef, watch, ref } from "vue";
import { useRoute } from "vuepress/client";
import SidebarLinks from "@theme-hope/modules/sidebar/components/SidebarLinks";
import { useSidebarItems } from "@theme-hope/modules/sidebar/composables/index";
import "../styles/sidebar.scss";

export default defineComponent({
    name: "SideBar",
    slots: Object,
    setup(_props, { slots }) {
        const route = useRoute();
        const sidebarItems = useSidebarItems();
        const sidebar = shallowRef();

        // 搜索功能
        const searchQuery = ref("");

        onMounted(() => {
            if (typeof window !== "undefined") {
                watch(() => route.hash, (hash) => {
                    const activeSidebarItem = document.querySelector(`.vp-sidebar a.vp-sidebar-link[href="${route.path}${hash}"]`);
                    if (!activeSidebarItem) return;
                    const { top: sidebarTop, height: sidebarHeight } = sidebar.value.getBoundingClientRect();
                    const { top: activeSidebarItemTop, height: activeSidebarItemHeight } = activeSidebarItem.getBoundingClientRect();
                    if (activeSidebarItemTop < sidebarTop)
                        activeSidebarItem.scrollIntoView(true);
                    else if (activeSidebarItemTop + activeSidebarItemHeight > sidebarTop + sidebarHeight)
                        activeSidebarItem.scrollIntoView(false);
                }, { immediate: true });
            }
        });

        // 全部折叠
        const collapseAll = () => {
            if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("sidebar-toggle-all", { 
                    detail: { collapsed: true } 
                }));
            }
        };

        // 全部展开
        const expandAll = () => {
            if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("sidebar-toggle-all", { 
                    detail: { collapsed: false } 
                }));
            }
        };

        // 搜索功能
        const handleSearch = () => {
            if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("sidebar-search", { 
                    detail: { query: searchQuery.value } 
                }));
            }
        };

        // 清除搜索
        const clearSearch = () => {
            searchQuery.value = "";
            handleSearch();
        };

        // 搜索图标 SVG
        const searchIcon = h("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            class: "sidebar-icon"
        }, [
            h("circle", { cx: "11", cy: "11", r: "8" }),
            h("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65" })
        ]);

        // 清除图标 SVG
        const clearIcon = h("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "14",
            height: "14",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            class: "sidebar-icon sidebar-clear-icon",
            onClick: clearSearch
        }, [
            h("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
            h("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
        ]);

        // 折叠图标 SVG
        const collapseIcon = h("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "14",
            height: "14",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            class: "sidebar-icon"
        }, [
            h("polyline", { points: "4 14 10 14 10 20" }),
            h("polyline", { points: "20 10 14 10 14 4" }),
            h("line", { x1: "14", y1: "10", x2: "21", y2: "3" }),
            h("line", { x1: "3", y1: "21", x2: "10", y2: "14" })
        ]);

        // 展开图标 SVG
        const expandIcon = h("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "14",
            height: "14",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            class: "sidebar-icon"
        }, [
            h("polyline", { points: "15 3 21 3 21 9" }),
            h("polyline", { points: "9 21 3 21 3 15" }),
            h("line", { x1: "21", y1: "3", x2: "14", y2: "10" }),
            h("line", { x1: "3", y1: "21", x2: "10", y2: "14" })
        ]);

        // 搜索框组件
        const searchBox = h("div", { class: "sidebar-search-box" }, [
            h("div", { class: "sidebar-search-input-wrapper" }, [
                searchIcon,
                h("input", {
                    type: "text",
                    class: "sidebar-search-input",
                    placeholder: "搜索文档...",
                    value: searchQuery.value,
                    onInput: (e) => {
                        searchQuery.value = e.target.value;
                        handleSearch();
                    }
                }),
                searchQuery.value ? clearIcon : null
            ])
        ]);

        // 工具栏组件
        const toolbar = h("div", { class: "sidebar-toolbar" }, [
            h("button", {
                class: "sidebar-toolbar-btn",
                title: "全部折叠",
                onClick: collapseAll
            }, [
                collapseIcon,
                h("span", { class: "sidebar-toolbar-text" }, "全部折叠")
            ]),
            h("button", {
                class: "sidebar-toolbar-btn",
                title: "全部展开",
                onClick: expandAll
            }, [
                expandIcon,
                h("span", { class: "sidebar-toolbar-text" }, "全部展开")
            ])
        ]);

        return () => h("aside", {
            ref: sidebar,
            key: "sidebar",
            id: "sidebar",
            class: "vp-sidebar",
        }, [
            searchBox,
            toolbar,
            slots.top?.(),
            slots.default?.() || h(SidebarLinks, { 
                config: sidebarItems.value,
                searchQuery: searchQuery.value
            }),
            slots.bottom?.(),
        ]);
    },
});
