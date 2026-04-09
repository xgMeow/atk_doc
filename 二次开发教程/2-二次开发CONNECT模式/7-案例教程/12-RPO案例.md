# RPO案例

通过二次开发 Connect 模式，创建RPO-水滴绕飞模式案例，具体细节与“案例三-12-RPO案例”相同。期间必须保持 ATK 为打开状态，具体命令分类包括：

1. 与 ATK 进行连接。
2. 新建场景并进行属性设置。
3. 新建工作星并进行属性设置
4. 新建服务星并进行属性设置
5. 插入RPO并设置轨道预报器
6. 水滴绕飞段参数
7. 运行任务
8. 查看报告数据
9. 保存场景后与 ATK 断开连接。

## 脚本展示

### 与 ATK 进行连接

```python
#1, 与 ATK 进行连接
conID = atkOpen();
```

### 新建场景并进行属性设置

```python
#2, 创建任务场景
atkConnect(conID, 'New', '/ Scenario Teardrop');
# 设置仿真时间段
atkConnect(conID, 'SetAnalysisTimePeriod', '* "2007-03-08 00:00:00.000" "2007-03-13 00:00:00.000"');
# 初始化仿真
atkConnect(conID, 'Animate', '* Reset');
```

### 新建工作星并进行属性设置

```python
#3, 创建工作星卫星对象
atkConnect(conID, 'New', '/ Satellite WorkSatellite');
# 设置相关参数
atkConnect(conID, 'SetState', '*/Satellite/WorkSatellite Classical HPOP "2007-03-08 00:00:00.000" "2007-03-13 00:00:00.000" 60 J2000 "2007-03-08 00:00:00.000" 42164000 0 0 0 0 0');
```

### 新建服务星并进行属性设置

```python
#4, 创建服务星卫星对象
atkConnect(conID, 'New', '/ Satellite ServiceSatellite');
# 设置轨道预报器为机动规划
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite SetProp');

# 设置 Keplerian 坐标类型的轨道根数
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite SetValue MainSequence.SegmentList.Initial_State.InitialState.Keplerian.sma 6700000 m');
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite SetValue MainSequence.SegmentList.Initial_State.InitialState.Keplerian.ecc 0');
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite SetValue MainSequence.SegmentList.Initial_State.InitialState.Keplerian.inc 0');
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite SetValue MainSequence.SegmentList.Initial_State.InitialState.Keplerian.RAAN 0');
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite SetValue MainSequence.SegmentList.Initial_State.InitialState.Keplerian.w 0');
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite SetValue MainSequence.SegmentList.Initial_State.InitialState.Keplerian.TA 0');
```

### 插入RPO并设置轨道预报器

```python
#5, 插入 RPO 段
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite InsertSegment MainSequence.SegmentList.- RPOTearDrop');
# 高级设置：设置轨道预报器的参数
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite SetValue MainSequence.SegmentList.RPOTearDrop.CenterBody "Earth"');
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite SetValue MainSequence.SegmentList.RPOTearDrop.GravityModel "WGS84"');
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite SetValue MainSequence.SegmentList.RPOTearDrop.ThreeBodyGravity "Sun, Moon"');
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite SetValue MainSequence.SegmentList.RPOTearDrop.ThreeBodyModel "Point-Mass Model"');
# 开启大气阻力摄动并选择大气模型
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite SetValue MainSequence.SegmentList.RPOTearDrop.AtmosphericDrag "On"');
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite SetValue MainSequence.SegmentList.RPOTearDrop.AtmosphericModel "NRLMSISE00"');
# 开启太阳光压
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite SetValue MainSequence.SegmentList.RPOTearDrop.SolarPressure "On"');
```

### 水滴绕飞段参数

```python
#6, 设置水滴绕飞段参数
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite SetValue MainSequence.SegmentList.RPOTearDrop.NumCircles 5');
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite SetValue MainSequence.SegmentList.RPOTearDrop.StartDistance -300');
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite SetValue MainSequence.SegmentList.RPOTearDrop.ManeuverDistance -800');
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite SetValue MainSequence.SegmentList.RPOTearDrop.WaitTime 21600');  # 等待时间为21600秒
# 设置真近点角变化量最大值
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite SetValue MainSequence.SegmentList.RPOTearDrop.MaxDeltaTrueAnomaly 5');
# 设置求解算法为“序列二次规划”
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite SetValue MainSequence.SegmentList.RPOTearDrop.SolveMethod 2');
# 设置参考航天器为工作星
atkConnect(conID, 'Reference',  '*/Satellite/ServiceSatellite SetRefSatellite */Satellite/WorkSatellite');
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite SetValue MainSequence.SegmentList.RPOTearDrop.Reference "Satellite/WorkSatellite"');
```

### 运行任务

```python
#7, 运行任务控制序列
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite RunMCS');
atkConnect(conID, 'Animate', '* Reset');
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite ApplyAllProfileChanges');
```

