# Reactive

输入一个表达式，返回新的响应式表达式

:::tip
推荐使用[`reactive`关键词](./reactive关键词.md)创建响应式变量
:::


## 语法

```atks
value = 0
valueRef =& @Reactive(value)
```


## 说明

响应式表达式可以与界面控件进行绑定，例如[`InputField`](InputField.md)、[`Slider`](Slider.md)、[`Test`](Text.md)等
当响应式表达式的值改变时，这些界面控件的显示内容将同步改变
如果这些界面控件支持输入，当其输入值改变时，响应式表达式的值也会同步改变


## 示例

### 实现加法计算

```
a = 0
b = 0
a_ref =& @Reactive(a)
b_ref =& @Reactive(b)


CreateDialog(
    InputField(a_ref),
    InputField(b_ref),
    Text("加法的结果是"),
    Text(str2double(a_ref) + str2double(b_ref))
)
```

![效果图](media/Reactive/image.png)
