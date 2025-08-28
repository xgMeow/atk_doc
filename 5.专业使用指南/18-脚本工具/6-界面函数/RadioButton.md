# RadioButton

创建一个单选框

## 语法

```atks
RadioButton()
```

## 说明

单选框可以与[响应式变量](./reactive关键词.md)或[响应式表达式](./Reactive.md)绑定


## 示例


### 将单选框状态与响应式变量进行绑定

```atks
reactive valueRef = true

CreateDialog(
    Text(valueRef),
    RadioButton(valueRef)
)
```