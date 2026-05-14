# CheckBox

创建一个勾选框

## 语法

```atks
CheckBox()
```

## 说明

勾选框可以与[响应式变量](./reactive关键词.md)或[响应式表达式](./Reactive.md)绑定


## 示例


### 将勾选框状态与响应式变量进行绑定

```atks
reactive valueRef = true

CreateDialog(
    Text(valueRef),
    CheckBox(valueRef)
)
```