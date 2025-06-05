---
title: 机动规划命令
index: true
dir:
    link: true
---
<!--Catalog /-->


## 设置轨道为轨道规划


作用：设置轨道为轨道规划

用法： 
```
Astrogator <Satellite Object Path> SetProp
```

注意：此命令只针对卫星使用

举例： 
```
Astrogator */Satellite/Satellite1 SetProp
```
 

## 运行轨道规划


作用：运行轨道规划

用法： 
```
Astrogator <Satellite Object Path> RunMCS
```

注意：此命令只针对卫星使用

举例： 
```
Astrogator */Satellite/Satellite1 RunMCS
```
 
## 轨道规划段复制粘贴


作用：轨道规划段复制粘贴

用法： 
```
Astrogator <Satellite Object Path> Paste CopySegmentPath PasteSegmentPath
```

注意：此命令只针对卫星使用

举例： 
```
Astrogator */Satellite/Satellite1 Paste MainSequence.SegmentList.Propagate.- MainSequence.SegmentList.InitialState
```
 

## 规划插入段

 

作用：在任务控制序列或子序列中插入段

用法： 
```
Astrogator <Satellite Object Path> InsertSegment <Attribute Path> SegmentType
```
::: info 说明
1. 若`<Attribute Path>`输入已存在段路径+段名，新段将插入到此段之前；若`<Attribute Path>`输入段路径+`-`，新段将插入到此任务控制序列最后一段之后；

2. 若`<Attribute Path>`仅为`-`，新段将插入到第一个任务控制序列列表下的最后一个段之后。

3. 若`<Attribute Path>`仅为段名，新段将插入到第一个名字与之匹配的段之前。

4. 插入 RPO 相关段时， 相关名称对应如下：
    - 圆形受控绕飞段 `RPOFMCircumnav`
    - 直线逼近段 `RPOFMW`
    - 单次跳跃段 `RPOHop`
    - 定点保持段 `RPOPerchEqualSpacing`
    - 水滴绕飞段 `RPOTearDrop` 
    - 自然绕飞段 RPONMCircumnav
    - 太阳同步绕飞段 RPOFollowSun
    - GEO 轨道撤离段 RPOExitGEO
    - GEO 轨道漂移交会段 RPOGEORendezvousDrifting
    - GEO 轨道交会段 RPOGEORendezvousNolead
:::

举例：
```
Astrogator */Satellite/Satellite1 InsertSegment MainSequence.SegmentList.Maneuver1 Propagate
```
```
Astrogator */Satellite/Satellite1 InsertSegment MainSequence.SegmentList.- Propagate
```
```
Astrogator */Satellite/Satellite1 InsertSegment - Propagate
```
```
Astrogator */Satellite/Satellite1 InsertSegment Maneuver1 Propagate
```
```
Astrogator */Satellite/Satellite1 InsertSegment MainSequence.SegmentList.- RPOFMCircumnav
```
 

## 规划删除段

 

作用：从任务控制序列或子序列中删除段

用法： 
```
Astrogator <Satellite Object Path> DeleteSegment <Attribute Path>
```
说明：在任务控制序列中删除一个段并且不在子序列中进行嵌套，不需要

包含路径；输入你想要删除新的段的名字即可

举例：
```
Astrogator */Satellite/Satellite1 DeleteSegment MainSequence.SegmentList.Target_Sequence.SegmentList.Target_Sequence.SegmentList.Propagate2
```
```
Astrogator */Satellite/Satellite1 DeleteSegment MainSequence.SegmentList.Target_Sequence
```
```
Astrogator */Satellite/Satellite1 DeleteSegment MainSequence.SegmentList.Target_Sequence.SegmentList.Target_Sequence.SegmentList.-
```

## 规划设置属性值
 

作用：向轨道机动模块传递值

用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path> <Attribute> <Value> [<Unit>]
```

说明：具体的属性类型请查看规划属性

举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.Initial_State.CoordinateType" "Modified Keplerian"
```
 

## 规划获得属性值

 

作用：获得规划段的属性值

用法： 
```
Astrogator_RM <Satellite Object Path> GetValue <Attribute Path>.<Attribute>
```

举例：

