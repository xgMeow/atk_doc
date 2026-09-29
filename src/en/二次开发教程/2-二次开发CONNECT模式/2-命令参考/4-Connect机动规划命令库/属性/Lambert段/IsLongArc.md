# IsLongArc

## Description

Set whether to transfer along the long arc.

## Syntax

```atk-command
Astrogator <Satellite Object Path> SetValue <Attribute Path>.IsLongArc <Value>
```

## Additional Notes

- The possible values of `Value` are `on` and `off`

::: warning Note
This value can be set only when the type of [Method](./Method.md) is `AdaptSpecified`
:::

## Examples

::: details open **Set the transfer not to follow the long arc**
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.LambertTarget.IsLongArc off
```
:::
