---
title: Java接口
---

::: info 说明
设置属性后需重新打开对象属性界面属性数据才会更新。
:::

Java客户端是ATK软件向用户提供的一种可以输入脚本命令的程序，Java库文件由ATK提供，用户可引用jar包编写程序，jar包在ATK软件安装包.\IntegratingWithATK\connect\Java文件夹中。

目前界面属性窗口不具备实时更新功能，故而设置属性后需重新打开对象属性界面属性数据才会更新。以下为Java客户端提供的接口函数介绍。目前Java客户端与ATK使用atkOpen命令进行连接，使用atkConnect命令进行属性设置，使用atkClose命令与ATK断开连接。

jar包使用Java 1.8.0版本，打开Java客户端与ATK进行连接，如下图：

![客户端文件位置](media/README/image.png)


客户端提供Java可执行程序；提供`ATKConnectorTools.jar`，用来完成ATK与Java客户端的数据传输与解析，其中包含atkOpen、atkConnect、atkClose函数用以完成ATK与Java客户端的链接与参数设置，使用atkOpen进行连接，使用atkConnect进行属性设置。使用atkClose与ATK断开连接。

用户采用Java库文件编写程序，需自行安装Java环境；若已安装可参考下图运行：

![运行Jar包](media/README/image1.png)

## atkOpen

::: note 用法
```
conID = atkOpen('hostStr', PortStr)
```
:::



::: info 说明
- `conID` - 连接句柄
- `hostStr` - 进行连接的网络地址
- `PortStr` - 进行连接的端口号
:::



## atkConnect

::: note 用法
```
rtnData = atkConnect(conID, 'command', 'objPath', 'cmdParamString')
```
:::

::: info 说明
- `conID` - 来自 `atkOpen` 的句柄
- `Command` - 具体请查看 `Connect` 命令库
- `objPath` - 接受命令的对象路径
- `cmdParamString` - 命令属性字符串
- `rtnData` - 从 atk 返回的响应的字符串
:::

::: tip 举例
```
atkConnect(conID, 'Graphics', '*/Satellite/Satellite1 SetColor 12');
```
:::



## atkClose

::: note 用法
```
atkClose(conID)
```
:::

::: info 说明
- `conID` - 来自 `atkOpen` 的连接句柄
:::

<Catalog />
