# MixCode 多语言代码块（`<mix-code>`）编写指南

> **适用对象**：ATK 文档编写人员——在 `src/zh/`、`src/en/` 的 `.md` 页面里编写代码示例的人。
>
> **要解决的事**：一段 ATK 命令，在不同目标语言（Python / C++ / Java / MATLAB / Octave）里只有引号、注释符、行尾分号这些“语法壳”不同，ATK 三组 API 的调用外形也略有差异。与其为每种语言各写一份还要保持同步，不如**只写一份源码**，让页面自动生成五个语言 Tab。
>
> **性质**：`<mix-code>` 是**页面运行时**由 Vue 组件渲染的代码块，不是构建期生成的文件。本文先讲怎么写（§1–§8），再讲内部怎么运作（§9 起），遇到问题可按文末的文件索引排查。

---

## 1. 它是什么，能做什么

作者在页面里写一个 `<mix-code>` 块，只维护一份源码，组件在浏览器里把它渲染成带五个 Tab 的代码区：

- 每个 Tab 可单独切换、单独复制；
- 代码按当前选中的语言做语法高亮；
- **源码语言对应的 Tab 展示的永远是作者写的原文**，不会被转换器“洗”一遍；
- 跨语言做两层转换：
  1. **语法壳**：换引号、换注释符、补/删行尾分号；**字符串内部的内容与反斜杠原样保留**（Windows 路径、`\n` 等不会被吞）；
  2. **ATK 调用外形**：`atkOpen` / `atkConnect` / `atkClose` 按目标语言 SDK 的真实签名整形（见 §8.1）——Java 补第 4 个保留参数，MATLAB / Octave 补 `ATKConnectJavaModule.` 接收者前缀。

> 注意：这种翻译是“尽力而为”，只适合把**同一段命令语句**在不同语言的引号与注释体系之间搬运，做不到把一段完整程序逐字翻译成另一种语言。一段代码若换成另一种语言后不能靠“换引号/注释/分号”变合法，就不该用它（见 §2）。

---

## 2. 什么时候用，什么时候别用

| 内容特征 | 用哪种写法 |
|---|---|
| ATK CONNECT 命令调用序列，逻辑相同、仅语言语法不同（典型：`atkConnect(...)` 一串） | **用 `<mix-code>`** |
| 完整程序 / 定义结构：出现 `class`/`interface`、`def 函数`、matlab `function … end`、`int main()`、`#include`、独立的 `{` 块体 / `}` 收尾等 | **不用 `<mix-code>`**：这类代码换到其它语言必然非法，组件只会显示源码语言一个 Tab。此时用普通单语言代码围栏 |
| 非五语言的片段（`js`、`text`、配置文件、yaml 等） | **不用 `<mix-code>`**：转换只支持 Python/C++/Java/MATLAB/Octave。用普通围栏 |
| 只想要单一语言、不打算展示多语言 Tab（如按 SDK 拆页的接口说明） | **不用 `<mix-code>`**：用普通围栏，或按 §10 走 `@include` 的每语言文件 |

一句话判断：**改成另一种语言后，如果不能只靠“换引号 / 注释符 / 分号”就变合法，就不要用 `<mix-code>`。**

---

## 3. 基本写法

`<mix-code>` 是一个自定义块级标签，源码写在标签之间：

````text
<mix-code lang="python">
# 创建任务场景
atkConnect(conID, 'New', '/ Scenario SimpleExample')
atkConnect(conID, 'SetState', '*/Satellite/Satellite1 HPOP "2026-03-06 00:00:00.000"')
</mix-code>
````

### 渲染效果

