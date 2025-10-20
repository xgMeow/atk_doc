# axis
设置坐标轴范围和纵横比

## 语法

```atks
    axis(limits)
```

## 说明
axis(limits)指定当前坐标区的范围。以包含4个元素的向量形式指定范围。
## 示例

### 设置坐标轴范围

```atks
x = linspace(0, 2 * pi, 100);
y = sin(x);
plot(x, y)

axis([0, 2*pi, -1.5, 1.5])
```

![正弦函数](media/axis/image-1.png)