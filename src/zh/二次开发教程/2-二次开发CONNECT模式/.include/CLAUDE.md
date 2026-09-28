## 目录说明

本目录下的以下 5 个文件由各语言 SDK 的「核心 API」页通过 `@include` 引用：

- `atkCommand-cpp.md` —— C++
- `atkCommand-java.md` —— Java
- `atkCommand-matlab.md` —— MATLAB
- `atkCommand-octave.md` —— Octave
- `atkCommand-python.md` —— Python

> 旧的多语言标记模板 `atkCommand.mixcode.md` 及 `npm run gen-lang` 生成器已移除（不再支持 ```mixcode 写法）。
> 修改 API 示例或文案时，**直接编辑以上五份文件，并保持五种语言内容同步**。
>
> Java 与 Python / C++ 存在两处签名差异，同步修改时注意不要被“拉平”：`atkOpen` 无默认参数（两个参数均必传），`atkConnect` 为 4 参形式（第 4 参为保留参数，传 `""`）。
> Matlab 与 Octave 均通过内置 Java 接口调用 ATK 通信库（`javaaddpath` → `javaMethod('loadLibrary', 'ATKLibraryLoader')` → `javaObject('com.atk.connect.ATKConnectJavaModule')`），因此**签名与 Java 一致**，上述两处差异同样适用于 Matlab 和 Octave。
> 但空字符串的写法不同：Java 与 Octave 写作 `""`，Matlab 写作 `''`（`""` 在 Matlab 中是 R2016b 才引入的 string 类型，与 R2015b 起支持的旧版本不兼容）。
