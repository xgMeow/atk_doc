---
title: Matlab接口
---

# Matlab接口

::: info
设置属性后需重新打开对象属性界面属性数据才会更新。
:::

Matlab客户端是一种方便用户与ATK软件进行网络连接并操作的方式，目前界面属性窗口不具备实时更新功能，故而设置属性后需重新打开对象属性界面属性数据才会更新。Matlab客户端需用户自行下载安装（ATK测试使用MatlabR2015b版本），ATK提供ATK与Matlab通信库文件再安装包目录下IntegratingWithATK\connect\win\Matlab\Win_2015b文件夹中，用户需将使用库与使用函数添加到使用目录，如下图：

![使用文件目录](media/README/image.png)
![Matlab界面](media/README/image1.png)

`ATKConnectorDll64.dll`、`ATKConnectorDll64.lib`为基于Connect模式提供的库文件，用于和ATK建立网络连接，传递命令数据和解析返回结果；
`mexATKConnect.mexw64`是一个可执行的Mex文件，提供用于Matlab环境的MEX函数，方便Matlab和`ATKConnectorDll64.dll`之间传递数据；
`atkOpen.m`、`atkConnect.m`、`atkClose.m`是Matlab函数式M文件，通过使用MEX函数完成Matlab和ATK之间的连接建立和数据传递。

## atkOpen

用法：
```matlab
conID = atkOpen('hostStr'，PortStr);
```
说明：
- `conID` - 连接句柄
- `hostStr` - IP地址
- `PortStr` - 端口号，ATK端口号为6655

## atkConnect

用法：
```matlab
rtnData = atkConnect(conID, 'command', 'objPath', 'cmdParamString')
```
说明：
- `conID` - 来自 atkOpen 的句柄
- `Command` - 具体请查看 Connect 命令库
- `objPath` - 接受命令的对象路径
- `cmdParamString` - 命令属性字符串
- `rtnData` - 从 atk 返回的响应的字符串
举例：
```matlab
atkConnect(conID, 'Graphics', '*/Satellite/Satellite1 SetColor 12')
```

## atkClose

用法：
```matlab
atkClose(conID)
```
说明：
- `conID` - 来自 `atkOpen` 的连接句柄



<Catalog />
