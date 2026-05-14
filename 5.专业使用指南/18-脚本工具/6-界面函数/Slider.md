# Slider

创建一个滑动器

## 语法

```atks
Slider()
```



## 说明

滑动器可以与[响应式变量](./reactive关键词.md)或[响应式表达式](./Reactive.md)绑定


## 示例


### 将滑动器状态与响应式变量进行绑定

```atks
reactive valueRef = 0.3

CreateDialog(
    Text(valueRef),
    Slider(valueRef)
)
```