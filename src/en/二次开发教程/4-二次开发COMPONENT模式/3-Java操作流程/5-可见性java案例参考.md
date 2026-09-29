# Visibility Java Case Reference

## Java Case Source Code

```java
//AccessTest.java
package com.atk.test;

import com.atk.component.*;

public class AccessTest{
  static {
    try {
      //Load the ATKComponent mode dynamic library and dependency libraries
	  System.loadLibrary("./ATKComponentJava");
    } catch (UnsatisfiedLinkError e) {
      System.err.println("load dll failed\n" + e);
      System.exit(1);
    }
  }
  
  public static void main(String []argv) {  
	//Create a new root object
	IAtkObjectRoot pIAtkObjectRoot = new IAtkObjectRoot();
	
	//Create a new scenario and set properties
	IScenario pIScenario = (IScenario)pIAtkObjectRoot.GetChildren().New(EATKObjectType.eScenario,"ScenarioJava");
	pIScenario.SetTimePeriod("25 Dec 2025 09:00:00.000	", "31 Dec 2025 00:00:00.000");

	//Create a new satellite and facility
	ISatellite pISatellite = (ISatellite)pIScenario.GetChildren().New(EATKObjectType.eSatellite, "Satellite");
	IFacility pIFacility = (IFacility)pIScenario.GetChildren().New(EATKObjectType.eFacility, "Facility");
	//Run the simulation to calculate the satellite orbit data
	pIAtkObjectRoot.GetAnimation().Reset();
	
	//Set the visibility object
	IAtkAccess pIAtkAccess = pISatellite.GetAccessToObject(pIFacility);
	//Set the visibility computation time
	pIAtkAccess.SetAccessTimePeriod("25 Dec 2025 09:00:00.000	", "31 Dec 2025 00:00:00.000");
	//Set the step size
	pIAtkAccess.SetTimeStep(60);
	//Set whether to use light time delay
	pIAtkAccess.SetUseLTD(true); 
	//Visibility computation
	pIAtkAccess.ComputeAccess();
	//Print the visibility computation results
	vector_vector_string  vvs = pIAtkAccess.ComputedAccessIntervalTimes();
	System.out.println(vvs);
	
	//Run the simulation
	pIAtkObjectRoot.GetAnimation().PlayForward();
	//Save the scenario
	pIAtkObjectRoot.SaveScenario();
	//Close the scenario
	pIAtkObjectRoot.CloseScenario();
  }
}
```

## Java Case Execution Commands

1. Switch disk: E:
2. Switch path: cd E:\cssx\ATK-4.0-rc.1
3. Compile command: javac -cp ATKComponentJava.jar -encoding utf-8 com/atk/test/AccessTest.java
4. Execute command: java -cp .;ATKComponentJava.jar com/atk/test/AccessTest