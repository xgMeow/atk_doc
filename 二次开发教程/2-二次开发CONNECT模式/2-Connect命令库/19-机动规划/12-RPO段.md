# RPO段

## RPO段重命名


作用： 设置 `RPO` 段重命名

::: note 用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.ComponentName Rename
```
:::

::: tip 举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.RPOExitGEO.ComponentName 111
```
:::
 

## RPO段设置参考航天器


作用： 设置 `RPO` 段参考航天器

::: note 用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.Reference <ObjectPath>
```
:::

::: tip 举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.RPOExitGEO.Reference "Satellite/Satellite3"
```
:::

## RPO段设置参数


### RPOGEO 轨道撤离段

 

作用： 设置 `RPOExitGEO` 段属性

::: note 用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.<Parameters> <List of Results >
```
:::
::: info 说明：

 

| 参数名称          | 数据类型 | 范围          |
| ----------------- | -------- | ------------- |
| `Desired_DriftRate` | deg/day  | `[-360,360]`    |
| `Propagator_Time`   |          | `[0.001,86400]` |
| `SolveMethod`       |          | `[-1,4]`       |

 :::



::: tip 举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.RPOExitGEO.Desired_DriftRate 45
```
:::
 

### RPOGEO 轨道漂移交会段

 

作用： 设置 `RPOGEORendezvousDrifting` 段属性

::: note 用法： 

```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.<Parameters> <List of Results >
```
:::

::: info 说明：

 

| 参数名称                  | 数据类型  | 范围               |
| ------------------------ | -------- | ------------------ |
| `Desired_Radial`         | m        | `[-100000, 100000]` |
| `Desired_InTrack`        | m        | `[-100000,100000]`  |
| `Desired_CrossTrack`     | m        | `[-100000,100000]`  |
| `Desired_RadialRate`     | m/sec    | `[-1000,1000]`      |
| `Desired_InTrackRate`    | m/sec    | `[-1000,1000]`      |
| `Desired_CrossTrackRate` | m/sec    | `[-1000,1000]`      |
| `Wait_Time`              | sec      | `[0.001,86400]`     |
| `Rendezvous_Time`        | UTCG     |                     |
| `MaxIter`                |          | `[-1,1000]`         |
| `SolveMethod`            |          | `[-1,4]`            |
:::

::: tip 举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.RPOGEORendezvousDrifting.Desired_Radial 50000
```
:::
 

### RPOGEO 轨道交会段

 

作用： 设置 `RPOGEORendezvousNolead` 段属性

::: note 用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.<Parameters> <List of Results >
```
:::
::: info 说明：

 

| 参数名称                  | 数据类型 | 范围                |
| ------------------------ | -------- | ------------------ |
| `Desired_DriftRate`      | deg/day  | `[-360,360]`       |
| `Desired_Radial`         | m        | `[-100000,100000]` |
| `Desired_InTrack`        | m        | `[-100000,100000]` |
| `Desired_CrossTrack`     | m        | `[-100000,100000]` |
| `Desired_RadialRate`     | m/sec    | `[-1000,1000]`     |
| `Desired_InTrackRate`    | m/sec    | `[-1000,1000]`     |
| `Desired_CrossTrackRate` | m/sec    | `[-1000,1000]`     |
| `Propagator_Time`        |          | `[0.001,86400]`    |
| `Wait_Time`              | sec      | `[0.001,86400]`      |
| `Rendezvous_Time`        | UTCG     |                    |
| `MaxIter`                |          | `[-1,1000]`        |
| `SolveMethod`            |          | `[-1,4]`           |
:::

::: tip 举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.RPOGEORendezvousNolead.Desired_DriftRate 45
```
:::
 

### RPO 太阳同步绕飞段

 

作用： 设置 `RPOFollowSun` 段属性

::: note 用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.<Parameters> <List of Results >
```
:::
::: info 说明：

 

| 参数名称             | 数据类型 | 范围               |
| ------------------- | -------- | ----------------- |
| `Standoff_Dist`     | m        | `[0.001, 100000]` |
| `NumPoints`         |          | `[4,360]`         |
| `FS_NumRevs`        |          | `[0.001, 1000]`   |
| `Transfer_Duration` | sec      | `[0.06,100000]`   |
| `Way_MaxDegrees`    | rad      | `[0.001,360]`     |
| `SolveMethod`       |          | `[-1,4]`          |
:::

::: tip 举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.RPOFollowSun.NumPoints 10
```
:::
 

### RPO 圆形受控绕飞段

 

作用： 设置 `RPOFMCircumnav` 段属性

::: note 用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.<Parameters> <List of Results >
```
:::
::: info 说明：

 

