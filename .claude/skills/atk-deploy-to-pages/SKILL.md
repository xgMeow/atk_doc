---
name: atk-deploy-to-pages
description: 将本地 develop/master 分支强制推送到 GitHub 远程的 main 分支，部署开发版（atk_doc_dev）或正式版（atk_doc）文档站点。
---

# 部署推送

将本地分支强制推送到 GitHub 远程的 `main` 分支，用于触发 GitHub Pages 构建。支持两个部署目标：

| 场景 | 本地分支 | 远程名 | 远程仓库 | Pages 地址 |
| --- | --- | --- | --- | --- |
| 开发版 | `develop` | `github-dev` | `git@github.com:xgMeow/atk_doc_dev.git` | https://xgmeow.github.io/atk_doc_dev/ |
| 正式版 | `master` | `github-prod` | `git@github-xgmeow:xgMeow/atk_doc.git` | https://xgmeow.github.io/atk_doc/ |

> ⚠️ 正式版用 `git@github-xgmeow:` 而非 `git@github.com:`。这是 `~/.ssh/config` 里的别名，
> 用于切到对 `atk_doc` 有写权限的 `xgMeow` 身份（默认身份 `y-coder18` 无写权限）。**不要改回 `github.com`。**

## 何时使用

当用户提出以下任一请求时，应激活此 skill：

**开发版（develop → atk_doc_dev）**

- "/deploy-dev"
- "部署开发版"
- "推送开发版"
- "发布开发版"
- "push 到 github-dev"
- "部署到 dev"

**正式版（master → atk_doc）**

- "/deploy-prod"
- "部署正式版"
- "推送正式版"
- "发布正式版"
- "部署生产环境"
- "push 到 github-prod"
- "部署到 prod"

如果用户表述不明确（例如只说「部署」「推送」），先问清楚是开发版还是正式版，不要自行猜测。

## 前置检查

针对本次的目标远程：

1. 确认远程存在且为 SSH 地址
2. 如果远程不存在，先执行：
   ```bash
   git remote add <远程名> <SSH 地址>
   ```
   正式版填 `git@github-xgmeow:xgMeow/atk_doc.git`
3. 如果远程地址是 HTTPS 格式，先执行：
   ```bash
   git remote set-url <远程名> <SSH 地址>
   ```

## 执行步骤

### 第 1 步：确认当前分支

```bash
git branch --show-current
```

如果不是目标分支，向用户确认是否要先切换到目标分支：
```bash
git checkout <目标分支>
```

检查本地仓库是否有未提交的内容，如果有向用户确认。

### 第 2 步：推送到远程

开发版：
```bash
git push -f github-dev develop:main
```

正式版：
```bash
git push -f github-prod master:main
```

### 第 3 步：报告结果

- 推送成功时，显示远程 main 的更新摘要，并输出对应链接：
  - **开发版**
    - **Pages 页面**：`https://xgmeow.github.io/atk_doc_dev/`
    - **仓库地址**：`https://github.com/xgMeow/atk_doc_dev`
  - **正式版**
    - **Pages 页面**：`https://xgmeow.github.io/atk_doc/`
    - **仓库地址**：`https://github.com/xgMeow/atk_doc`
- 推送失败时，分析错误原因并给出建议。

## 禁止事项

- 禁止在非目标分支上推送（开发版只允许 `develop`，正式版只允许 `master`）
- 禁止推送到 `github-dev` / `github-prod` 以外的远程
- 禁止推送到 `main` 以外的分支
