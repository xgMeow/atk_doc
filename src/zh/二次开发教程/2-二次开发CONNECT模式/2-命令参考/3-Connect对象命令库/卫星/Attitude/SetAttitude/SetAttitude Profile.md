# SetAttitude Profile

## 作用

设置姿态生成方式下的欧拉角。

## 语法

```atk-command
SetAttitude <ObjectPath> Profile {ProfileType} <Parameters>
```

## 参数说明

- `ProfileType` 包括属性 `NadirECIVel`, `NadirECFVel`, `ECIVelNadir`, `ECFVelNadir`
- `Parameters` 包括属性为 `{OrientMethod} <OrientParameters>`

| `Parameters` | `OrientParameters` |
| --- | --- |
| `Euler` | `<Angle1> <Angle2> <Angle3> <Sequence>` |
| `Quat` | `<Q1> <Q2> <Q3> <Q4>` |

## 示例

::: details open **设置姿态生成方式下的欧拉角**
```
SetAttitude */Satellite/Satellite1 Profile NadirECIVel Euler 11 22 33 313
```
:::
