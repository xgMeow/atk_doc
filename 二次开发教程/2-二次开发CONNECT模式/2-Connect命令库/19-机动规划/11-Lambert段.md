# Lambert段

## CentralBodyCode
 

作用：设置摄动力中心天体

用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.{Attribute} <Value>
```

说明： CentralBodyName对应顺序：Mercury-0,Venus-1,Earth-2,Mars-3,Jupiter-4,Saturn-5,Uranus-6,Neptune-7,Pluto-8,Moon-9,Sun-10

举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.LambertTarget.CentralBodyCode 3
```
 

## Propagator
 
作用：设置轨道预报器参数

用法： 

```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.ForceModel.{Parameters} {Value}
```

| Parameters                                    |Value                                             | 说明                                             | 
| --------------------------------------------- |------------------------------  | ---------------------------------------------    |
| `Gravity.GravModel`                           | 如下类型说明                    | 引力场模型                    |
| `Gravity.MaxDegree`                           |                                | 引力阶数                      |
| `Gravity.MaxOrder`                            |                                | 引力次数                      |
| `Drag.UseDrag`                                | {true | false}                 | 是否采用大气阻力摄动           |
| `Drag.AtmModel`                               |                                | 大气阻力摄动大气模型           |
| `Drag.UseFluxGeoFile`                         |                                | 是否采用太阳辐射和地磁文件      |
| `Drag.F10p7`                                  |                                | 平均F10.7                     |
| `Drag.DailyF10p7`                             |                                | 每日F10.7                     |
| `Drag.Ap`                                     |                                | 地磁指数AP                    |
| `SRP.UseSRP`                                  |                                | 是否采用太阳光压摄动           |
| `ThirdBodies.CentralBodyName.UseGravity`      |                                | 是否采用当前中心天体三体摄动    |
| `ThirdBodies.CentralBodyName.Gm`              |                                | 当前中心天体引力值             |
| `ThirdBodies.CentralBodyName.Degree`          |                                | 当前中心天体阶数               |
| `ThirdBodies.CentralBodyName.Order`           |                                | 当前中心天体次数               |
| `ThirdBodies.CentralBodyName.GravModel`       |                                | 当前中心天体模型               |
| `ThirdBodies.CentralBodyName.GravType`        |                                | 当前中心天体类型               |


::: note 类型说明
<br>
引力场模型 : <br><br>
对于地球  EGM96,EGM2008,GEMT1,GGM01C,GGM02C,JGM2,JGM3,WGS84,WGS84_EGM96<br><br>
对于月球  GLGM2,LP75D,LP75G,LP100J,LP100K,LP150Q ,LP165P <br><br>
对于火星GMM1,GMM2B,Mars50c,MRO110C <br><br>
对于水星  lcarus1987,ZonalsToJ4 <br><br>
对于金星  MGNP180U,ZonalsToJ4 <br><br>
对于木星  JUP230,jup230Spice,ZonalsToJ4 <br><br>
对于土星  Astron2004,sat252Spice,ZonalsToJ4 <br><br>
对于天王星  ura083Spice,ZonalsToJ4 <br><br>
对于海王星  AstronAstro1991,nep016_6Spice,ZonalsToJ4 <br><br>
对于冥王星  plu017Spice,ZonalsToJ4 <br><br>
对应输入序号，从0开始，例如：
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.Target_Sequence.SegmentList.Propagate.ForceModel.Gravity.GravModel EGM96
```
<br><br>CentralBodyName包括：Mercury,Venus,Earth,Mars,Jupiter,Saturn,Uranus,Neptune,Pluto,Moon,Sun
:::


::: note 注意：
获得此属性值暂未实现
:::

举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.Target_Sequence.SegmentList.LambertTarget.ForceModel.Gravity.GravModel EGM96
```

 

## MaxPropTime


作用：设置最大外推时间

用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.{Attribute} <Value> [{Unit}]
```

说明： 设置最大外推时间, 在该最大外推时间之后, 无论是否满足停止条件, 段都结束。

举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.LambertTarget.MaxPropTime 10 day
```
 

## Stopping Conditions


作用：设置停止条件

用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.StoppingConditions <List of Stopping Conditions>
```
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.StoppingConditions.{Stopping Condition} <Value> [{Unit}]
```

说明： `List of Stopping Condition` 目前包括属性 `Duration` ,  `Epoch` 。

举例： 

```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.LambertTarget.StoppingConditions Duration
```
 

## LambertState

 

作用：为兰勃特段坐标类型位置速度设置属性值

用法： 

```
Astrogator <Satellite Object Path> SetValue <Astrogator ObjectPath>.LambertTarget.<CoordinateType>.<Element> <Value> <Unit>
```

::: details 属性设置详细说明（点击展开）

- `<CoordinateType>`为"Cartesian"时

 