- 顶栏一组语言 Tab：**Python / C++ / Java / MATLAB / Octave**。源码语言（上例是 Python）默认选中，显示的就是你写的原文；
- 切到 C++：注释变 `//`、字符串变双引号、行尾自动补 `;`；调用仍是自由函数 `atkConnect(conID, "New", "/ Scenario …")`（C++ 与 Python 同为 3 参）；
- 切到 Java：同上，并且 `atkConnect` 自动补上第 4 个保留参数 `""`；
- 切到 MATLAB：注释变 `%`、字符串保持单引号、行尾补 `;`，调用改写成对象方法 `ATKConnectJavaModule.atkConnect(conID, 'New', '/ Scenario …', '')`；
- 切到 Octave：与 MATLAB 基本一致，区别只在保留参数写作 `""`（与 Java 一致）；
- 右上角「复制」按钮，复制的是**当前选中 Tab** 的代码。

### 硬性规则

1. **起始标签、结束标签各自独占一行，且必须顶格**（行首不能有空格/缩进）。缩进的 `<mix-code>` 不会被识别为代码块，会退化成普通 HTML 或渲染异常。
2. 两个标签之间的所有行都是代码，**支持空行**，内容原样保留。
3. 代码里的 `<` `>` `&` `#` `{{ }}` 等字符**不需要手工转义**，系统会自动处理，避免被误当成 HTML 标签或模板插值。
4. `<mix-code>` 内部按“代码原文”处理，**不解析 markdown**，不要在里面嵌套其它 markdown / HTML。
5. 作为页面顶层的独立代码块使用，**不要嵌进有序/无序列表项**（缩进会破坏识别）。
6. 代码里**不要出现字面的 `</mix-code>`**（会提前闭合整个块）。

---

## 4. 属性参考

所有属性都可选。省略时组件有合理的默认行为（见 §5）。

| 属性 | 说明 | 默认 |
|---|---|---|
| `lang` | 源码语言 key：`python` / `cpp` / `java` / `matlab` / `octave`。写对了就完全尊重、不做识别 | 自动识别 |
| `langs` | 逗号分隔，只展示其中几种，如 `langs="python,cpp"`、`langs="matlab"` | 五种全展示 |
| `line-numbers` | 布尔属性，**出现即显示行号**（不用写数值） | 不显示 |
| `code` | base64 编码的源码，作为标签内源码的替代（主要用于工具自动拼接/生成场景） | 无（直接写在标签内） |

写法示例：

````text
<mix-code lang="python" line-numbers>
atkConnect(conID, 'New', '/ Scenario SimpleExample')
atkOpenFile('C:/ATK/data/scen.atk')
</mix-code>
````

---

## 5. 源码语言：写死还是自动识别

`lang` 决定页面长什么样，各种写法的结果如下：

| 写法 / 内容 | 组件行为 |
|---|---|
| 不写 `lang`，代码是无明显特征的 **ATK 命令序列** | 识别不出且不像 C 系 → **按历史默认判为 Python**，出五语言 Tab |
| 不写 `lang`，代码命中某语言特征（`def`、`#include`、`System.out`、`function … end`、`%` 注释…） | 自动识别为该语言 → 出五语言 Tab，源码 Tab = 原文 |
| 不写 `lang`，识别不出、但代码明显像 C 系（`{}`、`//`、行尾 `;`） | 不猜成 Python → **只显示一个「原文」块**（不做转换） |
| `lang` 写的是受支持语言（`python`/`cpp`/`java`/`matlab`/`octave`） | 完全尊重该语言，不识别 |
| `lang` 写的是不受支持语言（如 `js`、`text`） | 先尝试识别；识别出四种之一就用它；**识别不出 → 只显示「原文」块** |
| 内容是完整程序 / 定义结构（见 §2） | **不生成其它语言 Tab**：能确定源码语言时只显示该语言一个 Tab；识别不出时退化为「原文」块 |

**给编写人员的建议**：ATK 命令类示例直接**写 Python 源码并显式写 `lang="python"`**（最干净、无需处理转义）。拿不准识别效果时也要显式写 `lang`，别依赖自动识别兜底。

---

## 6. 编写规则

