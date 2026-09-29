# AddAttitude ECIYPR

## Description

Adds a set of ECI J2000 YPR attitude data to the object.

## Syntax

```atk-command
AddAttitude <ObjectPath> ECIYPR {StartTime} {Sequence} <Yaw> <Pitch> <Roll>
```

## Additional Notes

- `{Sequence}` valid values are 123, 132, 213, 231, 312, 321
- The default unit of the input data is deg
- `{StartTime}` format settings: see [Common Date/Time Formats](../../../../2-参数值格式/日期时间格式.md)
- The times entered in the command must be in increasing order

## Examples

::: details open **Add ECI J2000 YPR Attitude Data**
```
AddAttitude */Satellite/Satellite1 ECIYPR "1 Jul 2021 09:00:00.000" 321 30.0 45.0 60.0
```
:::
