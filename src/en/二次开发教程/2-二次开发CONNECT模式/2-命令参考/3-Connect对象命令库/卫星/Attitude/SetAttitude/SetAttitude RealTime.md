# SetAttitude RealTime

## Description

Sets receiving real-time data input from the client and sets the ephemeris data.

## Syntax

```atk-command
SetAttitude <ObjectPath> RealTime {LookAheadMethod} [<LookAheadDuration> <LookBehindDuration>]
```

## Parameters

- `{LookAheadMethod}` includes the attributes `Extrapolate` and `Hold`
- `<LookAheadDuration>` is used to calculate the length of attitude data points
- `<LookBehindDuration>` is used to calculate the retention length of attitude data points

## Examples

::: details open **Set Real-Time Attitude Data**
```
SetAttitude */Satellite/xxxx RealTime Extrapolate 300 120
```
:::
