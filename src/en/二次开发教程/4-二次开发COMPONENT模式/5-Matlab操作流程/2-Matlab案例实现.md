# Matlab Case Implementation

## Matlab Case Flowchart

![Matlab case flowchart](../../../../zh/二次开发教程/4-二次开发COMPONENT模式/5-Matlab操作流程/media/2-Matlab案例实现/Matlab案例流程图.png)

## Matlab Case Source Code

```matlab
%	Prerequisite steps:
%	1, copy the path where ATK.exe is located and set it as the current Matlab path

%Garbage collection
java.lang.System.gc();

%Add the java system path and the java jar package
jarPath = [pwd,'\\ATKComponentJava.jar'];
if ~any(strcmp(jarPath,javaclasspath()))
    javaaddpath(jarPath)
end

%Load dependency library dll
ATKLibraryLoader.loadLibrary()

%Import the java interface wrapper class
import com.atk.component.*;

%Set the encoding type, used to distinguish characters
ATKComponentJavaModule.SetCallCodeType('matlab');
%Set the default output path
ATKComponentJavaModule.SetSaveFileBasePath(pwd);
	
%Create a new root object
pIAtkObjectRoot = IAtkObjectRoot();
%Create a new scenario and set properties
pIScenario = pIAtkObjectRoot.GetChildren().New(EATKObjectType.eScenario,'FastTransfer');
pIScenario.SetTimePeriod('5 Nov 2022 00:00:00.000', '6 Nov 2022 00:00:00.000');
%Create a new satellite and set the orbit propagator to Maneuver Planning
pISatellite = pIScenario.GetChildren().New(EATKObjectType.eSatellite,'Satellite1');
%Set the display duration of the 2D trajectory property
pIVeGfxLeadTrailData = pISatellite.GetGraphics().GetPassData().GetGroundTrack();
pIVeGfxLeadTrailData.SetTrailDataType(ELeadTrailData.eDataTime);
pIVeLeadTrailDataTime = pIVeGfxLeadTrailData.GetTrailData();
pIVeLeadTrailDataTime.SetTime(24*60*60);
pISatellite.SetPropagatorType(EVePropagatorType.ePropagatorAstromaster);
pIVADriverMCS = pISatellite.GetPropagator();
pIVAMCSSegmentCollection = pIVADriverMCS.GetMainSequence();
%Add segments to the maneuver planning; a newly added satellite has a default initial state
pIVAMCSInitialState = pIVAMCSSegmentCollection.Item(0);
pIVAMCSPropagate = pIVAMCSSegmentCollection.Insert(EVASegmentType.eVASegmentTypePropagate, 'Propagate', '-');
pIVAMCSTargetSequence = pIVAMCSSegmentCollection.Insert(EVASegmentType.eVASegmentTypeTargetSequence, 'TargetSequence', '-');
pIVAMCSManeuver = pIVAMCSTargetSequence.GetSegments().Insert(EVASegmentType.eVASegmentTypeManeuver, 'Maneuver', '-');
pIVAMCSPropagate1 = pIVAMCSSegmentCollection.Insert(EVASegmentType.eVASegmentTypePropagate, 'Propagate', '-');
pIVAMCSTargetSequence1	= pIVAMCSSegmentCollection.Insert(EVASegmentType.eVASegmentTypeTargetSequence, 'TargetSequence1', '-');
pIVAMCSManeuver1 = pIVAMCSTargetSequence1.GetSegments().Insert(EVASegmentType.eVASegmentTypeManeuver, 'Maneuver', '-');
pIVAMCSPropagate2 = pIVAMCSSegmentCollection.Insert(EVASegmentType.eVASegmentTypePropagate, 'Propagate', '-');
%Set the properties of the initial state
pIVAMCSInitialState.SetOrbitEpoch('5 Nov 2022 00:00:00.000');
pIVAMCSInitialState.SetElementType(EVAElementType.eVAElementTypeKeplerian);
pIVAElementKeplerian = pIVAMCSInitialState.GetElement();
pIVAElementKeplerian.SetSemiMajorAxis(6700000);
pIVAElementKeplerian.SetEccentricity(0);
pIVAElementKeplerian.SetInclination(0);
pIVAElementKeplerian.SetRAAN(0);
pIVAElementKeplerian.SetArgOfPeriapsis(0);
pIVAElementKeplerian.SetTrueAnomaly(0);
%Set the properties of the first propagation segment
pIVAStoppingConditionElement = pIVAMCSPropagate.GetStoppingConditions().Add('Duration');
pIVAStoppingCondition = pIVAStoppingConditionElement.GetProperties();
pIVAStoppingCondition.SetTrip(7200);
pIVAStoppingCondition.SetTolerance(0.0001);
%Set the properties of the maneuver segment in the first target sequence
pIVAMCSManeuver.SetManeuverType(EVAManeuverType.eVAManeuverTypeImpulsive);
pIVAManeuverImpulsive = pIVAMCSManeuver.GetManeuver();
pIVAAttitudeControlImpulsiveThrustVector = pIVAManeuverImpulsive.GetAttitudeControl();
pIVAAttitudeControlImpulsiveThrustVector.SetThrustAxesName('Satellite VNC(Earth)');
pIVAMCSManeuver.EnableControlParameter(EVAControlManeuver.eVAControlManeuverImpulsiveCartesianX);
pIVAMCSManeuver.GetResults().Add('Radius_Of_Apoapsis');
%Add a profile to the first target sequence
pIVAProfileDifferentialCorrector = pIVAMCSTargetSequence.GetProfiles().Add('Differential Corrector');
pIVADCControl = pIVAProfileDifferentialCorrector.GetControlParameters().GetControlByPaths('Maneuver', 'ImpulseX');
pIVADCResult = pIVAProfileDifferentialCorrector.GetResults().GetResultByPaths('Maneuver', "StateCalc"+'RadiusOfApoapsis');
%Set the properties of the control variables in the profile
pIVADCControl.SetEnable(true);
pIVADCControl.SetMaxStep(100);
pIVADCControl.SetCorrection(2781.50365947627);
pIVADCControl.SetPerturbation(0.1);
pIVADCControl.SetScalingValue(1);
%Set the properties of the constraints in the profile
pIVADCResult.SetEnable(true);
pIVADCResult.SetDesiredValue(84328394);
pIVADCResult.SetScalingValue(1);
pIVADCResult.SetTolerance(0.1);
pIVADCResult.SetWeight(1);
%Set the properties of the second propagation segment
pIVAStoppingConditionElement1 = pIVAMCSPropagate1.GetStoppingConditions().Add('RMagnitude');
pIVAStoppingCondition1 = pIVAStoppingConditionElement1.GetProperties();
pIVAStoppingCondition1.SetTrip(42164197);
pIVAStoppingCondition1.SetTolerance(1e-6);
pIVAStoppingCondition1.SetRepeatCount(1);
pIVAStoppingCondition1.SetCriterion(EVACriterion.eVACriterionCrossEither);
%Set the properties of the maneuver segment in the second target sequence
pIVAMCSManeuver1.SetManeuverType(EVAManeuverType.eVAManeuverTypeImpulsive);
pIVAManeuverImpulsive1 = pIVAMCSManeuver1.GetManeuver();
pIVAAttitudeControlImpulsiveThrustVector1 = pIVAManeuverImpulsive1.GetAttitudeControl();
pIVAAttitudeControlImpulsiveThrustVector1.SetThrustAxesName('Satellite VNC(Earth)');
pIVAMCSManeuver1.EnableControlParameter(EVAControlManeuver.eVAControlManeuverImpulsiveCartesianX);
pIVAMCSManeuver1.EnableControlParameter(EVAControlManeuver.eVAControlManeuverImpulsiveCartesianZ);
pIVAMCSManeuver1.GetResults().Add('Eccentricity');
pIVAMCSManeuver1.GetResults().Add('Cosine_of_Vertical_FPA');
%Add a profile to the second target sequence
pIVAProfileDifferentialCorrector1 = pIVAMCSTargetSequence1.GetProfiles().Add('Differential Corrector');
%Set the properties of the control variables in the profile
pIVADCControl1 = pIVAProfileDifferentialCorrector1.GetControlParameters().Item(0);
pIVADCControl1.SetEnable(true);
pIVADCControl1.SetMaxStep(300);
pIVADCControl1.SetCorrection(-1581.97670664023);
pIVADCControl1.SetPerturbation(0.1);
pIVADCControl1.SetScalingValue(1);
pIVADCControl2 = pIVAProfileDifferentialCorrector1.GetControlParameters().Item(1);
pIVADCControl2.SetEnable(true);
pIVADCControl2.SetMaxStep(300);
pIVADCControl2.SetCorrection(-2771.82057041661);
pIVADCControl2.SetPerturbation(0.1);
pIVADCControl2.SetScalingValue(1);
%Set the properties of the constraints in the profile
pIVADCResult1 = pIVAProfileDifferentialCorrector1.GetResults().Item(0);
pIVADCResult1.SetEnable(true);
pIVADCResult1.SetDesiredValue(0);
pIVADCResult1.SetScalingValue(1);
pIVADCResult1.SetTolerance(0.1);
pIVADCResult1.SetWeight(1);
pIVADCResult2 = pIVAProfileDifferentialCorrector1.GetResults().Item(1);
pIVADCResult2.SetEnable(true);
pIVADCResult2.SetDesiredValue(0);
pIVADCResult2.SetScalingValue(1);
pIVADCResult2.SetTolerance(0.1);
pIVADCResult2.SetWeight(1);
%Set the properties of the third propagation segment
pIVAStoppingConditionElement2 = pIVAMCSPropagate2.GetStoppingConditions().Add('Duration');
pIVAStoppingCondition2 = pIVAStoppingConditionElement2.GetProperties();
pIVAStoppingCondition2.SetTrip(86400);
pIVAStoppingCondition2.SetTolerance(0.0001);
%Run the maneuver planning
pIVADriverMCS.RunMCS();
pIVADriverMCS.ApplyAllProfileChanges();
%Generate data to a file
strReportFilePath = pIAtkObjectRoot.OutputDataReport(pISatellite, 'J2000 Position Velocity', '5 Nov 2022 00:00:00.000', '6 Nov 2022 00:00:00.000');
%Run the simulation
pIAtkObjectRoot.GetAnimation().PlayForward();
%Save the scenario
pIAtkObjectRoot.SaveScenario();
%Close the scenario
pIAtkObjectRoot.CloseScenario();
%Output the data report directory
strReportFilePath
```

## Matlab Case Execution Commands
Open the Matlab software, set the dependency paths and initialize the dependency environment, and call and run the Matlab case script. The specific steps are as follows:

	1. Copy the ATK installation package root directory path and set it as the current Matlab path;

	2. Double-click to open the Matlab case script ATKComponentMatlabTest.m;

	3. Click Run to run the Matlab case script, as shown in the figure.


![Workflow](../../../../zh/二次开发教程/4-二次开发COMPONENT模式/5-Matlab操作流程/media/2-Matlab案例实现/Matlab操作流程_zy.png)