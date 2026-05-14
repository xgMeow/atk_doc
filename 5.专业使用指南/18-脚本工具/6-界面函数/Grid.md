# Grid

新建二维网格容器

## 语法

```atks
Grid(
    (1, "text 1"),
    (2, Button())
)
```

## 说明

传入该函数的表达式或者控件将会按网格排列


## 示例

### 创建2x2排列的按钮

```atks
Grid(
    (Button(), Button()),
    (Button(), Button())
)
```

### 创建2x2排列的文字和按钮



```atks
Grid(
    ("text 1", Button()),
    ("text 2", Button())
)
```



