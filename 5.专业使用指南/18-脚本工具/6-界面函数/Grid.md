# Grid

新建二维网格容器

## 语法

```atks
Grid(
    (1, "text 1"),
    (2, Button())
)
```


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



