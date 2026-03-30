export default {
    // 给ATK界面用的重定向网页，需要给ATK提供`/topics/`后面的关键词，界面点击`帮助`即可跳转到相应的界面
    config:{ 
        // 高级工具（路径尽可能短一点，将ProfessionalTools改为Tool，下面这些不动了，也别添加新的了）
        "/topics/ProfessionalTools/Access":                       "/5.专业使用指南/1-可见性工具.html",     //在工具-可见性弹出的右下角增加“help”按钮 
        "/topics/ProfessionalTools/Coverage":                     "/5.专业使用指南/2-覆盖工具.html",       //在工具-覆盖性弹出的右下角增加“help”按钮 
        "/topics/ProfessionalTools/BatchedCoordTransformation":   "/5.专业使用指南/4-批量坐标转换工具.html",   //在工具-批量坐标转换弹出的右下角增加“help”按钮 
        "/topics/ProfessionalTools/CAT":                          "/5.专业使用指南/5-接近分析工具.html",       //在工具-接近分析弹出的右下角增加“help”按钮 
        "/topics/ProfessionalTools/CamSafetyAnalysis":            "/5.专业使用指南/6-碰撞规避工具.html",           //在工具-碰撞规避弹出的右下角增加“help”按钮 
        "/topics/ProfessionalTools/ConstellationAnalysis":        "/5.专业使用指南/7-星座设计工具.html",           //在工具-星座设计弹出的右下角增加“help”按钮 
        "/topics/ProfessionalTools/RegionCoverage":               "/5.专业使用指南/9-区域覆盖模块.html",      //在工具-区域覆盖弹出的右下角增加“help”按钮 
        "/topics/ProfessionalTools/CUiConstellationDesign":       "/5.专业使用指南/11-高级星座设计功能模块.html",   //在工具-高级星座设计弹出的右下角增加“help”按钮 
        "/topics/ProfessionalTools/Maneuer":                      "/5.专业使用指南/14-机动分析功能模块.html",   //在工具-机动分析弹出的右下角增加“help”按钮 
        "/topics/ProfessionalTools/ReentryRecovery":              "/5.专业使用指南/15-再入回收模块.html",   //在工具-再入回收弹出的右下角增加“help”按钮 
        "/topics/ProfessionalTools/LifeTime":                     "/5.专业使用指南/16-寿命预报模块.html",   //在工具-寿命预报弹出的右下角增加“help”按钮 
        "/topics/ProfessionalTools/VectorGeometryTool":           "/5.专业使用指南/17-矢量几何工具.html",   //在工具-矢量几何工具弹出的右下角增加“help”按钮 
        "/topics/ProfessionalTools/ScriptTool":                   "/5.专业使用指南/18-脚本工具/index.html",   
        
        // 工具
        "/topics/Tool/Access":                       "/5.专业使用指南/1-可见性工具.html",             //在工具-可见性弹出的右下角增加“help”按钮 
        "/topics/Tool/Coverage":                     "/5.专业使用指南/2-覆盖工具.html",               //在工具-覆盖性弹出的右下角增加“help”按钮 
        "/topics/Tool/BatchedCoordTransformation":   "/5.专业使用指南/4-批量坐标转换工具.html",       //在工具-批量坐标转换弹出的右下角增加“help”按钮 
        "/topics/Tool/CAT":                          "/5.专业使用指南/5-接近分析工具.html",           //在工具-接近分析弹出的右下角增加“help”按钮 
        "/topics/Tool/CamSafetyAnalysis":            "/5.专业使用指南/6-碰撞规避工具.html",           //在工具-碰撞规避弹出的右下角增加“help”按钮 
        "/topics/Tool/ConstellationAnalysis":        "/5.专业使用指南/7-星座设计工具.html",           //在工具-星座设计弹出的右下角增加“help”按钮 
        "/topics/Tool/RegionCoverage":               "/5.专业使用指南/9-区域覆盖模块.html",           //在工具-区域覆盖弹出的右下角增加“help”按钮 
        "/topics/Tool/CUiConstellationDesign":       "/5.专业使用指南/11-高级星座设计功能模块.html",   //在工具-高级星座设计弹出的右下角增加“help”按钮 
        "/topics/Tool/Maneuer":                      "/5.专业使用指南/14-机动分析功能模块.html",       //在工具-机动分析弹出的右下角增加“help”按钮 
        "/topics/Tool/ReentryRecovery":              "/5.专业使用指南/15-再入回收模块.html",           //在工具-再入回收弹出的右下角增加“help”按钮 
        "/topics/Tool/LifeTime":                     "/5.专业使用指南/16-寿命预报模块.html",           //在工具-寿命预报弹出的右下角增加“help”按钮 
        "/topics/Tool/VectorGeometryTool":           "/5.专业使用指南/17-矢量几何工具.html",           //在工具-矢量几何工具弹出的右下角增加“help”按钮 
        "/topics/Tool/ScriptTool":                   "/5.专业使用指南/18-脚本工具/index.html",     
        "/topics/Tool/LWCAT":                        "/5.专业使用指南/19-发射窗口接近分析工具.html",            //在工具-发射窗口接近分析弹出的右下角增加“help”按钮
        "/topics/Tool/AdvCAT/Main":                  "/5.专业使用指南/20-高级接近分析模块.html#主配置界面",      //在对象-高级接近分析主配置界面，右下角的“help”按钮
        "/topics/Tool/AdvCAT/Advanced":              "/5.专业使用指南/20-高级接近分析模块.html#高级界面",        //在对象-高级接近分析高级界面，右下角的“help”按钮
        "/topics/Tool/AdvCAT/Nonelinear":            "/5.专业使用指南/20-高级接近分析模块.html#非线性计算界面",  //在对象-高级接近分析非线性计算界面，右下角的“help”按钮
        "/topics/Tool/AdvCAT/Display":               "/5.专业使用指南/20-高级接近分析模块.html#显示界面",        //在对象-高级接近分析显示界面，右下角的“help”按钮
        "/topics/Tool/LaserCAT":                     "/5.专业使用指南/21-激光接近分析工具.html",                //在工具-激光接近分析弹出的右下角增加“help”按钮
        

        // 机动规划 AstroMaster
        "/topics/AstroMaster/InitialState":                  "/5.专业使用指南/3-轨道机动规划工具/2-初始段.html",
        "/topics/AstroMaster/Maneuver":                      "/5.专业使用指南/3-轨道机动规划工具/4-机动段.html",
        "/topics/AstroMaster/Propagate":                     "/5.专业使用指南/3-轨道机动规划工具/5-预报段.html",
        "/topics/AstroMaster/Follow":                        "/5.专业使用指南/3-轨道机动规划工具/6-跟随段.html",

        // ATK对象
        "/topics/Objects/Satellite/index":                    "/4.基础使用指南/2-创建对象.html#卫星的属性设置",     //卫星-属性；右下角的“help”按钮 
        "/topics/Objects/Satellite/Orbit":                    "/4.基础使用指南/2-创建对象.html#轨道属性",          //卫星-属性-点击轨道后；右下角的“help”按钮 
        "/topics/Objects/Satellite/Attitude":                 "/4.基础使用指南/2-创建对象.html#姿态属性",          //卫星-属性-点击姿态后；右下角的“help”按钮 
        "/topics/Objects/Satellite/Mass":                     "/4.基础使用指南/2-创建对象.html#质量属性",          //卫星-属性-点击质量后；右下角的“help”按钮 
        "/topics/Objects/Satellite/PassBreak":                "/4.基础使用指南/2-创建对象.html#轨道圈数属性",       //卫星-属性-点击轨道圈数后；右下角的“help”按钮 
        "/topics/Objects/Satellite/2DGraphics":               "/4.基础使用指南/2-创建对象.html#二维视图",          //卫星-属性-点击二维视图及其下属后；右下角的“help”按钮 
        "/topics/Objects/Satellite/3DGraphics":               "/4.基础使用指南/2-创建对象.html#三维视图",          //卫星-属性-点击三维视图及其下属后；右下角的“help”按钮 
        "/topics/Objects/Satellite/Constraints":              "/4.基础使用指南/2-创建对象.html#约束",             //卫星-属性-点击约束后；右下角的“help”按钮 
        "/topics/Objects/Satellite/OrbitPlanning":            "/3.案例教程/3.4轨道机动规划工具案例/3.4.1霍曼转移.html",     //卫星属性-轨道-轨道预报器：机动规划；右下角的“help”按钮 
        "/topics/Objects/Satellite/OrbitPlanningRPO":         "/3.案例教程/12-RPO案例.html",                    //卫星属性-轨道-轨道预报器-机动规划-选中RPO后；右下角的“help”按钮 
        "/topics/Objects/Satellite/AstroUq":                  "/3.案例教程/13-偏差分析案例.html",                 //卫星属性-轨道-轨道预报器-偏差分析；右下角的“help”按钮
        "/topics/Objects/Facility":                           "/4.基础使用指南/2-创建对象.html#地面站的属性设置",      //地面站-属性；右下角的“help”按钮 
        "/topics/Objects/Sensor":                             "/4.基础使用指南/2-创建对象.html#传感器的属性设置",      //传感器-属性；右下角的“help”按钮 
        "/topics/Objects/Receiver":                             "/4.基础使用指南/2-创建对象.html#接收器的属性设置",      //接收器-属性；右下角的“help”按钮 
        "/topics/Objects/Transmitter":                             "/4.基础使用指南/2-创建对象.html#发射器的属性设置",      //发射器-属性；右下角的“help”按钮 
        "/topics/Objects/SatelliteCollection":                "/3.案例教程/9-巨型星座设计案例.html",             //卫星集群-属性：右下角的“help”按钮 
        "/topics/Objects/CoverageDefinition":                 "/3.案例教程/11-区域覆盖案例.html#创建任务场景与对象",     //覆盖定义-属性：右下角的“help”按钮 

        "/topics/Scenario/CoverageDefinition":                 "/4.基础使用指南/1-创建场景.html#设置场景属性",     //场景-属性：右下角的“help”按钮

        "/topics/Intergrating/Client":                          "/二次开发教程/4-ATK客户端.md",

        "/topics/Release/ChangeLog":                            "/发布说明/最新版发布说明.md",
        
        "/topics/senario/create":       "/4.基础使用指南/1-创建场景.html#xxx",     // 
        "/topics/senario/xxx":          "/4.基础使用指南/1-创建场景.html#xxxx",     // 

        "/topics/Attitude/AttitudeFixedInAxes":                 "/4.基础使用指南/基础模型/2-姿态定义/1-固定姿态.md",
        "/topics/Attitude/AttitudeFixedInCBF":                  "/4.基础使用指南/基础模型/2-姿态定义/2-固定于天体固定系姿态.md",
        "/topics/Attitude/AttitudeFixedInCBI":                  "/4.基础使用指南/基础模型/2-姿态定义/3-固定于天体惯性系姿态.md",
        "/topics/Attitude/AttitudeAlignedConstrained":          "/4.基础使用指南/基础模型/2-姿态定义/4-对齐约束姿态.md",
        "/topics/Attitude/AttitudeMutilSegment":                "/4.基础使用指南/基础模型/2-姿态定义/5-多分段姿态.md",
        "/topics/Attitude/AttitudeRealTime":                    "/4.基础使用指南/基础模型/2-姿态定义/6-实时姿态.md",
        "/topics/Attitude/AttitudeSTKAttitude":                 "/4.基础使用指南/基础模型/2-姿态定义/7-STK文件姿态.md",
        "/topics/Attitude/AttitudeSpinning":                    "/4.基础使用指南/基础模型/2-姿态定义/9-旋转姿态.md",
        "/topics/Attitude/AttitudeTargetPointing":              "/4.基础使用指南/基础模型/2-姿态定义/10-目标指向姿态.md",
        "/topics/Attitude/AttitudeVVLHCBI":                     "/4.基础使用指南/基础模型/2-姿态定义/12-惯性系VVLH姿态.md",
        "/topics/Attitude/AttitudeVVLHCBF":                     "/4.基础使用指南/基础模型/2-姿态定义/13-固连系VVLH姿态.md",
        "/topics/Attitude/AttitudeEcfAligndVel":                "/4.基础使用指南/基础模型/2-姿态定义/15-ECF对速度定向.md",
        "/topics/Attitude/AttitudeEciAligndVel":                "/4.基础使用指南/基础模型/2-姿态定义/16-ECI对速度定向.md"
    }
}