| 参数名称                      | 数据类型 | 范围                 |
| ---------------------------- | -------- | ------------------- |
| `Circumnav_Radius`           | m        | `[0.01, 1000000]`   |
| `NumPoints`                  |          | `[4,360]`           |
| `FMC_NumRevs`                |          | `[0.001,1000]`      |
| `Transfer_Duration`          | sec      | `[0.06,100000]`     |
| `Initial_Offset_Angle`       | rad      | `[- 180,180]`       |
| `CrossTrack_InTrackRotation` | rad      | `[- 180,180]`       |
| `CrossTrack_RadialRotation`  | rad      | `[- 180,180]`       |
| `Radial_Offset`              | m        | `[- 100000,100000]` |
| `InTrack_Offset`             | m        | `[-100000,100000]`  |
| `CrossTrack_Offset`          | m        | `[-100000,100000]`  |
| `Way_MaxDegrees`             | rad      | `[0.001,360]`       |
| `Time_Compression_Ratio`     |          | `[0.01,100]`        |
| `SolveMethod`                |          | `[-1,4]`            |
:::

::: tip 举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.RPOForcedMotionCircumnav.Circumnav_Radius 50000
```
:::
 

### RPO直线逼近段

 

作用： 设置 `RPOFMW` 段属性

::: note 用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.<Parameters> <List of Results >
```
:::
::: info 说明：

 

| 参数名称               | 数据类型 | 范围                |
| --------------------- | -------- | ------------------ |
| `Waypoint_Radial`     | m        | `[-100000,100000]` |
| `Waypoint_InTrack`    | m        | `[-100000,100000]` |
| `Waypoint_CrossTrack` | m        | `[0.06,100000]`    |
| `Waypoint_Duration`   | sec      | `[-100000,100000]` |
| `Waypoint_MaxDegrees` | rad      | `[0.001,360]`      |
| `SolveMethod`         |          | `[-1,4]`           |
:::

::: tip 举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.RPOFMW.Waypoint_Radial 50000
```
:::
 

### RPO 单次跳跃段

 

作用： 设置 `RPOHop` 段属性

::: note 用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.<Parameters> <List of Results >
```
:::
::: info 说明：

 

| 参数名称              | 数据类型 | 范围                |
| -------------------- | -------- | ------------------ |
| `Desired_Radial`     | m        | `[-100000,100000]` |
| `Desired_InTrack`    | m        | `[-100000,100000]` |
| `Desired_CrossTrack` | m        | `[-100000,100000]` |
| `Hop_Duration`       | sec      | `[0.001,86400]`    |
| `SolveMethod`        |          | `[-1,4]`           |
:::

::: tip 举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.RPOHop.Desired_Radial 50000
```
:::

### RPO 自然绕飞段

 

作用： 设置 `RPONMCircumnav` 段属性

::: note 用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.<Parameters> <List of Results >
```
:::
::: info 说明：

 

| 参数名称                  | 数据类型 | 范围                 |
| ------------------------ | -------- | ------------------- |
| `SemiMinor_Axis`         | m        | `[0.01,1000000]`    |
| `RBar_CrossTrack_Offset` | m        | `[-100000,100000]`  |
| `VBar_CrossTrack_Offset` | m        | `[-100000,100000]`  |
| `Transfer_Duration`      | sec      | `[0.001,1000000]`   |
| `InTrack_Offset`         | m        | `[-100000,100000]`  |
| `Way_MaxDegrees`         | rad      | `[0.001,360]`       |
| `NMC_NumRevs`            |          | `[0.001,1000]`      |
| `SolveMethod`            |          | `[-1,4]`            |
:::

::: tip 举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.RPONMCircumnav.SemiMinor_Axis 50000
```
:::
 

### RPO 定点保持段

 

作用： 设置 `RPOPerchEqualSpacing` 段属性

::: note 用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.<Parameters> <List of Results >
```
:::
::: info 说明：

 

| 参数名称            | 数据类型 | 范围               |
| ------------------ | -------- | ----------------- |
| `Perch_Duration`   | sec      | `[0.001,8640000]` |
| `Perch_MaxDegrees` | rad      | `[0.001,360]`     |
| `SolveMethod`      |          | `[-1,4]`          |
:::

::: tip 举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.RPOPerchEqualSpacing.Perch_Duration 7200
```
:::
 

### RPO 水滴绕飞段

 

作用： 设置 `RPOTearDrop` 段属性

::: note 用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.<Parameters> <List of Results >
```
:::

::: info 说明：

 

| 参数名称               | 数据类型 | 范围               |
| --------------------- | -------- | ----------------- |
| `NumCircles`          |          | `[0,1000]`          |
| `TearDrop_TurnAround` | m        | `[-100000,100000]`  |
| `TearDrop_Maneuver`   | m        | `[-100000,100000]`  |
| `Transfer_Duration`   | sec      | `[0.001,86400]`     |
| `Way_MaxDegrees`      | rad      | `[0.001,360]`       |
| `SolveMethod`         |          | `[-1,4]`            |
:::
 
::: tip 举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.RPOTearDrop.NumCircles 500
```
:::
