---
description: ATK CONNECT 模式概述。CONNECT 模式通过 TCP 网络通信操控 ATK，支持 Python 客户端工具，以及 Python、Matlab、C++、Java、Octave 五种语言 SDK，另有 ATK 脚本工具作为补充。
index: true
---

# CONNECT模式

CONNECT 模式使用 TCP 网络方式与 ATK 软件进行连接，用户通过编写脚本发送命令的方式对 ATK 软件进行操控。

核心 API 由三组接口组成：`atkOpen`（建立连接）、`atkConnect`（发送命令）、`atkClose`（断开连接）。所有开发方式均基于此三组接口，命令格式统一使用 [CONNECT 命令语法](2-命令参考/1-命令语法约定.md)。

开始开发前，请先了解 [ATK 启动与端口配置](0-ATK启动与端口配置/)（默认端口、指定端口、查看端口）。

## 开发方式对比

ATK 的开发方式按通信机制分为两类：

### 网络通信（TCP）

Python 客户端工具、Python SDK、Matlab SDK、C++ SDK、Java SDK、Octave SDK 均通过 **TCP 网络** 与 ATK 通信。客户端/SDK 运行在独立的进程中，与 ATK 软件通过网络收发数据。

这意味着客户端/SDK 和 ATK **不必在同一台机器上**——只要网络互通，你可以在局域网内的任意一台电脑上远程操控 ATK。

### 进程内调用

[ATK 脚本工具](1-开发方式/1-ATK脚本工具.md) 比较特殊：ATK 脚本（`.atks`）直接在 ATK 程序进程内运行，直接调用 ATK 内部函数，不需要经过 TCP 网络通信。

| 开发方式 | 入口 | 通信 | 语言 | 适用场景 |
|----------|------|------|------|----------|
| [Python 客户端工具](1-开发方式/2-Python客户端工具/1-简介与配置.md) | ATK菜单 → 集成 → 客户端 | TCP（可远程） | Python | 不想配置环境，直接在ATK中编写Python脚本 |
| [Python SDK](1-开发方式/4-语言SDK/1-Python/1-简介与配置.md) | 自建 Python 环境 | TCP（可远程） | Python | 在自己的Python项目中使用ATK |
| [Matlab SDK](1-开发方式/4-语言SDK/2-Matlab/1-简介与配置.md) | 自建 Matlab 环境 | TCP（可远程） | Matlab | 在自己的Matlab项目中使用ATK |
| [C++ SDK](1-开发方式/4-语言SDK/3-C++/1-简介与配置.md) | 自建 C++ 环境 | TCP（可远程） | C++ | 在自己的C++项目中使用ATK |
| [Java SDK](1-开发方式/4-语言SDK/4-Java/1-简介与配置.md) | 自建 Java 环境 | TCP（可远程） | Java | 在自己的Java项目中使用ATK |
| [Octave SDK](1-开发方式/4-语言SDK/5-Octave/1-简介与配置.md) | 自建 Octave 环境 | TCP（可远程） | Octave | 在自己的Octave项目中使用ATK |
| [ATK 脚本工具](1-开发方式/1-ATK脚本工具.md) | ATK菜单 → 集成 → ATK脚本 | 进程内调用 | ATK脚本(.atks) | 与ATK在同一进程运行，无需网络通信的场景 |

::: tip 如何选择
- **不想配置环境** → [Python 客户端工具](1-开发方式/2-Python客户端工具/1-简介与配置.md)，ATK 内置，打开即用
- **需要在自己项目中使用 ATK** → [语言 SDK](1-开发方式/4-语言SDK/README.md)，选择你熟悉的语言
- **需要在其他电脑上远程操控 ATK** → 任意 TCP 方式均可，客户端/SDK 与 ATK 只要网络互通即可
- **不想配置外部环境，也不需要网络通信** → [ATK 脚本工具](1-开发方式/1-ATK脚本工具.md)，进程内直接调用，ATK 内置脚本语言
:::
