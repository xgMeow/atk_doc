# AddAttitude Quat

## 作用

为对象添加一组 ECI J2000 的四元数姿态数据。

## 语法

```atk-command
AddAttitude <ObjectPath> Quat {StartTime} <Q1> <Q2> <Q3> <Q4>
```

## 补充说明

- `<Q1>`、`<Q2>`、`<Q3>` 设置 qx，qy，qz，`<Q4>` 设置 qs
- `{StartTime}` 格式设置请查看[常用日期/时间格式](../../../../2-参数值格式/日期时间格式.md)
- 命令输入时间必须是递增序列

## 示例

::: details open **添加 ECI J2000 四元数姿态数据**
```
AddAttitude */Satellite/Satellite1 Quat "1 Jul 2021 09:00:00.000" 0.0 0.0 0.0 1.0
```
:::
