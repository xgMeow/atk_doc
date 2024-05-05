---
title: 客户端接口
---

# 客户端接口

ATK 二次开发模块支持 Connect 模式。

以下使用介绍均基于 Connect 模式。

::: info
1. 客户端输入命令暂不支持中文字符。
2. 设置属性后需重新打开对象属性界面属性数据才会更新。
3. 目前客户端获得返回值命令仅支持 `Astrogator_RM` 。
:::


## atkOpen

用法：
```
conID = atkOpen();
```

```
conid=atkOpen('192.168.0.12', 6655);
```

说明： 
1. `conID`-连接句柄
2. 默认连接地址为本机；也可输入需要连接的地址， ATK 端口号为`6655`。

## atkConnect

用法： 
```
atkConnect(conID, 'command', 'objPath', 'cmdParamString')
```
说明： 
1. `conID`-来自 `atkOpen` 的句柄
2. `Command`-具体请查看Connect 命令库
3. `objPath`-接受命令的对象路径
4. `cmdParamString`-命令属性字符串
注意：拥有返回值的命令，会直接输出返回值字符串，目前客户端接口仅支持机动规划返回值。

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

`conID`-来自 `atkOpen` 的连接句柄

<Catalog />
