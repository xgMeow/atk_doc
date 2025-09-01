# atkConnect

向已建立连接的远程ATK发送Connect命令

## 语法

```atks
atkConnect(conID, "command", "objPath", "cmdParamString")
```

## 输入参数

`conID`          - [atkOpen](atkOpen.md) 函数返回的句柄
`command`        - 具体请查看Connect 命令库
`objPath`        - 接受命令的对象路径
`cmdParamString` - 命令属性字符串


## 返回参数

拥有返回值的命令，会直接输出返回值字符串。


## 另请参阅

[atkOpen](atkOpen.md) | [atkClose](atkClose.md)

