---
title: Java接口
---

::: info
设置属性后需重新打开对象属性界面属性数据才会更新。
:::

ATK 二次开发模块支持 Connect 模式。以下使用介绍均基于 Connect 模式。

目前 JAVA 客户端与 ATK 使用 atkOpen 命令进行连接，使用 atkConnect 命令进行属性设置。使用atkClose 命令与 ATK 断开连接。

客户端使用 JAVA1.8.0 版本，打开 JAVA 客户端与 ATK 进行连接，如下图：

![ATK 打开界面](media/README/image.png)


此客户端提供 JAVA 程序；提供 ATKConnectorTools.jar，用来完成 ATK 与 JAVA 客户端的数据传输与解析，其中包含 atkOpen、atkConnect、atkClose 函数
用以完成 ATK 与 JAVA 客户端的链接与参数设置；提供 startATKConnector.bat 文件用来实现客户端命令的输入输出。

## atkOpen

用法：

```
conID = atkOpen('hostStr', PortStr)
```

说明：
- `conID` - 连接句柄
- `hostStr` - 进行连接的网络地址
- `PortStr` - 进行连接的端口号

## atkConnect

用法：

```
rtnData = atkConnect(conID, 'command', 'objPath', 'cmdParamString')
```

说明：
- `conID` - 来自 `atkOpen` 的句柄
- `Command` - 具体请查看 `Connect` 命令库
- `objPath` - 接受命令的对象路径
- `cmdParamString` - 命令属性字符串
- `rtnData` - 从 atk 返回的响应的字符串

举例：

```
atkConnect(conID, 'Graphics', '*/Satellite/Satellite1 SetColor 12');
```

## atkClose

用法：
```
atkClose(conID)
```

说明：

`conID` - 来自 `atkOpen` 的连接句柄


<Catalog />
