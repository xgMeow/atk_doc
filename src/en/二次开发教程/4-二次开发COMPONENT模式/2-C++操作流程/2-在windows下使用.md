# Using on Windows


## Running the Sample Project

Go to the directory `<ATK root directory>/IntegratingWithATK/component`, and open the corresponding project configuration file according to the installed Visual Studio version

For example, if Visual Studio 2022 is installed, open the solution (.sln file) in the `vs2022` folder

After opening the solution, **the project needs to be retargeted**. In the project configuration, select the Windows SDK version installed on the computer

Once the configuration changes are complete, you can compile


## Creating a New Project from Scratch

### Create a New Project

Open VS2015, click New Project, create an empty project, and set the project name and location. Click OK when done.

![New project steps](../../../../zh/二次开发教程/4-二次开发COMPONENT模式/2-C++操作流程/media/1-新建项目/image.png)


![New project](../../../../zh/二次开发教程/4-二次开发COMPONENT模式/2-C++操作流程/media/1-新建项目/image-1.png)


### File Configuration

In the ATK installation package directory, click the IntegratingWithATK folder, then open the Component folder.

![ATK.Component include files folder](../../../../zh/二次开发教程/4-二次开发COMPONENT模式/2-C++操作流程/media/2-文件配置/image.png)

![ATK.Component dynamic library folder](../../../../zh/二次开发教程/4-二次开发COMPONENT模式/2-C++操作流程/media/2-文件配置/image-1.png)

![ATK.Component library folder](../../../../zh/二次开发教程/4-二次开发COMPONENT模式/2-C++操作流程/media/2-文件配置/image-2.png)

Add all files to the root directory of the project Test.

![Adding Lib libraries and header files](../../../../zh/二次开发教程/4-二次开发COMPONENT模式/2-C++操作流程/media/2-文件配置/image-3.png)

Add the required configuration files to this folder. (The AstroData folder is in the ATK installation directory.)

![Adding configuration files](../../../../zh/二次开发教程/4-二次开发COMPONENT模式/2-C++操作流程/media/2-文件配置/image-4.png)

### Add New Item to Project

To add a file to the project: right-click the project -> Add -> New Item.

![New file steps](../../../../zh/二次开发教程/4-二次开发COMPONENT模式/2-C++操作流程/media/3-项目新建项/image.png)

### Set the Name and Location of the Added Item

Set the file name and location, click Add, then click Build when done.

![New file](../../../../zh/二次开发教程/4-二次开发COMPONENT模式/2-C++操作流程/media/4-设置添加项的名称与位置/image.png)

### Project Environment Setup

Open the project, right-click -> Properties.

![Property setting steps](../../../../zh/二次开发教程/4-二次开发COMPONENT模式/2-C++操作流程/media/5-项目环境配置/image.png)

Change Configuration to All Configurations and Platform to All Platforms, click General -> Output Directory, and change the output directory to the project directory.

![Modifying the output directory](../../../../zh/二次开发教程/4-二次开发COMPONENT模式/2-C++操作流程/media/5-项目环境配置/image-1.png)

Click C/C++ -> General -> Additional Include Directories, and add the header file directory to Additional Include Directories. Click the Apply button to apply the environment configuration to the project, then click the OK button.

![Additional include directories settings](../../../../zh/二次开发教程/4-二次开发COMPONENT模式/2-C++操作流程/media/5-项目环境配置/image-2.png)


### Add Include Files and Write Code

![Include files](../../../../zh/二次开发教程/4-二次开发COMPONENT模式/2-C++操作流程/media/6-添加包含文件，编写代码/image.png)


![Setting up the code](../../../../zh/二次开发教程/4-二次开发COMPONENT模式/2-C++操作流程/media/6-添加包含文件，编写代码/image-1.png)

### Set the Build Platform to X64

In the menu bar, select Build -> Configuration Manager, select the X64 platform, and click the Close button.

![Configuration Manager](../../../../zh/二次开发教程/4-二次开发COMPONENT模式/2-C++操作流程/media/7-设置编译平台为X64/image.png)


![Selecting the build platform](../../../../zh/二次开发教程/4-二次开发COMPONENT模式/2-C++操作流程/media/7-设置编译平台为X64/image-1.png)

In the menu bar, select Build -> Build Solution to compile.

![Build Solution](../../../../zh/二次开发教程/4-二次开发COMPONENT模式/2-C++操作流程/media/7-设置编译平台为X64/image-2.png)

Click the Local Windows Debugger button to run the project.



### View the Generated Files

The generated files are in the Output directory under the project directory.

![Generated files](../../../../zh/二次开发教程/4-二次开发COMPONENT模式/2-C++操作流程/media/8-查看生成文件/image.png)

### Simulation Trajectory

Open the generated file with ATK to view the simulation trajectory.

![Simulation trajectory](../../../../zh/二次开发教程/4-二次开发COMPONENT模式/2-C++操作流程/media/9-仿真轨迹/image_zy.png)

