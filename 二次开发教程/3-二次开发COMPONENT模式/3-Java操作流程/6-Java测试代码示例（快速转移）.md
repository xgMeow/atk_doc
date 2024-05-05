# Java测试代码示例（快速转移）

```java
public class testCallDll {
    static {
        try {
            System.loadLibrary("IAtkObjectDll");
        } catch (UnsatisfiedLinkError e) {
            System.err.println(
                    "Native code library failed to load. See the chapter on  Dynamic Linking Problems in the SWIG Java documentation for help.\n"
                            + e);
            System.exit(1);
        }
    }

    public static void main(String[] argv) {
        // root
        IAtkObjectRoot pIAtkObjectRoot = new IAtkObjectRoot();
        // new IScenario
        IAtkObject pIAtkObjectIScenario = pIAtkObjectRoot.GetChildren().New(EATKObjectType.eScenario, "FastTransfer");
        IScenario pIScenario = example.IAtkObject2IScenario(pIAtkObjectIScenario);
        pIScenario.SetTimePeriod("5 Nov 2022 00:00:00.000", "6 Nov 2022 00:00:00.000");
        NewISatelliteFastTransfer(pIAtkObjectRoot, pIScenario);
        pIAtkObjectRoot.getM_Animation().PlayForward();
        pIAtkObjectRoot.SaveScenario();
        pIAtkObjectRoot.CloseScenario();
    }

    public static void NewISatelliteFastTransfer(IAtkObjectRoot pIAtkObjectRoot, IScenario pIScenario) {
        // new ISatellite
        IAtkObject pIAtkObjectSatellite = pIScenario.GetChildren().New(EATKObjectType.eSatellite, "Satellite1");
        ISatellite pISatellite = example.IAtkObject2ISatellite(pIAtkObjectSatellite);
        // set ISatellite IVePropagator FastTransfer
        pISatellite.SetPropagatorType(EVePropagatorType.ePropagatorAstrogator);
        IVADriverMCS pIVADriverMCS = example.IVePropagator2IVADriverMCS(pISatellite.GetPropagator());
        IVAMCSSegmentCollection pIVAMCSSegmentCollection = pIVADriverMCS.GetMainSequence();
        IVAMCSInitialState pIVAMCSInitialState = example
                .IVAMCSSegment2IVAMCSInitialState(pIVAMCSSegmentCollection.Item(0));
        // pIVAMCSPropagate = (IVAMCSPropagate*)pIVAMCSSegmentCollection.Item(1);
        IVAMCSPropagate pIVAMCSPropagate = example.IVAMCSSegment2IVAMCSPropagate(
                pIVAMCSSegmentCollection.Insert(EVASegmentType.eVASegmentTypePropagate, "Propagate", "-"));
        IVAMCSTargetSequence pIVAMCSTargetSequence = example.IVAMCSSegment2IVAMCSTargetSequence(
                pIVAMCSSegmentCollection.Insert(EVASegmentType.eVASegmentTypeTargetSequence, "TargetSequence", "-"));
        IVAMCSManeuver pIVAMCSManeuver = example.IVAMCSSegment2IVAMCSManeuver(
                pIVAMCSTargetSequence.GetSegments().Insert(EVASegmentType.eVASegmentTypeManeuver, "Maneuver", "-"));
        IVAMCSPropagate pIVAMCSPropagate1 = example.IVAMCSSegment2IVAMCSPropagate(
                pIVAMCSSegmentCollection.Insert(EVASegmentType.eVASegmentTypePropagate, "Propagate", "-"));
        IVAMCSTargetSequence pIVAMCSTargetSequence1 = example.IVAMCSSegment2IVAMCSTargetSequence(
                pIVAMCSSegmentCollection.Insert(EVASegmentType.eVASegmentTypeTargetSequence, "TargetSequence1", "-"));
        IVAMCSManeuver pIVAMCSManeuver1 = example.IVAMCSSegment2IVAMCSManeuver(
                pIVAMCSTargetSequence1.GetSegments().Insert(EVASegmentType.eVASegmentTypeManeuver, "Maneuver", "-"));
        IVAMCSPropagate pIVAMCSPropagate2 = example.IVAMCSSegment2IVAMCSPropagate(
                pIVAMCSSegmentCollection.Insert(EVASegmentType.eVASegmentTypePropagate, "Propagate", "-"));
        pIVAMCSInitialState.SetOrbitEpoch("5 Nov 2022 00:00:00.000");
        pIVAMCSInitialState.SetElementType(EVAElementType.eVAElementTypeKeplerian);
        IVAElementKeplerian pIVAElementKeplerian = example
                .IVAElement2IVAElementKeplerian(pIVAMCSInitialState.GetElement());
        pIVAElementKeplerian.SetSemiMajorAxis(6700);
        pIVAElementKeplerian.SetEccentricity(0);
        pIVAElementKeplerian.SetInclination(0);
        pIVAElementKeplerian.SetRAAN(0);
        pIVAElementKeplerian.SetArgOfPeriapsis(0);
        pIVAElementKeplerian.SetTrueAnomaly(0);

        IVAStoppingConditionElement pIVAStoppingConditionElement = pIVAMCSPropagate.GetStoppingConditions()
                .Add("Duration");
        IVAStoppingCondition pIVAStoppingCondition = example
                .IVAStoppingConditionComponent2IVAStoppingCondition(pIVAStoppingConditionElement.GetProperties());
        pIVAStoppingCondition.SetTrip(7200);
        pIVAStoppingCondition.SetTolerance(0.0001);
        pIVAMCSManeuver.SetManeuverType(EVAManeuverType.eVAManeuverTypeImpulsive);
        IVAManeuverImpulsive pIVAManeuverImpulsive = example
                .IVAManeuver2IVAManeuverImpulsive(pIVAMCSManeuver.GetManeuver());
        IVAAttitudeControlImpulsiveThrustVector pIVAAttitudeControlImpulsiveThrustVector = example
                .IVAAttitudeControl2IVAAttitudeControlImpulsiveThrustVector(pIVAManeuverImpulsive.GetAttitudeControl());
        pIVAAttitudeControlImpulsiveThrustVector.SetThrustAxesName("Satellite VNC(Earth)");
        pIVAMCSManeuver.EnableControlParameter(EVAControlManeuver.eVAControlManeuverImpulsiveCartesianX);
        pIVAMCSManeuver.getResults().Add("Radius_Of_Apoapsis");
        IVAProfileDifferentialCorrector1 pIVAProfileDifferentialCorrector1 = example
                .IVAProfile2IVAProfileDifferentialCorrector1(
                        pIVAMCSTargetSequence.GetProfiles().Add("Differential Corrector"));
        IVADCControl pIVADCControl = pIVAProfileDifferentialCorrector1.GetControlParameters()
                .GetControlByPaths("Maneuver", "ImpulseX");
        IVADCResult pIVADCResult = pIVAProfileDifferentialCorrector1.getResults().GetResultByPaths("Maneuver",
                "RadiusOfApoapsis");
        pIVADCControl = pIVAProfileDifferentialCorrector1.GetControlParameters().Item(0);
        pIVADCControl.SetEnable(true);
        pIVADCControl.SetMaxStep(100);
        pIVADCControl.SetCorrection(2781.50365947627);
        pIVADCControl.SetPerturbation(0.1);
        pIVADCControl.SetScalingValue(1);
        pIVADCResult = pIVAProfileDifferentialCorrector1.getResults().Item(0);
        pIVADCResult.SetEnable(true);
        pIVADCResult.SetDesiredValue(84328394);
        pIVADCResult.SetScalingValue(1);
        pIVADCResult.SetTolerance(0.1);
        pIVADCResult.SetWeight(1);
        IVAStoppingConditionElement pIVAStoppingConditionElement1 = pIVAMCSPropagate1.GetStoppingConditions()
                .Add("RMagnitude");
        IVAStoppingCondition pIVAStoppingCondition1 = example
                .IVAStoppingConditionComponent2IVAStoppingCondition(pIVAStoppingConditionElement1.GetProperties());
        pIVAStoppingCondition1.SetTrip(42164197);
        pIVAStoppingCondition1.SetTolerance(1e-6);
        pIVAStoppingCondition1.SetRepeatCount(1);
        pIVAStoppingCondition1.SetCriterion(EVACriterion.eVACriterionCrossEither);
        pIVAMCSManeuver1.SetManeuverType(EVAManeuverType.eVAManeuverTypeImpulsive);
        IVAManeuverImpulsive pIVAManeuverImpulsive1 = example
                .IVAManeuver2IVAManeuverImpulsive(pIVAMCSManeuver1.GetManeuver());
        IVAAttitudeControlImpulsiveThrustVector pIVAAttitudeControlImpulsiveThrustVector1 = example
                .IVAAttitudeControl2IVAAttitudeControlImpulsiveThrustVector(
                        pIVAManeuverImpulsive1.GetAttitudeControl());
        pIVAAttitudeControlImpulsiveThrustVector1.SetThrustAxesName("Satellite VNC(Earth)");
        pIVAMCSManeuver1.EnableControlParameter(EVAControlManeuver.eVAControlManeuverImpulsiveCartesianX);
        pIVAMCSManeuver1.EnableControlParameter(EVAControlManeuver.eVAControlManeuverImpulsiveCartesianZ);
        pIVAMCSManeuver1.getResults().Add("Eccentricity");
        pIVAMCSManeuver1.getResults().Add("Cosine_of_Vertical_FPA");

        IVAProfileDifferentialCorrector1 pIVAProfileDifferentialCorrector11 = example
                .IVAProfile2IVAProfileDifferentialCorrector1(
                        pIVAMCSTargetSequence1.GetProfiles().Add("Differential Corrector"));
        IVADCControl pIVADCControl1 = pIVAProfileDifferentialCorrector11.GetControlParameters().Item(0);
        pIVADCControl1.SetEnable(true);
        pIVADCControl1.SetMaxStep(300);
        pIVADCControl1.SetCorrection(-1581.97670664023);
        pIVADCControl1.SetPerturbation(0.1);
        pIVADCControl1.SetScalingValue(1);
        IVADCControl pIVADCControl2 = pIVAProfileDifferentialCorrector11.GetControlParameters().Item(1);
        pIVADCControl2.SetEnable(true);
        pIVADCControl2.SetMaxStep(300);
        pIVADCControl2.SetCorrection(-2771.82057041661);
        pIVADCControl2.SetPerturbation(0.1);
        pIVADCControl2.SetScalingValue(1);
        IVADCResult pIVADCResult1 = pIVAProfileDifferentialCorrector11.getResults().Item(0);
        pIVADCResult1.SetEnable(true);
        pIVADCResult1.SetDesiredValue(0);
        pIVADCResult1.SetScalingValue(1);
        pIVADCResult1.SetTolerance(0.1);
        pIVADCResult1.SetWeight(1);
        IVADCResult pIVADCResult2 = pIVAProfileDifferentialCorrector11.getResults().Item(1);
        pIVADCResult2.SetEnable(true);
        pIVADCResult2.SetDesiredValue(0);
        pIVADCResult2.SetScalingValue(1);
        pIVADCResult2.SetTolerance(0.1);
        pIVADCResult2.SetWeight(1);

        IVAStoppingConditionElement pIVAStoppingConditionElement2 = pIVAMCSPropagate2.GetStoppingConditions()
                .Add("Duration");
        IVAStoppingCondition pIVAStoppingCondition2 = example
                .IVAStoppingConditionComponent2IVAStoppingCondition(pIVAStoppingConditionElement2.GetProperties());
        pIVAStoppingCondition2.SetTrip(86400);
        pIVAStoppingCondition2.SetTolerance(0.0001);
        pIVADriverMCS.RunMCS();
        pIVADriverMCS.ApplyAllProfileChanges();
        // javac -encoding utf-8 testCallDll.java
        String strStyle = new String("地固系位置速度");
        String strStartTime = pIScenario.GetStartTime();
        String strStopTime = pIScenario.GetStopTime();
        String strReportFilePath = pIAtkObjectRoot.OutputDataReport(pIAtkObjectSatellite, strStyle, strStartTime,
                strStopTime);
        System.out.println("ATK " + strReportFilePath);
    }
}
```