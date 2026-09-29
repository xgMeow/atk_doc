---
description: 设置传感器的目标跟踪指向属性，支持跟踪和固定两种模式，可指定目标对象和跟踪方式。
---

# Point Targeted

## 作用

设置目标指向属性。

## 语法

```atk-command
Point <SensorObjectPath> Targeted {OrientMethod} <MethodData>
```

## 参数说明

| OrientMethod | MethodData                                                     | 说明                                                           |
| ------------ | -------------------------------------------------------------- | -------------------------------------------------------------- |
| Tracking     | `<TruncObjectPath> [{AboutBoresight} [{TrackMode}]]`           | N/A                                                            |
| Fixed        | `<TruncObjectPath> {OrientMethod} <MethodData>`                | `<MethodData>` 请参考 [Point Fixed](./Point%20Fixed.md) 命令   |

## 示例

::: details open **设置目标跟踪指向**
```
Point */Satellite/Sat1/Sensor/Sensor1 Targeted Tracking Facility/testFac1 Receive
```
:::
