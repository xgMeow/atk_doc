# atkOpen

与远程ATK建立网络连接（TCP协议）

## 语法

```atks
conID = atkOpen()
conID = atkOpen("127.0.0.1", 6655)
```

## 返回参数

`conID`: 连接句柄，如果返回`-1`，则说明连接失败



## 另请参阅

[atkConnect](atkConnect.md) | [atkClose](atkClose.md)

