# hold

添加新绘图时保留当前绘图

## 语法

```atks
hold("on")
hold("off")
hold(true)
hold(false)
```

## 说明
hold("on")/(true)保留当前坐标区中的绘图，使新添加到坐标区中的绘图不会删除现有绘图。

hold("off")/(false)使新添加到坐标区中的绘图清除现有绘图并重置所有的坐标区属性。
## 示例
### 在现有坐标区上添加线图
创建一个线图。使用 hold("on") 添加第二个线图，而不删除已有的线图。然后将 hold 状态重置为 "off"。

```atks
    x = linspace(-pi, pi, 100);
    y1 = sin(x);
    plot(x, y1)
    
    hold("on")
    y2 = cos(x);
    plot(x, y2)
    hold("off")
```

![添加第二个线图](media/hold/image.png)

当 hold 状态为 "off" 时，新绘图将删除现有绘图。新绘图从色序和线型序列的开头开始。

```atks
    y3 = sin(2 * x);
    plot(x, y3)
```

![新绘图](media/hold/image-1.png)