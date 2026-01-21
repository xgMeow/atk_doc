# Lambert段

## Propagator

 

作用：设置轨道预报器参数

::: note 用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.Propagator {Value}
```
:::

::: info 说明：
 `Value` 按顺序输入属性为中心天体, 引力场模型, 引力场模型次数,  引力场模型阶数, 大气阻力摄动使用状态, 大气阻力摄动大气模型, 太阳辐射 通量/地磁指数输入方式, 太阳辐射通量/地磁指数平均 F10.7, 太阳辐射通量/地 磁指数每日 F10.7, 太阳辐射通量/地磁指数 Ap, 太阳光压摄动, 三体摄动 1 太阳, 三体摄动 2 根据中心体确定, 三体摄动 2 模型类型, 三体摄动 2 模型, 三体摄动 2 阶数, 三体摄动 2 次数, 三体摄动 3 根据中心体确定, 三体摄动 3 模型类型, 三体摄动 3 模型, 三体摄动 3 阶数, 三体摄动 3 次数；

 

| 属性                 | 可设置参数                                                   |
| -------------------- | ------------------------------------------------------------ |
| 引力场模型           | 对于地球  EGM96,EGM2008,GEMT1,GGM01C,GGM02C,  JGM2,JGM3,WGS84,WGS84_EGM96  对于月球  GLGM2,LP75D,LP75G,LP100J,LP100K,LP150Q ,LP165P  对于火星GMM1,GMM2B,Mars50c |
| 大气阻力摄动大气模型 | EExponential , E1976StdAtm,   ENRLMSISE00 , EMSISE90 , EMSIS86 |
| 三体摄动 2 模型      | 中心天体为地球： GMM1,GMM2B,Mars50c 中心天体为月球和火星：  EGM96,EGM2008,GEMT1,GGM01C,GGM02C, JGM2,JGM3,WGS84,WGS84_EGM96 |
| 三体摄动 3 模型      | 中心天体为月球： GMM1,GMM2B,Mars50c 中心天体为地球和火星：  GLGM2,LP75D,LP75G,LP100J,LP100K,LP150Q ,LP165P |
:::

::: warning 注意：

1. 中心天体目前包括 `Earth` , `Moon` , `Mars`
2. 获得此属性值暂未实现
:::

::: tip 举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.LambertTarget.Propagator Earth EGM96 3 5 true ENRLMSISE00 false 105 150 3.5 false true true 1 GMM2B 3 5 true 0 LP75D 1 2
```
:::
 

## MaxPropTime


作用：设置最大外推时间

::: note 用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.{Attribute} <Value> [{Unit}]
```
:::

::: info 说明： 
- 设置最大外推时间, 在该最大外推时间之后, 无论是否满足停止条件, 段都结束。
:::

::: tip 举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.LambertTarget.MaxPropTime 10 day
```
:::
 

## Stopping Conditions


作用：设置停止条件

::: note 用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.StoppingConditions <List of Stopping Conditions>
```
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.StoppingConditions.{Stopping Condition} <Value> [{Unit}]
```
:::

::: info 说明：
- `List of Stopping Condition` 目前包括属性 `Duration` ,  `Epoch` 。
:::

::: tip 举例： 

```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.LambertTarget.StoppingConditions Duration
```
:::
 

## LambertState

 

作用：为兰勃特段坐标类型位置速度设置属性值

::: note 用法： 

```
Astrogator <Satellite Object Path> SetValue <Astrogator ObjectPath>.LambertTarget.<CoordinateType>.<Element> <Value> <Unit>
```
:::

::: details 属性设置详细说明（点击展开）

- `<CoordinateType>`为`Cartesian`时

 

| Element | 说明                                      |
| ------- | ----------------------------------------- |
| X       | 默认单位时 m, 包括单位 m , km             |
| Y       | 默认单位时 m, 包括单位 m , km             |
| Z       | 默认单位时 m, 包括单位 m , km             |
| Vx      | 默认单位时 m/sec, 包括单位 m/sec , km/sec |
| Vy      | 默认单位时 m/sec, 包括单位 m/sec , km/sec |
| Vz      | 默认单位时 m/sec, 包括单位 m/sec , km/sec |

- `<CoordinateType>`为`Keplerian`时

 

