# SetAttitude RealTime

## 作用

设置接收客户端输入实时数据并设置星历数据。

## 语法

```atk-command
SetAttitude <ObjectPath> RealTime {LookAheadMethod} [<LookAheadDuration> <LookBehindDuration>]
```

## 参数说明

- `{LookAheadMethod}` 包括属性 `Extrapolate`、`Hold`
- `<LookAheadDuration>` 用来计算姿态数据点的长度
- `<LookBehindDuration>` 用来计算姿态数据点的保留长度

## 示例

::: details open **设置实时姿态数据**
```
SetAttitude */Satellite/xxxx RealTime Extrapolate 300 120
```
:::
