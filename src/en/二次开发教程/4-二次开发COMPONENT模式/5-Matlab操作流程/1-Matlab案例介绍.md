# Case Introduction

This case implements the maneuver planning design for the fast transfer from a low Earth parking orbit (LEO orbit) with a radius of 6700 km to a geosynchronous orbit (GEO orbit) with a radius of 42164.197 km. The case is based on Component mode and is implemented by running a .m script in the Matlab software (R2015b/R2021b/R2024b) to call the Java wrapper package.
This case depends on the following files (all included in the ATK installation package root directory):

- initATK.m, Matlab initialization script; it initializes the dependency paths, adds the java wrapper package to the calling environment, and loads the dependent dynamic libraries, as shown in the figure;

- ATKComponentJava.jar, interface class wrapper package for ATKComponent mode, providing interface wrappers for all public class objects and functions in Component mode;

- ATKComponentJava.dll, ATK Component mode Java interface dynamic library, providing Java calls in Component mode and linking to load other dependent dynamic libraries in the same directory;

- ATKComponentMatlabTest.m, Matlab case script, recommended to be created in the ATK installation package root directory. For details, refer to the code in Case Implementation below. It contains the specific implementation process of an orbit fast transfer case, and this Matlab case script is interpreted and run by the Matlab software. Note that Matlab requires the default script encoding format to be GBK; set the script encoding format first, and then edit the case code.

 

![Dependency files](../../../../zh/二次开发教程/4-二次开发COMPONENT模式/5-Matlab操作流程/media/1-Matlab案例介绍/依赖文件_zy.png)
