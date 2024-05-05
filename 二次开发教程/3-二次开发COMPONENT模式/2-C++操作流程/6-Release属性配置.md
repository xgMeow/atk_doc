# Release属性配置

打开项目右键->属性。

![属性设置步骤](media/6-Release属性配置/image.png)


配置平台改为 Release，x64 模式，点击常规->输出目录，将输出目录修改为项目目录。


![修改输出目录](media/6-Release属性配置/image-1.png)

点击 C/C++->常规->附加包含目录，将头文件目录添加至附加包含目录。


![附加包含目录设置](media/6-Release属性配置/image-2.png)

链接器->常规->附加库目录，将 lib 文件夹添加至附加库目录，点击确定。

![附加库设置](media/6-Release属性配置/image-3.png)

链接器->输入->附加依赖项，将 lib 库全称添加至附加依赖项，点击确定。


![附加库设置](media/6-Release属性配置/image-4.png)


