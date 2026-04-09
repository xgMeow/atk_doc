# `postinstall` 脚本的作用

`postinstall` 是 npm/yarn 的**生命周期钩子**（lifecycle hook），会在 `npm install` 或 `yarn install` 命令执行完成后**自动运行**。

### 具体工作流程

当团队成员或部署服务器执行以下命令时：

```bash
npm install
# 或
yarn install
```

执行顺序是：

1. 下载并安装 `package.json` 中声明的所有依赖到 `node_modules`
2. **自动执行** `postinstall` 脚本中定义的命令
3. 安装完成

### 在这个项目中的作用

```json
{
  "scripts": {
    "postinstall": "patch-package"
  }
}
```

意思是：每次安装完依赖后，自动运行 `patch-package` 命令。

`patch-package` 会做这些事情：

1. 读取 `patches/` 文件夹中的 `.patch` 补丁文件
2. 将补丁内容应用到 `node_modules` 中对应的文件上
3. 恢复你对 `@vuepress/plugin-redirect` 和 `prismjs` 所做的修改

### 为什么需要这个

如果没有 `postinstall` 脚本：

```bash
npm install          # 安装依赖，node_modules 是原始版本
# 需要手动运行
npx patch-package    # 忘记这步的话，修改就不存在
```

有了 `postinstall` 脚本后：

```bash
npm install          # 安装依赖 + 自动应用补丁
```

### 实际案例

假设新成员克隆项目后：

```bash
git clone xxx
npm install
```

此时：
- `node_modules` 中都是原始的包文件（没有你的修改）
- 但 `postinstall` 自动触发了 `patch-package`
- `patch-package` 读取 `patches/` 并修改了相关文件
- 最终效果等同于你手动修改了 `node_modules`

### 其他常见的生命周期钩子

| 钩子          | 触发时机               |
| ------------- | ---------------------- |
| `preinstall`  | `npm install` 执行前   |
| `postinstall` | `npm install` 执行后   |
| `prestart`    | `npm start` 执行前     |
| `poststart`   | `npm start` 执行后     |
| `pretest`     | `npm test` 执行前      |
| `prebuild`    | `npm run build` 执行前 |
