# VVLH(CBI) Attitude

## Definition

Body-pointing to central body with CBI velocity constraint.

## Introduction

- Z‑axis: points toward the object's central body.
- X‑axis: points toward the inertial velocity direction (not necessarily aligned exactly).
- Y‑axis: forms a right‑handed system with the X and Z axes.

## Usage

### Selecting the Attitude Operation

Open the satellite's **Properties**, select **Attitude**, and choose the attitude type [ ].

![Attitude](../../../../zh/03-基础使用指南/03-对象管理/07-姿态定义/media/12-惯性系VVLH姿态/image.png)

### Configuring Parameters

**Constraint Offset**: Fixed offset from the reference attitude.

![Configure Parameters](../../../../zh/03-基础使用指南/03-对象管理/07-姿态定义/media/12-惯性系VVLH姿态/image-1.png)

The example uses an offset angle of 0.

## Attitude Report

1. **Open Data Report**

Right-click **Satellite1**, select **Report**, and choose **Satellite1**.

![Data Report](../../../../zh/03-基础使用指南/03-对象管理/07-姿态定义/media/1-固定姿态/image-8.png)

2. **Create a New Report**

Click **New**, select the newly created **New Style1**, and click **Properties** to configure it.

![New Report](../../../../zh/03-基础使用指南/03-对象管理/07-姿态定义/media/1-固定姿态/image-9.png)

3. **Configure Properties**

Locate **Attitude Quaternions in Select Axes**, select qs, qx, qy, qz, and click the right arrow **→**.

![Configure Properties](../../../../zh/03-基础使用指南/03-对象管理/07-姿态定义/media/1-固定姿态/image-11.png)

4. **Generate the Report**

Select the configured data report style **New Style1** and click **Generate**.

![Generate Report](../../../../zh/03-基础使用指南/03-对象管理/07-姿态定义/media/1-固定姿态/image-12.png)

5. **Select the Reference Frame**

Using the central body inertial frame as an example, select **Satellite1**, choose **Central Body Inertial Axes**, and click **OK**.

![Select Reference Frame](../../../../zh/03-基础使用指南/03-对象管理/07-姿态定义/media/15-ECF对速度定向/image-1.png)

6. **Display the Report**

The attitude report is generated.

![Attitude Report](../../../../zh/03-基础使用指南/03-对象管理/07-姿态定义/media/12-惯性系VVLH姿态/image-4.png)

## Visualization

1. **Add a Coordinate System**

Click **Satellite1**, select **Vector**, click **Add** to add a coordinate system for Satellite1.

![Add Coordinate System](../../../../zh/03-基础使用指南/03-对象管理/07-姿态定义/media/1-固定姿态/image-14.png)

2. **Select the Coordinate System**

In the added component, select **Satellite1** as the object, choose **Body Axes**, and click **OK**.

![Select Coordinate System](../../../../zh/03-基础使用指南/03-对象管理/07-姿态定义/media/4-对齐约束姿态/image-3.png)

3. **Coordinate System Configuration**

Check **Show** and click **Apply**.

![Coordinate System Configuration](../../../../zh/03-基础使用指南/03-对象管理/07-姿态定义/media/4-对齐约束姿态/image-6.png)

4. **Add Vectors**

Select **Vector**, click **Add**.

![Add Vectors](../../../../zh/03-基础使用指南/03-对象管理/07-姿态定义/media/4-对齐约束姿态/image-8.png)

5. **Select Vectors**

Select **Satellite1**, click **Nadir(Detic)** to add it, which represents the vector from the satellite to the center of the central body.

![Select Vector](../../../../zh/03-基础使用指南/03-对象管理/07-姿态定义/media/15-ECF对速度定向/image-3.png)

Select **Satellite1**, click **Velocity** to add it.

![Select Vector](../../../../zh/03-基础使用指南/03-对象管理/07-姿态定义/media/15-ECF对速度定向/image-4.png)

6. **Vector Configuration**

Check **Show** and click **Apply** or **OK**.

![Vector Configuration](../../../../zh/03-基础使用指南/03-对象管理/07-姿态定义/media/15-ECF对速度定向/image-5.png)

7. **3D Visualization**

In the main menu, click **3D View**, select **View From/To**, choose the **Satellite1** viewpoint, and click **▶** to play the animation. The satellite's Z‑axis will point toward the central body (aligned), and the X‑axis will attempt to align with the velocity direction (constrained). The velocity vector should lie within the XZ plane.

![3D Visualization](../../../../zh/03-基础使用指南/03-对象管理/07-姿态定义/media/12-惯性系VVLH姿态/image-3.png)