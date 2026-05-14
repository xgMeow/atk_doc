import { isActiveLink } from "vuepress-shared/client";
import { isActiveSidebarItem } from "./isActiveSidebarItem.js";
export const isMatchedSidebarItem = (route, item) => {
    if (item.type === "group")
        return (item.children.some((child) => {
            if (child.type === "group")
                return isMatchedSidebarItem(route, child);
            return child.type === "page" && isActiveSidebarItem(route, child, true);
        }) ||
            ("prefix" in item && isActiveLink(route, item.prefix)));
    return false;
};