| Element | 说明                                      |
| ------- | ----------------------------------------- |
| X       | 默认单位时 m, 包括单位 m , km             |
| Y       | 默认单位时 m, 包括单位 m , km             |
| Z       | 默认单位时 m, 包括单位 m , km             |
| Vx      | 默认单位时 m/sec, 包括单位 m/sec , km/sec |
| Vy      | 默认单位时 m/sec, 包括单位 m/sec , km/sec |
| Vz      | 默认单位时 m/sec, 包括单位 m/sec , km/sec |

- `<CoordinateType>`为"Keplerian"时

 

| Element | 说明                                                   |
| ------- | ------------------------------------------------------ |
| Sma     | 半长轴默认单位是 m, 包括单位 km , m, 设置 属性使用 sma |
| Ecc     | 偏心率                                                 |
| Inc     | 轨道倾角, 默认单位 rad                                 |
| RAAN    | 升交点赤经, 默认单位 rad                               |
| W       | 近拱点角距, 默认单位 rad                               |
| TA      | 真近点角, 默认单位 rad                                 |

:::

举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.LambertTarget.LambertState.Cartesian.X 6700000 m
```
 

## Onedv



作用：设置是否单脉冲

用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.Onedv <Value>
```

举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.LambertTarget.Onedv false
```
 

## Perturb

 

作用：设置是否摄动迭代

用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.Perturb <Value>
```

举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.LambertTarget.Perturb false
```
 

## Elliptical

 

作用：设置是否限制为椭圆轨道

用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.Elliptical <Value>
```

举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.LambertTarget.Elliptical false
```
 

## UsePeriJudge

 

作用：设置是否最小近拱点高度

用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.UsePeriJudge <Value>
```

举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.LambertTarget.UsePeriJudge false
```
 

## NewtonMax

 

作用：设置牛顿迭代次数



用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.NewtonMax <Value>
```

举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.LambertTarget.NewtonMax 10
```
 

## HomtopMax
 

作用：设置同伦迭代次数

用法：
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.HomtopMax <Value>
```

举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.LambertTarget.HomtopMax 2
```
 

## IterPosErr

 

作用：设置瞄准位置误差

用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.IterPosErr <Value>
```

举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.LambertTarget.IterPosErr 0.1
```

 

## PeriHeight

 

作用： 设置近拱点高度

用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.PeriHeight <Value>
```

举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.LambertTarget.PeriHeight 0.1
```
 

## Active

 

作用：设置停止条件是否选中

用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.StoppingConditions.{Stopping Condition}.Active {Value}
```


说明： `Stopping Condition` 目前包括属性 `Duration` , `Epoch`

举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.LambertTarget.StoppingConditions.Duration.Active false
```
 

## TripValue

 

作用：设置触发值

用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.StoppingConditions.{Stopping Condition}.TripValue <Value> [{Unit}]
```

说明： `Stopping Condition` 目前包括属性 `Duration` , `Epoch`

举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.LambertTarget.StoppingConditions.Duration.TripValue 86400 sec
```
 

## Tolerance

 

作用：设置误差

用法： 

```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.StoppingConditions.{StoppingCondition}.Tolerance <Value> [{Unit}]
```

说明： `Stopping Condition` 目前包括属性 `Duration` , `Epoch`

举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.LambertTarget.StoppingConditions.Duration.Tolerance 0.0000001 sec
```
 

## CoordinateSystem

 

作用：设置坐标系

用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.CoordinateSystem {Value}
```

举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.LambertTarget.CoordinateSystem "CentralBody/Moon J2000"
```
 

## CoordinateType


作用：设置坐标类型



用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.CoordinateType {Value}
```

说明： `{Value}`包括`"Cartesian"`、`"ModifiedKeplerian"`和`"Keplerian"`

举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.LambertTarget.CoordinateType "Cartesian"
```
 

## SegmentColor

 

作用：设置兰勃特段颜色

用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.SegmentColor <Value>
```

说明：

1. 颜色设置从`-1` 到 `-16777216` 是透明度为 255 时颜色 255255255 到 000000000，按照 RGB 格式进行满 255 进 1，例如红色 255000000，透明度为 255，则有 `255000000 ： -256^3+255*256^0= -16776961` ，`000255000：-256^3+255*256^1= -16711936`

2. 从 0 到 4294967295 是透明度为 000 时颜色 000000000 到透明度 255  时颜色 255255255，例如红色 255000000，透明度为 255，则有 `255000000255：255*256^3+255*256^0=4278190335`

举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.LambertTarget.SegmentColor 4278190335
```

  
## ComponentName


作用：段重命名

用法： 
```
Astrogator <Satellite Object Path> SetValue <Attribute Path>.ComponentName <Value>
```
 
::: info 注意
此属性值暂不支持获取
:::

举例： 
```
Astrogator */Satellite/Satellite1 SetValue MainSequence.SegmentList.LambertTarget.ComponentName abc
```

 