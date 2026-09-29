# AddAttitude Quat

## Description

Set attitude data from quaternions.

## Syntax

```atk-command
AddAttitude <ObjectPath> Quat {StartTime} <Q1> <Q2> <Q3> <Q4>
```

## Additional Notes

- `Q1`, `Q2`, `Q3` set qx, qy, qz, and `Q4` sets qs.
- A value is set only when the difference between the value being set and the original value exceeds 1e-6.

## Examples

::: details open **Set attitude data from quaternions**
```
AddAttitude */Missile/Missile1 Quat "1 Jul 2021 09:00:00.000" 0.0 0.0 0.0 1.0
```
:::