1. **只维护一份源码**。不要手工再写 C++/Java/MATLAB 三份，也不要先把代码转好再贴回来——源码 Tab 会把“已经转好”的内容当原文再展示一次。
2. **按源语言的真实语法写**：字符串用源语言引号（Python/MATLAB 建议单引号、C++/Java 双引号），注释用源语言注释符（Python `#`、C++/Java `//`、MATLAB `%`）。系统负责在目标语言里替换引号/注释符/分号，并给需要转义的引号自动加 `\`。
3. **字符串里的转义、反斜杠原样保留**（Windows 路径、`\n` 等不会被吞）。
4. **别把代码写成“完整程序/定义结构”**（含类、函数、控制块体、`#include`、`function … end`）。这类代码换成其它语言必然非法，组件只会显示源码一个 Tab，等于没发挥多语言价值。
5. **源码 Tab 恒等于作者原文**：不要为了“看起来正常”去手工整理/转义源码，原样粘贴即可。
6. **ATK 三组 API 的调用外形（接收者前缀、第 4 个保留参数）由组件自动适配**，源码里按源语言的写法写就行：Python 写 `atkConnect(conID, 'New', '…')`、`atkOpen('127.0.0.1', 6655)`，不要手工写成 `ATKConnectJavaModule.atkConnect(…)`——那样 Python / C++ Tab 反而会拿到 MATLAB 写法。详见 §8.1。
7. **注释里的调用不会被整形**：被注释掉的 `# atkConnect(…)` 在其它语言 Tab 里只是换注释符，内容保持原样（注释是说明文字，不是可执行代码）。若希望读者能直接取消注释使用，就别把它写在注释里。
8. **中英文页面都要写**：`src/zh/**` 与 `src/en/**` 的对应页面放**同一段** `<mix-code>` 即可（组件是全站注册的）。
9. **自动识别认不出 Octave**：Octave 与 MATLAB 语法几乎一致，`lang` 省略时只会被识别成 `matlab`、拿到 MATLAB 列的写法。要出 Octave Tab 请显式写 `lang="octave"`（或让源码是 Python 这类无歧义的语言）。

---

## 7. 示例

### 示例一：Python 源码，五种语言全展示（最常用）

````text
<mix-code lang="python">
# 创建任务场景
atkConnect(conID, 'New', '/ Scenario SimpleExample')
# 设置仿真时间段并初始化
atkConnect(conID, 'SetAnalysisTimePeriod', '* "2024-03-18 00:00:00.000" "2024-03-19 00:00:00.000"')
atkConnect(conID, 'Animate', '* Reset')
</mix-code>
````

这段源码渲染出的五个 Tab 依次是（ATK 调用外形按 §8.2 自动适配）：

```text
Python                       # 创建任务场景
                             atkConnect(conID, 'New', '/ Scenario SimpleExample')

C++                          // 创建任务场景
                             atkConnect(conID, "New", "/ Scenario SimpleExample");

Java                         // 创建任务场景
                             atkConnect(conID, "New", "/ Scenario SimpleExample", "");

MATLAB                       % 创建任务场景
                             ATKConnectJavaModule.atkConnect(conID, 'New', '/ Scenario SimpleExample', '');

Octave                       % 创建任务场景
                             ATKConnectJavaModule.atkConnect(conID, 'New', '/ Scenario SimpleExample', "");
```

### 示例二：只展示 Python 与 C++，带行号

````text
<mix-code lang="python" langs="python,cpp" line-numbers>
atkOpenFile('C:/ATK/data/scen.atk')
atkConnect(conID, 'New', '/ Scenario SimpleExample')
</mix-code>
````

### 示例三：源码本来就是 C++

````text
<mix-code lang="cpp">
// 创建任务场景
atkConnect(conID, "New", "/ Scenario SimpleExample");
atkConnect(conID, "Animate", "* Reset");
</mix-code>
````

### 示例四：页面只讲某一种语言（如案例页已经写成 MATLAB）

