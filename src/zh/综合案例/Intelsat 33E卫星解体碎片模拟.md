---
description: 基于 ATK 二次开发 Connect 模块，使用 NASA 标准解体模型对 Intelsat 33E 卫星解体碎片进行轨道演化仿真分析。
thumbnail: /zh/综合案例/media/Intelsat33E卫星解体碎片模拟/image05-插入碎片后的ATK界面.png
---

# Intelsat 33E卫星解体碎片模拟

## 内容简介

2024 年 10 月 19 日 04:30 分（UTC）许，国际通信卫星公司报告称美国波音公司为其制造的 Intelsat 33E（IS-33e）高轨卫星在轨运行时发生[异常断电](https://www.aiaa.org/news/news/2024/10/22/intelsat-s-is-33e-satellite-a-total-loss-after-breaking-up-in-orbit)。不久后，美国太空军通过观测手段确认该事故为一起解体事件。四天后，俄罗斯国家航天中心发布消息称已追踪到事故相关的 80 多个碎片，并进一步将该解体事件定性为爆炸解体。截至 10 月 28 日，美国商业空间态势感知公司 ExoAnalytic Solutions 已经确定了约 500 块与事故相关的解体碎片。此次事故影响了覆盖欧洲、非洲、亚洲以及澳大利亚地区的通讯服务，同时对 GEO 轨道带上的其他卫星构成了持续的碰撞威胁。

![Intelsat33E卫星爆炸解体模拟图](./media/Intelsat33E卫星解体碎片模拟/image01-Intelsat33E卫星爆炸解体模拟图.png)

本文以此次 Intelsat 33E 解体事件为背景，基于航天器标准解体模型和 ATK 仿真平台二次开发的 Connect 模式对本次事故产生的解体碎片进行演化分析。首先利用 C++ 编写解体模型，通过离散采样的方式生成大量解体碎片，得到不同解体碎片的速度矢量。然后，利用 ATK.connect 动态库将碎片对象以自定义位置速度的方式插入 ATK 场景中，并使用内置预报器对碎片群进行为期 7 天的演化分析，得到碎片的分布特性，直观地揭示解体碎片在 GEO 区域持续分布演化。

## 解体碎片生成

使用 NASA 标准解体模型<sup>[1]</sup>生成解体碎片的速度矢量，该模型的参数依赖关系见下图。

![NASA标准解体模型的参数依赖关系](./media/Intelsat33E卫星解体碎片模拟/image03-NASA标准解体模型参数依赖关系.png)

通过离散采样的方式生成特征尺寸大于 1 毫米的解体碎片群，并将分离速度与 Intelsat 33E 的母轨道速度叠加得到解体碎片的速度矢量，将结果存储在 `is33e_result.csv` 文件中。

## 场景创建与碎片对象插入

1. **创建想定**：安装并运行 ATK.exe，显示 ATK 界面后不要进行任何操作！

2. **插入碎片对象**

   首先将 ATK Connect 通信库文件从安装包根目录（`ATKConnectJava.jar`、`ATKConnectJava.dll`、`ATKConnectorDll.dll`）拷贝至 MATLAB 工作目录，再在脚本中加载 Java 接口库并创建 `ATKConnectJavaModule` 对象，然后调用其 `atkOpen` 方法使 MATLAB 与 ATK 建立连接。

   ![ATK Connect动态库文件](./media/Intelsat33E卫星解体碎片模拟/image04-ATK-Connect动态库文件.png)

   然后，读取解体碎片位置速度参数，逐个利用 `New` 命令新建碎片对象，并利用 `SetState` 命令设置其位置速度信息。待所有碎片插入后，使用 `Save` 命令保存 ATK 场景文件，并使用 `atkClose` 方法关闭 ATK 与 MATLAB 的连接。整个流程的 MATLAB 代码如下：

   ```matlab
    % 加载 ATK Connect 模式 Java 接口库
    % 需先将安装包根目录下的 ATKConnectJava.jar、ATKConnectJava.dll、ATKConnectorDll.dll 复制到当前工作目录
    if(ispc())
        jarPath = [pwd,'\ATKConnectJava.jar'];
    elseif(isunix())
        jarPath = [pwd,'/ATKConnectJava.jar'];
    end
    if ~any(strcmp(jarPath, javaclasspath()))
        javaaddpath(jarPath);
        javaMethod('loadLibrary', 'ATKLibraryLoader');
    end
    ATKConnectJavaModule = javaObject('com.atk.connect.ATKConnectJavaModule');

    % 链接ATK接口
    conID = ATKConnectJavaModule.atkOpen('127.0.0.1', 6655);

    %新建场景同时设置仿真时间
    ATKConnectJavaModule.atkConnect(conID, 'New', '/ Scenario Intelsat33E-explosion', '');
    ATKConnectJavaModule.atkConnect(conID, 'SetAnalysisTimePeriod', '* "2024-10-19 04:30:00.000" "2024-10-26 04:30:00.000"', '');
    ATKConnectJavaModule.atkConnect(conID, 'Animate', '* Reset', '');

    % 读取数据文件
    filename = 'is33e_result_10cm.csv';
    data = importdata(filename);
    data = data.textdata;
    vdata = data(2:end,9); rdata = data(2:end,10);
    % vdata = data(2:300,9); rdata = data(2:300,10);

    for ic = 1:1:size(vdata,1)
        r  = char(rdata(ic,:)); r = r(2:end-1);
        v  = char(vdata(ic,:)); v = v(2:end-1);
        rv = [r,' ',v];
        name = ['DB',num2str(ic)];

        % 新建卫星对象
        ATKConnectJavaModule.atkConnect(conID, 'New', ['/ Satellite ',name], '');
        % 设置位置速度信息
        cmd = ['*/Satellite/',name,' Cartesian TwoBody NoProp 60.0 J2000 "27 May 2024 00:00:00.00" ',rv]; % 
        ATKConnectJavaModule.atkConnect(conID, 'SetState',cmd(1:end-1), '');
    end

    % 重置场景信息，加载卫星数据！！！
    ATKConnectJavaModule.atkConnect(conID, 'Animate', '* Reset', '');

    % ATK保存退出
    ATKConnectJavaModule.atkConnect(conID,'Save','/ *', '');
    ATKConnectJavaModule.atkClose(conID);
   ```

插入碎片后的 ATK 界面如下图所示。为使碎片的显示更清晰，框选所有碎片对象，右键点击 <kbd>批量设置属性</kbd>，在【二维视图－显示】内，取消勾选【显示三维轨道】，单击 <kbd>批量应用当前页</kbd> 以更改设置。

![插入碎片后的ATK界面](./media/Intelsat33E卫星解体碎片模拟/image05-插入碎片后的ATK界面.png)

![ATK批量设置碎片属性](./media/Intelsat33E卫星解体碎片模拟/image06-ATK批量设置碎片属性.png)

![ATK展示解体碎片](./media/Intelsat33E卫星解体碎片模拟/image07-ATK展示解体碎片.png)

## 仿真结果及分析

使用二体预报器对所有解体碎片进行为期 7 天的预报分析。结果表明，大多数解体碎片仍将在 Intelsat 33E 原始轨道附近运行。但由于分离速度的差异，碎片将在原轨道上发生相位的扩散，并随时间的延长逐渐扩展至整个轨道范围。

由于 GEO 轨道带内目标分布较为集中，且缺乏自然清除条件，解体碎片将对 GEO 轨道带上的其它航天器造成持续的碰撞威胁，对太空环境造成极大破坏。因此，及时对解体碎片进行轨道推演和跟踪观测，并采取主动措施降低撞击风险对 GEO 轨道安全是至关重要的。

## 参考文献

[1] JOHNSON N L, KRISKO P H, LIOU J C, et al. NASA's new breakup model of evolve 4.0[J]. Advances in Space Research, 2001, 28(9): 1377-1384.
