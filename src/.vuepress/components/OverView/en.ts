import type { OverViewModule } from './types';

export const enOverViewData: OverViewModule[] = [
  {
    title: 'Standard Platform',
    rows: [
      [
        { name: 'Core Algorithm Library', link: null },
        { name: '2D Visualization', link: '/en/03-基础使用指南/05-二三维地图/02-二维地图/' },
      ],
      [
        { name: 'Simulation Platform', link: '/en/03-基础使用指南/04-仿真控制/' },
        { name: '3D Visualization', link: '/en/03-基础使用指南/05-二三维地图/03-三维地图/' },
      ],
      [
        { name: 'Object Management', link: '/en/03-基础使用指南/03-对象管理/' },
        { name: 'Vector Geometry', link: '/en/5.专业使用指南/10-矢量几何工具.html' },
      ],
      [
        { name: 'Graphic Reports', link: '/en/03-基础使用指南/01-主菜单栏/05-输出.html' },
        { name: 'Model Management', link: null },
      ],
    ],
  },
  {
    title: 'Visibility & Coverage',
    rows: [
      [
        { name: 'Visibility Analysis', link: '/en/5.专业使用指南/01-可见性与覆盖分析/01-可见性工具.html' },
        { name: 'Region Coverage', link: '/en/5.专业使用指南/01-可见性与覆盖分析/03-区域覆盖工具.html' },
      ],
      [
        { name: 'Coverage Analysis', link: '/en/5.专业使用指南/01-可见性与覆盖分析/02-覆盖性工具.html' },
        { name: 'Communication Links', link: '/en/03-基础使用指南/03-对象管理/02-属性配置/链路.html' },
      ],
    ],
  },
  {
    title: 'Mission Analysis',
    rows: [
      [
        { name: 'Access Analysis', link: '/en/5.专业使用指南/07-接近分析.html' },
        { name: 'Batch Coordinate Conversion', link: '/en/5.专业使用指南/04-批量坐标转换工具.html' },
      ],
      [
        { name: 'Advanced Access', link: '/en/5.专业使用指南/05-高级接近分析.html' },
        { name: 'Deviation Analysis', link: '/en/5.专业使用指南/12-偏差分析.html' },
      ],
      [
        { name: 'Launch Window Access', link: '/en/5.专业使用指南/19-发射窗口接近分析工具.html' },
        { name: 'Lifetime Prediction', link: '/en/5.专业使用指南/11-卫星工具/16-寿命预报模块.html' },
      ],
      [
        { name: 'Collision Avoidance', link: '/en/5.专业使用指南/08-碰撞规避.html' },
        { name: 'Satellite System', link: '/en/03-基础使用指南/03-对象管理/02-属性配置/卫星系统.html' },
      ],
    ],
  },
  {
    title: 'Orbit Design',
    rows: [
      [
        { name: 'Maneuver Planning', link: '/en/5.专业使用指南/13-轨道机动规划工具/' },
        { name: 'Advanced Constellation', link: '/en/5.专业使用指南/06-高级星座设计.html' },
      ],
      [
        { name: 'RPO Tools', link: '/en/5.专业使用指南/13-RPO功能模块.html' },
        { name: 'Mega Constellation', link: '/en/5.专业使用指南/11-巨型星座设计模块.html' },
      ],
      [
        { name: 'Constellation Design', link: '/en/5.专业使用指南/05-星座设计工具.html' },
      ],
    ],
  },
  {
    title: 'Secondary Development',
    rows: [
      [
        { name: 'ATK.Component', link: '/en/二次开发教程/4-二次开发COMPONENT模式/' },
        { name: 'ATK.MBSE', link: '/en/二次开发教程/3-MBSE接口/' },
      ],
      [
        { name: 'ATK.Connect', link: '/en/二次开发教程/2-二次开发CONNECT模式/' },
        { name: 'ATK Script', link: '/en/5.专业使用指南/18-脚本工具/' },
      ],
    ],
  },
];