````text
<mix-code lang="matlab" langs="matlab">
% 1, 加载通信库并与 ATK 建立连接
ATKConnectJavaModule = javaObject('com.atk.connect.ATKConnectJavaModule');
conID = ATKConnectJavaModule.atkOpen('127.0.0.1', 6655);
</mix-code>
````

`langs="matlab"` 让这个块只显示 MATLAB 一个 Tab，源码即原文、不做任何转换。

### 反例：不要这样写

````text
<!-- 缩进标签 → 不会被识别为代码块 -->
  <mix-code lang="python">
  atkConnect(conID, 'New', '/ Scenario SimpleExample')
  </mix-code>

<!-- 完整程序 → 只会显示 Java 一个 Tab，别用 mix-code 包 -->
<mix-code lang="java">
public class Demo {
    public static void main(String[] args) {
        System.out.println("hello");
    }
}
</mix-code>
````

---

## 8. 语言转换速查表（排版预期）

### 8.1 语法壳

| 差异项 | Python | C++ | Java | MATLAB | Octave |
|---|---|---|---|---|---|
| 字符串引号 | `'…'` | `"…"` | `"…"` | `'…'` | `'…'` |
| 注释符 | `#` | `//` | `//` | `%` | `%` |
| 行尾分号 | 不加（自动去掉） | 补 | 补 | 补 | 补 |
| 源码 == 目标语言 | —— 恒等于作者原文，不转换 —— | | | | |

### 8.2 ATK 三组 API 的调用外形

| 差异项 | Python | C++ | Java | MATLAB | Octave |
|---|---|---|---|---|---|
| `atkConnect` 实参个数 | 3 | 3 | **4**（第 4 参保留） | **4**（第 4 参保留） | **4**（第 4 参保留） |
| 第 4 个保留参数写法 | —— | —— | `""` | `''` | `""` |
| 调用前缀 | 自由函数 | 自由函数 | 自由函数 | `ATKConnectJavaModule.` | `ATKConnectJavaModule.` |
| `atkOpen` 是否必须传 IP/端口 | 否（有默认值） | 否（有默认值） | **是** | **是** | **是** |

以 Python 源码 `conID = atkOpen('127.0.0.1', 6655)` / `atkConnect(conID, 'New', '/ Scenario X')` / `atkClose(conID)` 为例：

```text
Python                       conID = atkOpen('127.0.0.1', 6655)
                             atkConnect(conID, 'New', '/ Scenario X')
                             atkClose(conID)

C++                          conID = atkOpen("127.0.0.1", 6655);
                             atkConnect(conID, "New", "/ Scenario X");
                             atkClose(conID);

Java                         conID = atkOpen("127.0.0.1", 6655);
                             atkConnect(conID, "New", "/ Scenario X", "");
                             atkClose(conID);

MATLAB                       conID = ATKConnectJavaModule.atkOpen('127.0.0.1', 6655);
                             ATKConnectJavaModule.atkConnect(conID, 'New', '/ Scenario X', '');
                             ATKConnectJavaModule.atkClose(conID);

Octave                       conID = ATKConnectJavaModule.atkOpen('127.0.0.1', 6655);
                             ATKConnectJavaModule.atkConnect(conID, 'New', '/ Scenario X', "");
                             ATKConnectJavaModule.atkClose(conID);
```

几个要点：

- `atkOpen()` 省略实参时，只有**无默认参数**的语言（Java / MATLAB / Octave）会被补上 `"127.0.0.1", 6655`，Python / C++ 保持省略写法；补默认值是为了让生成的 Tab 不至于调用不成。**新写的源码建议一律显式写 `atkOpen('127.0.0.1', 6655)`**，与其它 Tab 保持一致。
- 反向转换（如 MATLAB 源码转到 Python / C++）会自动去掉 `ATKConnectJavaModule.` 前缀与第 4 个保留参数，回到 3 参形式。
- 只有 `atkOpen` / `atkConnect` / `atkClose` **三个名字**会被整形；`atkOpenFile` 之类不受影响。
- 整形只发生在**代码**里：被注释掉的调用（`# atkConnect(…)`）只换注释符，内容原样。

