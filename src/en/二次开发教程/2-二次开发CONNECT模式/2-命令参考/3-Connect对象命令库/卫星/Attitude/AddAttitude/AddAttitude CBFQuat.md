# AddAttitude CBFQuat

## Description

Adds a set of CBF quaternion attitude data to the object.

## Syntax

```atk-command
AddAttitude <ObjectPath> CBFQuat {StartTime} <Q1> <Q2> <Q3> <Q4>
```

## Additional Notes

- `<Q1>`, `<Q2>`, and `<Q3>` set qx, qy, and qz; `<Q4>` sets qs
- `{StartTime}` format settings: see [Common Date/Time Formats](../../../../2-参数值格式/日期时间格式.md)
- The times entered in the command must be in increasing order

## Examples

::: details open **Add CBF Quaternion Attitude Data**
```
AddAttitude */Satellite/Satellite1 CBFQuat "1 Jun 2002 12:01:00.00" 0.0 0.0 0.0 1.0
```
:::
