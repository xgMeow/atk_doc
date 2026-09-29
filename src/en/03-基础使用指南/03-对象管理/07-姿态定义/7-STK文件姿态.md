# STK Attitude

## Definition

Reads time-series attitude data from an STK attitude file.

## Introduction

The attitude is provided by an external `.a` file, which records time, quaternions, and other data. The attitude is computed by interpolating over time.

## Tutorial

### Selecting the Attitude Operation

![Attitude](../../../../zh/03-基础使用指南/03-对象管理/07-姿态定义/media/1-固定姿态/STK姿态.png)

Open the satellite's **Properties**, select **Attitude**, and choose the **Attitude Type**.

### Configuring Parameters

**AttitudeFile**: Click **...** to open the folder and select an STK file.