# AddAttitude Euler

## Description

Add attitude data from Euler angles.

## Syntax

```atk-command
AddAttitude <ObjectPath> Euler {StartTime} {Sequence} <Angle1> <Angle2> <Angle3>
```

## Examples

::: details open **Add Euler angle attitude data**
```
AddAttitude */LaunchVehicle/LaunchVehicle1 Euler "1 Jul 2021 09:00:00.000" 321 30.0 45.0 60.0
```
:::
