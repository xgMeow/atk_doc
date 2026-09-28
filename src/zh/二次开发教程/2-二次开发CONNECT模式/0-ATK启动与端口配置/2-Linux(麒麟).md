---
description: Linux（麒麟）下 ATK 的端口配置：如何指定端口启动、如何查看当前占用的端口。默认端口为 6655。
---

# Linux（麒麟）

## 指定端口启动

ATK 通过 TCP 端口与外部程序通信，启动时必须监听一个端口。**默认端口为 6655**，直接双击 `ATK.sh` 即在此端口启动；Python 与 C++ 的 `atkOpen` 省略参数时也默认连接此端口。

实际使用中可能会遇到需要同时运行多个 ATK 实例的情况，此时需要指定不同端口。

### 打开终端

进入 ATK 安装目录，在文件夹空白处右键 → **在终端中打开**（或按 <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>T</kbd> 打开终端后 `cd` 到安装目录）。

### 启动命令

通过 `-p` 参数可以在启动 ATK 时指定任意端口号（`<端口号>` 替换为实际端口）：

```bash
./ATK.sh -p <端口号>
```

::: details open **示例：在 6666 端口启动**

```bash
./ATK.sh -p 6666
```

连接时在 `atkOpen` 中传入对应端口：

::: code-tabs
@tab Python
```python
conID = atkOpen('127.0.0.1', 6666)
```

@tab C++
```cpp
conID = atkOpen("127.0.0.1", 6666);
```

@tab Java
```java
int conID = atkOpen("127.0.0.1", 6666);
```

@tab Matlab
```matlab
conID = ATKConnectJavaModule.atkOpen('127.0.0.1', 6666);
```

@tab Octave
```matlab
conID = ATKConnectJavaModule.atkOpen("127.0.0.1", 6666);
```
:::

## 查看当前端口

如果不确定当前 ATK 在哪个端口（比如连不上或连错了），在终端中执行：

```bash
sudo lsof -i -P -n | grep ATK
```

输出示例：

```
ATK    428800 user    34u  IPv6 6520031  0t0  TCP *:6655 (LISTEN)
ATK    439192 user    32u  IPv6 6742913  0t0  TCP *:6666 (LISTEN)
```

每行代表一个 ATK 进程，最后一列（`*:6655`、`*:6666`）即为占用的端口号。