> MATLAB / Octave Tab 里的 `ATKConnectJavaModule` 对象需要脚本先加载通信库并创建（`javaaddpath` → `javaMethod('loadLibrary', 'ATKLibraryLoader')` → `javaObject('com.atk.connect.ATKConnectJavaModule')`），组件**不会**自动补这段前置代码。跨语言 Tab 只展示命令语句序列；完整可运行脚本见 [Matlab SDK 简介与配置](../../src/zh/二次开发教程/2-二次开发CONNECT模式/1-开发方式/4-语言SDK/2-Matlab/1-简介与配置.md) 与 [Octave SDK 简介与配置](../../src/zh/二次开发教程/2-二次开发CONNECT模式/1-开发方式/4-语言SDK/5-Octave/1-简介与配置.md)。

转换只做上面这些；字符串内容、数字、代码结构一律不动。

---

## 9. 内部实现原理（排查问题用）

如果只是写代码示例，看到 §8 即可；下面说明组件在页面里是怎么把一份源码变成多个语言 Tab 的，供排查渲染异常时参考。

### 9.1 一次渲染的完整链路

````text
文档里写：

  <mix-code lang="python">
  # 创建任务场景
  atkConnect(conID, 'New', '/ Scenario SimpleExample')
  atkConnect(conID, 'SetAnalysisTimePeriod', '* "2024-03-18 00:00:00.000" "2024-03-19 00:00:00.000"')
  </mix-code>
        │
        │ ① markdown-it 块级插件 mix-code-block.js：
        │    整体捕获 <mix-code>…</mix-code>（支持代码里的空行），做 HTML 转义，
        │    改写成 <mix-code …><pre v-pre>…</pre></mix-code> 交给 Vue 模板编译
        ▼
  Vue 页面 → 全局组件 <mix-code>（MixCode.vue，client.js 注册为 'MixCode'）
        ├─ 从默认插槽提取源码纯文本（即作者原文）
        ├─ detect.js：源码语言识别（兜底）＋“完整程序”判定
        ├─ convert.js：逐行 token 化后做两层转换
        │     ① 语法壳：引号 / 注释符 / 行尾分号
        │     ② shapeAtkCalls：atkOpen / atkConnect / atkClose 的调用外形
        │        （Java 补第 4 参、MATLAB/Octave 补对象接收者、atkOpen 补默认 IP/端口）
        └─ 顶栏语言 Tab（源码语言默认选中）＋ 行号 ＋ 复制当前 Tab
````

### 9.2 关键行为

- `convert(code, src, dst)` 在 `src === dst` 时**直接原样返回**——所以源码 Tab 恒等于作者原文，不会被“洗”一遍。
- **只做语法壳转换**：换引号、注释符，补/删行尾分号；字符串内部文本与反斜杠原样保留。
- **ATK 调用整形**（`shapeAtkCalls`）：在每个字符串 token 被换成哨兵占位的前提下定位 `atkOpen` / `atkConnect` / `atkClose` 调用，按目标语言的 `LANGS[dst].atk` 增删接收者前缀与第 4 个保留参数、给 `atkOpen` 补默认实参。字符串先被占位隔离，所以 `atkConnect(conID, 'Astrogator', '… SetValue a(b,c) 1')` 里字符串内的括号/逗号不会被误当成调用结构。修改在**渲染前**完成，注释 token 不参与整形。
- **行内注释可跨语言**：Python 的 `#` 行内注释在其它语言转成 `//` / `%`，都是“到行尾”的注释。
- **结构行不补分号**：以 `{`、`:` 结尾，或独立成行的 `}`、`#include` 等预处理行，不会被打上分号。
- **识别兜底**：`lang` 省略或写了不认识的 key 时由 `detect.js` 猜；猜不出且代码明显像 C 系（`{}`、`//`、行尾 `;`）→ 只显示一个「原文」块。识别只在 Python/C++/Java/MATLAB 四种里选，Octave 需显式写 `lang="octave"`。
- **完整程序单 Tab**：命中 `class`/`interface`/`def 函数`/matlab `function…end`/块体/`#include` 时判为“完整程序”，只显示源码语言自身一个 Tab，避免给出贴错语言的假转换。

