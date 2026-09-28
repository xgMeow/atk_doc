/**
 * MixCode convert.js / detect.js 回归测试
 *
 * 背景：项目是 CommonJS 包，而 convert.js / detect.js 是 ESM 语法(.js)。node 无法直接
 * require / import 无 `"type":"module"` 包里的 .js ESM 文件。因此这里把源码临时复制成
 * .mjs（扩展名覆盖包类型），再 dynamic import 真实源码做断言，跑完删除临时副本。
 *
 * 用法：node scripts/test-convert.mjs
 * 退出码：全部通过 0；任一失败 1。
 */

import { mkdtempSync, rmSync, cpSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const MIX_DIR = join(__dirname, '..', 'src', '.vuepress', 'components', 'MixCode');

// —— 临时把源码复制成 .mjs 再加载（保证测的是真实源码） ——
const dir = mkdtempSync(join(tmpdir(), 'mixcode-test-'));
let convertMod;
let detectMod;
try {
  const conv = join(dir, 'convert.mjs');
  cpSync(join(MIX_DIR, 'convert.js'), conv);
  convertMod = await import(pathToFileURL(conv).href);
  const det = join(dir, 'detect.mjs');
  cpSync(join(MIX_DIR, 'detect.js'), det);
  detectMod = await import(pathToFileURL(det).href);
} finally {
  // 注意：import 缓存按 URL 定位，删除文件不影响本次已加载模块
  rmSync(dir, { recursive: true, force: true });
}

const { convert } = convertMod;
const { looksLikeProgram } = detectMod;

// —— 极简断言工具 ——
let passed = 0;
let failed = 0;
const failures = [];

function eq(actual, expected, name) {
  if (actual === expected) {
    passed++;
    return;
  }
  failed++;
  failures.push({ name, expected, actual });
}

// ============================================================
// 用户报告：完整 Java 程序转 C++ 时被错误补 `;`（{; / };）
// ============================================================
const javaProgram = [
  'public class Demo {',
  '    public static void main(String[] args) {',
  '        System.out.println("hello");',
  '    }',
  '}',
].join('\n');

// Java 与 C++ 的引号/注释/分号「语法壳」重合 → 转换后应逐字不变（不再出现 {; / };）
eq(convert(javaProgram, 'java', 'cpp'), javaProgram, '[报告] Java→C++：结构行不得被补 `;`（不允许 {; / };）');

// Java→Python：仅字符串换单引号、语句去分号；块行原样
eq(
  convert(javaProgram, 'java', 'python'),
  [
    'public class Demo {',
    '    public static void main(String[] args) {',
    "        System.out.println('hello')",
    '    }',
    '}',
  ].join('\n'),
  '[报告] Java→Python：不破坏块结构'
);

// ============================================================
// 常规用法回归（ATK 风格语句 python→cpp / cpp→python）
// ============================================================
eq(
  convert("# 创建任务场景\natkConnect(conID, 'New', '/ Scenario')", 'python', 'cpp'),
  '// 创建任务场景\natkConnect(conID, "New", "/ Scenario");',
  '[回归] python→cpp：换注释符/引号并补行尾分号'
);

// ============================================================
// ATK 三组 API 的调用形态：各语言 SDK 签名不同
//   Python / C++ 自由函数 3 参；Java 自由函数 4 参；
//   MATLAB / Octave 经 ATKConnectJavaModule 调用且 4 参（'' / ""）
// ============================================================
const atkScript = [
  "conID = atkOpen('127.0.0.1', 6655)",
  "atkConnect(conID, 'New', '/ Scenario SimpleExample')",
  'atkClose(conID)',
].join('\n');

eq(
  convert(atkScript, 'python', 'java'),
  [
    'conID = atkOpen("127.0.0.1", 6655);',
    'atkConnect(conID, "New", "/ Scenario SimpleExample", "");',
    'atkClose(conID);',
  ].join('\n'),
  '[ATK] python→java：atkConnect 补第 4 个保留参数 ""'
);

eq(
  convert(atkScript, 'python', 'matlab'),
  [
    "conID = ATKConnectJavaModule.atkOpen('127.0.0.1', 6655);",
    "ATKConnectJavaModule.atkConnect(conID, 'New', '/ Scenario SimpleExample', '');",
    'ATKConnectJavaModule.atkClose(conID);',
  ].join('\n'),
  '[ATK] python→matlab：补 ATKConnectJavaModule 接收者与保留参数 \'\''
);

// Octave 与 MATLAB 的差异只在保留参数：Octave 按 SDK 文档写作 ""（命令字符串仍用单引号）
eq(
  convert(atkScript, 'python', 'octave'),
  [
    "conID = ATKConnectJavaModule.atkOpen('127.0.0.1', 6655);",
    "ATKConnectJavaModule.atkConnect(conID, 'New', '/ Scenario SimpleExample', \"\");",
    'ATKConnectJavaModule.atkClose(conID);',
  ].join('\n'),
  '[ATK] python→octave：同 Matlab 走对象调用，但保留参数写作 ""'
);

// Python / C++ 有默认参数，atkConnect 仍是 3 参 → 不得补保留参数
eq(
  convert(atkScript, 'python', 'cpp'),
  [
    'conID = atkOpen("127.0.0.1", 6655);',
    'atkConnect(conID, "New", "/ Scenario SimpleExample");',
    'atkClose(conID);',
  ].join('\n'),
  '[ATK] python→cpp：保持自由函数 3 参，不补保留参数'
);

// atkOpen 省略实参：有默认参数的语言保持省略，无默认参数的语言补默认 IP/端口
eq(convert('conID = atkOpen()', 'python', 'cpp'), 'conID = atkOpen();', '[ATK] python→cpp：atkOpen() 保留省略写法');
eq(
  convert('conID = atkOpen()', 'python', 'java'),
  'conID = atkOpen("127.0.0.1", 6655);',
  '[ATK] python→java：atkOpen() 补默认 IP/端口'
);
eq(
  convert('conID = atkOpen()', 'python', 'octave'),
  'conID = ATKConnectJavaModule.atkOpen("127.0.0.1", 6655);',
  '[ATK] python→octave：atkOpen() 补默认 IP/端口且加接收者'
);

// 反向：matlab 源码转回 3 参语言要丢掉第 4 个保留参数，并去掉接收者
const matlabScript = [
  "conID = ATKConnectJavaModule.atkOpen('127.0.0.1', 6655);",
  "ATKConnectJavaModule.atkConnect(conID, 'New', '/ Scenario SimpleExample', '');",
  'ATKConnectJavaModule.atkClose(conID);',
].join('\n');
eq(
  convert(matlabScript, 'matlab', 'python'),
  [
    "conID = atkOpen('127.0.0.1', 6655)",
    "atkConnect(conID, 'New', '/ Scenario SimpleExample')",
    'atkClose(conID)',
  ].join('\n'),
  '[ATK] matlab→python：去掉接收者与第 4 个保留参数'
);

// 字符串里的括号/逗号不参与调用结构判断（含括号的命令参数不得被整形破坏）
const parenScript = [
  "conID = atkOpen()",
  "atkConnect(conID, 'Astrogator', '*/Satellite/Sat1 SetValue a(b,c) 1')",
].join('\n');
eq(
  convert(parenScript, 'python', 'matlab'),
  [
    "conID = ATKConnectJavaModule.atkOpen('127.0.0.1', 6655);",
    "ATKConnectJavaModule.atkConnect(conID, 'Astrogator', '*/Satellite/Sat1 SetValue a(b,c) 1', '');",
  ].join('\n'),
  '[ATK] 字符串里的括号/逗号不参与调用结构判断'
);

// atkOpenFile() 等非三组 API 的调用不得被整形（不加接收者、不补参数）
eq(
  convert("atkOpenFile('C:/ATK/data/scen.atk')", 'python', 'matlab'),
  "atkOpenFile('C:/ATK/data/scen.atk');",
  '[ATK] atkOpenFile 不受调用整形影响'
);

// 行内注释 + 赋值语句同样要整形
eq(
  convert("strOutPut = atkConnect(conID, 'Report_RM', '*/Satellite/Sat1 Style \"P\"') # 取报告", 'python', 'matlab'),
  "strOutPut = ATKConnectJavaModule.atkConnect(conID, 'Report_RM', '*/Satellite/Sat1 Style \"P\"', ''); % 取报告",
  '[ATK] 赋值 + 行内注释行同样整形'
);

eq(
  convert('atkOpenFile(\'C:\\ATK\\data\\scen.atk\')', 'python', 'cpp'),
  'atkOpenFile("C:\\ATK\\data\\scen.atk");',
  '[回归] 反斜杠保留：单反斜杠路径转 cpp 原样保留'
);

eq(
  convert('std::cout << "a\\nb" << std::endl;', 'cpp', 'python'),
  "std::cout << 'a\\nb' << std::endl",
  '[回归] cpp→python：去分号、双引号→单引号、\\n 保留'
);

// ============================================================
// 分号补全的边界：初始化列表 `= {...}` 是语句，应补 `;`
// ============================================================
eq(
  convert('m = {"a": 1}', 'python', 'cpp'),
  'm = {"a": 1};',
  '[边界] python→cpp：`= {...}` 初始化列表是语句，仍需补 `;`'
);

// 缩进块的 else/catch 行以 `{` 结尾也不补分号
eq(
  convert('x = 1\nif ok:\n    pass\nelse:\n    pass', 'python', 'cpp'),
  'x = 1;\nif ok:\n    pass;\nelse:\n    pass;',
  '[边界] python→cpp：冒号结尾的控制行已是尽力而为，不崩溃即可'
);

// ============================================================
// 预处理指令 / 完整 C++ 程序跨语言：非语句行不得被补 `;`
// ============================================================
const cppProgram = [
  '#include <iostream>',
  'int main() {',
  '    std::cout << "hello" << std::endl;',
  '    return 0;',
  '}',
].join('\n');

// C++ 与 Java 语法壳重合 → 指令行/块行保持不变（不得出现 `#include ...;`）
eq(convert(cppProgram, 'cpp', 'java'), cppProgram, '[指令] cpp→java：`#include` 指令行与块行不补 `;`');

// ============================================================
// 全矩阵冒烟：程序类源码转任一语言，都不得出现"结构行被补分号"的畸形
// （用户要求：复制到对应语言脚本里不能报错 → 不允许 {; / }; / #include…;）
// ============================================================
const programFixtures = { java: javaProgram, cpp: cppProgram };
const langKeys = ['python', 'cpp', 'java', 'matlab', 'octave'];
for (const srcName of Object.keys(programFixtures)) {
  for (const dst of langKeys) {
    const out = convert(programFixtures[srcName], srcName, dst);
    for (const bad of ['{;', '};']) {
      eq(out.includes(bad), false, `[矩阵] ${srcName}→${dst} 输出不含 "${bad}"`);
    }
    // 指令行不得被补分号
    eq(out.includes('#include <iostream>;'), false, `[矩阵] ${srcName}→${dst} 指令行不补分号`);
  }
}

// ============================================================
// 源码==目标语言 恒等于原文（作者原文 tab）
// ============================================================
eq(convert(javaProgram, 'java', 'java'), javaProgram, '[回归] 同语言转换原样返回');

// ============================================================
// looksLikeProgram：完整程序/定义结构 → 只展示源码 tab
// ============================================================
const okProgram = [
  ['java 类', 'public class Demo {\n    public static void main(String[] args) {\n    }\n}'],
  ['cpp main + 块体', '#include <iostream>\nint main() {\n    return 0;\n}'],
  ['matlab function...end', 'function y = f(x)\n    y = x.^2;\nend'],
  ['python def', 'def f(x):\n    return x'],
  ['行以 } 收尾/开头', 'x = f(1);\n}'],
];
for (const [name, code] of okProgram) {
  eq(looksLikeProgram(code), true, `[程序] "${name}" 判定为完整程序`);
}

const notProgram = [
  ['ATK python 语句+#注释', "# 创建任务场景\natkConnect(conID, 'New', '/ Scenario HugeConstellation')\n# 初始化仿真\natkConnect(conID, 'Animate', '* Reset')"],
  ['裸 ATK 命令', "atkConnect(conID, 'Animate', '* Reset')\natkOpenFile('C:/ATK/data/scen.atk')"],
  ['单行 dict 初始化', 'm = {"a": 1}'],
  ['字符串里含 class/function 词', "atkConnect(conID, 'New', 'class')\n# 下一行字符串含 end，也不能误判\natkOpenFile('end/data.atk')"],
  ['单条 cpp 语句(无块体)', 'std::cout << "ok" << std::endl;'],
];
for (const [name, code] of notProgram) {
  eq(looksLikeProgram(code), false, `[非程序] "${name}" 不判定为完整程序`);
}

// ============================================================
console.log(`\n通过 ${passed} 项，失败 ${failed} 项`);
if (failed > 0) {
  for (const f of failures) {
    console.log('\n--- 失败：' + f.name + ' ---');
    console.log('期望:');
    console.log(JSON.stringify(f.expected));
    console.log('实际:');
    console.log(JSON.stringify(f.actual));
  }
  process.exit(1);
}
