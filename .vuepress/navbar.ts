import { navbar } from "vuepress-theme-hope";

export const useNavbar = ({ offline }) => {
  if (offline) {
    return navbar([
      {
        text: "在线手册",
        link: "https://atkdocs.smsat.space/",
        icon: '/images/logo.png'
      },
      {
        text: "二次开发教程",
        link: "/二次开发教程/",
        // icon: "config"
      },
      {
        text: '下载',
        icon: "book",
        link: 'https://smsat.space/#/download',
      },
      {
        text: '激活',
        link: 'https://smsat.space/#/application',
      }
    ])
  } else {
    return navbar([
      {
        text: "ATK首页",
        link: "https://smsat.space/#/",
        icon: '/images/logo.png'
      },
      {
        text: "下载离线版手册",
        link: "https://cdn.smsat.space/download/atk-doc-offline.zip"
      },
      {
        text: "二次开发教程",
        link: "/二次开发教程/",
        // icon: "config"
      },
      {
        text: '下载',
        icon: "book",
        link: 'https://smsat.space/#/download',
      },
      {
        text: '激活',
        link: 'https://smsat.space/#/application',
      }
    ])
  }
};
