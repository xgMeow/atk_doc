ATK CONNECT 模式通过以下三组核心 API 与 ATK 交互：`atkOpen` 建立连接、`atkConnect` 发送命令、`atkClose` 断开连接。所有命令均遵循 [CONNECT 命令语法约定](../2-命令参考/1-命令语法约定.md)。

Matlab 通过**内置的 Java 接口**调用 ATK 通信库：先用 `javaaddpath` 引入 `ATKConnectJava.jar`，再用 `javaMethod('loadLibrary', 'ATKLibraryLoader')` 加载本地动态库，最后用 `javaObject` 创建 `com.atk.connect.ATKConnectJavaModule` 对象。三组接口均为该对象的实例方法。

```matlab
javaaddpath([pwd,'\ATKConnectJava.jar']);
javaMethod('loadLibrary', 'ATKLibraryLoader');
ATKConnectJavaModule = javaObject('com.atk.connect.ATKConnectJavaModule');
```

::: info 与其他语言的差异
Matlab 底层复用了 Java 的通信库，因此签名与 Java 完全一致：`atkOpen` 的两个参数必须显式传入，`atkConnect` 除连接句柄、命令名和命令字符串外，还需传入第 4 个参数。
:::

## atkOpen

### 作用

建立与 ATK 服务的网络连接，返回可用于后续操作调用的连接句柄。

### 语法

```matlab
conID = ATKConnectJavaModule.atkOpen(ipAddress, port)
```

### 参数说明

| 参数名 | 类型 | 必选 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| ipAddress | String | 是 | 无 | 目标 ATK 服务的 IPv4 地址，本机连接填写 `'127.0.0.1'`。 |
| port | int | 是 | 无 | 目标服务监听端口号，默认端口为 `6655`。 |

::: note 说明
与 Java 一致，Matlab 调用时无默认参数，两个参数均需显式传入，不存在省略参数的零参调用形式。
:::

### 返回值

| 返回值 | 类型 | 说明 |
|--------|------|------|
| conID | int | 连接句柄 conID，用于后续操作；连接失败时返回 `0` 或负值 |

### 示例

::: details open **连接本机默认端口（127.0.0.1:6655）**
```matlab
conID = ATKConnectJavaModule.atkOpen('127.0.0.1', 6655);
```
:::

::: details open **连接指定远程设备**
```matlab
conID = ATKConnectJavaModule.atkOpen('192.168.1.100', 6655);
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

```matlab
strOutPut = ATKConnectJavaModule.atkConnect(conID, command, cmdString, cmdParam)
```

### 参数说明

| 参数名 | 类型 | 必选 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| conID | int | 是 | 无 | atkOpen 返回的连接句柄，标识当前会话 |
| command | String | 是 | 无 | ATK 命令名称，详见 Connect 命令文档 |
| cmdString | String | 是 | 无 | 由 **对象路径** 和 **命令参数字符串** 以单个空格拼接，格式：`'objPath cmdParamString'`。<br/> objPath 中可用 `*` 表示 **场景** 占位符，cmdParamString 由具体命令定义 |
| cmdParam | String | 是 | 无 | 保留参数，固定传入空字符串 `''` 即可 |

::: note 说明
`atkConnect` 的第 4 个参数为保留参数。由于底层沿用 Java 接口、无默认参数，该参数无法省略，传入空字符串 `''` 即可，实际命令内容由 `cmdString` 提供。
:::

### 返回值

| 返回值 | 类型 | 说明 |
|--------|------|------|
| strOutPut | String | 有返回值时返回输出字符串；无返回值时返回空或无返回 |

### 示例

::: details open **调用 Graphics 命令设置卫星颜色（无返回值）**
```matlab
ATKConnectJavaModule.atkConnect(conID, 'Graphics', '*/Satellite/Satellite1 SetColor 12', '');
```
:::

::: details open **调用命令并获取返回值**
```matlab
strOutPut = ATKConnectJavaModule.atkConnect(conID, 'Report_RM', '*/Satellite/Satellite1 Style "Position"', '');
```
:::

## atkClose

### 作用

关闭与 ATK 服务的网络连接，释放句柄及资源。关闭后句柄失效，不可再用于 `atkConnect`。

### 语法

```matlab
ATKConnectJavaModule.atkClose(conID)
```

### 参数说明

| 参数名 | 类型 | 必选 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| conID | int | 是 | 无 | atkOpen 返回的连接句柄，用于标识要关闭的会话 |

### 返回值

| 返回值 | 类型 | 说明 |
|--------|------|------|
| 无 | void | 该命令不返回任何值。 |

### 示例

::: details open **关闭默认连接**
```matlab
conID = ATKConnectJavaModule.atkOpen('127.0.0.1', 6655);
% 建立连接
% ... 执行若干 atkConnect 操作 ...
ATKConnectJavaModule.atkClose(conID);
% 关闭连接
```
:::

::: details open **关闭指定远程连接**
```matlab
conID = ATKConnectJavaModule.atkOpen('192.168.1.100', 6655);
% ... 执行操作 ...
ATKConnectJavaModule.atkClose(conID);
```
:::
