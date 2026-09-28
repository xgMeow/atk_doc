## 目录说明

本目录下的以下 4 个文件由各语言 SDK 的「核心 API」页通过 `@include` 引用：

- `atkCommand-cpp.md` —— C++
- `atkCommand-java.md` —— Java
- `atkCommand-matlab.md` —— MATLAB
- `atkCommand-python.md` —— Python

> 旧的多语言标记模板 `atkCommand.mixcode.md` 及 `npm run gen-lang` 生成器已移除（不再支持 ```mixcode 写法）。
> 修改 API 示例或文案时，**直接编辑以上四份文件，并保持四种语言内容同步**。
>
> Java 与其他语言存在两处签名差异，同步修改时注意不要被“拉平”：`atkOpen` 无默认参数（两个参数均必传），`atkConnect` 为 4 参形式（第 4 参为保留参数，传 `""`）。
