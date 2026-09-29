# IsMajorArc

## Description

Set whether to transfer along the major arc.

## Syntax

```atk-command
Astrogator <Satellite Object Path> SetValue <Attribute Path>.IsMajorArc <Value>
```

## Additional Notes

- The possible values of `Value` are `on` and `off`

::: warning Note
This value can be set only when the type of [Method](./Method.md) is `AdaptSpecified`
:::

## Examples

::: details open **Set the transfer to follow the major arc**
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.LambertTarget.IsMajorArc on
```
:::
