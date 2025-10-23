# plot

二维线图

## 语法

```atks
plot(X,Y)
plot(X,Y,fmt)
plot3(X1,Y1,fmt1,...,Xn,Yn,fmtn)
```

## 说明

plot(X,Y) 创建 Y 中数据对 X 中对应值的二维线图。

plot(X,Y,fmt) 设置线型、标记符号和颜色。

plot(X1,Y1,fmt1,...,Xn,Yn,fmtn)设置每个线条的线型、标记符号和颜色。

## 示例

### 创建线图

```atks
    x = linspace(0, 2*pi, 100);
    y = sin(x);
    plot(x, y)
    title("sin(x)")
```
![线图](media/plot/image-1.png)

### 绘制多个线图
将 x 定义为 100 个介于 −2π 和 2π 之间的线性间隔值，将 y1 和 y2 定义为 x 的正弦和余弦值，分别使用蓝色和红色。创建两个数据集的线图。

```atks
    x = linspace(-2 * pi, 2 * pi, 100);
    y1 = sin(x);
    y2 = cos(x);
    plot(x , y1, "-b" , x , y2 , "-r")
```

 ![绘制多个线图](media/plot/image-2.png)


### 指定线型
绘制三条正弦曲线，每条曲线之间存在较小的相移。第一条曲线为蓝色实线，第二条曲线为红色虚线，第三条曲线为绿色点线。

```atks
x = linspace(0, 2*pi, 200);
y1 = sin(x);
y2 = sin(x-0.25);
y3 = sin(x-0.5);
plot(x , y1, "-b" , x , y2 , "--r", x, y3, "g:")
```

![指定线型](media/plot/image-3.png)