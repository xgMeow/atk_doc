# AddAttitude YPR

## 作用

为对象添加一组 CBI VVLH 的四元数姿态数据。

## 语法

```atk-command
AddAttitude <ObjectPath> YPR {StartTime} {Sequence} <Yaw> <Pitch> <Roll>
```

## 补充说明

- `{Sequence}` 有效值为 123、132、213、231、312、321
- 数据输入默认单位为 deg
- `{StartTime}` 格式设置请查看[常用日期/时间格式](../../../../2-参数值格式/日期时间格式.md)
- 命令输入时间必须是递增序列

## 示例

::: details open **添加 CBI VVLH YPR 姿态数据**
```
AddAttitude */Satellite/Satellite1 YPR "1 Nov 2000 04:01:00.00" 321 15.0 30.0 45.0
```
:::
