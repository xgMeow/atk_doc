# AddAttitude Euler

## Description

Adds a set of ECI J2000 or CBI Euler angle attitude data to the object.

## Syntax

```atk-command
AddAttitude <ObjectPath> Euler {StartTime} {Sequence} <Angle1> <Angle2> <Angle3>
```

## Additional Notes

- The default unit of the input data is deg
- `{StartTime}` format settings: see [Common Date/Time Formats](../../../../2-参数值格式/日期时间格式.md)
- The times entered in the command must be in increasing order

## Examples

::: details open **Add Euler Angle Attitude Data**
```
AddAttitude */Satellite/Satellite1 Euler "1 Jul 2021 09:00:00.000" 321 30.0 45.0 60.0
```
:::
