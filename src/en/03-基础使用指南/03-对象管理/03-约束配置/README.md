---
title: Constraint Configuration
index: false
description: An overview of constraint configuration, covering the purpose and evaluation rules of constraints, terms such as analysis object and associated object, how to open constraints in object properties and how the constraint pages are organized, and the purpose of the Basic, Sun, Time, and Communications constraint pages.
---

# Constraint Configuration

## Function Description

Constraints determine under what conditions an access between objects counts as valid. When performing visibility analysis, coverage analysis, or communications link calculations, the software first derives access periods from the relative motion of the objects, and then the enabled constraints filter those periods instant by instant: at a given instant, the constraints are considered satisfied, and the instant is counted as part of an access period, only when all enabled constraints are satisfied.

::: tip Evaluation Rule
The constraint categories are independent of one another: you can enable a single category or combine several. Each condition is also independent, and conditions that are not enabled do not take part in the evaluation. Only when all enabled conditions are satisfied is the instant considered to satisfy that constraint category.
:::

## Objects and Terminology

Constraints describe the access conditions between two objects. The constraint pages in this section use the following terms:

- **Analysis Object**: The reference party of the analysis. Azimuth, elevation, and range describe the spatial bearing and distance of the associated object relative to the analysis object; altitude is taken from the analysis object itself; and the Sun and Moon elevation and exclusion angles also take the analysis object as their vertex. In visibility analysis, it is specified by the 「Access Object」 of the window; in coverage analysis, it is specified by the 「Analysis Object」, that is, the party being covered; when applying light-time correction, the analysis object is by default the party that receives the signal. In the theory pages it is also called the constrained object (see [Sun Constraints](../../../04-理论基础/02-约束配置/02-太阳约束.md)).

- **Associated Object**: The other party paired with the analysis object. In visibility analysis, it is the target object selected in the object list at the lower left of the window; in coverage analysis, it corresponds to the selected coverage asset. The analysis object and the associated object are the associated object of each other.

- **Central Body**: The body that the analysis object orbits or on which it is located; for example, the central body of an Earth-orbiting satellite is the Earth. Altitude is measured relative to it, and the line-of-sight constraint and the terrain mask also use it to determine obstruction. The “Additional Central Bodies” in Sun Constraints are bodies specified separately from it, used to determine whether other bodies such as the Moon block the access path.

- **Ground Object**: An object located on the surface of the central body, such as a facility, ground vehicle, or ship. Local elevation angles such as the Sun ground elevation angle are defined in the local LH (local horizontal) coordinate system of the analysis object; when the analysis object is a ground object, the reference is the local horizontal plane of the ground where that object is located.

## Opening Constraints

1. In the 【Object View】, right-click the object and choose 【Properties】 in the context menu to open the properties panel of that object.

2. In the property tree on the left of the properties panel, expand the 【Constraints】 node. The constraints available for the object are listed under it; click one of them to open the corresponding constraint page.

![Constraint pages in object properties](../../../../zh/03-基础使用指南/03-对象管理/03-约束配置/media/README/image-20260916161206139.png)

The figure shows the properties panel of a satellite object: the 【Constraints】 node contains the Basic, Sun, and Time entries, and on the right are the parameter area of the 【Basic】 constraint page and the line-of-sight and terrain constraint switches at the bottom.

## Constraint Pages

The constraint pages available may differ between objects; for example, Communications Constraints are only relevant to transmitters and receivers. For the constraint pages actually available for each object, see the 「Constraints」 section of the object property page.

- [Basic Constraints](./01-基本约束.md) — Determines whether an access is valid based on relative geometric relationships such as azimuth, elevation, and range, as well as line-of-sight, field-of-view, and terrain obstruction

- [Sun Constraints](./02-太阳约束.md) — Determines whether an access is valid based on the elevation and exclusion angles of the Sun, the Moon, and specified celestial bodies, as well as additional central body obstruction

- [Time Constraints](./03-时间约束.md) — Restricts accesses to fall within the allowed time range in the time dimension

- [Communications Constraints](./04-通信约束.md) — Determines whether a communications access is usable based on link metrics such as frequency, received power, signal-to-noise ratio, and bit error rate

## Parameters and Evaluation Rules

The types and configuration methods of the conditions on a constraint page are as follows:

- **Value Range**: Numeric parameters such as geometric parameters and link metrics provide 【Min】 and 【Max】. Once selected and a value is entered, the parameter value must fall within the specified range; an end that is not selected is not restricted. When both Min and Max are enabled, the corresponding parameter $x$ must satisfy $x_{\min}\leq x\leq x_{\max}$.

- **Reverse Selection**: Provided for the geometric parameters of Basic Constraints and the link metrics of Communications Constraints. When selected, accesses that fall within the specified range are removed and only those outside the range are retained.

- **Switch Conditions**: Given as check boxes, such as Line of Sight and Terrain Mask; selecting one makes it take part in the evaluation.

- **Group Conditions**: Given as groups, such as Intervals in Time Constraints and Additional Central Body Obstruction in Sun Constraints; the settings in the group take effect only after you select 【Use】 for the group.

## Related Documents

This section describes the general definitions and parameter meanings of the constraint pages. For the geometric definitions and computational models of each parameter, see [Theory](../../../04-理论基础/02-约束配置/README.md); each constraint page provides specific links at the corresponding parameters.
