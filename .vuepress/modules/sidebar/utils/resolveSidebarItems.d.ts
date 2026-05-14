import type { PageData } from "vuepress/client";
import type { ResolvedSidebarItem } from "./typings.js";
import type { SidebarArrayOptions, SidebarObjectOptions, SidebarOptions } from "../../../../shared/index.js";
export interface ResolveArraySidebarOptions {
    config: SidebarArrayOptions;
    page: PageData;
    headerDepth: number;
    prefix?: string;
}
/**
 * Resolve sidebar items if the config is an array
 */
export declare const resolveArraySidebarItems: ({ config, prefix, }: ResolveArraySidebarOptions) => ResolvedSidebarItem[];
export interface ResolveMultiSidebarOptions {
    config: SidebarObjectOptions;
    page: PageData;
    headerDepth: number;
}
/**
 * Resolve sidebar items if the config is a key -> value (path-prefix -> array) object
 */
export declare const resolveMultiSidebarItems: ({ config, page, headerDepth, }: ResolveMultiSidebarOptions) => ResolvedSidebarItem[];
export interface ResolveSidebarOptions {
    config: SidebarOptions;
    routeLocale: string;
    page: PageData;
    headerDepth: number;
}
/**
 * Resolve sidebar items global computed
 *
 * It should only be resolved and provided once
 */
export declare const resolveSidebarItems: ({ config, routeLocale, page, headerDepth, }: ResolveSidebarOptions) => ResolvedSidebarItem[];
