# ATKS 语法高亮与重定向补丁说明

## 概述

项目对 `@vuepress/plugin-redirect` 和 `prismjs` 两个 npm 包进行了源码修改，以实现：
- ATKS 语言的语法高亮支持
- 多层级目录下的正确重定向路径处理

## 为什么使用 patch-package

直接修改 `node_modules` 存在以下问题：
- `npm install` 后修改会丢失
- 团队成员无法自动同步
- 部署环境无法复现更改

`patch-package` 通过生成补丁文件并在安装依赖后自动应用，解决了上述问题。

## 修改详情

### 1. @vuepress/plugin-redirect 修改

**文件路径**
```
node_modules/@vuepress/plugin-redirect/lib/node/generate/generateRedirectFiles.js
```

**修改目的**
将绝对路径的重定向目标转换为相对路径，确保多层级目录结构下重定向正常工作。

**完整代码**

```js
import { entries, isLinkAbsolute, isLinkHttp, removeEndingSlash, removeLeadingSlash } from '@vuepress/helper';
import { fs, path } from 'vuepress/utils';
import { logger } from '../logger.js';
import { getRedirectHTML } from './getRedirectHTML.js';

function url_relative(from, absurl) {
  let relurl = path.relative(from, absurl);
  if (absurl.endsWith("\\") || absurl.endsWith("/")) {
    relurl = path.join(relurl, "index.html");
  }
  relurl = relurl.replace(/\\/g, "/");
  return relurl;
}

export const generateRedirectFiles = async ({ dir, options }, config, hostname = '') => {
  const resolvedHostname = hostname
    ? removeEndingSlash(isLinkHttp(hostname) ? hostname : `https://${hostname}`)
    : '';
  const { succeed } = logger.load('Generating redirect files');
  
  await Promise.all(entries(config).map(async ([from, to]) => {
    const filePath = dir.dest(removeLeadingSlash(from.replace(/(?:\.(?:md|html))?$/, '.html')));
    if (!fs.existsSync(filePath)) {
      to = url_relative(path.dirname(from), to);  // 新增：转换为相对路径
      const redirectUrl = isLinkAbsolute(to)
        ? `${resolvedHostname}${options.base}${removeLeadingSlash(to)}`
        : to;
      await fs.ensureDir(path.dirname(filePath));
      await fs.writeFile(filePath, getRedirectHTML(redirectUrl));
    }
  }));
  succeed();
};
```

**关键改动**
- 新增 `url_relative` 函数
- 在生成重定向文件前调用该函数转换路径

### 2. prismjs 修改 - 新增 ATKS 语言支持

**文件 1：创建语法定义文件**
```
node_modules/prismjs/components/prism-atks.js
```

**文件内容**

```js
Prism.languages.atks = {
  'comment': [
    /%\{[\s\S]*?\}%/,  // 多行注释 %{ ... }%
    /%.+/              // 单行注释 %
  ],
  'string': {
    pattern: /\B'(?:''|[^'\r\n])*'/,
    greedy: true
  },
  'number': /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[eE][+-]?\d+)?(?:[ij])?|\b[ij]\b/,
  'keyword': /\b(?:NaN|break|case|catch|continue|else|elseif|end|for|function|if|inf|otherwise|parfor|pause|pi|return|switch|try|while)\b/,
  'function': /\b(?!\d)\w+(?=\s*\()/,
  'operator': /\.?[*^\/\\']|[+\-:@]|[<>=~]=?|&&?|\|\|?/,
  'punctuation': /\.{3}|[.,;\[\](){}!]/
};
```

**文件 2：注册语言**
```
node_modules/prismjs/components.js
```

**在 `languages` 对象中添加：**

```js
"atks": {
  "title": "ATKS",
  "owner": "atk-smsat"
},
```

## patch-package 使用指南

### 初次设置

**1. 安装 patch-package**

```bash
npm install -D patch-package
# 或
yarn add -D patch-package
```

**2. 修改 node_modules 中的源文件**

按上述修改内容编辑对应文件。

**3. 生成补丁文件**

```bash
npx patch-package @vuepress/plugin-redirect
npx patch-package prismjs
```

执行后会在 `patches/` 目录生成 `.patch` 文件。

**4. 配置自动应用**

在 `package.json` 中添加：

```json
{
  "scripts": {
    "postinstall": "patch-package"
  }
}
```

**5. 提交补丁到仓库**

```bash
git add patches/
git commit -m "Add patches for vuepress-redirect and prismjs"
```

### 更新现有补丁

当需要修改已有补丁时：

**1. 删除旧补丁文件**

```bash
# 删除指定包的补丁
rm patches/@vuepress+plugin-redirect*.patch
rm patches/prismjs*.patch

# 或删除所有补丁
rm patches/*.patch
```

**2. 直接在 node_modules 中修改源文件**

**3. 重新生成补丁**

```bash
npx patch-package @vuepress/plugin-redirect
npx patch-package prismjs
```

### 验证补丁

修改补丁后，建议完整测试：

```bash
# 删除依赖
rm -rf node_modules

# 清理缓存（可选）
npm cache clean --force

# 重新安装（postinstall 会自动应用补丁）
npm install
```

安装后检查修改是否生效。

## 注意事项

| 事项                      | 说明                                    |
| ------------------------- | --------------------------------------- |
| 禁止直接提交 node_modules | 这些修改不会自动同步给团队成员          |
| 必须提交 patches 目录     | 补丁文件是团队共享的修改记录            |
| 升级依赖需谨慎            | 新版包可能与旧补丁不兼容                |
| 补丁与版本绑定            | 升级包后需删除旧补丁并重新生成          |
| postinstall 失败时        | 可手动执行 `npx patch-package` 应用补丁 |