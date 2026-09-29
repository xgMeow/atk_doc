# AddAttitude Euler

## 作用

根据欧拉角添加姿态数据

## 语法

```atk-command
AddAttitude <ObjectPath> Euler {StartTime} {Sequence} <Angle1> <Angle2> <Angle3>
```

## 示例

::: details open **添加欧拉角姿态数据**
```
AddAttitude */LaunchVehicle/LaunchVehicle1 Euler "1 Jul 2021 09:00:00.000" 321 30.0 45.0 60.0
```
:::
