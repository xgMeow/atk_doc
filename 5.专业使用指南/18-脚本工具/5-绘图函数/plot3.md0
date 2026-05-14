# plot3
三维点或线图

## 语法

```atks
plot3(X,Y,Z)
plot3(X,Y,Z,fmt)
plot3(X1,Y1,Z1,fmt1,...,Xn,Yn,Zn,fmtn)
```

## 说明

plot3(X,Y,Z) 绘制三维空间中的坐标。

plot3(X,Y,Z,fmt)使用指定的线型、标记和颜色创建绘图。

plot3(X1,Y1,Z1,fmt1,...,Xn,Yn,Zn,fmtn)可为每个XYZ三元组指定特定的线型、标记和颜色。

## 示例

### 绘制三维螺旋图

将 t 定义为由介于 0 和 10π 之间的值组成的向量。将 st 和 ct 定义为正弦和余弦值向量。然后绘制 st、ct 和 t。
```atks
t = linspace(0, 10*pi, 500);
st = sin(t);
ct = cos(t);
l=plot3(st,ct,t);
```
![alt text](media/plot3/image-1.png)

### 绘制多个线条

创建两组 x、y 和 z 坐标。调用 plot3 函数，并指定连续的 XYZ 三元组。
```atks
t = linspace(0, pi, 500);
xt1 = sin(t)*cos(10*t);
yt1 = sin(t)*sin(10*t);
zt1 = cos(t);
xt2 = sin(t)*cos(12*t);
yt2 = sin(t)*sin(12*t);
zt2 = cos(t);
plot3(xt1,yt1,zt1,"-b",xt2,yt2,zt2,"-r")
```
![alt text](media/plot3/image.png)