| Element | 说明                                                   |
| ------- | ------------------------------------------------------ |
| Sma     | 半长轴默认单位是 m, 包括单位 km , m, 设置 属性使用 sma |
| Ecc     | 偏心率                                                 |
| Inc     | 轨道倾角, 默认单位 rad                                 |
| RAAN    | 升交点赤经, 默认单位 rad                               |
| W       | 近拱点角距, 默认单位 rad                               |
| TA      | 真近点角, 默认单位 rad                                 |

:::

::: tip 举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.LambertTarget.LambertState.Cartesian.X 6700000 m
```
:::
 

## Onedv



作用：设置是否单脉冲

::: note 用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.Onedv <Value>
```
:::

::: tip 举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.LambertTarget.Onedv false
```
:::
 

## Perturb

 

作用：设置是否摄动迭代

::: note 用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.Perturb <Value>
```
:::

::: tip 举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.LambertTarget.Perturb false
```
:::
 

## Elliptical

 

作用：设置是否限制为椭圆轨道

::: note 用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.Elliptical <Value>
```
:::

::: tip 举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.LambertTarget.Elliptical false
```
:::
 

## UsePeriJudge

 

作用：设置是否最小近拱点高度

::: note 用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.UsePeriJudge <Value>
```
:::

::: tip 举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.LambertTarget.UsePeriJudge false
```
:::
 

## NewtonMax

 

作用：设置牛顿迭代次数



::: note 用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.NewtonMax <Value>
```
:::

::: tip 举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.LambertTarget.NewtonMax 10
```
:::
 

## HomtopMax
 

作用：设置同伦迭代次数

::: note 用法：
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.HomtopMax <Value>
```
:::

::: tip 举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.LambertTarget.HomtopMax 2
```
:::
 

## IterPosErr

 

作用：设置瞄准位置误差

::: note 用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.IterPosErr <Value>
```
:::

::: tip 举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.LambertTarget.IterPosErr 0.1
```
:::

 

## PeriHeight

 

作用： 设置近拱点高度

::: note 用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.PeriHeight <Value>
```
:::

::: tip 举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.LambertTarget.PeriHeight 0.1
```
:::
 

## Active

 

作用：设置停止条件是否选中

::: note 用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.StoppingConditions.{Stopping Condition}.Active {Value}
```
:::


::: info 说明：
- `Stopping Condition` 目前包括属性 `Duration` , `Epoch`
:::

::: tip 举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.LambertTarget.StoppingConditions.Duration.Active false
```
:::
 

## TripValue

 

作用：设置触发值

::: note 用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.StoppingConditions.{Stopping Condition}.TripValue <Value> [{Unit}]
```
:::

::: info 说明： 
- `Stopping Condition` 目前包括属性 `Duration` , `Epoch`
:::

::: tip 举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.LambertTarget.StoppingConditions.Duration.TripValue 86400 sec
```
:::
 

## Tolerance

 

作用：设置误差

::: note 用法： 

```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.StoppingConditions.{StoppingCondition}.Tolerance <Value> [{Unit}]
```
:::

::: info 说明： 
- `Stopping Condition` 目前包括属性 `Duration` , `Epoch`
:::

::: tip 举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.LambertTarget.StoppingConditions.Duration.Tolerance 0.0000001 sec
```
:::
 

## CoordinateSystem

 

作用：设置坐标系

::: note 用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.CoordinateSystem {Value}
```
:::

::: tip 举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.LambertTarget.CoordinateSystem "CentralBody/Moon J2000"
```
:::
 

## CoordinateType


作用：设置坐标类型



::: note 用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.CoordinateType {Value}
```
:::

::: info 说明： 
- `{Value}`包括`"Cartesian"`、`"ModifiedKeplerian"`和`"Keplerian"`
:::

::: tip 举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.LambertTarget.CoordinateType "Cartesian"
```
:::
 

## SegmentColor

 

作用：设置兰勃特段颜色

::: note 用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.SegmentColor <Value>
```
:::

::: info 说明：

1. 颜色设置从`-1` 到 `-16777216` 是透明度为 255 时颜色 255255255 到 000000000，按照 RGB 格式进行满 255 进 1，例如红色 255000000，透明度为 255，则有 `255000000 ： -256^3+255*256^0= -16776961` ，`000255000：-256^3+255*256^1= -16711936`

2. 从 0 到 4294967295 是透明度为 000 时颜色 000000000 到透明度 255  时颜色 255255255，例如红色 255000000，透明度为 255，则有 `255000000255：255*256^3+255*256^0=4278190335`
:::

::: tip 举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.LambertTarget.SegmentColor 4278190335
```
:::

 