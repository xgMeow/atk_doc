# Connect模式输入和输出

下面是一些信息发送接收的基础格式的描述

## 输入命令格式

单条命令发送格式：

```connect
<CommandName> <ObjectPath> [<CommandData>]
```

说明：
- `CommandName`: 输入命令的名字，例如 New
- `ObjectPath`:  输入 CommandName 描述的对象路径
- `CommandData`: 命令数据输入请查看单个命令格式

::: info

1. `<CommandName>`不用区分大小写，但是`<ObjectPath>` 和`[<CommandData>]`可能需要区分
2. 发送多条命令需要用`;`分开
3. 因为每个 ATK 只能打开一个场景，所以你可以用`*`代替场景名字，所以`<ObjectPath>`可以是 `Scenario/*`，或者`*`

:::



## 输出命令格式

单条命令接收格式：
```connect
<Header> <Data>
```

说明：

- `Header`: 一个包含 CommandName 的固定长度为 40 字节数据包，包后面跟一个整数，指定后面任何数据的长度
- `Data`: 实际返回的数据


## 多条输出命令格式

多条命令接收格式：

```connect
<MultMessageHeader> <MultipleMessageData> <SingleMessageHeader> <SingleMessageData>...
```

说明：


- `MultMessageHeader`: 一个包含 CommandName 的固定长度为 40 字节数据包，包后面跟一个整数，指后面多条数据的长度
- `MultipleMessageData`: 包含以下有几条命令
- `SingleMessageHeader`: 包含 CommandName，后面有一个整数，指定后面数据的长度。多条信息格式包含任意数量的单个消息头，具体取决于输入的命令
- `SingleMessageData`: 前一个消息头的数据