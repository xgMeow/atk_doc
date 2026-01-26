# ATK客户端

ATK客户端提供了内置客户端与外置客户端，可以与ATK软件进行数据交互。

通过执行脚本命令，可以用于新增删除对象、修改配置参数、控制软件运行，此外还具有曲线绘图、自定义界面、数据导入导出等功能。

内置客户端与外置客户端的区别在于数据交互方式、脚本语法。

- 内置客户端与ATK共享内存，与ATK在同一个进程内，直接通过函数调用进行数据交互，脚本语法请参考[ATK脚本](/5.专业使用指南/18-脚本工具/2-ATK脚本.md)。

- 外置客户端与ATK是不同的进程，通过网络通信与ATK进行数据交互，脚本为 Python ，外置客户端目前在银河麒麟系统上暂不支持。


## ATK内置客户端

内置客户端与ATK共享内存，与ATK在同一个进程内，直接通过函数调用进行数据交互，脚本语法请参考[ATK脚本](/5.专业使用指南/18-脚本工具/2-ATK脚本.md)。

内置客户端支持的所有内置函数请参考[ATK脚本函数](/5.专业使用指南/18-脚本工具/)。

### 常用函数

1. `atkOpen`、`atkConnect`、`atkClose`

用于与ATK建立网络通信连接、通过网络发送[Connect命令](/二次开发教程/1-二次开发CONNECT模式/2-Connect命令库/)、关闭网络连接。

示例：
```atks
conID = atkOpen("127.0.0.1", 6655)              # 建立网络通信连接
atkConnect(conID, "New", "/ Satellite Sat1")    # 通过网络发送connect命令
atkClone(conID)                                 # 关闭网络连接
```

2. `ExecuteCommand`

用于直接执行[Connect命令](/二次开发教程/1-二次开发CONNECT模式/2-Connect命令库/)，不依赖网络通信。

## ATK外置客户端(python客户端)

外置客户端与ATK是不同的进程，通过网络通信与ATK进行数据交互，脚本为 Python ，外置客户端目前在银河麒麟系统上不支持。

### 常用函数

`atkOpen`、`atkConnect`、`atkClose`

用于与ATK建立网络通信连接、通过网络发送[Connect命令](/二次开发教程/1-二次开发CONNECT模式/2-Connect命令库/)、关闭网络连接。


示例：
```python
conID = atkOpen("127.0.0.1", 6655)              # 建立网络通信连接
atkConnect(conID, "New", "/ Satellite Sat1")    # 通过网络发送connect命令
atkClone(conID)                                 # 关闭网络连接
```


