---
description: C++ SDK 的核心 API 参考，涵盖 atkOpen、atkConnect、atkClose 函数的语法、参数及使用示例。
---

# 核心API

ATK CONNECT 模式通过以下三组核心 API 与 ATK 交互：`atkOpen` 建立连接、`atkConnect` 发送命令、`atkClose` 断开连接。所有命令均遵循 [CONNECT 命令语法约定](../../../2-命令参考/1-命令语法约定.md)。

## atkOpen

### 作用

建立与 ATK 服务的网络连接，返回可用于后续操作调用的连接句柄。

### 语法

```cpp
atkOpen([ipAddress, port]);
```

### 参数说明

| 参数名 | 类型 | 必选 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| ipAddress | string | 否 | "127.0.0.1" | 目标 ATK 服务的 IPv4 地址。 |
| port | integer | 否 | 6655 | 目标服务监听端口号。 |

### 返回值

| 返回值 | 类型 | 说明 |
|--------|------|------|
| conID | integer | 连接句柄 conID，用于后续操作 |

### 示例

::: details open **连接本机默认端口（127.0.0.1:6655）**
```cpp
conID = atkOpen();
```
:::

::: details open **连接指定远程设备**
```cpp
conID = atkOpen("192.168.1.100", 6655);
```
:::

## atkConnect

### 作用

向已连接的 ATK 服务发送命令，执行特定操作，并可获取命令返回的输出字符串。

::: info 说明

- Connect模式中 **空格** 为特殊解析字符，输入命令字符串时请注意空格字符的位置。

- 用命令设置之后，如果界面对象属性页是打开状态，需要先关闭页面，再打开，用命令设置的属性值才会刷新。

:::

### 语法

```cpp
atkConnect(conID, command, cmdString);
```

若命令有返回值，可通过赋值方式获取输出：

```cpp
strOutPut = atkConnect(conID, command, cmdString);
```

### 参数说明

| 参数名 | 类型 | 必选 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| conID | integer | 是 | 无 | atkOpen 返回的连接句柄，标识当前会话 |
| command | string | 是 | 无 | ATK 命令名称，详见 Connect 命令文档 |
| cmdString | string | 是 | 无 | 由 **对象路径** 和 **命令参数字符串** 以单个空格拼接，格式：`'objPath cmdParamString'`。<br/> objPath 中可用 `*` 表示 **场景** 占位符，cmdParamString 由具体命令定义 |

### 返回值

| 返回值 | 类型 | 说明 |
|--------|------|------|
| strOutPut | string | 有返回值时返回输出字符串；无返回值时返回空或无返回 |

### 示例

::: details open **调用 Graphics 命令设置卫星颜色（无返回值）**
```cpp
atkConnect(conID, "Graphics", "*/Satellite/Satellite1 SetColor 12");
```
:::

## atkClose

### 作用

关闭与 ATK 服务的网络连接，释放句柄及资源。关闭后句柄失效，不可再用于 `atkConnect`。

### 语法

```cpp
atkClose(conID);
```

### 参数说明

| 参数名 | 类型 | 必选 | 默认值 | 说明 |
|--------|------|------|--------|------|
| conID | integer | 是 | 无 | atkOpen 返回的连接句柄，用于标识要关闭的会话 |

### 返回值

| 返回值 | 类型 | 说明 |
|--------|------|------|
| 无 | void | 该命令不返回任何值。 |

### 示例

::: details open **关闭默认连接**
```cpp {4}
conID = atkOpen();
// 建立连接
// ... 执行若干 atkConnect 操作 ...
atkClose(conID);
// 关闭连接
```
:::

::: details open **关闭指定远程连接**
```cpp {3}
conID = atkOpen("192.168.1.100", 6655);
// ... 执行操作 ...
atkClose(conID);
```
:::
