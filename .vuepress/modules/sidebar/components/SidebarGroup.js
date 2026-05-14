import { computed, defineComponent, h, onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vuepress/client";
import AutoLink from "@theme-hope/components/AutoLink";
import HopeIcon from "@theme-hope/components/HopeIcon";
import SidebarLinks from "@theme-hope/modules/sidebar/components/SidebarLinks";
import { isActiveSidebarItem } from "@theme-hope/modules/sidebar/utils/index";
import "../styles/sidebar-group.scss";

export default defineComponent({
    name: "SidebarGroup",
    props: {
        config: {
            type: Object,
            required: true,
        },
        open: {
            type: Boolean,
            required: true,
        },
    },
    emits: ["toggle"],
    setup(props, { emit }) {
        const route = useRoute();
        const active = computed(() => isActiveSidebarItem(route, props.config));
        const exact = computed(() => isActiveSidebarItem(route, props.config, true));

        const searchQuery = ref("");

        const handleSearch = (event) => {
            searchQuery.value = event.detail.query || "";
        };

        onMounted(() => {
            if (typeof window !== "undefined") {
                window.addEventListener("sidebar-search", handleSearch);
            }
        });

        onUnmounted(() => {
            if (typeof window !== "undefined") {
                window.removeEventListener("sidebar-search", handleSearch);
            }
        });

        const isMatched = computed(() => {
            if (!searchQuery.value || !props.config.text) return false;
            return props.config.text.toLowerCase().includes(searchQuery.value.toLowerCase());
        });

        return () => {
            const { collapsible, children = [], icon, prefix, link, text } = props.config;
            return h("section", {
                class: [
                    "vp-sidebar-group",
                    { "search-matched": isMatched.value }
                ]
            }, [
                h(collapsible ? "button" : "p", {
                    class: [
                        "vp-sidebar-header",
                        {
                            clickable: collapsible || link,
                            exact: exact.value,
                            active: active.value,
                        },
                    ],
                    ...(collapsible
                        ? {
                            type: "button",
                            onClick: () => emit("toggle"),
                            onKeydown: (event) => {
                                if (event.key === "Enter") emit("toggle");
                            },
                        }
                        : {}),
                }, [
                    h(HopeIcon, { icon }),
                    link
                        ? h(AutoLink, {
                            class: "vp-sidebar-title",
                            config: { text, link },
                            noExternalLinkIcon: true,
                        })
                        : h("span", { class: "vp-sidebar-title" }, text),
                    collapsible
                        ? h("span", { class: ["vp-arrow", props.open ? "down" : "end"] })
                        : null,
                ]),
                h(SidebarLinks, {
                    key: prefix,
                    config: children,
                    style: { display: (props.open || !collapsible) ? "block" : "none" }
                })
            ]);
        };
    },
});
