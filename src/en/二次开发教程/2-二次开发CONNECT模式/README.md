---
description: Overview of ATK Connect mode. Connect mode controls ATK over TCP network communication, supporting the Python Client tool and the Python, Matlab, C++, Java, and Octave language SDKs, with the ATK Script tool as a supplement.
index: true
---

# Connect Mode

Connect Mode connects to the ATK software over TCP networks, allowing users to control ATK by writing scripts and sending commands.

The core API consists of three groups of interfaces: `atkOpen` (establish a connection), `atkConnect` (send commands), and `atkClose` (close the connection). All development methods are based on these three groups of interfaces, and commands uniformly use the [Connect command syntax](2-命令参考/1-命令语法约定.md).

Before you start development, first learn about [ATK Startup and Port Configuration](0-ATK启动与端口配置/) (default port, specifying a port, and checking the port).

## Development Method Comparison

ATK development methods are classified into two categories based on their communication mechanism:

### Network Communication (TCP)

The Python Client tool, Python SDK, Matlab SDK, C++ SDK, Java SDK, and Octave SDK all communicate with ATK over the **TCP network**. The client/SDK runs in an independent process, exchanging data with the ATK software over the network.

This means the client/SDK and ATK **do not need to be on the same machine** — as long as the network is reachable, you can remotely control ATK from any computer on the LAN.

### In-Process Invocation

The [ATK Script tool](1-开发方式/1-ATK脚本工具.md) is special: ATK scripts (`.atks`) run directly inside the ATK program process, directly invoking ATK internal functions without going through TCP network communication.

| Development Method | Entry Point | Communication | Language | Suitable Scenarios |
|----------|------|------|------|----------|
| [Python Client tool](1-开发方式/2-Python客户端工具/1-简介与配置.md) | ATK Menu → Integration → Client | TCP (remote-capable) | Python | Don't want to configure an environment; write Python scripts directly in ATK |
| [Python SDK](1-开发方式/4-语言SDK/1-Python/1-简介与配置.md) | Self-built Python environment | TCP (remote-capable) | Python | Use ATK in your own Python project |
| [Matlab SDK](1-开发方式/4-语言SDK/2-Matlab/1-简介与配置.md) | Self-built Matlab environment | TCP (remote-capable) | Matlab | Use ATK in your own Matlab project |
| [C++ SDK](1-开发方式/4-语言SDK/3-C++/1-简介与配置.md) | Self-built C++ environment | TCP (remote-capable) | C++ | Use ATK in your own C++ project |
| [Java SDK](1-开发方式/4-语言SDK/4-Java/1-简介与配置.md) | Self-built Java environment | TCP (remote-capable) | Java | Use ATK in your own Java project |
| [Octave SDK](1-开发方式/4-语言SDK/5-Octave/1-简介与配置.md) | Self-built Octave environment | TCP (remote-capable) | Octave | Use ATK in your own Octave project |
| [ATK Script tool](1-开发方式/1-ATK脚本工具.md) | ATK Menu → Integration → ATK Script | In-process invocation | ATK Script (.atks) | Scenarios that run in the same process as ATK without requiring network communication |

::: tip How to Choose
- **Don't want to configure an environment** → [Python Client tool](1-开发方式/2-Python客户端工具/1-简介与配置.md), built into ATK and ready to use
- **Need to use ATK in your own project** → [Language SDK](1-开发方式/4-语言SDK/README.md), choose the language you are familiar with
- **Need to remotely control ATK from another computer** → any TCP method works, as long as the client/SDK and ATK have network access to each other
- **Don't want to configure an external environment and don't need network communication** → [ATK Script tool](1-开发方式/1-ATK脚本工具.md), direct in-process invocation with ATK's built-in scripting language
:::
