# Java Installation and Environment Setup

JDK (Java Development Kit); official download address: https://www.oracle.com/java/technologies/download

This chapter takes version 1.8.0_301, installer jdk-8u301-windows-x64.exe, as an example and installs it with the default process

Double-click to install; the default installation path is `C:\Program Files\Java\jdk1.8.0_301`.

## Configure the Java Path in the System Environment Variables

JAVA_HOME reference setting path: `C:\Program Files\Java\jdk1.8.0_301`

Add path to Path: `%JAVA_HOME%\bin`

Add path to Path: `%JAVA_HOME%\jre\bin`

Add path to CLASSPATH: `.;%JAVA_HOME%\lib;%JAVA_HOME%\lib\tools.jar;`

Note that the paths added to Path should preferably be moved up to the first line; otherwise they may be affected by the Java environment of other software on the computer.

## System Environment Variable Setup Process (Using JAVA_HOME as an Example)

1. Right-click This PC, then click Properties in the pop-up box.

![Opening computer properties](../../../../zh/二次开发教程/4-二次开发COMPONENT模式/3-Java操作流程/media/1-Java安装与环境配置/image.png)

2. Click Advanced system settings under the Control Panel box, then click Environment Variables under the Advanced tab of the System Properties box.

![Opening system environment variables](../../../../zh/二次开发教程/4-二次开发COMPONENT模式/3-Java操作流程/media/1-Java安装与环境配置/image-1.png)

3. In System variables of the Environment Variables box that appears, click New (click Edit if it already exists), enter the variable name JAVA_HOME and the Java path, and finally click OK.

![Creating a new system environment variable](../../../../zh/二次开发教程/4-二次开发COMPONENT模式/3-Java操作流程/media/1-Java安装与环境配置/image-2.png)

4. After creating the `JAVA_HOME` variable, click OK at the bottom of the Environment Variables box, and then OK at the bottom of the System Properties box. The new environment variable `JAVA_HOME` is now saved successfully

![Saving system environment variables](../../../../zh/二次开发教程/4-二次开发COMPONENT模式/3-Java操作流程/media/1-Java安装与环境配置/image-3.png)



