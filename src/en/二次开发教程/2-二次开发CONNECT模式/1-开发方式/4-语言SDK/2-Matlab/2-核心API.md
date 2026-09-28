---
description: Core API reference for the Matlab SDK, covering the syntax, parameters and usage examples of atkOpen, atkConnect and atkClose.
---

# Core API

ATK Connect mode interacts with ATK through the following three groups of core APIs: `atkOpen` establishes a connection, `atkConnect` sends commands, and `atkClose` closes the connection. All commands follow the [Connect command syntax](../../../2-命令参考/1-命令语法约定.md).

## atkOpen

### Description

Establishes a network connection to the ATK service and returns a connection handle that can be used in subsequent operations.

### Syntax

```matlab
atkOpen([ipAddress, port]);
```

### Parameters

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| ipAddress | string | No | "127.0.0.1" | The IPv4 address of the target ATK service. |
| port | integer | No | 6655 | The listening port number of the target service. |

### Return Value

| Return | Type | Description |
|--------|------|------|
| conID | integer | Connection handle conID, used for subsequent operations |

### Example

::: details open **Connect to the local default port (127.0.0.1:6655)**
```matlab
conID = atkOpen();
```
:::

::: details open **Connect to a specified remote device**
```matlab
conID = atkOpen('192.168.1.100', 6655);
```
:::

## atkConnect

### Description

Sends a command to the connected ATK service to perform a specific operation, and can obtain the output string returned by the command.

::: info Notes

- In Connect mode, **space** is a special parsing character. Pay attention to the position of space characters when entering command strings.

- After setting a property with a command, if the object's property page is open, you need to close and reopen it for the command-set property values to refresh.

:::

### Syntax

```matlab
atkConnect(conID, command, cmdString);
```

If the command returns a value, you can obtain the output by assigning it:

```matlab
strOutPut = atkConnect(conID, command, cmdString);
```

### Parameters

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| conID | integer | Yes | None | The connection handle returned by atkOpen, identifying the current session |
| command | string | Yes | None | The name of the ATK command; see the Connect command documentation for details |
| cmdString | string | Yes | None | Concatenated from the **object path** and the **command parameter string** with a single space, format: `'objPath cmdParamString'`.<br/> In objPath, `*` can be used as the **scenario** placeholder; cmdParamString is defined by the specific command |

### Return Value

| Return | Type | Description |
|--------|------|------|
| strOutPut | string | Returns the output string when the command has a return value; otherwise returns an empty string or nothing |

### Example

::: details open **Use the Graphics command to set the satellite color (no return value)**
```matlab
atkConnect(conID, 'Graphics', '*/Satellite/Satellite1 SetColor 12');
```
:::

## atkClose

### Description

Closes the network connection to the ATK service and releases the handle and its resources. After closing, the handle becomes invalid and can no longer be used with `atkConnect`.

### Syntax

```matlab
atkClose(conID);
```

### Parameters

| Parameter | Type | Required | Default | Description |
|--------|------|------|--------|------|
| conID | integer | Yes | None | The connection handle returned by atkOpen, identifying the session to be closed |

### Return Value

| Return | Type | Description |
|--------|------|------|
| None | void | This command does not return any value. |

### Example

::: details open **Close the default connection**
```matlab {4}
conID = atkOpen();
% Establish the connection
% ... Execute some atkConnect operations ...
atkClose(conID);
% Close the connection
```
:::

::: details open **Close a specified remote connection**
```matlab {3}
conID = atkOpen('192.168.1.100', 6655);
% ... Execute some operations ...
atkClose(conID);
```
:::