```
Astrogator_RM */Satellite/FastTransfer GetValue MainSequence.SegmentList.Target_Sequence.SegmentList.Maneuver.ImpulsiveMnvr.Cartesian.X
```
 

## 规划增加段控制量

作用：为瞄准序列段内的段增加控制变量

用法： 
```
Astrogator <Satellite Object Path> AddMCSSegmentControl <AttributePath> <Attribute>
```

说明：该命令的属性是个独立变量。瞄准序列中某段的数值元素被选为独立变量。可设置数值元素请查看规划属性-瞄准序列段-Variables

举例：
```
Astrogator */Satellite/Satellite1 AddMCSSegmentControl MainSequence.SegmentList.Target_Sequence.SegmentList.Maneuver ImpulsiveMnvr.Cartesian.X
```

```
Astrogator */Satellite/Satellite1 AddMCSSegmentControl MainSequence.SegmentList.Target_Sequence.SegmentList.Propagate StoppingConditions.Duration.TripValue
```
 

## 规划设置段控制量



作用：为瞄准序列段内的段设置控制变量以及他们的参数

用法： 
```
Astrogator <Satellite Object Path> SetMCSControlValue <AttributePath>.Profiles.Differential_Corrector  <ParentObjectName> <ControlName> <Attribute> <Value> [<Unit>]
```
说明：

初始段控制量属性名称：

| Attribute             | 说明                                                   |
| --------------------- | ------------------------------------------------------ |
| UTC                   | 设置属性使用 InitialState.Epoch                        |
| X                     | 设置属性使用 InitialState.Cartesian.X                  |
| Y                     | 设置属性使用 InitialState.Cartesian.Y                  |
| Z                     | 设置属性使用 InitialState.Cartesian.Z                  |
| VX                    | 设置属性使用 InitialState.Cartesian.Vx                 |
| VY                    | 设置属性使用 InitialState.Cartesian.Vy                 |
| VZ                    | 设置属性使用 InitialState.Cartesian.Vz                 |
| SMajAx                | 设置属性使用 InitialState.Keplerian.sma                |
| ApoAlt                | 设置属性使用  InitialState.Keplerian.ApoapsisAltSize   |
| ApoRad                | 设置属性使用  InitialState.Keplerian.ApoapsisRadSize   |
| Period                | 设置属性使用 InitialState.Keplerian.Period             |
| MeanMotn              | 设置属性使用 InitialState.Keplerian.MeanMotion         |
| Ecc                   | 设置属性使用 InitialState.Keplerian.ecc                |
| PeriAlt               | 设置属性使用  InitialState.Keplerian.PeriapsisAltShape |
| PeriRad               | 设置属性使用  InitialState.Keplerian.PeriapsisRadShape |
| Inc                   | 设置属性使用 InitialState.Keplerian.inc                |
| RAAN                  | 设置属性使用 InitialState.Keplerian.RAAN               |
| ArgPeri               | 设置属性使用 InitialState.Keplerian.w                  |
| TrueAnomaly           | 设置属性使用 InitialState.Keplerian.TA                 |
| MeanAnomaly           | 设置属性使用  InitialState.Keplerian.MeanAnomaly       |
| ArgumentOfLatitude    | 设置属性使用 InitialState.Keplerian.ArgLat             |
| EccentricAnomaly      | 设置属性使用 InitialState.Keplerian.EccAnomaly         |
| TimePastAscendingNode | 设置属性使用 InitialState.Keplerian.TimePastAN         |
| TimePastPerigee       | 设置属性使用  InitialState.Keplerian.TimePastPeriapsis |
| DryMass               | 设置属性使用 InitialState.DryMass                      |
| Cd                    | 设置属性使用 InitialState.Cd                           |
| DragArea              | 设置属性使用 InitialState.DragArea                     |
| Cr                    | 设置属性使用 InitialState.Cr       |
| SRPArea               | 设置属性使用 InitialState.SRPArea  |
| FuelMass              | 设置属性使用 InitialState.FuelMass |

预报段控制量属性名称：

 

