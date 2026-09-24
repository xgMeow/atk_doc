# CovMulti_RM MultiFOMDefine

## 作用

返回覆盖品质参数

## 语法

```atk-command
CovMulti_RM / MultiFOMDefine Definition <FOMType> { Parameters }
```

## 参数说明

| `{FOMType} {Parameters}` | 说明 |
|------|------|
| `Simple On` | 是否覆盖 |
| `CoverageTime Compute {MaxPerDay \| MaxPercentPerDay \| MinPer \| MinPercentPerDay \| PerDay \| PerDayStdDev \| Percent \| PercentPerDay \| PercentPerDayStdDe \| PercentTimeAbove \| Total \| TotalTimeAbove}` | 覆盖时间 |
| `AccessDuration Compute {Sum \| Maximum \| Minimum \| Average \| StdDeviation \| PercentAbove}` | 访问时长 |
| `AccessSeparation {AvgPerDay \| InSpan \| InSpanPerDay \| MaxPerDay \| MinPerDay \| Total}` | 访问间隔 |
| `RevisitTime Compute {Average \| Maximum \| Minimum \| PercentBelow \| PercentBelowGapsOnly \| PercentBelow \| StdDeviation}` | 重访时间 |
| `TimeAverageGap` | 时间平均间隔 |
| `ResponseTime Compute {Average \| Maximum \| Minimum \| PercentBelow \| PercentBelowGapsOnly}` | 响应时间 |
| `NAsset Compute {Maximum \| Minimum \| Average \| PercentAbove}` | 覆盖重数 |
| `NumberOfAccesses Compute {AvgPerDay \| InSpan \| InSpanPerDay \| MaxPerDay \| MinPerDay \| Total}` | 访问次数 |
| `NumberOfGaps Compute {AvgPerDay \| InSpan \| InSpanPerDay \| MaxPerDay \| MinPerDay \| Total}` | 覆盖间隔次数 |
| `DilutionOfPrecision Compute {Average \| Maximum \| Minimum \| PercentBelow}` | 几何精度衰减因子 |
| `AccessConstraint Compute {Sum \| Maximum \| Minimum \| Average \| PercentAbove \| PercentBelow}` | 可见性约束 |
| `AccessConstraint Constraint {Altitude \| AngularRate \| AzimuthAngle \| ElevationAngle \| Range \| AzimuthRate \| ElevationRate \| RangeRate \| LOSLunarExclusion \| LunarElevationAngle \| SunElevationAngle \| PropagationDelay}` | 可见性约束 |

## 示例

::: details open **计算重访时间的覆盖品质参数**

```
CovMulti_RM / MultiFOMDefine Definition RevisitTime Compute maximum
```

:::
