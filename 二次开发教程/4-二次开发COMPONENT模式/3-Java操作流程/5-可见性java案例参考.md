# 可见性java案例参考

## Java案例源码

```java
//AccessTest.java
package com.atk.test;

import com.atk.component.*;

public class AccessTest{
  static {
    try {
      //加载ATKComponent模式动态库与依赖库
	  System.loadLibrary("./ATKComponentJava");
    } catch (UnsatisfiedLinkError e) {
      System.err.println("load dll failed\n" + e);
      System.exit(1);
    }
  }
  
  public static void main(String []argv) {  
	//新建根结点
	IAtkObjectRoot pIAtkObjectRoot = new IAtkObjectRoot();
	
	//场景新建与属性设置
	IScenario pIScenario = (IScenario)pIAtkObjectRoot.GetChildren().New(EATKObjectType.eScenario,"ScenarioJava");
	pIScenario.SetTimePeriod("25 Dec 2025 09:00:00.000	", "31 Dec 2025 00:00:00.000");

	//新建卫星与地面站
	ISatellite pISatellite = (ISatellite)pIScenario.GetChildren().New(EATKObjectType.eSatellite, "Satellite");
	IFacility pIFacility = (IFacility)pIScenario.GetChildren().New(EATKObjectType.eFacility, "Facility");
	//仿真运行，计算卫星轨道数据
	pIAtkObjectRoot.GetAnimation().Reset();
	
	//设置可见性对象
	IAtkAccess pIAtkAccess = pISatellite.GetAccessToObject(pIFacility);
	//设置可见性计算时间
	pIAtkAccess.SetAccessTimePeriod("25 Dec 2025 09:00:00.000	", "31 Dec 2025 00:00:00.000");
	//设置步长
	pIAtkAccess.SetTimeStep(60);
	//设置是否使用光延迟
	pIAtkAccess.SetUseLTD(true); 
	//可见性计算
	pIAtkAccess.ComputeAccess();
	//打印可见性计算结果
	vector_vector_string  vvs = pIAtkAccess.ComputedAccessIntervalTimes();
	System.out.println(vvs);
	
	//仿真运行
	pIAtkObjectRoot.GetAnimation().PlayForward();
	//保存场景
	pIAtkObjectRoot.SaveScenario();
	//关闭场景
	pIAtkObjectRoot.CloseScenario();
  }
}
```

## Java案例执行命令

1. 切换磁盘：E:
2. 切换路径：cd E:\cssx\ATK-4.0-rc.1
3. 编译命令：javac -cp ATKComponentJava.jar -encoding utf-8 com/atk/test/AccessTest.java
4. 执行命令：java -cp .;ATKComponentJava.jar com/atk/test/AccessTest