# Java Case Implementation

## Java Case Flowchart

![Java case flowchart](../../../../zh/二次开发教程/4-二次开发COMPONENT模式/3-Java操作流程/media/3-Java案例实现/Java案例流程图.png)

## Java Case Source Code

```java
//ATKComponentJavaTest.java
package com.atk.test;

import com.atk.component.*;

public class ATKComponentJavaTest{
  //Load the ATKComponent mode dynamic library and dependency libraries
  static {
    try {
	  //windows
	  System.loadLibrary("./ATKComponentJava");
	  //linux
	  //System.load("/root/git/IAtkObject/IAtkObjectDll/build/libIAtkObjectDll.so");
    } catch (UnsatisfiedLinkError e) {
      System.err.println("load dll failed\n" + e);
      System.exit(1);
    }
  }
  
  public static void main(String []argv) {
	//Set the save path
	String curPath = System.getProperty("user.dir");
	ATKComponentJavaModule.SetSaveFileBasePath(curPath);
	//Create a new root object
	IAtkObjectRoot pIAtkObjectRoot = new IAtkObjectRoot();
	//Call the orbit fast transfer function
	TestFastTransfer(pIAtkObjectRoot);
	//Run the simulation
	pIAtkObjectRoot.GetAnimation().PlayForward();
	//Save the scenario
	pIAtkObjectRoot.SaveScenario();
	//Close the scenario
	pIAtkObjectRoot.CloseScenario();
  }
  
  //Orbit fast transfer function
  public static void TestFastTransfer(IAtkObjectRoot pIAtkObjectRoot){
	//Create a new scenario and set properties
	IScenario pIScenario = (IScenario)pIAtkObjectRoot.GetChildren().New(EATKObjectType.eScenario,"FastTransfer");
	pIScenario.SetTimePeriod("5 Nov 2022 00:00:00.000", "6 Nov 2022 00:00:00.000");
	//Create a new satellite and set the orbit propagator to Maneuver Planning
	ISatellite pISatellite = (ISatellite)pIScenario.GetChildren().New(EATKObjectType.eSatellite,"Satellite1");
	//Set the display duration of the 2D trajectory property
	IVeGfxLeadTrailData pIVeGfxLeadTrailData = pISatellite.GetGraphics().GetPassData().GetGroundTrack();
	pIVeGfxLeadTrailData.SetTrailDataType(ELeadTrailData.eDataTime);
	IVeLeadTrailData pIVeLeadTrailData = pIVeGfxLeadTrailData.GetTrailData();
	IVeLeadTrailDataTime pIVeLeadTrailDataTime = (IVeLeadTrailDataTime)(pIVeGfxLeadTrailData.GetTrailData());
	pIVeLeadTrailDataTime.SetTime(24*60*60);
	pISatellite.SetPropagatorType(EVePropagatorType.ePropagatorAstromaster);
	IVADriverMCS pIVADriverMCS = (IVADriverMCS)(pISatellite.GetPropagator());
	IVAMCSSegmentCollection pIVAMCSSegmentCollection = pIVADriverMCS.GetMainSequence();
	//Add segments to the maneuver planning; a newly added satellite has a default initial state
	if (EVASegmentType.eVASegmentTypeInitialState != pIVAMCSSegmentCollection.Item(0).GetType()){
		return;
	}
	IVAMCSInitialState pIVAMCSInitialState = (IVAMCSInitialState)(pIVAMCSSegmentCollection.Item(0));
	IVAMCSPropagate pIVAMCSPropagate = (IVAMCSPropagate)(pIVAMCSSegmentCollection.Insert(EVASegmentType.eVASegmentTypePropagate, "Propagate", "-"));
	IVAMCSTargetSequence pIVAMCSTargetSequence = (IVAMCSTargetSequence)(pIVAMCSSegmentCollection.Insert(EVASegmentType.eVASegmentTypeTargetSequence, "TargetSequence", "-"));
	IVAMCSManeuver pIVAMCSManeuver = (IVAMCSManeuver)(pIVAMCSTargetSequence.GetSegments().Insert(EVASegmentType.eVASegmentTypeManeuver, "Maneuver", "-"));
	IVAMCSPropagate pIVAMCSPropagate1 = (IVAMCSPropagate)(pIVAMCSSegmentCollection.Insert(EVASegmentType.eVASegmentTypePropagate, "Propagate", "-"));
	IVAMCSTargetSequence pIVAMCSTargetSequence1	= (IVAMCSTargetSequence)(pIVAMCSSegmentCollection.Insert(EVASegmentType.eVASegmentTypeTargetSequence, "TargetSequence1", "-"));
	IVAMCSManeuver pIVAMCSManeuver1 = (IVAMCSManeuver)(pIVAMCSTargetSequence1.GetSegments().Insert(EVASegmentType.eVASegmentTypeManeuver, "Maneuver", "-"));
	IVAMCSPropagate pIVAMCSPropagate2 = (IVAMCSPropagate)(pIVAMCSSegmentCollection.Insert(EVASegmentType.eVASegmentTypePropagate, "Propagate", "-"));
	//Set the properties of the initial state
	pIVAMCSInitialState.SetOrbitEpoch("5 Nov 2022 00:00:00.000");
	pIVAMCSInitialState.SetElementType(EVAElementType.eVAElementTypeKeplerian);
	IVAElementKeplerian pIVAElementKeplerian = (IVAElementKeplerian)(pIVAMCSInitialState.GetElement());
	pIVAElementKeplerian.SetSemiMajorAxis(6700000);
	pIVAElementKeplerian.SetEccentricity(0);
	pIVAElementKeplerian.SetInclination(0);
	pIVAElementKeplerian.SetRAAN(0);
	pIVAElementKeplerian.SetArgOfPeriapsis(0);
	pIVAElementKeplerian.SetTrueAnomaly(0);
    //Set the properties of the first propagation segment
	IVAStoppingConditionElement pIVAStoppingConditionElement = pIVAMCSPropagate.GetStoppingConditions().Add("Duration");
	IVAStoppingCondition pIVAStoppingCondition = (IVAStoppingCondition)(pIVAStoppingConditionElement.GetProperties());
	pIVAStoppingCondition.SetTrip(7200);
	pIVAStoppingCondition.SetTolerance(0.0001);
	//Set the properties of the maneuver segment in the first target sequence
	pIVAMCSManeuver.SetManeuverType(EVAManeuverType.eVAManeuverTypeImpulsive);
	IVAManeuverImpulsive pIVAManeuverImpulsive = (IVAManeuverImpulsive)(pIVAMCSManeuver.GetManeuver());
	IVAAttitudeControlImpulsiveThrustVector pIVAAttitudeControlImpulsiveThrustVector = (IVAAttitudeControlImpulsiveThrustVector)(pIVAManeuverImpulsive.GetAttitudeControl());
	pIVAAttitudeControlImpulsiveThrustVector.SetThrustAxesName("Satellite VNC(Earth)");
	pIVAMCSManeuver.EnableControlParameter(EVAControlManeuver.eVAControlManeuverImpulsiveCartesianX);
	pIVAMCSManeuver.GetResults().Add("Radius_Of_Apoapsis");
	//Add a profile to the first target sequence
	IVAProfileDifferentialCorrector pIVAProfileDifferentialCorrector = (IVAProfileDifferentialCorrector)(pIVAMCSTargetSequence.GetProfiles().Add("Differential Corrector"));
	IVADCControl pIVADCControl = pIVAProfileDifferentialCorrector.GetControlParameters().GetControlByPaths("Maneuver", "ImpulseX");
	IVADCResult pIVADCResult = pIVAProfileDifferentialCorrector.GetResults().GetResultByPaths("Maneuver", "StateCalc"+"RadiusOfApoapsis");
	//Set the properties of the control variables in the profile
	pIVADCControl.SetEnable(true);
	pIVADCControl.SetMaxStep(100);
	pIVADCControl.SetCorrection(2781.50365947627);
	pIVADCControl.SetPerturbation(0.1);
	pIVADCControl.SetScalingValue(1);
	//Set the properties of the constraints in the profile
	pIVADCResult.SetEnable(true);
	pIVADCResult.SetDesiredValue(84328394);
	pIVADCResult.SetScalingValue(1);
	pIVADCResult.SetTolerance(0.1);
	pIVADCResult.SetWeight(1);
	//Set the properties of the second propagation segment
	IVAStoppingConditionElement pIVAStoppingConditionElement1 = pIVAMCSPropagate1.GetStoppingConditions().Add("RMagnitude");
	IVAStoppingCondition pIVAStoppingCondition1 = (IVAStoppingCondition)(pIVAStoppingConditionElement1.GetProperties());
	pIVAStoppingCondition1.SetTrip(42164197);
	pIVAStoppingCondition1.SetTolerance(1e-6);
	pIVAStoppingCondition1.SetRepeatCount(1);
	pIVAStoppingCondition1.SetCriterion(EVACriterion.eVACriterionCrossEither);
	//Set the properties of the maneuver segment in the second target sequence
	pIVAMCSManeuver1.SetManeuverType(EVAManeuverType.eVAManeuverTypeImpulsive);
	IVAManeuverImpulsive pIVAManeuverImpulsive1 = (IVAManeuverImpulsive)(pIVAMCSManeuver1.GetManeuver());
	IVAAttitudeControlImpulsive pIVAAttitudeControlImpulsive1 = (IVAAttitudeControlImpulsive)(pIVAManeuverImpulsive1.GetAttitudeControl());
	IVAAttitudeControlImpulsiveThrustVector pIVAAttitudeControlImpulsiveThrustVector1 = (IVAAttitudeControlImpulsiveThrustVector)(pIVAAttitudeControlImpulsive1);
	pIVAAttitudeControlImpulsiveThrustVector1.SetThrustAxesName("Satellite VNC(Earth)");
	pIVAMCSManeuver1.EnableControlParameter(EVAControlManeuver.eVAControlManeuverImpulsiveCartesianX);
	pIVAMCSManeuver1.EnableControlParameter(EVAControlManeuver.eVAControlManeuverImpulsiveCartesianZ);
	pIVAMCSManeuver1.GetResults().Add("Eccentricity");
	pIVAMCSManeuver1.GetResults().Add("Cosine_of_Vertical_FPA");
    //Add a profile to the second target sequence
	IVAProfileDifferentialCorrector pIVAProfileDifferentialCorrector1 = (IVAProfileDifferentialCorrector)(pIVAMCSTargetSequence1.GetProfiles().Add("Differential Corrector"));
	//Set the properties of the control variables in the profile
	IVADCControl pIVADCControl1 = pIVAProfileDifferentialCorrector1.GetControlParameters().Item(0);
	pIVADCControl1.SetEnable(true);
	pIVADCControl1.SetMaxStep(300);
	pIVADCControl1.SetCorrection(-1581.97670664023);
	pIVADCControl1.SetPerturbation(0.1);
	pIVADCControl1.SetScalingValue(1);
	IVADCControl pIVADCControl2 = pIVAProfileDifferentialCorrector1.GetControlParameters().Item(1);
	pIVADCControl2.SetEnable(true);
	pIVADCControl2.SetMaxStep(300);
	pIVADCControl2.SetCorrection(-2771.82057041661);
	pIVADCControl2.SetPerturbation(0.1);
	pIVADCControl2.SetScalingValue(1);
	//Set the properties of the constraints in the profile
	IVADCResult pIVADCResult1 = pIVAProfileDifferentialCorrector1.GetResults().Item(0);
	pIVADCResult1.SetEnable(true);
	pIVADCResult1.SetDesiredValue(0);
	pIVADCResult1.SetScalingValue(1);
	pIVADCResult1.SetTolerance(0.1);
	pIVADCResult1.SetWeight(1);
	IVADCResult pIVADCResult2 = pIVAProfileDifferentialCorrector1.GetResults().Item(1);
	pIVADCResult2.SetEnable(true);
	pIVADCResult2.SetDesiredValue(0);
	pIVADCResult2.SetScalingValue(1);
	pIVADCResult2.SetTolerance(0.1);
	pIVADCResult2.SetWeight(1);
	//Set the properties of the third propagation segment
	IVAStoppingConditionElement pIVAStoppingConditionElement2 = pIVAMCSPropagate2.GetStoppingConditions().Add("Duration");
	IVAStoppingCondition pIVAStoppingCondition2 = (IVAStoppingCondition)(pIVAStoppingConditionElement2.GetProperties());
	pIVAStoppingCondition2.SetTrip(86400);
	pIVAStoppingCondition2.SetTolerance(0.0001);
	//Run the maneuver planning
	pIVADriverMCS.RunMCS();
	pIVADriverMCS.ApplyAllProfileChanges();
	//Generate data to a file
	String strReportFilePath = pIAtkObjectRoot.OutputDataReport(pISatellite, "J2000 Position Velocity", "5 Nov 2022 00:00:00.000", "6 Nov 2022 00:00:00.000");
	//Output data report directory
	System.out.println("输出数据报告:"+strReportFilePath);
  }
}
```

## Java Case Execution Commands

1. Switch disk: E:
2. Switch path: cd E:\cssx\ATK-4.0-rc.1
3. Compile command: javac -cp ATKComponentJava.jar -encoding utf-8 com/atk/test/ATKComponentJavaTest.java
4. Execute command: java -cp .;ATKComponentJava.jar com/atk/test/ATKComponentJavaTest
