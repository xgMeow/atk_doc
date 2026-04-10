---
title: 客户端接口
---

# 客户端接口

ATK.Connect模式向用户提供多种语言客户端，提供不同的操作属性命令，以方便用户对ATK进行操作。

以下使用介绍均基于 Connect 模式。

::: info 说明
- ATK.Connect模式中空格为特殊解析字符，输入命令字符串时请注意空格字符的位置。
- 设置属性后需重新打开对象属性界面属性数据才会更新。
:::


## atkOpen

::: note 用法
```
conID = atkOpen();
```

```
conID=atkOpen('127.0.0.1', 6655);
```
:::



::: info 说明
- `conID`-连接句柄
- 默认连接地址为本机；也可输入需要连接的地址， ATK 默认端口号为`6655`。
:::



## atkConnect

::: note 用法
```
atkConnect(conID, 'command', 'objPath', 'cmdParamString')
```
:::



::: info 说明
- `conID`-来自 `atkOpen` 的句柄
- `Command`-具体请查看Connect 命令库
- `objPath`-接受命令的对象路径
- `cmdParamString`-命令属性字符串
:::



::: warning 注意
- 拥有返回值的命令，atkConnect会返回输出字符串strOutPut。
strOutPut = atkConnect(conID, 'command', 'objPath', 'cmdParamString')
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

`conID`-来自 `atkOpen` 的连接句柄

:::

<Catalog />
