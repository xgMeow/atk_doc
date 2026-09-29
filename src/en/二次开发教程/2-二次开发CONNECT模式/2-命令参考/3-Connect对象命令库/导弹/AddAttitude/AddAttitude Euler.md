# AddAttitude Euler

## Description

Set attitude data from Euler angles.

## Syntax

```atk-command
AddAttitude <ObjectPath> Euler {StartTime} {Sequence} <Angle1> <Angle2> <Angle3>
```

## Examples

::: details open **Set attitude data from Euler angles**
```
AddAttitude */Missile/Missile1 Euler "1 Jul 2021 09:00:00.000" 321 30.0 45.0 60.0
```
:::
