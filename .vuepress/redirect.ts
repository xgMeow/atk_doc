export default {
    // 给ATK界面用的重定向网页，需要给ATK提供`/topics/`后面的关键词，界面点击`帮助`即可跳转到相应的界面
    config:{ 

        "/topics/ProfessionalTools/Access":                       "/5.专业使用指南/5.1可见性工具.html",     //在工具-可见性弹出的右下角增加“help”按钮 
        "/topics/ProfessionalTools/Coverage":                     "/5.专业使用指南/5.2覆盖工具.html",       //在工具-覆盖性弹出的右下角增加“help”按钮 
        "/topics/ProfessionalTools/BatchedCoordTransformation":   "/5.专业使用指南/5.4批量坐标转换工具.html",   //在工具-批量坐标转换弹出的右下角增加“help”按钮 
        "/topics/ProfessionalTools/CAT":                          "/5.专业使用指南/5.5接近分析工具.html",       //在工具-接近分析弹出的右下角增加“help”按钮 
        "/topics/ProfessionalTools/CamSafetyAnalysis":            "/5.专业使用指南/5.6碰撞规避工具.html",           //在工具-碰撞规避弹出的右下角增加“help”按钮 
        "/topics/ProfessionalTools/ConstellationAnalysis":        "/5.专业使用指南/5.7星座设计工具.html",           //在工具-星座设计弹出的右下角增加“help”按钮 
        "/topics/ProfessionalTools/RegionCoverage":               "/5.专业使用指南/5.9区域覆盖模块.html",      //在工具-区域覆盖弹出的右下角增加“help”按钮 
        "/topics/ProfessionalTools/CUiConstellationDesign":       "/5.专业使用指南/5.11高级星座设计功能模块.html",   //在工具-高级星座设计弹出的右下角增加“help”按钮 
        "/topics/ProfessionalTools/Maneuer":                      "/5.专业使用指南/5.14机动分析功能模块.html",   //在工具-机动分析弹出的右下角增加“help”按钮 
        "/topics/ProfessionalTools/ReentryRecovery":              "/5.专业使用指南/5.15再入回收模块.html",   //在工具-再入回收弹出的右下角增加“help”按钮 
        "/topics/ProfessionalTools/LifeTime":                     "/5.专业使用指南/5.16寿命预报模块.html",   //在工具-寿命预报弹出的右下角增加“help”按钮 
        "/topics/ProfessionalTools/VectorGeometryTool":           "/5.专业使用指南/5.17矢量几何工具.html",   //在工具-矢量几何工具弹出的右下角增加“help”按钮 

        "/topics/Objects/Satellite":                          "/4.基础使用指南/4.2创建对象.html#卫星的属性设置",     //卫星-属性；右下角的“help”按钮 
        "/topics/Objects/Satellite/Orbit":                    "/4.基础使用指南/4.2创建对象.html#轨道属性",          //卫星-属性-点击轨道后；右下角的“help”按钮 
        "/topics/Objects/Satellite/Attitude":                 "/4.基础使用指南/4.2创建对象.html#姿态属性",          //卫星-属性-点击姿态后；右下角的“help”按钮 
        "/topics/Objects/Satellite/Mass":                     "/4.基础使用指南/4.2创建对象.html#质量属性",          //卫星-属性-点击质量后；右下角的“help”按钮 
        "/topics/Objects/Satellite/PassBreak":                "/4.基础使用指南/4.2创建对象.html#轨道圈数属性",       //卫星-属性-点击轨道圈数后；右下角的“help”按钮 
        "/topics/Objects/Satellite/2DGraphics":               "/4.基础使用指南/4.2创建对象.html#二维视图",          //卫星-属性-点击二维视图及其下属后；右下角的“help”按钮 
        "/topics/Objects/Satellite/3DGraphics":               "/4.基础使用指南/4.2创建对象.html#三维视图",          //卫星-属性-点击三维视图及其下属后；右下角的“help”按钮 
        "/topics/Objects/Satellite/Constraints":              "/4.基础使用指南/4.2创建对象.html#约束",             //卫星-属性-点击约束后；右下角的“help”按钮 
        "/topics/Objects/Satellite/OrbitPlanning":            "/3.案例教程/3.4轨道机动规划工具案例/3.4.1霍曼转移.html",     //卫星属性-轨道-轨道预报器：机动规划；右下角的“help”按钮 
        "/topics/Objects/Satellite/OrbitPlanningRPO":         "/3.案例教程/3.12RPO案例.html",                    //卫星属性-轨道-轨道预报器-机动规划-选中RPO后；右下角的“help”按钮 
        "/topics/Objects/Satellite/AstroUq":                  "/3.案例教程/3.13偏差分析案例.html",                 //卫星属性-轨道-轨道预报器-偏差分析；右下角的“help”按钮
        "/topics/Objects/Facility":                           "/4.基础使用指南/4.2创建对象.html#地面站的属性设置",      //地面站-属性；右下角的“help”按钮 
        "/topics/Objects/Sensor":                             "/4.基础使用指南/4.2创建对象.html#敏感器的属性设置",      //敏感器-属性；右下角的“help”按钮 
        "/topics/Objects/Receiver":                             "/4.基础使用指南/4.2创建对象.html#接收器的属性设置",      //接收器-属性；右下角的“help”按钮 
        "/topics/Objects/Transmitter":                             "/4.基础使用指南/4.2创建对象.html#发射器的属性设置",      //发射器-属性；右下角的“help”按钮 
        "/topics/Objects/SatelliteCollection":                "/3.案例教程/3.9巨型星座设计案例.html",             //卫星集群-属性：右下角的“help”按钮 
        "/topics/Objects/CoverageDefinition":                 "/3.案例教程/3.11区域覆盖案例.html#创建任务场景与对象",     //覆盖定义-属性：右下角的“help”按钮 

        "/topics/Scenario/CoverageDefinition":                 "/4.基础使用指南/4.1创建场景.html#设置场景属性",     //场景-属性：右下角的“help”按钮

        "/topics/senario/create":       "/4.基础使用指南/4.1创建场景.html#xxx",     // 
        "/topics/senario/xxx":          "/4.基础使用指南/4.1创建场景.html#xxxx",     // 
    }
}