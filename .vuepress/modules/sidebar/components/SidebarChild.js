import { isString } from "@vuepress/helper/client";
import { defineComponent, h, computed, ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vuepress/client";
import AutoLink from "@theme-hope/components/AutoLink";
import HopeIcon from "@theme-hope/components/HopeIcon";
import { isActiveSidebarItem } from "@theme-hope/modules/sidebar/utils/index";
import "../styles/sidebar-child.scss";

export default defineComponent({
    name: "SidebarChild",
    props: {
        /**
         * Sidebar item config
         *
         * 侧边栏项目配置
         */
        config: {
            type: Object,
            required: true,
        },
    },
    setup(props) {
        const route = useRoute();
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

        return () =>
            isString(props.config.link)
                ? // If the item has link, render it as `<AutoLink>`
                  h(AutoLink, {
                      class: [
                          "vp-sidebar-link",
                          "vp-sidebar-page",
                          { 
                              active: isActiveSidebarItem(route, props.config, true),
                              "search-matched": isMatched.value
                          },
                      ],
                      exact: true,
                      config: props.config,
                  })
                : // If the item only has text, render it as `<p>`
                  h("p", {
                      class: [
                          { "search-matched": isMatched.value }
                      ]
                  }, [
                      h(HopeIcon, { icon: props.config.icon }),
                      props.config.text,
                  ]);
    },
});