### 9.3 代码模块一览

| 文件 | 职责 |
|---|---|
| `src/.vuepress/markdown/mix-code-block.js` | 块级解析插件：整体捕获 `<mix-code>` 块（含空行）、HTML 转义、包 `<pre v-pre>`，防止 Vue 模板压缩空白、也避免把 `#include <x>` 当标签 |
| `src/.vuepress/components/MixCode/MixCode.vue` | 展示组件：源码提取、Tab、语法高亮（Prism 手动）、行号、复制 |
| `src/.vuepress/components/MixCode/convert.js` | 跨语言转换规则：①“语法壳”（引号/注释符/分号，含结构行判定、MATLAB `''` 双写、反斜杠保留）；② ATK 三组 API 的调用形态（`shapeAtkCalls`，见 §8.2） |
| `src/.vuepress/components/MixCode/detect.js` | 源码语言自动识别（兜底，只认 Python/C++/Java/MATLAB）＋“完整程序”判定 |
| `src/.vuepress/components/MixCode/prism-manual.js` | 关闭 Prism 全站自动高亮，改由组件按当前 Tab 高亮 |
| `src/.vuepress/config.ts` / `client.js` | 注册 markdown 插件（`md.use(mixCodeBlock)`）与全局组件（`app.component('MixCode', MixCode)`） |
| `scripts/test-convert.mjs` | convert.js / detect.js 的回归测试（`node scripts/test-convert.mjs`） |

### 9.4 几个设计要点

1. **为什么用块级插件，而不是改代码围栏**：markdown-it 默认把 `<mix-code>` 当 HTML block（type-7），空行会提前截断、VuePress 又会把标签内换行折叠成空格。插件在块级阶段整体捕获，转成 `<pre v-pre>`：`<pre>` 保留换行，`v-pre` 禁用 `#`、`{{ }}` 的模板编译，内容再做 HTML 转义，最终提取到的仍是作者原文。
2. **为什么跨语言只做“语法壳”+“调用外形”**：完整程序不可能靠换引号/注释/分号变成另一种合法程序，所以检测到完整程序时只展示源码 Tab；而 ATK 三组 API 的差异是**固定且有限**的（接收者、参数个数、默认值），可以可靠地按目标语言改写，因此单独做成一层整形。除这三个接口名之外，组件不认识任何 ATK 语义，也不会去改别的调用。
3. **为什么建议用 Python 写**：ATK 命令序列最接近纯语句集合，Python 单引号里可直接放命令字符串中常见的双引号，最省转义，转到其它语言也最干净；而且 `atkOpen('127.0.0.1', 6655)` 这种显式写法能让 Java / MATLAB / Octave 三个 Tab 免于依赖组件补默认值。
4. **为什么不动注释**：注释是写给人看的说明文字（里面可能只是引用一段调用写法），组件只把注释符换成目标语言的，正文一律不动，避免把说明文字改成语义不同的代码。

---

## 10. 各语言 SDK 的接口说明页怎么办

页面内做“多语言 Tab”用 `<mix-code>`；但**接口说明是按 SDK 拆页的**（Python SDK 页、C++ SDK 页、MATLAB SDK 页各自只显示本语言代码），不需要也不应该出现多语言 Tab。

这类页面直接 `@include` 一份静态的每语言文件：

