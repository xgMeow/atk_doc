# 在linux下使用



## 运行示例项目

进入文件目录`<ATK根目录>/IntegratingWithATK/component`


在linux下，示例项目采用`xmake`进行配置，配置文件为`xmake.sh`

在命令行中进入该目录，运行以下命令即可编译：

```sh
./configure
make
```

注意需要给`./configure`赋予可执行权限：

```sh
chmod +x ./configure
```