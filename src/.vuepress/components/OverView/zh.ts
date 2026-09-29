import type { OverViewModule } from './types';

export const zhOverViewData: OverViewModule[] = [
  {
    title: '标准平台',
    rows: [
      [
        { name: '内核算法库', link: null },
        { name: '二维可视化', link: '/zh/03-基础使用指南/05-二三维地图/02-二维地图/' },
      ],
      [
        { name: '仿真平台', link: '/zh/03-基础使用指南/04-仿真控制/' },
        { name: '三维可视化', link: '/zh/03-基础使用指南/05-二三维地图/03-三维地图/' },
      ],
      [
        { name: '对象管理', link: '/zh/03-基础使用指南/03-对象管理/' },
        { name: '矢量几何', link: '/zh/5.专业使用指南/10-矢量几何工具.html' },
      ],
      [
        { name: '图文报告', link: '/zh/03-基础使用指南/01-主菜单栏/05-输出.html' },
        { name: '模型管理', link: null },
      ],
    ],
  },
  {
    title: '可见性与覆盖',
    rows: [
      [
        { name: '可见性分析', link: '/zh/5.专业使用指南/01-可见性与覆盖分析/01-可见性工具.html' },
        { name: '区域覆盖', link: '/zh/5.专业使用指南/01-可见性与覆盖分析/03-区域覆盖工具.html' },
      ],
      [
        { name: '覆盖分析', link: '/zh/5.专业使用指南/01-可见性与覆盖分析/02-覆盖性工具.html' },
        { name: '通信链路', link: '/zh/03-基础使用指南/03-对象管理/02-属性配置/链路.html' },
      ],
    ],
  },
  {
    title: '任务分析',
    rows: [
      [
        { name: '接近分析', link: '/zh/5.专业使用指南/07-接近分析.html' },
        { name: '批量坐标转换', link: '/zh/5.专业使用指南/04-批量坐标转换工具.html' },
      ],
      [
        { name: '高级接近', link: '/zh/5.专业使用指南/05-高级接近分析.html' },
        { name: '偏差分析', link: '/zh/5.专业使用指南/12-偏差分析.html' },
      ],
      [
        { name: '发射窗口接近', link: '/zh/5.专业使用指南/19-发射窗口接近分析工具.html' },
        { name: '寿命预报', link: '/zh/5.专业使用指南/11-卫星工具/16-寿命预报模块.html' },
      ],
      [
        { name: '碰撞规避', link: '/zh/5.专业使用指南/08-碰撞规避.html' },
        { name: '卫星系统', link: '/zh/03-基础使用指南/03-对象管理/02-属性配置/卫星系统.html' },
      ],
    ],
  },
  {
    title: '轨道设计',
    rows: [
      [
        { name: '机动规划', link: '/zh/5.专业使用指南/13-轨道机动规划工具/' },
        { name: '高级星座', link: '/zh/5.专业使用指南/06-高级星座设计.html' },
      ],
      [
        { name: 'RPO工具', link: '/zh/5.专业使用指南/13-RPO功能模块.html' },
        { name: '巨型星座', link: '/zh/5.专业使用指南/11-巨型星座设计模块.html' },
      ],
      [
        { name: '星座设计', link: '/zh/5.专业使用指南/05-星座设计工具.html' },
      ],
    ],
  },
  {
    title: '二次开发',
    rows: [
      [
        { name: 'ATK.Component', link: '/zh/二次开发教程/4-二次开发COMPONENT模式/' },
        { name: 'ATK.MBSE', link: '/zh/二次开发教程/3-MBSE接口/' },
      ],
      [
        { name: 'ATK.Connect', link: '/zh/二次开发教程/2-二次开发CONNECT模式/' },
        { name: '内置脚本', link: '/zh/5.专业使用指南/18-脚本工具/' },
      ],
    ],
  },
];
