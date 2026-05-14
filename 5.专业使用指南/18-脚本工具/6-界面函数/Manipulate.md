# Manipulate

创建一个操作器

## 语法

```atks
Manipulate(func, [a, b])
```

## 说明

输入一个回调函数与一个范围

`func`: 回调函数
`[a, b]`: 范围

## 示例


### 动态控制曲线图中的参数

```atks
function func(n)
    x = linspace(0, 2*pi, 1000);
    y = sin(n*x);
    grid("on")
    name = "sin(" + num2str(n) + "*x)"
    title(name)
    legend(name)
    return plot(x, y, "r-")
end

Manipulate(func, [1, 10])
```

![效果图](media/Manipulate/image.png)

