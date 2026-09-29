# AddAttitude Euler

## 作用

为对象添加一组 ECI J2000 或者 CBI 的四元数姿态数据。

## 语法

```atk-command
AddAttitude <ObjectPath> Euler {StartTime} {Sequence} <Angle1> <Angle2> <Angle3>
```

## 补充说明

- 数据输入默认单位为 deg
- `{StartTime}` 格式设置请查看[常用日期/时间格式](../../../../2-参数值格式/日期时间格式.md)
- 命令输入时间必须是递增序列

## 示例

::: details open **添加欧拉角姿态数据**
```
AddAttitude */Satellite/Satellite1 Euler "1 Jul 2021 09:00:00.000" 321 30.0 45.0 60.0
```
:::
