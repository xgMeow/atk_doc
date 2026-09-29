---
description: Linux (Kylin) port configuration for ATK, covering how to start ATK on a specified port and how to check the currently occupied port. The default port is 6655.
---

# Linux (Kylin)

## Starting on a Specified Port

ATK communicates with external programs through TCP ports, and must listen on a port when it starts. The **default port is 6655**; simply double-clicking `ATK.sh` starts it on this port; `atkOpen` in Python and C++ also connects to this port by default when no argument is passed.

In practice, you may need to run multiple ATK instances at the same time, in which case you need to specify different ports.

### Opening the Terminal

Enter the ATK installation directory, right-click on empty space in the folder → **Open in Terminal** (or press <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>T</kbd> to open a terminal and then `cd` to the installation directory).

### Startup Command

The `-p` parameter lets you specify any port number when starting ATK (replace `<port>` with the actual port):

```bash
./ATK.sh -p <port>
```

::: details open **Example: Starting on port 6666**

```bash
./ATK.sh -p 6666
```

When connecting, pass the corresponding port to `atkOpen`:

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

@tab MATLAB
```matlab
conID = ATKConnectJavaModule.atkOpen('127.0.0.1', 6666);
```

@tab Octave
```matlab
conID = ATKConnectJavaModule.atkOpen("127.0.0.1", 6666);
```
:::

## Checking the Current Port

If you are not sure which port ATK is currently using (for example, if you cannot connect or connected to the wrong one), run the following in the terminal:

```bash
sudo lsof -i -P -n | grep ATK
```

Example output:

```
ATK    428800 user    34u  IPv6 6520031  0t0  TCP *:6655 (LISTEN)
ATK    439192 user    32u  IPv6 6742913  0t0  TCP *:6666 (LISTEN)
```

Each line represents an ATK process, and the last column (`*:6655`, `*:6666`) is the occupied port number.
