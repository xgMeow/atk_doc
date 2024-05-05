// 代码结构功能流程说明
// （1）包含所需头文件，并添加执行函数
// （2）添加根节点
// （3）想定新建与属性设置
// （4）卫星新建与轨道预报设置为机动规划
// （5）机动规划添加段，新添加卫星会有默认初始段
// （6）初始段属性设置
// （7）第一个预报段属性设置
// （8）第一个瞄准段中机动段属性设置
// （9）第一个瞄准段添加属性页，并设置属性页中控制变量与约束条件的属性
// （10）第二个预报段属性设置
// （11）第二个瞄准段中机动段属性设置
// （12）第二个瞄准段添加属性页，并设置属性页中控制变量与约束条件的属性
// （13）第三个预报段属性设置
// （14）机动规划运行
// （15）生成数据到文件
// （16）想定保存及关闭

#pragma once
#include <iostream>
#include <stdlib.h>
#include "IAtkObjectH.h" //包含头文件
using namespace std;

int main()
{
    IAtkObjectRoot *pRoot = new IAtkObjectRoot();
    //
    // 想定新建与属性设置
    //
    IScenario *pIScen = (IScenario *)pRoot->Children->New(eScenario, "FastTransfer");
    if (nullptr == pIScen)
        return false;
    pIScen->SetTimePeriod("5 Nov 2022 00:00:00.000", "6 Nov 2022 00:00:00.000");
    //
    // 卫星新建与轨道预报设置为机动规划
    //
    ISatellite *pISatellite = (ISatellite *)pIScen->Children->New(eSatellite, "Satellite1");
    pISatellite->SetPropagatorType(ePropagatorAstrogator);
    IVADriverMCS *pIVADriverMCS = (IVADriverMCS *)pISatellite->Propagator;
    IVAMCSSegmentCollection *pIVAMCSSegmentCollection = pIVADriverMCS->GetMainSequence();
    //
    // 机动规划添加段，新添加卫星会有默认初始段
    //
    IVAMCSInitialState *pIVAMCSInitialState = nullptr;
    if (eVASegmentTypeInitialState == pIVAMCSSegmentCollection->Item(0)->Type)
    {
        pIVAMCSInitialState = (IVAMCSInitialState *)pIVAMCSSegmentCollection->Item(0);
    }
    IVAMCSPropagate *pIVAMCSPropagate = (IVAMCSPropagate *)pIVAMCSSegmentCollection->Insert(eVASegmentTypePropagate, "Propagate", "-");
    IVAMCSTargetSequence *pIVAMCSTargetSequence = (IVAMCSTargetSequence *)pIVAMCSSegmentCollection->Insert(eVASegmentTypeTargetSequence, "TargetSequence", "-");
    IVAMCSManeuver *pIVAMCSManeuver = (IVAMCSManeuver *)pIVAMCSTargetSequence->GetSegments()->Insert(eVASegmentTypeManeuver, "Maneuver", "-");
    IVAMCSPropagate *pIVAMCSPropagate1 = (IVAMCSPropagate *)pIVAMCSSegmentCollection->Insert(eVASegmentTypePropagate, "Propagate", "-");
    IVAMCSTargetSequence *pIVAMCSTargetSequence1 = (IVAMCSTargetSequence *)pIVAMCSSegmentCollection->Insert(eVASegmentTypeTargetSequence, "TargetSequence1", "-");
    IVAMCSManeuver *pIVAMCSManeuver1 = (IVAMCSManeuver *)pIVAMCSTargetSequence1->GetSegments()->Insert(eVASegmentTypeManeuver, "Maneuver", "-");
    IVAMCSPropagate *pIVAMCSPropagate2 = (IVAMCSPropagate *)pIVAMCSSegmentCollection->Insert(eVASegmentTypePropagate, "Propagate", "-");
    //
    // 初始段属性设置
    //
    pIVAMCSInitialState->SetOrbitEpoch("5 Nov 2022 00:00:00.000");
    pIVAMCSInitialState->SetElementType(eVAElementTypeKeplerian);
    IVAElementKeplerian *pIVAElementKeplerian = (IVAElementKeplerian *)pIVAMCSInitialState->GetElement();
    pIVAElementKeplerian->SetSemiMajorAxis(6700);
    pIVAElementKeplerian->SetEccentricity(0);
    pIVAElementKeplerian->SetInclination(0);
    pIVAElementKeplerian->SetRAAN(0);
    pIVAElementKeplerian->SetArgOfPeriapsis(0);
    pIVAElementKeplerian->SetTrueAnomaly(0);
    //
    // 第一个预报段属性设置
    //
    IVAStoppingConditionElement *pIVAStoppingConditionElement =
        pIVAMCSPropagate->StoppingConditions->Add("Duration");
    IVAStoppingCondition *pIVAStoppingCondition = (IVAStoppingCondition *)pIVAStoppingConditionElement->Properties;
    pIVAStoppingCondition->SetTrip(7200);
    pIVAStoppingCondition->SetTolerance(0.0001);
    //
    // 第一个瞄准段中机动段属性设置
    //
    pIVAMCSManeuver->SetManeuverType(eVAManeuverTypeImpulsive);
    IVAManeuverImpulsive *pIVAManeuverImpulsive = (IVAManeuverImpulsive *)pIVAMCSManeuver->Maneuver;
    IVAAttitudeControlImpulsiveThrustVector *pIVAAttitudeControlImpulsiveThrustVector = (IVAAttitudeControlImpulsiveThrustVector *)pIVAManeuverImpulsive->AttitudeControl;
    pIVAAttitudeControlImpulsiveThrustVector->SetThrustAxesName("Satellite VNC(Earth)");
    pIVAMCSManeuver->EnableControlParameter(eVAControlManeuverImpulsiveCartesianX);
    pIVAMCSManeuver->Results->Add("Radius_Of_Apoapsis");
    //
    // 第一个瞄准段添加属性页
    //
    IVAProfileDifferentialCorrector1 *pIVAProfileDifferentialCorrector1 =
        (IVAProfileDifferentialCorrector1 *)pIVAMCSTargetSequence->GetProfiles()->Add("Differential Corrector");
    IVADCControl *pIVADCControl = pIVAProfileDifferentialCorrector1->ControlParameters->GetControlByPaths("Maneuver", "ImpulseX");
    IVADCResult *pIVADCResult = pIVAProfileDifferentialCorrector1->GetResults()->GetResultByPaths("Maneuver", "RadiusOfApoapsis");
    //
    // 属性页中控制变量属性设置
    //
    pIVADCControl->SetEnable(true);
    pIVADCControl->SetMaxStep(100);
    pIVADCControl->SetCorrection(2781.50365947627);
    pIVADCControl->SetPerturbation(0.1);
    pIVADCControl->SetScalingValue(1);
    //
    // 属性页中约束条件属性设置
    //
    pIVADCResult->SetEnable(true);
    pIVADCResult->SetDesiredValue(84328394);
    pIVADCResult->SetScalingValue(1);
    pIVADCResult->SetTolerance(0.1);
    pIVADCResult->SetWeight(1);
    //
    // 第二个预报段属性设置
    //
    IVAStoppingConditionElement *pIVAStoppingConditionElement1 =
        pIVAMCSPropagate1->StoppingConditions->Add("RMagnitude");
    IVAStoppingCondition *pIVAStoppingCondition1 = (IVAStoppingCondition *)pIVAStoppingConditionElement1->Properties;
    pIVAStoppingCondition1->SetTrip(42164.197);
    pIVAStoppingCondition1->SetTolerance(1e-6);
    pIVAStoppingCondition1->SetRepeatCount(1);
    pIVAStoppingCondition1->SetCriterion(eVACriterionCrossEither);
    //
    // 第二个瞄准段中机动段属性设置
    //
    pIVAMCSManeuver1->SetManeuverType(eVAManeuverTypeImpulsive);
    IVAManeuverImpulsive *pIVAManeuverImpulsive1 = (IVAManeuverImpulsive *)pIVAMCSManeuver1->Maneuver;
    IVAAttitudeControlImpulsiveThrustVector *pIVAAttitudeControlImpulsiveThrustVector1 = (IVAAttitudeControlImpulsiveThrustVector *)pIVAManeuverImpulsive1->AttitudeControl;
    pIVAAttitudeControlImpulsiveThrustVector1->SetThrustAxesName("Satellite VNC(Earth)");
    pIVAMCSManeuver1->EnableControlParameter(eVAControlManeuverImpulsiveCartesianX);
    pIVAMCSManeuver1->EnableControlParameter(eVAControlManeuverImpulsiveCartesianZ);
    pIVAMCSManeuver1->Results->Add("Eccentricity");
    pIVAMCSManeuver1->Results->Add("Cosine_of_Vertical_FPA");
    //
    // 第二个瞄准段添加属性页
    //
    IVAProfileDifferentialCorrector1 *pIVAProfileDifferentialCorrector11 =
        (IVAProfileDifferentialCorrector1 *)pIVAMCSTargetSequence1->GetProfiles()->Add("Differential Corrector");
    //
    // 属性页中控制变量属性设置
    //
    IVADCControl *pIVADCControl1 = pIVAProfileDifferentialCorrector11->ControlParameters->Item(0);
    pIVADCControl1->SetEnable(true);
    pIVADCControl1->SetMaxStep(300);
    pIVADCControl1->SetCorrection(-1581.97670664023);
    pIVADCControl1->SetPerturbation(0.1);
    pIVADCControl1->SetScalingValue(1);
    IVADCControl *pIVADCControl2 = pIVAProfileDifferentialCorrector11->ControlParameters->Item(1);
    pIVADCControl2->SetEnable(true);
    pIVADCControl2->SetMaxStep(300);
    pIVADCControl2->SetCorrection(-2771.82057041661);
    pIVADCControl2->SetPerturbation(0.1);
    pIVADCControl2->SetScalingValue(1);
    //
    // 属性页中约束条件属性设置
    //
    IVADCResult *pIVADCResult1 = pIVAProfileDifferentialCorrector11->GetResults()->Item(0);
    pIVADCResult1->SetEnable(true);
    pIVADCResult1->SetDesiredValue(0);
    pIVADCResult1->SetScalingValue(1);
    pIVADCResult1->SetTolerance(0.1);
    pIVADCResult1->SetWeight(1);
    IVADCResult *pIVADCResult2 = pIVAProfileDifferentialCorrector11->GetResults()->Item(1);
    pIVADCResult2->SetEnable(true);
    pIVADCResult2->SetDesiredValue(0);
    pIVADCResult2->SetScalingValue(1);
    pIVADCResult2->SetTolerance(0.1);
    pIVADCResult2->SetWeight(1);
    //
    // 第三个预报段属性设置
    //
    IVAStoppingConditionElement *pIVAStoppingConditionElement2 =
        pIVAMCSPropagate2->StoppingConditions->Add("Duration");
    IVAStoppingCondition *pIVAStoppingCondition2 = (IVAStoppingCondition *)pIVAStoppingConditionElement2->Properties;
    pIVAStoppingCondition2->SetTrip(86400);
    pIVAStoppingCondition2->SetTolerance(0.0001);
    //
    // 机动规划运行
    //
    pIVADriverMCS->RunMCS();
    pIVADriverMCS->ApplyAllProfileChanges();
    //
    // 生成数据到文件
    //
    std::string strReportFilePath = pRoot->OutputDataReport(pISatellite, " J2000位置速度", "5 Nov 2022 00:00:00.000", "6 Nov 2022 00:00:00.000");
    cout << "报告文件位置： " << strReportFilePath << endl;
    pRoot->m_Animation->OutputData();
    pRoot->m_Animation->OutputPropCortsData(pISatellite);
    //
    // 想定保存及关闭
    //
    pRoot->SaveScenario();
    pRoot->CloseScenario();
    delete pRoot;
    pRoot = nullptr;
    system("Pause");
}