| Attribute             | 说明                                                         |
| --------------------- | ------------------------------------------------------------ |
| Duration.TripValue    | 设置属性使用  StoppingConditions.Duration.TripValue          |
| Epoch.TripValue       | 设置属性使用  StoppingConditions.Epoch.TripValue             |
| Longitude.TripValue   | 设置属性使用  StoppingConditions.Longitude.TripValue         |
| Latitude.TripValue    | 设置属性使用  StoppingConditions.Latitude.TripValue          |
| Altitude.TripValue    | 设置属性使用  StoppingConditions.Altitude.TripValue          |
| RMagnitude.TripValue  | 设置属性使用  StoppingConditions.RMagnitude.TripValue        |
| TrueAnomaly.TripValue | 设置属性使用  StoppingConditions.TrueAnomaly.TripValue       |
| MeanAnomaly.TripValue | 设置属性使用  StoppingConditions.MeanAnomaly.TripValue       |
| ArgLat.TripValue      | 设置属性使用  StoppingConditions.ArgumentOfLati-  tude.TripValue |
| StateCalc.TripValue   | 设置属性使用  StoppingConditions.StateCalc.TripValue         |

机动段控制量属性名称：

 

| Attribute                 | 说明                                            |
| ------------------------- | ----------------------------------------------- |
| ImpulseX                  | 设置属性使用 ImpulsiveMnvr.Cartesian.X          |
| ImpulseY                  | 设置属性使用 ImpulsiveMnvr.Cartesian.Y          |
| ImpulseZ                  | 设置属性使用 ImpulsiveMnvr.Cartesian.Z          |
| ImpulseAzimuth            | 设置属性使用 ImpulsiveMnvr.Spherical.Azimuth    |
| ImpulseElevation          | 设置属性使用  ImpulsiveMnvr.Spherical.Elevation |
| ImpulseMagnitude          | 设置属性使用  ImpulsiveMnvr.Spherical.Magnitude |
| FiniteX                   | 设置属性使用 FiniteMnvr.Cartesian.X             |
| FiniteY                   | 设置属性使用 FiniteMnvr.Cartesian.Y             |
| FiniteZ                   | 设置属性使用 FiniteMnvr.Cartesian.Z             |
| FiniteAzimuth             | 设置属性使用 FiniteMnvr.Spherical.Azimuth       |
| FiniteElevation           | 设置属性使用 FiniteMnvr.Spherical.Elevation     |
| Finite.Duration.TripValue | 设置属性使用 StoppingConditions.Duration.TripValue    |
| Finite.Epoch.TripValue           | 设置属性使用  StoppingConditions.Epoch.TripValue             |
| Finite.Longitude.TripValue       | 设置属性使用  StoppingConditions.Longitude.TripValue         |
| Finite.Latitude.TripValue        | 设置属性使用  StoppingConditions.Latitud.TripValue           |
| Finite.Altitude.TripValue        | 设置属性使用  StoppingConditions.Altitude.TripValue          |
| Finite.RMagni-  tude.TripValue   | 设置属性使用  StoppingConditions.RMagnitude.TripValue        |
| Finite.TrueAnom-  aly.TripValue  | 设置属性使用  StoppingConditions.TrueAnomaly.TripValue       |
| Fi-  nite.MeanAnomaly.TripVa lue | 设置属性使用  StoppingConditions.MeanAnomaly.TripValue       |
| Finite.ArgLat.TripValue          | 设置属性使用  StoppingConditions.ArgumentOfLati-  tude.TripValue |
| Finite.StateCalc.TripValue       | 设置属性使用  StoppingConditions.StateCalc.TripValue         |

更新段控制量属性名称：

 

| Attribute     | 说明                     |
| ------------- | ------------------------ |
| ValueDryMass  | 设置属性使用 DryMassVal  |
| ValueFuelMass | 设置属性使用 FuelMassVal |
| ValueSRPArea  | 设置属性使用 SRPAreaVal  |
| ValueCr       | 设置属性使用 CrVal       |
| ValueDragArea | 设置属性使用 DragAreaVal |
| ValueCd       | 设置属性使用 CdVal       |

保持段控制量属性名称：

 

