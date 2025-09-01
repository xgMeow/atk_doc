# reactive关键词

声明一个响应式变量


## 语法

```atks
reactive valueRef = 0
```


## 说明

响应式变量可以与界面控件进行绑定，例如[`InputField`](InputField.md)、[`Slider`](Slider.md)、[`Test`](Text.md)等
当响应式变量的值改变时，这些界面控件的显示内容将同步改变
如果这些界面控件支持输入，当其输入值改变时，响应式变量的值也会同步改变


## 示例

### 实现加法计算

```
reactive a_ref = 0
reactive b_ref = 0


CreateDialog(
    InputField(a_ref),
    InputField(b_ref),
    Text("加法的结果是"),
    Text(str2double(a_ref) + str2double(b_ref))
)
```

![效果图](media/Reactive/image.png)


