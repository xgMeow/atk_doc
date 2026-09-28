---
description: 四种语言 SDK 的共性说明。
index: false
---

# 语言 SDK

ATK 为以下四种语言提供了 SDK，用户可在自己的开发环境中引用 ATK 通信库，通过 TCP 网络连接与 ATK 交互：

- **[Python](1-Python/1-简介与配置.md)** — Python 通信库，适合自动化脚本和快速开发
- **[Matlab](2-Matlab/1-简介与配置.md)** — Matlab 通信库，适配 Matlab R2015b
- **[C++](3-C++/1-简介与配置.md)** — C++ 库文件，支持 Windows（VS2015~2022）和 Linux
- **[Java](4-Java/1-简介与配置.md)** — Java 通信库，基于 JNI 封装，需 JDK 8 及以上

## 共性说明

所有语言 SDK 具有以下共同特点：

- **通信方式**：通过 TCP 网络连接与 ATK 交互，默认端口 `6655`
- **核心 API**：均提供 `atkOpen` / `atkConnect` / `atkClose` 三组核心接口。其中 Java 无默认参数，`atkOpen` 的 IP 与端口需显式传入，`atkConnect` 为 4 参形式（第 4 参为保留参数，传 `""` 即可）
- **命令格式**：均使用统一的 [CONNECT 命令语法](../../2-命令参考/1-命令语法约定.md)
- **库文件位置**：均在 ATK 安装包目录 `IntegratingWithATK\connect\` 下对应语言文件夹中

<Catalog />