| Attribute             | 说明                                                         |
| --------------------- | ------------------------------------------------------------ |
| Duration.TripValue    | 设置属性使用  StoppingConditions.Duration.TripValue          |
| Epoch.TripValue       | 设置属性使用  StoppingConditions.Epoch.TripValue             |
| Longitude.TripValue   | 设置属性使用  StoppingConditions.Longitude.TripValue         |
| Latitude.TripValue    | 设置属性使用  StoppingConditions.Latitude.TripValue          |
| Altitude.TripValue    | 设置属性使用  StoppingConditions.Altitude.TripValue          |
| RMagnitude.TripValue  | 设置属性使用  StoppingConditions.RMagnitude.TripValue        |
| TrueAnomaly.TripValue | 设置属性使用  StoppingConditions.TrueAnomaly.TripValue       |
| MeanAnomaly.TripValue | 设置属性使用  StoppingConditions.MeanAnomaly.TripValue       |
| ArgLat.TripValue      | 设置属性使用  StoppingConditions.ArgumentOfLatitude.TripValue |
| StateCalc.TripValue   | 设置属性使用  StoppingConditions.StateCalc.TripValue         |

兰伯特段控制量属性名称：

 

| Attribute             | 说明                                                         |
| --------------------- | ------------------------------------------------------------ |
| Cartesian.X           | 设置属性使用LambertState.Cartesian.X                       |
| Cartesian.Y           | 设置属性使用LambertState.Cartesian.Y                       |
| Cartesian.Z           | 设置属性使用LambertState.Cartesian.Z                       |
| Cartesian.Vx          | 设置属性使用LambertState.Cartesian.Vx                      |
| Cartesian.Vy          | 设置属性使用LambertState.Cartesian.Vy                      |
| Cartesian.Vz          | 设置属性使用LambertState.Cartesian.Vz                      |
| Keplerian.Sma         | 设置属性使用LambertState.Keplerian.Sma                     |
| Keplerian.Ecc         | 设置属性使用LambertState.Keplerian.Ecc                     |
| Keplerian.Inc         | 设置属性使用LambertState.Keplerian.Inc |
| Keplerian.RAAN        | 设置属性使用LambertState.Keplerian.RAAN                    |
| Keplerian.W           | 设置属性使用LambertState.Keplerian.W                       |
| Keplerian.TA          | 设置属性使用LambertState.Keplerian.TA                      |

微分修正可设置参数属性：

 

| Value             | Unit                                                         |
| --------------------- | ------------------------------------------------------------ |
| Active                | 设置或获取控制变量是否使用，可输入true或false                   |
| MaxStep               | 设置或获取最大步长                      |
| Correction            | 设置或获取累计校正量                      |
| Pert                  | 设置或获取摄动量                      |
| Scale                 | 设置或获取归一化参数                      |
| FinalValue            | 获取最终值                      |

序列二次规划与智能优化算法可设置参数属性：

 

| Value             | Unit                                                         |
| --------------------- | ------------------------------------------------------------ |
| Active                | 设置或获取控制变量是否使用，可输入true或false                   |
| MaxStep               | 设置或获取最大步长                      |
| Correction            | 设置或获取累计校正量                      |
| Pert                  | 设置或获取摄动量                      |
| Scale                 | 设置或获取归一化参数                      |
| LowerBound            | 设置或获取最小值                      |
| UpperBound            | 设置或获取最大值                      |
| FinalValue            | 获取最终值                           |

注意：除初始段 Epoch 属性，预报段停止条件 Epoch 外，控制量属性与Attribute 单位一致

举例：

```
Astrogator */Satellite/FastTransfer SetMCSControlValue MainSequence.SegmentList.Target_Sequence.Profiles.Differential_Corrector Maneuver ImpulsiveMnvr.Cartesian.X Active true
```
```
Astrogator */Satellite/FastTransfer SetMCSControlValue MainSequence.SegmentList.Target_Sequence1.Profiles.Differential_Corrector Maneuver ImpulsiveMnvr.Cartesian.X MaxStep 300 m/sec
```
 

## 规划获得段控制量

 

作用：获得规划瞄准序列段内段的控制变量

用法： 
```
Astrogator_RM <Satellite Object Path> GetMCSControlValue <AttributePath>.Profiles.<Search Profile> <ParentObjectName> <ControlName> <Attribute>
```

