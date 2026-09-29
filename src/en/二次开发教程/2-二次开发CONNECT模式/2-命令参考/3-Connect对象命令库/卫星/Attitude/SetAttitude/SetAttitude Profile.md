# SetAttitude Profile

## Description

Sets the Euler angles in the attitude profile mode.

## Syntax

```atk-command
SetAttitude <ObjectPath> Profile {ProfileType} <Parameters>
```

## Parameters

- `ProfileType` includes the attributes `NadirECIVel`, `NadirECFVel`, `ECIVelNadir`, `ECFVelNadir`
- `Parameters` includes the attributes `{OrientMethod} <OrientParameters>`

| `Parameters` | `OrientParameters` |
| --- | --- |
| `Euler` | `<Angle1> <Angle2> <Angle3> <Sequence>` |
| `Quat` | `<Q1> <Q2> <Q3> <Q4>` |

## Examples

::: details open **Set the Euler Angles in the Attitude Profile Mode**
```
SetAttitude */Satellite/Satellite1 Profile NadirECIVel Euler 11 22 33 313
```
:::
