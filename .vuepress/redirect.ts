export default {
    // 给ATK界面用的重定向网页，需要给ATK提供`/topics/`后面的关键词，界面点击`帮助`即可跳转到相应的界面
    config:{ 
        // 高级工具（路径尽可能短一点，将ProfessionalTools改为Tool，下面这些不动了，也别添加新的了）
        "/topics/ProfessionalTools/Access":                       "/5.专业使用指南/01-可见性工具.html",     //在工具-可见性弹出的右下角增加“help”按钮 
        "/topics/ProfessionalTools/Coverage":                     "/5.专业使用指南/02-覆盖性工具.html",       //在工具-覆盖性弹出的右下角增加“help”按钮 
        "/topics/ProfessionalTools/BatchedCoordTransformation":   "/5.专业使用指南/04-批量坐标转换工具.html",   //在工具-批量坐标转换弹出的右下角增加“help”按钮 
        "/topics/ProfessionalTools/CAT":                          "/5.专业使用指南/07-接近分析.html",       //在工具-接近分析弹出的右下角增加“help”按钮 
        "/topics/ProfessionalTools/CamSafetyAnalysis":            "/5.专业使用指南/08-碰撞规避.html",           //在工具-碰撞规避弹出的右下角增加“help”按钮 
        "/topics/ProfessionalTools/ConstellationAnalysis":        "/5.专业使用指南/05-星座设计工具.html",           //在工具-星座设计弹出的右下角增加“help”按钮 
        "/topics/ProfessionalTools/RegionCoverage":               "/5.专业使用指南/03-区域覆盖分析.html",      //在工具-区域覆盖弹出的右下角增加“help”按钮 
        "/topics/ProfessionalTools/CUiConstellationDesign":       "/5.专业使用指南/06-高级星座设计.html",   //在工具-高级星座设计弹出的右下角增加“help”按钮 
        "/topics/ProfessionalTools/Maneuer":                      "/5.专业使用指南/13-轨道机动规划工具/1-机动规划功能介绍.html",   //在工具-机动分析弹出的右下角增加“help”按钮 
        "/topics/ProfessionalTools/ReentryRecovery":              "/5.专业使用指南/09-再入回收分析.html",   //在工具-再入回收弹出的右下角增加“help”按钮 
        "/topics/ProfessionalTools/LifeTime":                     "/5.专业使用指南/11-卫星工具/16-寿命预报模块.html",   //在工具-寿命预报弹出的右下角增加“help”按钮 
        "/topics/ProfessionalTools/VectorGeometryTool":           "/5.专业使用指南/10-矢量几何工具.html",   //在工具-矢量几何工具弹出的右下角增加“help”按钮 
        "/topics/ProfessionalTools/ScriptTool":                   "/5.专业使用指南/18-脚本工具/1-脚本工具.html",   
        
        // 工具
        "/topics/Tool/Access":                       "/5.专业使用指南/01-可见性工具.html",             //在工具-可见性弹出的右下角增加“help”按钮 
        "/topics/Tool/Coverage":                     "/5.专业使用指南/02-覆盖性工具.html",               //在工具-覆盖性弹出的右下角增加“help”按钮 
        "/topics/Tool/BatchedCoordTransformation":   "/5.专业使用指南/04-批量坐标转换工具.html",       //在工具-批量坐标转换弹出的右下角增加“help”按钮 
        "/topics/Tool/CAT":                          "/5.专业使用指南/07-接近分析.html",           //在工具-接近分析弹出的右下角增加“help”按钮 
        "/topics/Tool/CamSafetyAnalysis":            "/5.专业使用指南/08-碰撞规避.html",           //在工具-碰撞规避弹出的右下角增加“help”按钮 
        "/topics/Tool/ConstellationAnalysis":        "/5.专业使用指南/05-星座设计工具.html",           //在工具-星座设计弹出的右下角增加“help”按钮 
        "/topics/Tool/RegionCoverage":               "/5.专业使用指南/03-区域覆盖分析.html",           //在工具-区域覆盖弹出的右下角增加“help”按钮 
        "/topics/Tool/CUiConstellationDesign":       "/5.专业使用指南/06-高级星座设计.html",   //在工具-高级星座设计弹出的右下角增加“help”按钮 
        "/topics/Tool/Maneuer":                      "/5.专业使用指南/13-轨道机动规划工具/1-机动规划功能介绍.html",       //在工具-机动分析弹出的右下角增加“help”按钮 
        "/topics/Tool/ReentryRecovery":              "/5.专业使用指南/09-再入回收分析.html",           //在工具-再入回收弹出的右下角增加“help”按钮 
        "/topics/Tool/LifeTime":                     "/5.专业使用指南/11-卫星工具/16-寿命预报模块.html",           //在工具-寿命预报弹出的右下角增加“help”按钮 
        "/topics/Tool/VectorGeometryTool":           "/5.专业使用指南/10-矢量几何工具.html",           //在工具-矢量几何工具弹出的右下角增加“help”按钮 
        "/topics/Tool/ScriptTool":                   "/5.专业使用指南/18-脚本工具/1-脚本工具.html",     
        "/topics/Tool/LWCAT":                        "/5.专业使用指南/19-发射窗口接近分析工具.html",            //在工具-发射窗口接近分析弹出的右下角增加“help”按钮
        "/topics/Tool/AdvCAT/Main":                  "/5.专业使用指南/20-高级接近分析模块.html#主配置界面",      //在对象-高级接近分析主配置界面，右下角的“help”按钮
        "/topics/Tool/AdvCAT/Advanced":              "/5.专业使用指南/20-高级接近分析模块.html#高级界面",        //在对象-高级接近分析高级界面，右下角的“help”按钮
        "/topics/Tool/AdvCAT/Nonelinear":            "/5.专业使用指南/20-高级接近分析模块.html#非线性计算界面",  //在对象-高级接近分析非线性计算界面，右下角的“help”按钮
        "/topics/Tool/AdvCAT/Display":               "/5.专业使用指南/20-高级接近分析模块.html#显示界面",        //在对象-高级接近分析显示界面，右下角的“help”按钮
        "/topics/Tool/LaserCAT":                     "/5.专业使用指南/21-激光接近分析工具.html",                //在工具-激光接近分析弹出的右下角增加“help”按钮
        

        // 机动规划 AstroMaster
        "/topics/AstroMaster/InitialState":                  "/5.专业使用指南/13-轨道机动规划工具/2-初始段.html",
        "/topics/AstroMaster/Maneuver":                      "/5.专业使用指南/13-轨道机动规划工具/4-机动段.html",
        "/topics/AstroMaster/Propagate":                     "/5.专业使用指南/13-轨道机动规划工具/5-预报段.html",
        "/topics/AstroMaster/Follow":                        "/5.专业使用指南/13-轨道机动规划工具/6-跟随段.html",

        // ATK对象
        "/topics/Objects/Satellite/index":                    "/03-基础使用指南/03-对象管理/02-属性配置/卫星.html",     //卫星-属性；右下角的“help”按钮 
        "/topics/Objects/Satellite/Orbit":                    "/03-基础使用指南/03-对象管理/02-属性配置/卫星.html#轨道",          //卫星-属性-点击轨道后；右下角的“help”按钮 
        "/topics/Objects/Satellite/Attitude":                 "/03-基础使用指南/03-对象管理/02-属性配置/卫星.html#姿态",          //卫星-属性-点击姿态后；右下角的“help”按钮 
        "/topics/Objects/Satellite/Mass":                     "/03-基础使用指南/03-对象管理/02-属性配置/卫星.html#质量",          //卫星-属性-点击质量后；右下角的“help”按钮 
        "/topics/Objects/Satellite/PassBreak":                "/03-基础使用指南/03-对象管理/02-属性配置/卫星.html#轨道圈数",       //卫星-属性-点击轨道圈数后；右下角的“help”按钮 
        "/topics/Objects/Satellite/2DGraphics":               "/03-基础使用指南/03-对象管理/02-属性配置/卫星.html#二维视图",          //卫星-属性-点击二维视图及其下属后；右下角的“help”按钮 
        "/topics/Objects/Satellite/3DGraphics":               "/03-基础使用指南/03-对象管理/02-属性配置/卫星.html#三维视图",          //卫星-属性-点击三维视图及其下属后；右下角的“help”按钮 
        "/topics/Objects/Satellite/Constraints":              "/03-基础使用指南/03-对象管理/02-属性配置/卫星.html#约束",             //卫星-属性-点击约束后；右下角的“help”按钮 
        "/topics/Objects/Satellite/OrbitPlanning":            "/02-案例教程/3.4轨道机动规划工具案例/3.4.1霍曼转移.html",     //卫星属性-轨道-轨道预报器：机动规划；右下角的“help”按钮 
        "/topics/Objects/Satellite/OrbitPlanningRPO":         "/02-案例教程/12-RPO案例.html",                    //卫星属性-轨道-轨道预报器-机动规划-选中RPO后；右下角的“help”按钮 
        "/topics/Objects/Satellite/AstroUq":                  "/02-案例教程/13-偏差分析案例.html",                 //卫星属性-轨道-轨道预报器-偏差分析；右下角的“help”按钮
        "/topics/Objects/Facility":                           "/03-基础使用指南/03-对象管理/02-属性配置/地面站.html",      //地面站-属性；右下角的“help”按钮 
        "/topics/Objects/Sensor":                             "/03-基础使用指南/03-对象管理/02-属性配置/传感器.html",      //传感器-属性；右下角的“help”按钮 
        "/topics/Objects/Receiver":                           "/03-基础使用指南/03-对象管理/02-属性配置/接收器.html",      //接收器-属性；右下角的“help”按钮 
        "/topics/Objects/Transmitter":                        "/03-基础使用指南/03-对象管理/02-属性配置/发射器.html",      //发射器-属性；右下角的“help”按钮 
        "/topics/Objects/SatelliteCollection":                "/03-基础使用指南/03-对象管理/02-属性配置/卫星集群.html",             //卫星集群-属性：右下角的“help”按钮 
        "/topics/Objects/CoverageDefinition":                 "/03-基础使用指南/03-对象管理/02-属性配置/覆盖定义.html",     //覆盖定义-属性：右下角的“help”按钮 
        "/topics/Scenario/CoverageDefinition":                "/03-基础使用指南/02-场景管理/03-场景属性配置/",     //场景-属性：右下角的“help”按钮
        "/topics/Intergrating/Client":                        "/二次开发教程/2-二次开发CONNECT模式/1-ATK客户端.html",
        "/topics/Intergrating/Introduction":                  "/二次开发教程/1-二次开发介绍.html",
        "/topics/Release/ChangeLog":                          "/发布说明/发布说明.html",
        "/topics/Attitude/AttitudeFixedInAxes":               "/03-基础使用指南/姿态定义/1-固定姿态.html",
        "/topics/Attitude/AttitudeFixedInCBF":                "/03-基础使用指南/姿态定义/2-固定于天体固定系姿态.html",
        "/topics/Attitude/AttitudeFixedInCBI":                "/03-基础使用指南/姿态定义/3-固定于天体惯性系姿态.html",
        "/topics/Attitude/AttitudeAlignedConstrained":        "/03-基础使用指南/姿态定义/4-对齐约束姿态.html",
        "/topics/Attitude/AttitudeMutilSegment":              "/03-基础使用指南/姿态定义/5-多分段姿态.html",
        "/topics/Attitude/AttitudeRealTime":                  "/03-基础使用指南/姿态定义/6-实时姿态.html",
        "/topics/Attitude/AttitudeSTKAttitude":               "/03-基础使用指南/姿态定义/7-STK文件姿态.html",
        "/topics/Attitude/AttitudeSpinning":                  "/03-基础使用指南/姿态定义/9-旋转姿态.html",
        "/topics/Attitude/AttitudeTargetPointing":            "/03-基础使用指南/姿态定义/10-目标指向姿态.html",
        "/topics/Attitude/AttitudeVVLHCBI":                   "/03-基础使用指南/姿态定义/12-惯性系VVLH姿态.html",
        "/topics/Attitude/AttitudeVVLHCBF":                   "/03-基础使用指南/姿态定义/13-固连系VVLH姿态.html",
        "/topics/Attitude/AttitudeEcfAligndVel":              "/03-基础使用指南/姿态定义/15-ECF对速度定向.html",
        "/topics/Attitude/AttitudeEciAligndVel":              "/03-基础使用指南/姿态定义/16-ECI对速度定向.html"
    }
}