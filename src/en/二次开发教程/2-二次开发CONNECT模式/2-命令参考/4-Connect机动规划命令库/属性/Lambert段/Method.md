# Method

## Description

Set the Lambert solution method.

## Syntax

```atk-command
Astrogator <Satellite Object Path> SetValue <Attribute Path>.Method <Value>
```

## Parameters

| Parameter | Description |
|------|------|
| `Value` | Possible values: `SpecAll`, `SpecMin`, `AdaptSpecified`, `AdaptMin` |

**Detailed description of the possible values of Value**:

| Value | Solution strategy | Result |
|------|----------|------|
| `SpecAll` | Solve all feasible solutions with a specified number of Newton/homotopy iterations | Returns the fuel-optimal solution; takes longer |
| `SpecMin` | Solve with a specified number of Newton/homotopy iterations, in descending order of the two-body fuel solution | Returns the fuel-optimal solution |
| `AdaptSpecified` | Adaptively solve for the specified revolution/long-short arc (LongArc)/prograde-retrograde (major-minor arc, MajorArc), without specifying the numbers of Newton iterations and homotopy iterations | The solution may fail for some cases; takes less time |
| `AdaptMin` | Adaptively solve in descending order of the fuel solution, without specifying the numbers of Newton iterations and homotopy iterations | Returns the fuel-optimal solution; takes less time |

## Examples

::: details open **Set the Lambert solution method to SpecAll**
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.LambertTarget.Method specall
```
:::
