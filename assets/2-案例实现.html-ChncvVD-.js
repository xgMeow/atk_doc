import{_ as e,o as t,c as n,g as i}from"./app-DiUEcN3c.js";const l="/atk_doc/assets/Python%E6%A1%88%E4%BE%8B%E6%B5%81%E7%A8%8B%E5%9B%BE-_dxuYOmR.png",r="/atk_doc/assets/cmd%E5%91%BD%E4%BB%A4%E8%A1%8C-DT36PiOo.png",o={},a=i('<h1 id="案例实现" tabindex="-1"><a class="header-anchor" href="#案例实现"><span>案例实现</span></a></h1><p>本案例使用Python脚本实现，通过在案例脚本中导入ATKComponent模式接口模块ATKComponentPythonModule，调用接口模块中公用的类接口与函数接口，完成场景与卫星类对象的新建与设置，动画的仿真运行，数据报告与想定文件的输出保存。最后通过嵌入式Python解释器解释运行该Python案例脚本，完成案例实现。具体流程如下所示。</p><h2 id="python案例流程图" tabindex="-1"><a class="header-anchor" href="#python案例流程图"><span>Python案例流程图</span></a></h2><figure><img src="'+l+`" alt="Python案例流程图" tabindex="0" loading="lazy"><figcaption>Python案例流程图</figcaption></figure><h2 id="python案例源码" tabindex="-1"><a class="header-anchor" href="#python案例源码"><span>Python案例源码</span></a></h2><div class="language-Python line-numbers-mode" data-ext="Python" data-title="Python"><pre class="language-Python"><code>#ATKComponentPythonTest.py
# -*- coding: utf-8 -*-

#1，使用内嵌式python解释器时，需要将当前路径加入Python系统环境路径
import sys
import os
curPath = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0,curPath)

#2，导入ATKComponent模式接口模块，并取个简短的别名
import ATKComponentPythonModule as ATKModule
	
#3，设置保存文件的基础路径和调用语言，用来兼容处理不同系统/模式/语言情况下，输出位置不统一的问题
ATKModule.SetSaveFileBasePath(curPath);
ATKModule.SetCallCodeType(&quot;python&quot;);

#倾角转换实现函数
def TestInclinationChange(pIAtkObjectRoot):
	#新建场景
	pIScenario = pIAtkObjectRoot.GetChildren().New(ATKModule.eScenario, &quot;InclinationChange&quot;);
	pIScenario.SetTimePeriod(&quot;5 Nov 2022 00:00:00.000&quot;, &quot;8 Nov 2022 00:00:00.000&quot;);
	#新建卫星
	pISatellite = pIScenario.GetChildren().New(ATKModule.eSatellite, &quot;SatInclinationChange&quot;);

	#设置二维属性轨迹显示时长
	pIVeGfxLeadTrailData = pISatellite.GetGraphics().GetPassData().GetGroundTrack();
	pIVeGfxLeadTrailData.SetTrailDataType(ATKModule.eDataTime);
	pIVeLeadTrailDataTime = pIVeGfxLeadTrailData.GetTrailData();
	pIVeLeadTrailDataTime.SetTime(24*60*60);
	
	pISatellite.SetPropagatorType(ATKModule.ePropagatorAstromaster);
	pIVADriverMCS = pISatellite.GetPropagator();
	pIVAMCSSegmentCollection = pIVADriverMCS.GetMainSequence();
	
	if (ATKModule.eVASegmentTypeInitialState != pIVAMCSSegmentCollection.Item(0).GetType()):
		return;
	pIVAMCSInitialState = pIVAMCSSegmentCollection.Item(0);
	
	pIVAMCSPropagate = pIVAMCSSegmentCollection.Insert(ATKModule.eVASegmentTypePropagate, &quot;Propagate&quot;, &quot;-&quot;);
	pIVAMCSTargetSequence = pIVAMCSSegmentCollection.Insert(ATKModule.eVASegmentTypeTargetSequence, &quot;TargetSequence&quot;, &quot;-&quot;);
	pIVAMCSSegmentCollection0 = pIVAMCSTargetSequence.GetSegments();
	pIVAMCSManeuver = pIVAMCSSegmentCollection0.Insert(ATKModule.eVASegmentTypeManeuver, &quot;Maneuver&quot;, &quot;-&quot;);
	
	pIVAMCSPropagate1 = pIVAMCSSegmentCollection.Insert(ATKModule.eVASegmentTypePropagate, &quot;Propagate1&quot;, &quot;-&quot;);
	pIVAMCSTargetSequence1 = pIVAMCSSegmentCollection.Insert(ATKModule.eVASegmentTypeTargetSequence, &quot;TargetSequence1&quot;, &quot;-&quot;);
	pIVAMCSSegmentCollection1 = pIVAMCSTargetSequence1.GetSegments();
	pIVAMCSManeuver1 = pIVAMCSSegmentCollection1.Insert(ATKModule.eVASegmentTypeManeuver, &quot;Maneuver&quot;, &quot;-&quot;);
	
	pIVAMCSPropagate2 = pIVAMCSSegmentCollection.Insert(ATKModule.eVASegmentTypePropagate, &quot;Propagate2&quot;, &quot;-&quot;);
	pIVAMCSTargetSequence2 = pIVAMCSSegmentCollection.Insert(ATKModule.eVASegmentTypeTargetSequence, &quot;TargetSequence2&quot;, &quot;-&quot;);
	pIVAMCSSegmentCollection2 = pIVAMCSTargetSequence2.GetSegments();
	pIVAMCSManeuver2 = pIVAMCSSegmentCollection2.Insert(ATKModule.eVASegmentTypeManeuver, &quot;Maneuver&quot;, &quot;-&quot;);
	
	pIVAMCSPropagate3 = pIVAMCSSegmentCollection.Insert(ATKModule.eVASegmentTypePropagate, &quot;Propagate3&quot;, &quot;-&quot;);
	
	pIVAMCSInitialState.SetOrbitEpoch(&quot;5 Nov 2022 00:00:00.000&quot;);
	pIVAMCSInitialState.SetElementType(ATKModule.eVAElementTypeKeplerian);
	pIVAElementKeplerian = pIVAMCSInitialState.GetElement();
	pIVAElementKeplerian.SetSemiMajorAxis(6570000);
	pIVAElementKeplerian.SetEccentricity(0);
	pIVAElementKeplerian.SetInclination(28);
	pIVAElementKeplerian.SetRAAN(0);
	pIVAElementKeplerian.SetArgOfPeriapsis(0);
	pIVAElementKeplerian.SetTrueAnomaly(0);
	
	pIVAStoppingConditionElement = pIVAMCSPropagate.GetStoppingConditions().Add(&quot;Duration&quot;);
	pIVAStoppingCondition = pIVAStoppingConditionElement.GetProperties();
	pIVAStoppingCondition.SetTrip(7200);
	pIVAStoppingCondition.SetTolerance(0.0001);

	pIVAMCSManeuver.SetManeuverType(ATKModule.eVAManeuverTypeImpulsive);
	pIVAManeuverImpulsive = pIVAMCSManeuver.GetManeuver();
	pIVAAttitudeControlImpulsiveThrustVector = pIVAManeuverImpulsive.GetAttitudeControl();
	pIVAAttitudeControlImpulsiveThrustVector.SetThrustAxesName(&quot;Satellite VNC(Earth)&quot;);
	pIVAMCSManeuver.EnableControlParameter(ATKModule.eVAControlManeuverImpulsiveCartesianX);
	pIVAMCSManeuver.GetResults().Add(&quot;Radius_Of_Apoapsis&quot;);
	
	pIVAProfileDifferentialCorrector = pIVAMCSTargetSequence.GetProfiles().Add(&quot;Differential Corrector&quot;);
	pIVADCControl = pIVAProfileDifferentialCorrector.GetControlParameters().GetControlByPaths(&quot;Maneuver&quot;, &quot;ImpulseX&quot;);
	pIVADCResult = pIVAProfileDifferentialCorrector.GetResults().GetResultByPaths(&quot;Maneuver&quot;, &quot;StateCalc&quot;+&quot;RadiusOfApoapsis&quot;);
	pIVADCControl = pIVAProfileDifferentialCorrector.GetControlParameters().Item(0);
	pIVADCControl.SetEnable(True);
	pIVADCControl.SetMaxStep(100);
	#pIVADCControl.SetCorrection(2456.42862556706);
	pIVADCControl.SetPerturbation(0.1);
	pIVADCControl.SetScalingValue(1);
	pIVADCResult = pIVAProfileDifferentialCorrector.GetResults().Item(0);
	pIVADCResult.SetEnable(True);
	pIVADCResult.SetDesiredValue(42160000);
	pIVADCResult.SetScalingValue(1);
	pIVADCResult.SetTolerance(0.1);
	pIVADCResult.SetWeight(1);

	pIVAStoppingConditionElement1 = pIVAMCSPropagate1.GetStoppingConditions().Add(&quot;Apoapsis&quot;);
	pIVAStoppingCondition1 = pIVAStoppingConditionElement1.GetProperties();
	pIVAStoppingCondition1.SetTolerance(0.0001);
	pIVAStoppingCondition1.SetRepeatCount(1);

	pIVAMCSManeuver1.SetManeuverType(ATKModule.eVAManeuverTypeImpulsive);
	pIVAManeuverImpulsive1 = pIVAMCSManeuver1.GetManeuver();
	pIVAAttitudeControlImpulsiveThrustVector1 = pIVAManeuverImpulsive1.GetAttitudeControl();
	pIVAAttitudeControlImpulsiveThrustVector1.SetThrustAxesName(&quot;Satellite VNC(Earth)&quot;);
	pIVAMCSManeuver1.EnableControlParameter(ATKModule.eVAControlManeuverImpulsiveCartesianX);
	pIVAMCSManeuver1.GetResults().Add(&quot;Eccentricity&quot;);

	pIVAProfileDifferentialCorrector1 = pIVAMCSTargetSequence1.GetProfiles().Add(&quot;Differential Corrector&quot;);
	pIVADCControl1 = pIVAProfileDifferentialCorrector1.GetControlParameters().Item(0);
	pIVADCControl1.SetEnable(True);
	pIVADCControl1.SetMaxStep(100);
	pIVADCControl1.SetCorrection(1480.06329844802);
	pIVADCControl1.SetPerturbation(0.1);
	pIVADCControl1.SetScalingValue(1);
	pIVADCResult1 = pIVAProfileDifferentialCorrector1.GetResults().Item(0);
	pIVADCResult1.SetEnable(True);
	pIVADCResult1.SetDesiredValue(0);
	pIVADCResult1.SetScalingValue(1);
	pIVADCResult1.SetTolerance(0.001);
	pIVADCResult1.SetWeight(1);

	pIVAStoppingConditionElement2 = pIVAMCSPropagate2.GetStoppingConditions().Add(&quot;AscendingNode&quot;);
	pIVAStoppingCondition2 = pIVAStoppingConditionElement2.GetProperties();
	pIVAStoppingCondition2.SetRepeatCount(2);
	pIVAStoppingCondition2.SetTolerance(1e-6);

	pIVAMCSManeuver2.SetManeuverType(ATKModule.eVAManeuverTypeImpulsive);
	pIVAManeuverImpulsive2 = pIVAMCSManeuver2.GetManeuver();
	pIVAAttitudeControlImpulsiveThrustVector2 = pIVAManeuverImpulsive2.GetAttitudeControl();
	pIVAAttitudeControlImpulsiveThrustVector2.SetThrustAxesName(&quot;Satellite VNC(Earth)&quot;);
	pIVAMCSManeuver2.EnableControlParameter(ATKModule.eVAControlManeuverImpulsiveCartesianX);
	pIVAMCSManeuver2.EnableControlParameter(ATKModule.eVAControlManeuverImpulsiveCartesianY);
	pIVAMCSManeuver2.GetResults().Add(&quot;Eccentricity&quot;);
	pIVAMCSManeuver2.GetResults().Add(&quot;Inclination&quot;);

	pIVAProfileDifferentialCorrector2 = pIVAMCSTargetSequence2.GetProfiles().Add(&quot;Differential Corrector&quot;);
	pIVADCControl2 = pIVAProfileDifferentialCorrector2.GetControlParameters().Item(0);
	pIVADCControl2.SetEnable(True);
	pIVADCControl2.SetMaxStep(100);
	pIVADCControl2.SetCorrection(-359.983751789857);
	pIVADCControl2.SetPerturbation(0.1);
	pIVADCControl2.SetScalingValue(1);
	pIVADCControl3 = pIVAProfileDifferentialCorrector2.GetControlParameters().Item(1);
	pIVADCControl3.SetEnable(True);
	pIVADCControl3.SetMaxStep(100);
	pIVADCControl3.SetCorrection(-1444.72488992759);
	pIVADCControl3.SetPerturbation(0.1);
	pIVADCControl3.SetScalingValue(1);
	pIVADCResult2 = pIVAProfileDifferentialCorrector2.GetResults().Item(0);
	pIVADCResult2.SetEnable(True);
	pIVADCResult2.SetDesiredValue(0);
	pIVADCResult2.SetScalingValue(1);
	pIVADCResult2.SetTolerance(0);
	pIVADCResult2.SetWeight(1);
	pIVADCResult3 = pIVAProfileDifferentialCorrector2.GetResults().Item(1);
	pIVADCResult3.SetEnable(True);
	pIVADCResult3.SetDesiredValue(0);
	pIVADCResult3.SetScalingValue(1);
	pIVADCResult3.SetTolerance(0.001);
	pIVADCResult3.SetWeight(1);
	
	pIVAStoppingConditionElement3 = pIVAMCSPropagate3.GetStoppingConditions().Add(&quot;Duration&quot;);
	pIVAStoppingCondition3 = pIVAStoppingConditionElement3.GetProperties();
	pIVAStoppingCondition3.SetTrip(129600);
	pIVAStoppingCondition3.SetTolerance(1e-5);

	pIVADriverMCS.RunMCS();
	pIVADriverMCS.ApplyAllProfileChanges();

#霍曼转移实现函数
def TestHohmannTransfer(pIAtkObjectRoot):
	#新建场景
	pIScenario = pIAtkObjectRoot.GetChildren().New(ATKModule.eScenario, &quot;HohmannTransfer&quot;);
	pIScenario.SetTimePeriod(&quot;5 Nov 2022 00:00:00.000&quot;, &quot;7 Nov 2022 00:00:00.000&quot;);
	#新建卫星
	pISatellite = pIScenario.GetChildren().New(ATKModule.eSatellite, &quot;Sat_Hohmann&quot;);

	#设置二维属性轨迹显示时长
	pIVeGfxLeadTrailData = pISatellite.GetGraphics().GetPassData().GetGroundTrack();
	pIVeGfxLeadTrailData.SetTrailDataType(ATKModule.eDataTime);
	pIVeLeadTrailDataTime = pIVeGfxLeadTrailData.GetTrailData();
	pIVeLeadTrailDataTime.SetTime(24*60*60);
	
	pISatellite.SetPropagatorType(ATKModule.ePropagatorAstromaster);
	pIVADriverMCS = pISatellite.GetPropagator();
	pIVAMCSSegmentCollection = pIVADriverMCS.GetMainSequence();

	if (ATKModule.eVASegmentTypeInitialState != pIVAMCSSegmentCollection.Item(0).GetType()):
		return;
	pIVAMCSInitialState = pIVAMCSSegmentCollection.Item(0);
	pIVAMCSPropagate = pIVAMCSSegmentCollection.Insert(ATKModule.eVASegmentTypePropagate, &quot;Propagate&quot;, &quot;-&quot;);
	pIVAMCSTargetSequence = pIVAMCSSegmentCollection.Insert(ATKModule.eVASegmentTypeTargetSequence, &quot;TargetSequence&quot;, &quot;-&quot;);
	pIVAMCSManeuver = pIVAMCSTargetSequence.GetSegments().Insert(ATKModule.eVASegmentTypeManeuver, &quot;Maneuver&quot;, &quot;-&quot;);
	pIVAMCSPropagate1 = pIVAMCSSegmentCollection.Insert(ATKModule.eVASegmentTypePropagate, &quot;Propagate1&quot;, &quot;-&quot;);
	pIVAMCSTargetSequence1 = pIVAMCSSegmentCollection.Insert(ATKModule.eVASegmentTypeTargetSequence, &quot;TargetSequence1&quot;, &quot;-&quot;);
	pIVAMCSManeuver1 = pIVAMCSTargetSequence1.GetSegments().Insert(ATKModule.eVASegmentTypeManeuver, &quot;Maneuver&quot;, &quot;-&quot;);
	pIVAMCSPropagate2 = pIVAMCSSegmentCollection.Insert(ATKModule.eVASegmentTypePropagate, &quot;Propagate2&quot;, &quot;-&quot;);

	pIVAMCSInitialState.SetOrbitEpoch(&quot;5 Nov 2022 00:00:00.000&quot;);
	pIVAMCSInitialState.SetElementType(ATKModule.eVAElementTypeKeplerian);
	pIVAElementKeplerian = pIVAMCSInitialState.GetElement();
	pIVAElementKeplerian.SetSemiMajorAxis(6700000);
	pIVAElementKeplerian.SetEccentricity(0);
	pIVAElementKeplerian.SetInclination(28);
	pIVAElementKeplerian.SetRAAN(0);
	pIVAElementKeplerian.SetArgOfPeriapsis(0);
	pIVAElementKeplerian.SetTrueAnomaly(0);

	pIVAStoppingConditionElement = pIVAMCSPropagate.GetStoppingConditions().Add(&quot;Duration&quot;);
	pIVAStoppingCondition = pIVAStoppingConditionElement.GetProperties();
	pIVAStoppingCondition.SetTrip(7200);
	pIVAStoppingCondition.SetTolerance(0.0001);

	pIVAMCSManeuver.SetManeuverType(ATKModule.eVAManeuverTypeImpulsive);
	pIVAManeuverImpulsive = pIVAMCSManeuver.GetManeuver();
	pIVAAttitudeControlImpulsiveThrustVector = pIVAManeuverImpulsive.GetAttitudeControl();
	pIVAAttitudeControlImpulsiveThrustVector.SetThrustAxesName(&quot;Satellite VNC(Earth)&quot;);
	pIVAMCSManeuver.EnableControlParameter(ATKModule.eVAControlManeuverImpulsiveCartesianX);
	pIVAMCSManeuver.GetResults().Add(&quot;Radius_Of_Apoapsis&quot;);

	pIVAProfileDifferentialCorrector = pIVAMCSTargetSequence.GetProfiles().Add(&quot;Differential Corrector&quot;);
	pIVADCControl = pIVAProfileDifferentialCorrector.GetControlParameters().GetControlByPaths(&quot;Maneuver&quot;, &quot;ImpulseX&quot;);
	pIVADCResult = pIVAProfileDifferentialCorrector.GetResults().GetResultByPaths(&quot;Maneuver&quot;, &quot;StateCalc&quot;+&quot;RadiusOfApoapsis&quot;);
	pIVADCControl = pIVAProfileDifferentialCorrector.GetControlParameters().Item(0);
	pIVADCControl.SetEnable(True);
	pIVADCControl.SetMaxStep(100);
	pIVADCControl.SetPerturbation(0.1);
	pIVADCControl.SetScalingValue(1);
	pIVADCResult = pIVAProfileDifferentialCorrector.GetResults().Item(0);
	pIVADCResult.SetEnable(True);
	pIVADCResult.SetDesiredValue(42238000);
	pIVADCResult.SetScalingValue(1);
	pIVADCResult.SetTolerance(0.1);
	pIVADCResult.SetWeight(1);

	pIVAStoppingConditionElement1 = pIVAMCSPropagate1.GetStoppingConditions().Add(&quot;Apoapsis&quot;);
	pIVAStoppingCondition1 = pIVAStoppingConditionElement1.GetProperties();
	pIVAStoppingCondition1.SetTolerance(0.0001);
	pIVAStoppingCondition1.SetRepeatCount(1);
	pIVAStoppingCondition1.SetCentralBodyName(&quot;Earth&quot;);

	pIVAMCSManeuver1.SetManeuverType(ATKModule.eVAManeuverTypeImpulsive);
	pIVAManeuverImpulsive1 = pIVAMCSManeuver1.GetManeuver();
	pIVAAttitudeControlImpulsiveThrustVector1 = pIVAManeuverImpulsive1.GetAttitudeControl();
	pIVAAttitudeControlImpulsiveThrustVector1.SetThrustAxesName(&quot;Satellite VNC(Earth)&quot;);
	pIVAMCSManeuver1.EnableControlParameter(ATKModule.eVAControlManeuverImpulsiveCartesianX);
	pIVAMCSManeuver1.GetResults().Add(&quot;Eccentricity&quot;);

	pIVAProfileDifferentialCorrector1 = pIVAMCSTargetSequence1.GetProfiles().Add(&quot;Differential Corrector&quot;);
	pIVADCControl1 = pIVAProfileDifferentialCorrector1.GetControlParameters().Item(0);
	pIVADCControl1.SetEnable(True);
	pIVADCControl1.SetMaxStep(100);
	pIVADCControl1.SetPerturbation(0.1);
	pIVADCControl1.SetScalingValue(1);
	pIVADCResult1 = pIVAProfileDifferentialCorrector1.GetResults().Item(0);
	pIVADCResult1.SetEnable(True);
	pIVADCResult1.SetDesiredValue(0);
	pIVADCResult1.SetScalingValue(1);
	pIVADCResult1.SetTolerance(0.001);
	pIVADCResult1.SetWeight(1);

	pIVAStoppingConditionElement2 = pIVAMCSPropagate2.GetStoppingConditions().Add(&quot;Duration&quot;);
	pIVAStoppingCondition2 = pIVAStoppingConditionElement2.GetProperties();
	pIVAStoppingCondition2.SetTrip(86400);
	pIVAStoppingCondition2.SetTolerance(0.0001);

	pIVADriverMCS.RunMCS();
	pIVADriverMCS.ApplyAllProfileChanges();

#轨道快速转移实现函数
def TestFastTransfer(pIAtkObjectRoot):
	#1，场景新建与属性设置
	pIScenario = pIAtkObjectRoot.GetChildren().New(ATKModule.eScenario, &quot;FastTransfer&quot;);
	pIScenario.SetTimePeriod(&quot;5 Nov 2022 00:00:00.000&quot;, &quot;6 Nov 2022 00:00:00.000&quot;);
	#2，卫星新建与轨道预报设置为机动规划
	pISatellite = pIScenario.GetChildren().New(ATKModule.eSatellite, &quot;Satellite1&quot;);
	#设置二维属性轨迹显示时长
	pIVeGfxLeadTrailData = pISatellite.GetGraphics().GetPassData().GetGroundTrack();
	pIVeGfxLeadTrailData.SetTrailDataType(ATKModule.eDataTime);
	pIVeLeadTrailDataTime = pIVeGfxLeadTrailData.GetTrailData();
	pIVeLeadTrailDataTime.SetTime(24*60*60);
	pISatellite.SetPropagatorType(ATKModule.ePropagatorAstromaster);
	pIVADriverMCS = pISatellite.GetPropagator();
	pIVAMCSSegmentCollection = pIVADriverMCS.GetMainSequence();
	#3，机动规划添加段，新添加卫星会有默认初始段
	if (ATKModule.eVASegmentTypeInitialState != pIVAMCSSegmentCollection.Item(0).GetType()):
		return;
	pIVAMCSInitialState = pIVAMCSSegmentCollection.Item(0);
	pIVAMCSPropagate = pIVAMCSSegmentCollection.Insert(ATKModule.eVASegmentTypePropagate, &quot;Propagate&quot;, &quot;-&quot;);
	pIVAMCSTargetSequence = pIVAMCSSegmentCollection.Insert(ATKModule.eVASegmentTypeTargetSequence, &quot;TargetSequence&quot;, &quot;-&quot;);
	pIVAMCSManeuver = pIVAMCSTargetSequence.GetSegments().Insert(ATKModule.eVASegmentTypeManeuver, &quot;Maneuver&quot;, &quot;-&quot;);
	pIVAMCSPropagate1 = pIVAMCSSegmentCollection.Insert(ATKModule.eVASegmentTypePropagate, &quot;Propagate&quot;, &quot;-&quot;);
	pIVAMCSTargetSequence1 = pIVAMCSSegmentCollection.Insert(ATKModule.eVASegmentTypeTargetSequence, &quot;TargetSequence1&quot;, &quot;-&quot;);
	pIVAMCSManeuver1 = pIVAMCSTargetSequence1.GetSegments().Insert(ATKModule.eVASegmentTypeManeuver, &quot;Maneuver&quot;, &quot;-&quot;);
	pIVAMCSPropagate2 = pIVAMCSSegmentCollection.Insert(ATKModule.eVASegmentTypePropagate, &quot;Propagate&quot;, &quot;-&quot;);
	#4，初始段属性设置
	pIVAMCSInitialState.SetOrbitEpoch(&quot;5 Nov 2022 00:00:00.000&quot;);
	pIVAMCSInitialState.SetElementType(ATKModule.eVAElementTypeKeplerian);
	pIVAElementKeplerian = pIVAMCSInitialState.GetElement();
	pIVAElementKeplerian.SetSemiMajorAxis(6700000);
	pIVAElementKeplerian.SetEccentricity(0);
	pIVAElementKeplerian.SetInclination(0);
	pIVAElementKeplerian.SetRAAN(0);
	pIVAElementKeplerian.SetArgOfPeriapsis(0);
	pIVAElementKeplerian.SetTrueAnomaly(0);
	#5，第一个预报段属性设置
	pIVAStoppingConditionElement = pIVAMCSPropagate.GetStoppingConditions().Add(&quot;Duration&quot;);
	pIVAStoppingCondition = pIVAStoppingConditionElement.GetProperties();
	pIVAStoppingCondition.SetTrip(7200);
	pIVAStoppingCondition.SetTolerance(0.0001);
	#6，第一个瞄准段中机动段属性设置
	pIVAMCSManeuver.SetManeuverType(ATKModule.eVAManeuverTypeImpulsive);
	pIVAManeuverImpulsive = pIVAMCSManeuver.GetManeuver();
	pIVAAttitudeControlImpulsiveThrustVector = pIVAManeuverImpulsive.GetAttitudeControl();
	pIVAAttitudeControlImpulsiveThrustVector.SetThrustAxesName(&quot;Satellite VNC(Earth)&quot;);
	pIVAMCSManeuver.EnableControlParameter(ATKModule.eVAControlManeuverImpulsiveCartesianX);
	pIVAMCSManeuver.GetResults().Add(&quot;Radius_Of_Apoapsis&quot;);
	#7，第一个瞄准段添加属性页
	pIVAProfileDifferentialCorrector = pIVAMCSTargetSequence.GetProfiles().Add(&quot;Differential Corrector&quot;);
	pIVADCControl = pIVAProfileDifferentialCorrector.GetControlParameters().GetControlByPaths(&quot;Maneuver&quot;, &quot;ImpulseX&quot;);
	pIVADCResult = pIVAProfileDifferentialCorrector.GetResults().GetResultByPaths(&quot;Maneuver&quot;, &quot;StateCalc&quot;+&quot;RadiusOfApoapsis&quot;);
	#8，属性页中控制变量属性设置
	pIVADCControl.SetEnable(True);
	pIVADCControl.SetMaxStep(100);
	#pIVADCControl.SetCorrection(2781.50365947627);
	pIVADCControl.SetPerturbation(0.1);
	pIVADCControl.SetScalingValue(1);
	#9，属性页中约束条件属性设置
	pIVADCResult.SetEnable(True);
	pIVADCResult.SetDesiredValue(84328394);
	pIVADCResult.SetScalingValue(1);
	pIVADCResult.SetTolerance(0.1);
	pIVADCResult.SetWeight(1);
	#10，第二个预报段属性设置
	pIVAStoppingConditionElement1 = pIVAMCSPropagate1.GetStoppingConditions().Add(&quot;RMagnitude&quot;);
	pIVAStoppingCondition1 = pIVAStoppingConditionElement1.GetProperties();
	pIVAStoppingCondition1.SetTrip(42164197);
	pIVAStoppingCondition1.SetTolerance(1e-6);
	pIVAStoppingCondition1.SetRepeatCount(1);
	pIVAStoppingCondition1.SetCriterion(ATKModule.eVACriterionCrossEither);
	#11，第二个瞄准段中机动段属性设置
	pIVAMCSManeuver1.SetManeuverType(ATKModule.eVAManeuverTypeImpulsive);
	pIVAManeuverImpulsive1 = pIVAMCSManeuver1.GetManeuver();
	pIVAAttitudeControlImpulsiveThrustVector1 = pIVAManeuverImpulsive1.GetAttitudeControl();
	pIVAAttitudeControlImpulsiveThrustVector1.SetThrustAxesName(&quot;Satellite VNC(Earth)&quot;);
	pIVAMCSManeuver1.EnableControlParameter(ATKModule.eVAControlManeuverImpulsiveCartesianX);
	pIVAMCSManeuver1.EnableControlParameter(ATKModule.eVAControlManeuverImpulsiveCartesianZ);
	pIVAMCSManeuver1.GetResults().Add(&quot;Eccentricity&quot;);
	pIVAMCSManeuver1.GetResults().Add(&quot;Cosine_of_Vertical_FPA&quot;);
	#12，第二个瞄准段添加属性页
	pIVAProfileDifferentialCorrector1 = pIVAMCSTargetSequence1.GetProfiles().Add(&quot;Differential Corrector&quot;);
	#13，属性页中控制变量属性设置
	pIVADCControl1 = pIVAProfileDifferentialCorrector1.GetControlParameters().Item(0);
	pIVADCControl1.SetEnable(True);
	pIVADCControl1.SetMaxStep(300);
	pIVADCControl1.SetCorrection(-1581.97670664023);
	pIVADCControl1.SetPerturbation(0.1);
	pIVADCControl1.SetScalingValue(1);
	pIVADCControl2 = pIVAProfileDifferentialCorrector1.GetControlParameters().Item(1);
	pIVADCControl2.SetEnable(True);
	pIVADCControl2.SetMaxStep(300);
	pIVADCControl2.SetCorrection(-2771.82057041661);
	pIVADCControl2.SetPerturbation(0.1);
	pIVADCControl2.SetScalingValue(1);
	#14，属性页中约束条件属性设置
	pIVADCResult1 = pIVAProfileDifferentialCorrector1.GetResults().Item(0);
	pIVADCResult1.SetEnable(True);
	pIVADCResult1.SetDesiredValue(0);
	pIVADCResult1.SetScalingValue(1);
	pIVADCResult1.SetTolerance(0.1);
	pIVADCResult1.SetWeight(1);
	pIVADCResult2 = pIVAProfileDifferentialCorrector1.GetResults().Item(1);
	pIVADCResult2.SetEnable(True);
	pIVADCResult2.SetDesiredValue(0);
	pIVADCResult2.SetScalingValue(1);
	pIVADCResult2.SetTolerance(0.1);
	pIVADCResult2.SetWeight(1);
	#15，第三个预报段属性设置
	pIVAStoppingConditionElement2 = pIVAMCSPropagate2.GetStoppingConditions().Add(&quot;Duration&quot;);
	pIVAStoppingCondition2 = pIVAStoppingConditionElement2.GetProperties();
	pIVAStoppingCondition2.SetTrip(86400);
	pIVAStoppingCondition2.SetTolerance(0.0001);
	#16，机动规划运行
	pIVADriverMCS.RunMCS();
	pIVADriverMCS.ApplyAllProfileChanges();
	#17，生成数据到文件
	strReportFilePath = pIAtkObjectRoot.OutputDataReport(pISatellite, &quot;J2000 Position Velocity&quot;, &quot;5 Nov 2022 00:00:00.000&quot;, &quot;6 Nov 2022 00:00:00.000&quot;);
	#18，输出数据报告目录
	print(&quot;output data reports:&quot;+strReportFilePath)

#4，新建根节点
pIAtkObjectRoot = ATKModule.IAtkObjectRoot();
#5，调用实现函数
TestFastTransfer(pIAtkObjectRoot);
#TestHohmannTransfer(pIAtkObjectRoot);
#TestInclinationChange(pIAtkObjectRoot);
#6，仿真运行
pIAtkObjectRoot.GetAnimation().PlayForward();
#7，保存场景
pIAtkObjectRoot.SaveScenario();
#8，关闭场景
pIAtkObjectRoot.CloseScenario();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="cmd执行命令" tabindex="-1"><a class="header-anchor" href="#cmd执行命令"><span>cmd执行命令</span></a></h2><p>打开cmd命令行，切换到Python案例脚本目录，并通过嵌入式Python解释器解释运行。</p><pre><code>1. 切换磁盘：E:

2. 切换路径：cd E:\\cssx\\ATK-4.0-rc.1

3. 运行命令：.\\IntegratingWithATK\\python-3.8.0-embed-amd64\\python ATKComponentPythonTest.py
</code></pre><figure><img src="`+r+'" alt="cmd命令行" tabindex="0" loading="lazy"><figcaption>cmd命令行</figcaption></figure>',10),p=[a];function u(s,d){return t(),n("div",null,p)}const v=e(o,[["render",u],["__file","2-案例实现.html.vue"]]),S=JSON.parse('{"path":"/%E4%BA%8C%E6%AC%A1%E5%BC%80%E5%8F%91%E6%95%99%E7%A8%8B/4-%E4%BA%8C%E6%AC%A1%E5%BC%80%E5%8F%91COMPONENT%E6%A8%A1%E5%BC%8F/4-Python%E6%93%8D%E4%BD%9C%E6%B5%81%E7%A8%8B/2-%E6%A1%88%E4%BE%8B%E5%AE%9E%E7%8E%B0.html","title":"案例实现","lang":"zh-CN","frontmatter":{"description":"案例实现 本案例使用Python脚本实现，通过在案例脚本中导入ATKComponent模式接口模块ATKComponentPythonModule，调用接口模块中公用的类接口与函数接口，完成场景与卫星类对象的新建与设置，动画的仿真运行，数据报告与想定文件的输出保存。最后通过嵌入式Python解释器解释运行该Python案例脚本，完成案例实现。具体流程如...","head":[["meta",{"property":"og:url","content":"https://atkdocs.smsat.space/atk_doc/%E4%BA%8C%E6%AC%A1%E5%BC%80%E5%8F%91%E6%95%99%E7%A8%8B/4-%E4%BA%8C%E6%AC%A1%E5%BC%80%E5%8F%91COMPONENT%E6%A8%A1%E5%BC%8F/4-Python%E6%93%8D%E4%BD%9C%E6%B5%81%E7%A8%8B/2-%E6%A1%88%E4%BE%8B%E5%AE%9E%E7%8E%B0.html"}],["meta",{"property":"og:site_name","content":"ATK 帮助文档"}],["meta",{"property":"og:title","content":"案例实现"}],["meta",{"property":"og:description","content":"案例实现 本案例使用Python脚本实现，通过在案例脚本中导入ATKComponent模式接口模块ATKComponentPythonModule，调用接口模块中公用的类接口与函数接口，完成场景与卫星类对象的新建与设置，动画的仿真运行，数据报告与想定文件的输出保存。最后通过嵌入式Python解释器解释运行该Python案例脚本，完成案例实现。具体流程如..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-04-28T08:23:00.000Z"}],["meta",{"property":"article:author","content":"国防科技大学空天科学学院"}],["meta",{"property":"article:modified_time","content":"2026-04-28T08:23:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"案例实现\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-04-28T08:23:00.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"国防科技大学空天科学学院\\",\\"email\\":\\"atk_nudt@163.com\\"}]}"]]},"headers":[{"level":2,"title":"Python案例流程图","slug":"python案例流程图","link":"#python案例流程图","children":[]},{"level":2,"title":"Python案例源码","slug":"python案例源码","link":"#python案例源码","children":[]},{"level":2,"title":"cmd执行命令","slug":"cmd执行命令","link":"#cmd执行命令","children":[]}],"git":{"updatedTime":1777364580000},"filePathRelative":"二次开发教程/4-二次开发COMPONENT模式/4-Python操作流程/2-案例实现.md","autoDesc":true,"excerpt":"\\n<p>本案例使用Python脚本实现，通过在案例脚本中导入ATKComponent模式接口模块ATKComponentPythonModule，调用接口模块中公用的类接口与函数接口，完成场景与卫星类对象的新建与设置，动画的仿真运行，数据报告与想定文件的输出保存。最后通过嵌入式Python解释器解释运行该Python案例脚本，完成案例实现。具体流程如下所示。</p>\\n<h2>Python案例流程图</h2>\\n<figure><figcaption>Python案例流程图</figcaption></figure>\\n<h2>Python案例源码</h2>\\n<div class=\\"language-Python\\" data-ext=\\"Python\\" data-title=\\"Python\\"><pre class=\\"language-Python\\"><code>#ATKComponentPythonTest.py\\n# -*- coding: utf-8 -*-\\n\\n#1，使用内嵌式python解释器时，需要将当前路径加入Python系统环境路径\\nimport sys\\nimport os\\ncurPath = os.path.dirname(os.path.abspath(__file__))\\nsys.path.insert(0,curPath)\\n\\n#2，导入ATKComponent模式接口模块，并取个简短的别名\\nimport ATKComponentPythonModule as ATKModule\\n\\t\\n#3，设置保存文件的基础路径和调用语言，用来兼容处理不同系统/模式/语言情况下，输出位置不统一的问题\\nATKModule.SetSaveFileBasePath(curPath);\\nATKModule.SetCallCodeType(\\"python\\");\\n\\n#倾角转换实现函数\\ndef TestInclinationChange(pIAtkObjectRoot):\\n\\t#新建场景\\n\\tpIScenario = pIAtkObjectRoot.GetChildren().New(ATKModule.eScenario, \\"InclinationChange\\");\\n\\tpIScenario.SetTimePeriod(\\"5 Nov 2022 00:00:00.000\\", \\"8 Nov 2022 00:00:00.000\\");\\n\\t#新建卫星\\n\\tpISatellite = pIScenario.GetChildren().New(ATKModule.eSatellite, \\"SatInclinationChange\\");\\n\\n\\t#设置二维属性轨迹显示时长\\n\\tpIVeGfxLeadTrailData = pISatellite.GetGraphics().GetPassData().GetGroundTrack();\\n\\tpIVeGfxLeadTrailData.SetTrailDataType(ATKModule.eDataTime);\\n\\tpIVeLeadTrailDataTime = pIVeGfxLeadTrailData.GetTrailData();\\n\\tpIVeLeadTrailDataTime.SetTime(24*60*60);\\n\\t\\n\\tpISatellite.SetPropagatorType(ATKModule.ePropagatorAstromaster);\\n\\tpIVADriverMCS = pISatellite.GetPropagator();\\n\\tpIVAMCSSegmentCollection = pIVADriverMCS.GetMainSequence();\\n\\t\\n\\tif (ATKModule.eVASegmentTypeInitialState != pIVAMCSSegmentCollection.Item(0).GetType()):\\n\\t\\treturn;\\n\\tpIVAMCSInitialState = pIVAMCSSegmentCollection.Item(0);\\n\\t\\n\\tpIVAMCSPropagate = pIVAMCSSegmentCollection.Insert(ATKModule.eVASegmentTypePropagate, \\"Propagate\\", \\"-\\");\\n\\tpIVAMCSTargetSequence = pIVAMCSSegmentCollection.Insert(ATKModule.eVASegmentTypeTargetSequence, \\"TargetSequence\\", \\"-\\");\\n\\tpIVAMCSSegmentCollection0 = pIVAMCSTargetSequence.GetSegments();\\n\\tpIVAMCSManeuver = pIVAMCSSegmentCollection0.Insert(ATKModule.eVASegmentTypeManeuver, \\"Maneuver\\", \\"-\\");\\n\\t\\n\\tpIVAMCSPropagate1 = pIVAMCSSegmentCollection.Insert(ATKModule.eVASegmentTypePropagate, \\"Propagate1\\", \\"-\\");\\n\\tpIVAMCSTargetSequence1 = pIVAMCSSegmentCollection.Insert(ATKModule.eVASegmentTypeTargetSequence, \\"TargetSequence1\\", \\"-\\");\\n\\tpIVAMCSSegmentCollection1 = pIVAMCSTargetSequence1.GetSegments();\\n\\tpIVAMCSManeuver1 = pIVAMCSSegmentCollection1.Insert(ATKModule.eVASegmentTypeManeuver, \\"Maneuver\\", \\"-\\");\\n\\t\\n\\tpIVAMCSPropagate2 = pIVAMCSSegmentCollection.Insert(ATKModule.eVASegmentTypePropagate, \\"Propagate2\\", \\"-\\");\\n\\tpIVAMCSTargetSequence2 = pIVAMCSSegmentCollection.Insert(ATKModule.eVASegmentTypeTargetSequence, \\"TargetSequence2\\", \\"-\\");\\n\\tpIVAMCSSegmentCollection2 = pIVAMCSTargetSequence2.GetSegments();\\n\\tpIVAMCSManeuver2 = pIVAMCSSegmentCollection2.Insert(ATKModule.eVASegmentTypeManeuver, \\"Maneuver\\", \\"-\\");\\n\\t\\n\\tpIVAMCSPropagate3 = pIVAMCSSegmentCollection.Insert(ATKModule.eVASegmentTypePropagate, \\"Propagate3\\", \\"-\\");\\n\\t\\n\\tpIVAMCSInitialState.SetOrbitEpoch(\\"5 Nov 2022 00:00:00.000\\");\\n\\tpIVAMCSInitialState.SetElementType(ATKModule.eVAElementTypeKeplerian);\\n\\tpIVAElementKeplerian = pIVAMCSInitialState.GetElement();\\n\\tpIVAElementKeplerian.SetSemiMajorAxis(6570000);\\n\\tpIVAElementKeplerian.SetEccentricity(0);\\n\\tpIVAElementKeplerian.SetInclination(28);\\n\\tpIVAElementKeplerian.SetRAAN(0);\\n\\tpIVAElementKeplerian.SetArgOfPeriapsis(0);\\n\\tpIVAElementKeplerian.SetTrueAnomaly(0);\\n\\t\\n\\tpIVAStoppingConditionElement = pIVAMCSPropagate.GetStoppingConditions().Add(\\"Duration\\");\\n\\tpIVAStoppingCondition = pIVAStoppingConditionElement.GetProperties();\\n\\tpIVAStoppingCondition.SetTrip(7200);\\n\\tpIVAStoppingCondition.SetTolerance(0.0001);\\n\\n\\tpIVAMCSManeuver.SetManeuverType(ATKModule.eVAManeuverTypeImpulsive);\\n\\tpIVAManeuverImpulsive = pIVAMCSManeuver.GetManeuver();\\n\\tpIVAAttitudeControlImpulsiveThrustVector = pIVAManeuverImpulsive.GetAttitudeControl();\\n\\tpIVAAttitudeControlImpulsiveThrustVector.SetThrustAxesName(\\"Satellite VNC(Earth)\\");\\n\\tpIVAMCSManeuver.EnableControlParameter(ATKModule.eVAControlManeuverImpulsiveCartesianX);\\n\\tpIVAMCSManeuver.GetResults().Add(\\"Radius_Of_Apoapsis\\");\\n\\t\\n\\tpIVAProfileDifferentialCorrector = pIVAMCSTargetSequence.GetProfiles().Add(\\"Differential Corrector\\");\\n\\tpIVADCControl = pIVAProfileDifferentialCorrector.GetControlParameters().GetControlByPaths(\\"Maneuver\\", \\"ImpulseX\\");\\n\\tpIVADCResult = pIVAProfileDifferentialCorrector.GetResults().GetResultByPaths(\\"Maneuver\\", \\"StateCalc\\"+\\"RadiusOfApoapsis\\");\\n\\tpIVADCControl = pIVAProfileDifferentialCorrector.GetControlParameters().Item(0);\\n\\tpIVADCControl.SetEnable(True);\\n\\tpIVADCControl.SetMaxStep(100);\\n\\t#pIVADCControl.SetCorrection(2456.42862556706);\\n\\tpIVADCControl.SetPerturbation(0.1);\\n\\tpIVADCControl.SetScalingValue(1);\\n\\tpIVADCResult = pIVAProfileDifferentialCorrector.GetResults().Item(0);\\n\\tpIVADCResult.SetEnable(True);\\n\\tpIVADCResult.SetDesiredValue(42160000);\\n\\tpIVADCResult.SetScalingValue(1);\\n\\tpIVADCResult.SetTolerance(0.1);\\n\\tpIVADCResult.SetWeight(1);\\n\\n\\tpIVAStoppingConditionElement1 = pIVAMCSPropagate1.GetStoppingConditions().Add(\\"Apoapsis\\");\\n\\tpIVAStoppingCondition1 = pIVAStoppingConditionElement1.GetProperties();\\n\\tpIVAStoppingCondition1.SetTolerance(0.0001);\\n\\tpIVAStoppingCondition1.SetRepeatCount(1);\\n\\n\\tpIVAMCSManeuver1.SetManeuverType(ATKModule.eVAManeuverTypeImpulsive);\\n\\tpIVAManeuverImpulsive1 = pIVAMCSManeuver1.GetManeuver();\\n\\tpIVAAttitudeControlImpulsiveThrustVector1 = pIVAManeuverImpulsive1.GetAttitudeControl();\\n\\tpIVAAttitudeControlImpulsiveThrustVector1.SetThrustAxesName(\\"Satellite VNC(Earth)\\");\\n\\tpIVAMCSManeuver1.EnableControlParameter(ATKModule.eVAControlManeuverImpulsiveCartesianX);\\n\\tpIVAMCSManeuver1.GetResults().Add(\\"Eccentricity\\");\\n\\n\\tpIVAProfileDifferentialCorrector1 = pIVAMCSTargetSequence1.GetProfiles().Add(\\"Differential Corrector\\");\\n\\tpIVADCControl1 = pIVAProfileDifferentialCorrector1.GetControlParameters().Item(0);\\n\\tpIVADCControl1.SetEnable(True);\\n\\tpIVADCControl1.SetMaxStep(100);\\n\\tpIVADCControl1.SetCorrection(1480.06329844802);\\n\\tpIVADCControl1.SetPerturbation(0.1);\\n\\tpIVADCControl1.SetScalingValue(1);\\n\\tpIVADCResult1 = pIVAProfileDifferentialCorrector1.GetResults().Item(0);\\n\\tpIVADCResult1.SetEnable(True);\\n\\tpIVADCResult1.SetDesiredValue(0);\\n\\tpIVADCResult1.SetScalingValue(1);\\n\\tpIVADCResult1.SetTolerance(0.001);\\n\\tpIVADCResult1.SetWeight(1);\\n\\n\\tpIVAStoppingConditionElement2 = pIVAMCSPropagate2.GetStoppingConditions().Add(\\"AscendingNode\\");\\n\\tpIVAStoppingCondition2 = pIVAStoppingConditionElement2.GetProperties();\\n\\tpIVAStoppingCondition2.SetRepeatCount(2);\\n\\tpIVAStoppingCondition2.SetTolerance(1e-6);\\n\\n\\tpIVAMCSManeuver2.SetManeuverType(ATKModule.eVAManeuverTypeImpulsive);\\n\\tpIVAManeuverImpulsive2 = pIVAMCSManeuver2.GetManeuver();\\n\\tpIVAAttitudeControlImpulsiveThrustVector2 = pIVAManeuverImpulsive2.GetAttitudeControl();\\n\\tpIVAAttitudeControlImpulsiveThrustVector2.SetThrustAxesName(\\"Satellite VNC(Earth)\\");\\n\\tpIVAMCSManeuver2.EnableControlParameter(ATKModule.eVAControlManeuverImpulsiveCartesianX);\\n\\tpIVAMCSManeuver2.EnableControlParameter(ATKModule.eVAControlManeuverImpulsiveCartesianY);\\n\\tpIVAMCSManeuver2.GetResults().Add(\\"Eccentricity\\");\\n\\tpIVAMCSManeuver2.GetResults().Add(\\"Inclination\\");\\n\\n\\tpIVAProfileDifferentialCorrector2 = pIVAMCSTargetSequence2.GetProfiles().Add(\\"Differential Corrector\\");\\n\\tpIVADCControl2 = pIVAProfileDifferentialCorrector2.GetControlParameters().Item(0);\\n\\tpIVADCControl2.SetEnable(True);\\n\\tpIVADCControl2.SetMaxStep(100);\\n\\tpIVADCControl2.SetCorrection(-359.983751789857);\\n\\tpIVADCControl2.SetPerturbation(0.1);\\n\\tpIVADCControl2.SetScalingValue(1);\\n\\tpIVADCControl3 = pIVAProfileDifferentialCorrector2.GetControlParameters().Item(1);\\n\\tpIVADCControl3.SetEnable(True);\\n\\tpIVADCControl3.SetMaxStep(100);\\n\\tpIVADCControl3.SetCorrection(-1444.72488992759);\\n\\tpIVADCControl3.SetPerturbation(0.1);\\n\\tpIVADCControl3.SetScalingValue(1);\\n\\tpIVADCResult2 = pIVAProfileDifferentialCorrector2.GetResults().Item(0);\\n\\tpIVADCResult2.SetEnable(True);\\n\\tpIVADCResult2.SetDesiredValue(0);\\n\\tpIVADCResult2.SetScalingValue(1);\\n\\tpIVADCResult2.SetTolerance(0);\\n\\tpIVADCResult2.SetWeight(1);\\n\\tpIVADCResult3 = pIVAProfileDifferentialCorrector2.GetResults().Item(1);\\n\\tpIVADCResult3.SetEnable(True);\\n\\tpIVADCResult3.SetDesiredValue(0);\\n\\tpIVADCResult3.SetScalingValue(1);\\n\\tpIVADCResult3.SetTolerance(0.001);\\n\\tpIVADCResult3.SetWeight(1);\\n\\t\\n\\tpIVAStoppingConditionElement3 = pIVAMCSPropagate3.GetStoppingConditions().Add(\\"Duration\\");\\n\\tpIVAStoppingCondition3 = pIVAStoppingConditionElement3.GetProperties();\\n\\tpIVAStoppingCondition3.SetTrip(129600);\\n\\tpIVAStoppingCondition3.SetTolerance(1e-5);\\n\\n\\tpIVADriverMCS.RunMCS();\\n\\tpIVADriverMCS.ApplyAllProfileChanges();\\n\\n#霍曼转移实现函数\\ndef TestHohmannTransfer(pIAtkObjectRoot):\\n\\t#新建场景\\n\\tpIScenario = pIAtkObjectRoot.GetChildren().New(ATKModule.eScenario, \\"HohmannTransfer\\");\\n\\tpIScenario.SetTimePeriod(\\"5 Nov 2022 00:00:00.000\\", \\"7 Nov 2022 00:00:00.000\\");\\n\\t#新建卫星\\n\\tpISatellite = pIScenario.GetChildren().New(ATKModule.eSatellite, \\"Sat_Hohmann\\");\\n\\n\\t#设置二维属性轨迹显示时长\\n\\tpIVeGfxLeadTrailData = pISatellite.GetGraphics().GetPassData().GetGroundTrack();\\n\\tpIVeGfxLeadTrailData.SetTrailDataType(ATKModule.eDataTime);\\n\\tpIVeLeadTrailDataTime = pIVeGfxLeadTrailData.GetTrailData();\\n\\tpIVeLeadTrailDataTime.SetTime(24*60*60);\\n\\t\\n\\tpISatellite.SetPropagatorType(ATKModule.ePropagatorAstromaster);\\n\\tpIVADriverMCS = pISatellite.GetPropagator();\\n\\tpIVAMCSSegmentCollection = pIVADriverMCS.GetMainSequence();\\n\\n\\tif (ATKModule.eVASegmentTypeInitialState != pIVAMCSSegmentCollection.Item(0).GetType()):\\n\\t\\treturn;\\n\\tpIVAMCSInitialState = pIVAMCSSegmentCollection.Item(0);\\n\\tpIVAMCSPropagate = pIVAMCSSegmentCollection.Insert(ATKModule.eVASegmentTypePropagate, \\"Propagate\\", \\"-\\");\\n\\tpIVAMCSTargetSequence = pIVAMCSSegmentCollection.Insert(ATKModule.eVASegmentTypeTargetSequence, \\"TargetSequence\\", \\"-\\");\\n\\tpIVAMCSManeuver = pIVAMCSTargetSequence.GetSegments().Insert(ATKModule.eVASegmentTypeManeuver, \\"Maneuver\\", \\"-\\");\\n\\tpIVAMCSPropagate1 = pIVAMCSSegmentCollection.Insert(ATKModule.eVASegmentTypePropagate, \\"Propagate1\\", \\"-\\");\\n\\tpIVAMCSTargetSequence1 = pIVAMCSSegmentCollection.Insert(ATKModule.eVASegmentTypeTargetSequence, \\"TargetSequence1\\", \\"-\\");\\n\\tpIVAMCSManeuver1 = pIVAMCSTargetSequence1.GetSegments().Insert(ATKModule.eVASegmentTypeManeuver, \\"Maneuver\\", \\"-\\");\\n\\tpIVAMCSPropagate2 = pIVAMCSSegmentCollection.Insert(ATKModule.eVASegmentTypePropagate, \\"Propagate2\\", \\"-\\");\\n\\n\\tpIVAMCSInitialState.SetOrbitEpoch(\\"5 Nov 2022 00:00:00.000\\");\\n\\tpIVAMCSInitialState.SetElementType(ATKModule.eVAElementTypeKeplerian);\\n\\tpIVAElementKeplerian = pIVAMCSInitialState.GetElement();\\n\\tpIVAElementKeplerian.SetSemiMajorAxis(6700000);\\n\\tpIVAElementKeplerian.SetEccentricity(0);\\n\\tpIVAElementKeplerian.SetInclination(28);\\n\\tpIVAElementKeplerian.SetRAAN(0);\\n\\tpIVAElementKeplerian.SetArgOfPeriapsis(0);\\n\\tpIVAElementKeplerian.SetTrueAnomaly(0);\\n\\n\\tpIVAStoppingConditionElement = pIVAMCSPropagate.GetStoppingConditions().Add(\\"Duration\\");\\n\\tpIVAStoppingCondition = pIVAStoppingConditionElement.GetProperties();\\n\\tpIVAStoppingCondition.SetTrip(7200);\\n\\tpIVAStoppingCondition.SetTolerance(0.0001);\\n\\n\\tpIVAMCSManeuver.SetManeuverType(ATKModule.eVAManeuverTypeImpulsive);\\n\\tpIVAManeuverImpulsive = pIVAMCSManeuver.GetManeuver();\\n\\tpIVAAttitudeControlImpulsiveThrustVector = pIVAManeuverImpulsive.GetAttitudeControl();\\n\\tpIVAAttitudeControlImpulsiveThrustVector.SetThrustAxesName(\\"Satellite VNC(Earth)\\");\\n\\tpIVAMCSManeuver.EnableControlParameter(ATKModule.eVAControlManeuverImpulsiveCartesianX);\\n\\tpIVAMCSManeuver.GetResults().Add(\\"Radius_Of_Apoapsis\\");\\n\\n\\tpIVAProfileDifferentialCorrector = pIVAMCSTargetSequence.GetProfiles().Add(\\"Differential Corrector\\");\\n\\tpIVADCControl = pIVAProfileDifferentialCorrector.GetControlParameters().GetControlByPaths(\\"Maneuver\\", \\"ImpulseX\\");\\n\\tpIVADCResult = pIVAProfileDifferentialCorrector.GetResults().GetResultByPaths(\\"Maneuver\\", \\"StateCalc\\"+\\"RadiusOfApoapsis\\");\\n\\tpIVADCControl = pIVAProfileDifferentialCorrector.GetControlParameters().Item(0);\\n\\tpIVADCControl.SetEnable(True);\\n\\tpIVADCControl.SetMaxStep(100);\\n\\tpIVADCControl.SetPerturbation(0.1);\\n\\tpIVADCControl.SetScalingValue(1);\\n\\tpIVADCResult = pIVAProfileDifferentialCorrector.GetResults().Item(0);\\n\\tpIVADCResult.SetEnable(True);\\n\\tpIVADCResult.SetDesiredValue(42238000);\\n\\tpIVADCResult.SetScalingValue(1);\\n\\tpIVADCResult.SetTolerance(0.1);\\n\\tpIVADCResult.SetWeight(1);\\n\\n\\tpIVAStoppingConditionElement1 = pIVAMCSPropagate1.GetStoppingConditions().Add(\\"Apoapsis\\");\\n\\tpIVAStoppingCondition1 = pIVAStoppingConditionElement1.GetProperties();\\n\\tpIVAStoppingCondition1.SetTolerance(0.0001);\\n\\tpIVAStoppingCondition1.SetRepeatCount(1);\\n\\tpIVAStoppingCondition1.SetCentralBodyName(\\"Earth\\");\\n\\n\\tpIVAMCSManeuver1.SetManeuverType(ATKModule.eVAManeuverTypeImpulsive);\\n\\tpIVAManeuverImpulsive1 = pIVAMCSManeuver1.GetManeuver();\\n\\tpIVAAttitudeControlImpulsiveThrustVector1 = pIVAManeuverImpulsive1.GetAttitudeControl();\\n\\tpIVAAttitudeControlImpulsiveThrustVector1.SetThrustAxesName(\\"Satellite VNC(Earth)\\");\\n\\tpIVAMCSManeuver1.EnableControlParameter(ATKModule.eVAControlManeuverImpulsiveCartesianX);\\n\\tpIVAMCSManeuver1.GetResults().Add(\\"Eccentricity\\");\\n\\n\\tpIVAProfileDifferentialCorrector1 = pIVAMCSTargetSequence1.GetProfiles().Add(\\"Differential Corrector\\");\\n\\tpIVADCControl1 = pIVAProfileDifferentialCorrector1.GetControlParameters().Item(0);\\n\\tpIVADCControl1.SetEnable(True);\\n\\tpIVADCControl1.SetMaxStep(100);\\n\\tpIVADCControl1.SetPerturbation(0.1);\\n\\tpIVADCControl1.SetScalingValue(1);\\n\\tpIVADCResult1 = pIVAProfileDifferentialCorrector1.GetResults().Item(0);\\n\\tpIVADCResult1.SetEnable(True);\\n\\tpIVADCResult1.SetDesiredValue(0);\\n\\tpIVADCResult1.SetScalingValue(1);\\n\\tpIVADCResult1.SetTolerance(0.001);\\n\\tpIVADCResult1.SetWeight(1);\\n\\n\\tpIVAStoppingConditionElement2 = pIVAMCSPropagate2.GetStoppingConditions().Add(\\"Duration\\");\\n\\tpIVAStoppingCondition2 = pIVAStoppingConditionElement2.GetProperties();\\n\\tpIVAStoppingCondition2.SetTrip(86400);\\n\\tpIVAStoppingCondition2.SetTolerance(0.0001);\\n\\n\\tpIVADriverMCS.RunMCS();\\n\\tpIVADriverMCS.ApplyAllProfileChanges();\\n\\n#轨道快速转移实现函数\\ndef TestFastTransfer(pIAtkObjectRoot):\\n\\t#1，场景新建与属性设置\\n\\tpIScenario = pIAtkObjectRoot.GetChildren().New(ATKModule.eScenario, \\"FastTransfer\\");\\n\\tpIScenario.SetTimePeriod(\\"5 Nov 2022 00:00:00.000\\", \\"6 Nov 2022 00:00:00.000\\");\\n\\t#2，卫星新建与轨道预报设置为机动规划\\n\\tpISatellite = pIScenario.GetChildren().New(ATKModule.eSatellite, \\"Satellite1\\");\\n\\t#设置二维属性轨迹显示时长\\n\\tpIVeGfxLeadTrailData = pISatellite.GetGraphics().GetPassData().GetGroundTrack();\\n\\tpIVeGfxLeadTrailData.SetTrailDataType(ATKModule.eDataTime);\\n\\tpIVeLeadTrailDataTime = pIVeGfxLeadTrailData.GetTrailData();\\n\\tpIVeLeadTrailDataTime.SetTime(24*60*60);\\n\\tpISatellite.SetPropagatorType(ATKModule.ePropagatorAstromaster);\\n\\tpIVADriverMCS = pISatellite.GetPropagator();\\n\\tpIVAMCSSegmentCollection = pIVADriverMCS.GetMainSequence();\\n\\t#3，机动规划添加段，新添加卫星会有默认初始段\\n\\tif (ATKModule.eVASegmentTypeInitialState != pIVAMCSSegmentCollection.Item(0).GetType()):\\n\\t\\treturn;\\n\\tpIVAMCSInitialState = pIVAMCSSegmentCollection.Item(0);\\n\\tpIVAMCSPropagate = pIVAMCSSegmentCollection.Insert(ATKModule.eVASegmentTypePropagate, \\"Propagate\\", \\"-\\");\\n\\tpIVAMCSTargetSequence = pIVAMCSSegmentCollection.Insert(ATKModule.eVASegmentTypeTargetSequence, \\"TargetSequence\\", \\"-\\");\\n\\tpIVAMCSManeuver = pIVAMCSTargetSequence.GetSegments().Insert(ATKModule.eVASegmentTypeManeuver, \\"Maneuver\\", \\"-\\");\\n\\tpIVAMCSPropagate1 = pIVAMCSSegmentCollection.Insert(ATKModule.eVASegmentTypePropagate, \\"Propagate\\", \\"-\\");\\n\\tpIVAMCSTargetSequence1 = pIVAMCSSegmentCollection.Insert(ATKModule.eVASegmentTypeTargetSequence, \\"TargetSequence1\\", \\"-\\");\\n\\tpIVAMCSManeuver1 = pIVAMCSTargetSequence1.GetSegments().Insert(ATKModule.eVASegmentTypeManeuver, \\"Maneuver\\", \\"-\\");\\n\\tpIVAMCSPropagate2 = pIVAMCSSegmentCollection.Insert(ATKModule.eVASegmentTypePropagate, \\"Propagate\\", \\"-\\");\\n\\t#4，初始段属性设置\\n\\tpIVAMCSInitialState.SetOrbitEpoch(\\"5 Nov 2022 00:00:00.000\\");\\n\\tpIVAMCSInitialState.SetElementType(ATKModule.eVAElementTypeKeplerian);\\n\\tpIVAElementKeplerian = pIVAMCSInitialState.GetElement();\\n\\tpIVAElementKeplerian.SetSemiMajorAxis(6700000);\\n\\tpIVAElementKeplerian.SetEccentricity(0);\\n\\tpIVAElementKeplerian.SetInclination(0);\\n\\tpIVAElementKeplerian.SetRAAN(0);\\n\\tpIVAElementKeplerian.SetArgOfPeriapsis(0);\\n\\tpIVAElementKeplerian.SetTrueAnomaly(0);\\n\\t#5，第一个预报段属性设置\\n\\tpIVAStoppingConditionElement = pIVAMCSPropagate.GetStoppingConditions().Add(\\"Duration\\");\\n\\tpIVAStoppingCondition = pIVAStoppingConditionElement.GetProperties();\\n\\tpIVAStoppingCondition.SetTrip(7200);\\n\\tpIVAStoppingCondition.SetTolerance(0.0001);\\n\\t#6，第一个瞄准段中机动段属性设置\\n\\tpIVAMCSManeuver.SetManeuverType(ATKModule.eVAManeuverTypeImpulsive);\\n\\tpIVAManeuverImpulsive = pIVAMCSManeuver.GetManeuver();\\n\\tpIVAAttitudeControlImpulsiveThrustVector = pIVAManeuverImpulsive.GetAttitudeControl();\\n\\tpIVAAttitudeControlImpulsiveThrustVector.SetThrustAxesName(\\"Satellite VNC(Earth)\\");\\n\\tpIVAMCSManeuver.EnableControlParameter(ATKModule.eVAControlManeuverImpulsiveCartesianX);\\n\\tpIVAMCSManeuver.GetResults().Add(\\"Radius_Of_Apoapsis\\");\\n\\t#7，第一个瞄准段添加属性页\\n\\tpIVAProfileDifferentialCorrector = pIVAMCSTargetSequence.GetProfiles().Add(\\"Differential Corrector\\");\\n\\tpIVADCControl = pIVAProfileDifferentialCorrector.GetControlParameters().GetControlByPaths(\\"Maneuver\\", \\"ImpulseX\\");\\n\\tpIVADCResult = pIVAProfileDifferentialCorrector.GetResults().GetResultByPaths(\\"Maneuver\\", \\"StateCalc\\"+\\"RadiusOfApoapsis\\");\\n\\t#8，属性页中控制变量属性设置\\n\\tpIVADCControl.SetEnable(True);\\n\\tpIVADCControl.SetMaxStep(100);\\n\\t#pIVADCControl.SetCorrection(2781.50365947627);\\n\\tpIVADCControl.SetPerturbation(0.1);\\n\\tpIVADCControl.SetScalingValue(1);\\n\\t#9，属性页中约束条件属性设置\\n\\tpIVADCResult.SetEnable(True);\\n\\tpIVADCResult.SetDesiredValue(84328394);\\n\\tpIVADCResult.SetScalingValue(1);\\n\\tpIVADCResult.SetTolerance(0.1);\\n\\tpIVADCResult.SetWeight(1);\\n\\t#10，第二个预报段属性设置\\n\\tpIVAStoppingConditionElement1 = pIVAMCSPropagate1.GetStoppingConditions().Add(\\"RMagnitude\\");\\n\\tpIVAStoppingCondition1 = pIVAStoppingConditionElement1.GetProperties();\\n\\tpIVAStoppingCondition1.SetTrip(42164197);\\n\\tpIVAStoppingCondition1.SetTolerance(1e-6);\\n\\tpIVAStoppingCondition1.SetRepeatCount(1);\\n\\tpIVAStoppingCondition1.SetCriterion(ATKModule.eVACriterionCrossEither);\\n\\t#11，第二个瞄准段中机动段属性设置\\n\\tpIVAMCSManeuver1.SetManeuverType(ATKModule.eVAManeuverTypeImpulsive);\\n\\tpIVAManeuverImpulsive1 = pIVAMCSManeuver1.GetManeuver();\\n\\tpIVAAttitudeControlImpulsiveThrustVector1 = pIVAManeuverImpulsive1.GetAttitudeControl();\\n\\tpIVAAttitudeControlImpulsiveThrustVector1.SetThrustAxesName(\\"Satellite VNC(Earth)\\");\\n\\tpIVAMCSManeuver1.EnableControlParameter(ATKModule.eVAControlManeuverImpulsiveCartesianX);\\n\\tpIVAMCSManeuver1.EnableControlParameter(ATKModule.eVAControlManeuverImpulsiveCartesianZ);\\n\\tpIVAMCSManeuver1.GetResults().Add(\\"Eccentricity\\");\\n\\tpIVAMCSManeuver1.GetResults().Add(\\"Cosine_of_Vertical_FPA\\");\\n\\t#12，第二个瞄准段添加属性页\\n\\tpIVAProfileDifferentialCorrector1 = pIVAMCSTargetSequence1.GetProfiles().Add(\\"Differential Corrector\\");\\n\\t#13，属性页中控制变量属性设置\\n\\tpIVADCControl1 = pIVAProfileDifferentialCorrector1.GetControlParameters().Item(0);\\n\\tpIVADCControl1.SetEnable(True);\\n\\tpIVADCControl1.SetMaxStep(300);\\n\\tpIVADCControl1.SetCorrection(-1581.97670664023);\\n\\tpIVADCControl1.SetPerturbation(0.1);\\n\\tpIVADCControl1.SetScalingValue(1);\\n\\tpIVADCControl2 = pIVAProfileDifferentialCorrector1.GetControlParameters().Item(1);\\n\\tpIVADCControl2.SetEnable(True);\\n\\tpIVADCControl2.SetMaxStep(300);\\n\\tpIVADCControl2.SetCorrection(-2771.82057041661);\\n\\tpIVADCControl2.SetPerturbation(0.1);\\n\\tpIVADCControl2.SetScalingValue(1);\\n\\t#14，属性页中约束条件属性设置\\n\\tpIVADCResult1 = pIVAProfileDifferentialCorrector1.GetResults().Item(0);\\n\\tpIVADCResult1.SetEnable(True);\\n\\tpIVADCResult1.SetDesiredValue(0);\\n\\tpIVADCResult1.SetScalingValue(1);\\n\\tpIVADCResult1.SetTolerance(0.1);\\n\\tpIVADCResult1.SetWeight(1);\\n\\tpIVADCResult2 = pIVAProfileDifferentialCorrector1.GetResults().Item(1);\\n\\tpIVADCResult2.SetEnable(True);\\n\\tpIVADCResult2.SetDesiredValue(0);\\n\\tpIVADCResult2.SetScalingValue(1);\\n\\tpIVADCResult2.SetTolerance(0.1);\\n\\tpIVADCResult2.SetWeight(1);\\n\\t#15，第三个预报段属性设置\\n\\tpIVAStoppingConditionElement2 = pIVAMCSPropagate2.GetStoppingConditions().Add(\\"Duration\\");\\n\\tpIVAStoppingCondition2 = pIVAStoppingConditionElement2.GetProperties();\\n\\tpIVAStoppingCondition2.SetTrip(86400);\\n\\tpIVAStoppingCondition2.SetTolerance(0.0001);\\n\\t#16，机动规划运行\\n\\tpIVADriverMCS.RunMCS();\\n\\tpIVADriverMCS.ApplyAllProfileChanges();\\n\\t#17，生成数据到文件\\n\\tstrReportFilePath = pIAtkObjectRoot.OutputDataReport(pISatellite, \\"J2000 Position Velocity\\", \\"5 Nov 2022 00:00:00.000\\", \\"6 Nov 2022 00:00:00.000\\");\\n\\t#18，输出数据报告目录\\n\\tprint(\\"output data reports:\\"+strReportFilePath)\\n\\n#4，新建根节点\\npIAtkObjectRoot = ATKModule.IAtkObjectRoot();\\n#5，调用实现函数\\nTestFastTransfer(pIAtkObjectRoot);\\n#TestHohmannTransfer(pIAtkObjectRoot);\\n#TestInclinationChange(pIAtkObjectRoot);\\n#6，仿真运行\\npIAtkObjectRoot.GetAnimation().PlayForward();\\n#7，保存场景\\npIAtkObjectRoot.SaveScenario();\\n#8，关闭场景\\npIAtkObjectRoot.CloseScenario();\\n</code></pre></div>"}');export{v as comp,S as data};
