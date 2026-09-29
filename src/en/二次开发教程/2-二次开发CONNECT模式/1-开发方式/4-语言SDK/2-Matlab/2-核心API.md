---
description: Core API reference for the Matlab SDK, covering the syntax, parameters and usage examples of atkOpen, atkConnect and atkClose.
---

# Core API

ATK Connect mode interacts with ATK through the following three groups of core APIs: `atkOpen` establishes a connection, `atkConnect` sends commands, and `atkClose` closes the connection. All commands follow the [Connect command syntax](../../../2-命令参考/1-命令语法约定.md).

Matlab calls the ATK communication library through its **built-in Java interface**: first import `ATKConnectJava.jar` with `javaaddpath`, then load the native dynamic library with `javaMethod('loadLibrary', 'ATKLibraryLoader')`, and finally create a `com.atk.connect.ATKConnectJavaModule` object with `javaObject`. The three groups of interfaces are all instance methods of that object.

```matlab
javaaddpath([pwd,'\ATKConnectJava.jar']);
javaMethod('loadLibrary', 'ATKLibraryLoader');
ATKConnectJavaModule = javaObject('com.atk.connect.ATKConnectJavaModule');
```

::: info Differences from other languages
Matlab reuses Java's communication library underneath, so its signatures are exactly the same as Java's: both parameters of `atkOpen` must be passed explicitly, and `atkConnect` takes a 4th parameter in addition to the connection handle, the command name and the command string.
:::

## atkOpen

### Description

Establishes a network connection to the ATK service and returns a connection handle that can be used in subsequent operations.

### Syntax

```matlab
conID = ATKConnectJavaModule.atkOpen(ipAddress, port)
```

### Parameters

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| ipAddress | String | Yes | None | The IPv4 address of the target ATK service. Use `'127.0.0.1'` for a local connection. |
| port | int | Yes | None | The listening port number of the target service; the default port is `6655`. |

::: note Note
As with Java, there are no default parameters when calling from Matlab: both parameters must be passed explicitly, and there is no zero-argument form that omits them.
:::

### Return Value

| Return | Type | Description |
|--------|------|------|
| conID | int | Connection handle conID, used for subsequent operations; returns `0` or a negative value if the connection fails |

### Example

::: details open **Connect to the local default port (127.0.0.1:6655)**
```matlab
conID = ATKConnectJavaModule.atkOpen('127.0.0.1', 6655);
```
:::

::: details open **Connect to a specified remote device**
```matlab
conID = ATKConnectJavaModule.atkOpen('192.168.1.100', 6655);
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
strOutPut = ATKConnectJavaModule.atkConnect(conID, command, cmdString, cmdParam)
```

### Parameters

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| conID | int | Yes | None | The connection handle returned by atkOpen, identifying the current session |
| command | String | Yes | None | The name of the ATK command; see the Connect command documentation for details |
| cmdString | String | Yes | None | Concatenated from the **object path** and the **command parameter string** with a single space, format: `'objPath cmdParamString'`.<br/> In objPath, `*` can be used as the **scenario** placeholder; cmdParamString is defined by the specific command |
| cmdParam | String | Yes | None | Reserved parameter; simply pass an empty string `''` |

::: note Note
The 4th parameter of `atkConnect` is a reserved parameter. Because the underlying interface is inherited from Java and has no default parameters, this parameter cannot be omitted; simply pass an empty string `''`. The actual command content is provided by `cmdString`.
:::

### Return Value

| Return | Type | Description |
|--------|------|------|
| strOutPut | String | Returns the output string when the command has a return value; otherwise returns an empty string or nothing |

### Example

::: details open **Call the Graphics command to set the satellite color (no return value)**
```matlab
ATKConnectJavaModule.atkConnect(conID, 'Graphics', '*/Satellite/Satellite1 SetColor 12', '');
```
:::

::: details open **Call a command and get its return value**
```matlab
strOutPut = ATKConnectJavaModule.atkConnect(conID, 'Report_RM', '*/Satellite/Satellite1 Style "Position"', '');
```
:::

## atkClose

### Description

Closes the network connection to the ATK service and releases the handle and its resources. After closing, the handle becomes invalid and can no longer be used with `atkConnect`.

### Syntax

```matlab
ATKConnectJavaModule.atkClose(conID)
```

### Parameters

| Parameter | Type | Required | Default | Description |
|--------|------|------|--------|------|
| conID | int | Yes | None | The connection handle returned by atkOpen, identifying the session to be closed |

### Return Value

| Return | Type | Description |
|--------|------|------|
| None | void | This command does not return any value. |

### Example

::: details open **Close the default connection**
```matlab
conID = ATKConnectJavaModule.atkOpen('127.0.0.1', 6655);
% Establish the connection
% ... Execute some atkConnect operations ...
ATKConnectJavaModule.atkClose(conID);
% Close the connection
```
:::

::: details open **Close a specified remote connection**
```matlab
conID = ATKConnectJavaModule.atkOpen('192.168.1.100', 6655);
% ... Execute some operations ...
ATKConnectJavaModule.atkClose(conID);
```
:::