### 查看报告数据

```python
#8, 打印查看报告数据
atkConnect(conID, 'Report_RM', '*/Satellite/ServiceSatellite Style "Position" TimePeriod "8 Mar 2007 00:00:00.000" "13 Mar 2007 00:00:00.000"');
```

### 保存场景后与 ATK 断开连接

```python
#9, 保存文件并断开连接
atkConnect(conID, 'Save', '/ *');
atkClose(conID);
```

## 报告数据结果

本案例运行结果为：成功进行水滴绕飞。具体如下图所示：

![相对轨迹](./media/12RPO案例/image_12_1.png)

## 完整脚本

```python
#1, 连接ATK
conID = atkOpen();

#2, 创建一个名为 "Teardrop" 的新任务场景
atkConnect(conID, 'New', '/ Scenario Teardrop');
# 设置仿真时间段
atkConnect(conID, 'SetAnalysisTimePeriod', '* "2007-03-08 00:00:00.000" "2007-03-13 00:00:00.000"');
# 初始化仿真
atkConnect(conID, 'Animate', '* Reset');

#3, 创建工作星卫星对象
atkConnect(conID, 'New', '/ Satellite WorkSatellite');
# 设置相关参数
atkConnect(conID, 'SetState', '*/Satellite/WorkSatellite Classical HPOP "2007-03-08 00:00:00.000" "2007-03-13 00:00:00.000" 60 J2000 "2007-03-08 00:00:00.000" 42164000 0 0 0 0 0');

#4, 创建服务星卫星对象
atkConnect(conID, 'New', '/ Satellite ServiceSatellite');
# 设置轨道预报器为机动规划
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite SetProp');

# 设置 Keplerian 坐标类型的轨道根数
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite SetValue MainSequence.SegmentList.Initial_State.InitialState.Keplerian.sma 6700000 m');
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite SetValue MainSequence.SegmentList.Initial_State.InitialState.Keplerian.ecc 0');
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite SetValue MainSequence.SegmentList.Initial_State.InitialState.Keplerian.inc 0');
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite SetValue MainSequence.SegmentList.Initial_State.InitialState.Keplerian.RAAN 0');
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite SetValue MainSequence.SegmentList.Initial_State.InitialState.Keplerian.w 0');
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite SetValue MainSequence.SegmentList.Initial_State.InitialState.Keplerian.TA 0');

#5, 插入 RPO 段
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite InsertSegment MainSequence.SegmentList.- RPOTearDrop');
# 高级设置：设置轨道预报器的参数
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite SetValue MainSequence.SegmentList.RPOTearDrop.CenterBody "Earth"');
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite SetValue MainSequence.SegmentList.RPOTearDrop.GravityModel "WGS84"');
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite SetValue MainSequence.SegmentList.RPOTearDrop.ThreeBodyGravity "Sun, Moon"');
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite SetValue MainSequence.SegmentList.RPOTearDrop.ThreeBodyModel "Point-Mass Model"');
# 开启大气阻力摄动并选择大气模型
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite SetValue MainSequence.SegmentList.RPOTearDrop.AtmosphericDrag "On"');
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite SetValue MainSequence.SegmentList.RPOTearDrop.AtmosphericModel "NRLMSISE00"');
# 开启太阳光压
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite SetValue MainSequence.SegmentList.RPOTearDrop.SolarPressure "On"');

#6, 设置水滴绕飞段参数
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite SetValue MainSequence.SegmentList.RPOTearDrop.NumCircles 5');
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite SetValue MainSequence.SegmentList.RPOTearDrop.StartDistance -300');
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite SetValue MainSequence.SegmentList.RPOTearDrop.ManeuverDistance -800');
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite SetValue MainSequence.SegmentList.RPOTearDrop.WaitTime 21600');
# 设置真近点角变化量最大值
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite SetValue MainSequence.SegmentList.RPOTearDrop.MaxDeltaTrueAnomaly 5');
# 设置求解算法为“序列二次规划”
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite SetValue MainSequence.SegmentList.RPOTearDrop.SolveMethod 2');
# 设置参考航天器为工作星
atkConnect(conID, 'Reference',  '*/Satellite/ServiceSatellite SetRefSatellite */Satellite/WorkSatellite');
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite SetValue MainSequence.SegmentList.RPOTearDrop.Reference "Satellite/WorkSatellite"');

#7, 运行任务控制序列
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite RunMCS');
atkConnect(conID, 'Animate', '* Reset');
atkConnect(conID, 'Astrogator', '*/Satellite/ServiceSatellite ApplyAllProfileChanges');

#8, 打印查看报告数据
atkConnect(conID, 'Report_RM', '*/Satellite/ServiceSatellite Style "Position" TimePeriod "8 Mar 2007 00:00:00.000" "13 Mar 2007 00:00:00.000"');

#9, 保存文件并断开连接
atkConnect(conID, 'Save', '/ *');
atkClose(conID);
```