举例：

```
Astrogator_RM */Satellite/FastTransfer GetMCSControlValue MainSequence.SegmentList.Target_Sequence.Profiles.Differential_Corrector Maneuver ImpulsiveMnvr.Cartesian.X MaxStep
```
 

## 规划删除段控制量
 

作用：删除瞄准序列段内段的控制变量

用法： 
```
Astrogator <Satellite Object Path> RemoveMCSSegmentControl <Attribute Path> <Attribute>
```
举例：

```
Astrogator */Satellite/Satellite1 RemoveMCSSegmentControl MainSequence.SegmentList.Target_Sequence.SegmentList.Maneuver ImpulsiveMnvr.Cartesian.X
```
 

## 规划设置段约束值

作用：轨道规划设置段的约束值

用法： 

```
Astrogator <Satellite Object Path> SetMCSConstraintValue <Attribute Path>.Profiles.<Search Profile> <ParentObjectName> <ResultName> <Attribute> <Value> [<Unit>]
```

说明：具体属性设置请查看规划属性-约束

微分修正可设置参数属性：

 

| Value | Unit |
| ----- | ---- |
| Active    | 是指约束量是否使用，可输入 true 或 false |
| tolerance | 设置收敛误差                             |
| scale     | 设置归一化参数                           |
| weight    | 设置权重系数                             |
| desired   | 设置期望值                               |

序列二次规划与智能优化算法可设置参数属性：
<!-- 
<table>
<tbody>
    <tr>
        <td>Active</td>
        <td>设置或获取约束量是否使用，可输入true或false</td>
    </tr>
    <tr>
        <td>Active</td>
        <td>
        Objfun{Constraint|Minimize|Maximize|<br>MinimizeandConstraint|MaximizeandConstraint}
        </td>
    </tr>
</tbody>
</table> -->

| Value                                                 | Unit                                                         |
| ---------------------                                 | ------------------------------------------------------------ |
| Active                                                | 设置或获取约束量是否使用，可输入true或false                   |
| tolerance                                             | 设置或获取收敛误差                      |
| scale                                                 | 设置或获取归一化参数                      |
| weight                                                | 设置或获取权重系数                      |
| desired                                               | 设置或获取期望值                      |
| Objfun\{Constraint\|Minimize\|Maximize\|<br>MinimizeandConstraint\|MaximizeandConstraint\}  | 设置或获取类型\{约束\|最小化\|最大化\|最小化和约束\|最大化和约束\}        |
| desired                                               | 设置或获取期望值                      |
| LowerBound                                            | 设置或获取最小值                      |
| UpperBound                                            | 设置或获取最大值                       |
| Unit                                                  | 获取单位                     |
| Achieved                                              | 获取当前值                           |
| Difference                                            | 获取误差值                      |



举例：

```
Astrogator */Satellite/FastTransfer SetValue MainSequence.SegmentList.Target_Sequence.SegmentList.Maneuver.Results "Radius Of Apoapsis"
```
```
Astrogator */Satellite/FastTransfer SetValue MainSequence.SegmentList.Target_Sequence.SegmentList.Maneuver.Results "RAAN" "X" ');
```
```
Astrogator */Satellite/FastTransfer SetMCSConstraintValue MainSequence.SegmentList.Target_Sequence.Profiles.Differential_Corrector Maneuver "Radius Of Apoapsis" Desired 84328394 m
```
```
Astrogator */Satellite/FastTransfer SetMCSConstraintValue MainSequence.SegmentList.Target_Sequence.Profiles.Differential_Corrector Maneuver Rel_Mean_Mean_Anomaly tolerance 0.2
```
 

## 规划获得段约束值

 

作用：获得规划每个段的约束值

用法： 
```
Astrogator_RM <Satellite Object Path> GetMCSConstraintValue <AttributePath>.Profiles. Differential_Corrector <ParentObjectName> <ResultName> <Attribute>
```

举例： 
```
Astrogator_RM */Satellite/Satellite1 GetMCSConstraintValue MainSequence.SegmentList.Target_Sequence.Profiles.Differential_Corrector Maneuver "Radius Of Apoapsis" tolerance
```