```
.include/
├── atkCommand-python.md   ← 被 Python SDK「核心 API」页 @include
├── atkCommand-cpp.md      ← 被 C++ SDK「核心 API」页 @include
├── atkCommand-java.md     ← 被 Java SDK「核心 API」页 @include
├── atkCommand-matlab.md   ← 被 MATLAB SDK「核心 API」页 @include
└── atkCommand-octave.md   ← 被 Octave SDK「核心 API」页 @include
```

这五份文件按目标语言直接写成单语言代码，各自维护。**修改同一处示例/文案时，要记得五份一起改、保持一致**（`.include/CLAUDE.md` 里有维护提醒）。不要为了省事把它们改写成 `<mix-code>`——那样每个 SDK 页会同时渲染出多种语言。

---

## 11. 常见问题

**页面里看到了 `<mix-code>` 原文，没有渲染成 Tab？**
多半是标签没顶格（见 §3 硬性规则 1），或开闭标签不完整。确认 `<mix-code>` 单独成行且在行首。

**某段代码只显示「原文」一个 Tab？**
说明 `lang` 没写、且自动识别失败但代码像 C 系，或者代码被判为“完整程序”。这两种都属于组件故意不转换——改写 `lang` 或换普通围栏。

**复制出来的内容和我源码里不一致？**
「复制」复制的是**当前选中 Tab**。切回源码语言那个 Tab 复制的才是原文。

**MATLAB / Octave Tab 里为什么多了 `ATKConnectJavaModule.` 和第 4 个参数？**
这是组件的调用整形（§8.2）：MATLAB / Octave 的 SDK 就是通过 `ATKConnectJavaModule` 对象调用、`atkConnect` 为 4 参形式，Java 同样要补第 4 个保留参数。源码里仍按源语言写，不用手工加。

**MATLAB / Octave Tab 里出现 `ATKConnectJavaModule`，但那个 Tab 并没有创建这个对象？**
组件不会自动补加载通信库的前置代码（`javaaddpath` / `javaMethod('loadLibrary', …)` / `javaObject(…)`），跨语言 Tab 只展示命令语句序列。要给出可直接运行的完整脚本，请用 `langs="matlab"` 的单语言块自己写全（见 §7 示例四），或引导读者去看 MATLAB / Octave SDK 的「简介与配置」页。

**Java / MATLAB / Octave Tab 里 `atkOpen()` 被补成了 `atkOpen("127.0.0.1", 6655)`？**
这几种语言的 `atkOpen` 没有默认参数，省略实参无法调用，组件按默认端口补齐。与其依赖组件补，不如源码里就显式写 `atkOpen('127.0.0.1', 6655)`。

**为什么有的代码块只有一个 Tab、有的有五个？**
`langs` 属性控制展示哪几种（如 `langs="matlab"` 只显示 MATLAB）；被判为“完整程序”的代码块也只显示源码语言一个 Tab。见 §4、§5。

---

## 附录：历史写法（旧 ` ```mixcode ` 标记）已移除

早前文档曾用 ` ```mixcode ` 围栏配合 `{S:...}`（字符串）、`{C:...}`（独立行注释）标记来写多语言代码，相关实现已全部移除。**新写的代码一律用本文的 `<mix-code>`。** 若在旧文件里看到类似写法，请按下述规则改写：

````text
# 旧写法
```mixcode
{C:创建任务场景}
atkConnect(conID, {S:New}, {S:/ Scenario SimpleExample})
```

# 新写法
<mix-code lang="python">
# 创建任务场景
atkConnect(conID, 'New', '/ Scenario SimpleExample')
</mix-code>
````

改写要点：`{C:文本}` → 独立行的 `# 文本`（若 `{C:}` 带步骤编号，如 `{C:2, 创建任务场景}`，保留编号写作 `# 2, 创建任务场景`）；`{S:内容}` → `'内容'`。改完后删掉旧围栏、补上 `<mix-code lang="python">` / `</mix-code>`。
