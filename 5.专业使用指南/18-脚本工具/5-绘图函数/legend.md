# legend

在坐标区上添加图例

## 语法

```atks
legend()
legend(labels)
```
## 说明
legend() 为每个绘制的数据序列创建一个带有描述性标签的图例，对于标签，图例默认使用 "dataN" 形式的标签。

legend(labels) 使用字符串设置标签, 例如legend("cos(x)", "cos(2x)")

## 示例

### 在当前坐标区上添加图例

绘制两个线条并在当前坐标区上添加一个图例，将图例标签指定为 legend 函数的输入参数。

```atks
    x = linspace(0, pi, 100);
    y1 = cos(x);
    plot(x, y1)

    hold("on")
    y2 = cos(2 * x);
    plot(x, y2)
    legend()
    show()
```

![添加图例](media/legend/image-2.png)