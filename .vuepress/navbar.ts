import { navbar } from "vuepress-theme-hope";

export const useNavbar = ({ type }) => {
  let standalone = type == "standalone";
  let gitlab = type == "gitlab"
  if(gitlab){
    return navbar([
      {
        text: "下载离线版手册",
        link: "http://192.168.0.253:8888/help-standalone.zip",
      },
    ])
  }
  else if (standalone) {
    return navbar([
      // {
      //   text: "在线手册",
      //   link: "https://atkdocs.smsat.space/",
      //   icon: '/images/logo.png'
      // },
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
        link: "https://smsat.space/#/"
      },
      {
        text: "下载离线版手册",
        link: "https://cdn.smsat.space/download/atk-doc-offline.zip"
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
