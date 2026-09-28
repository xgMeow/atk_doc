/**
 * MixCode — 跨语言代码转换
 *
 * 作者只用一种语言（默认 Python）写代码，本模块把它"翻译"成其它目标语言。
 * 不再使用 {S:}/{C:} 标记写法，作者直接写源码，这里按「语法壳」转换：
 *
 * 只改动各语言真正不同的部分，字符串/注释/普通代码的内容尽量原样保留：
 *   Python      'str'      # 注释   无分号
 *   C++ / Java  "str"      // 注释  分号
 *   MATLAB      'str'('')  % 注释   分号
 *   Octave      'str'('')  % 注释   分号
 *
 * 关键约定：
 *   1. 源语言 == 目标语言时直接原样返回（源码 tab 必须展示作者原文，不能被"洗"一遍）；
 *   2. 解析字符串时保留反斜杠原样（`\X` 存两个字符），不再把 `\` 解码掉——
 *      否则 Windows 路径 / \n \t / 正则里的反斜杠会被静默吞掉；
 *   3. 跨语言时只换引号、注释符、行尾分号，字符串内部文本原样，仅对目标语言的
 *      引号做必要的转义（如内部裸 `"` 在 C++ 里要写成 `\"`）。
 *      这是"尽力而为"：无法把源语义精确翻译到不同转义体系的目标语言；
 *   4. 除「语法壳」外，ATK 的 atkOpen / atkConnect / atkClose 三组调用还要按各语言
 *      SDK 的真实签名整形（见 shapeAtkCalls 与 LANGS[*].atk）：
 *        Python / C++  自由函数，atkConnect 3 参（atkOpen 两参有默认值，可省略）
 *        Java          自由函数，atkConnect 4 参（第 4 参保留参数传 ""）
 *        MATLAB        经 ATKConnectJavaModule 对象调用，atkConnect 4 参（传 ''）
 *        Octave        同 MATLAB，保留参数传 ""
 *      这一步只动调用外形（接收者前缀与保留参数），字符串内容一律不动。
 */

// 各语言 atkOpen / atkConnect / atkClose 的调用外形（详见 shapeAtkCalls）：
//   receiver  调用前缀：MATLAB / Octave 经 ATKConnectJavaModule 对象调用，其余为自由函数
//   args      atkConnect 的实参个数（Python/C++ 3 参；Java/MATLAB/Octave 4 参）
//   emptyArg  第 4 个保留参数的写法（args 为 4 时才有意义）
//   openArgs  atkOpen 的必填实参个数；null 表示可从简（Python/C++ 有默认值）
//   openFill  省略 atkOpen 实参时补上的默认 IP 与端口
const ATK_FREE = { receiver: '', args: 3, emptyArg: null, openArgs: null, openFill: null };

const LANGS = {
  python: {
    name: 'Python',
    tag: 'python',
    comment: '#',             // 注释符
    strDelims: ["'", '"'],    // 字符串定界符
    escape: '\\',             // 反斜杠转义（解析时保留原样）
    matlabDoubleQuote: false, // 是否用 '' 双写表示引号（MATLAB）
    quote: "'",               // 渲染时使用的引号
    semicolon: false,         // 行尾是否需要分号
    atk: { ...ATK_FREE },
  },
  cpp: {
    name: 'C++',
    tag: 'cpp',
    comment: '//',
    strDelims: ['"'],
    escape: '\\',
    matlabDoubleQuote: false,
    quote: '"',
    semicolon: true,
    atk: { ...ATK_FREE },
  },
  java: {
    name: 'Java',
    tag: 'java',
    comment: '//',
    strDelims: ['"'],
    escape: '\\',
    matlabDoubleQuote: false,
    quote: '"',
    semicolon: true,
    // Java 无默认参数：atkOpen 必须显式传 IP 与端口，atkConnect 必须补第 4 个保留参数
    atk: { receiver: '', args: 4, emptyArg: '""', openArgs: 2, openFill: '"127.0.0.1", 6655' },
  },
  matlab: {
    name: 'MATLAB',
    tag: 'matlab',
    comment: '%',
    strDelims: ["'"],
    escape: null,             // matlab 不用反斜杠转义，用 '' 双写
    matlabDoubleQuote: true,
    quote: "'",
    semicolon: true,
    // MATLAB 经内置 Java 接口调用，签名与 Java 一致；但 '' 才是空字符串
    // （"" 是 R2016b 才引入的 string 类型，与 R2015b 起的旧版本不兼容）
    atk: { receiver: 'ATKConnectJavaModule.', args: 4, emptyArg: "''", openArgs: 2, openFill: "'127.0.0.1', 6655" },
  },
  octave: {
    name: 'Octave',
    tag: 'matlab',            // 无 Octave 语法定义，复用 MATLAB 高亮
    comment: '%',
    strDelims: ["'"],
    escape: null,
    matlabDoubleQuote: true,
    quote: "'",
    semicolon: true,
    // Octave 同样经 Java 接口调用，但空字符串写作 ""（与 Java 一致）
    atk: { receiver: 'ATKConnectJavaModule.', args: 4, emptyArg: '""', openArgs: 2, openFill: '"127.0.0.1", 6655' },
  },
};

const ALL = ['python', 'cpp', 'java', 'matlab', 'octave'];

/**
 * 解析一行源码为 token 列表。
 *
 * 字符串 token.text 存的是定界符之间的「原文」：
 * - 反斜杠转义语言：`\X` 原样存两个字符（不丢反斜杠），以便原样再渲染；
 * - matlab：把转义的 `''` 折叠成单个 `'` 存内文（matlab 用双写表示内部引号）。
 *
 * @param {string} line 单行源码
 * @param {object} cfg LANGS[src]
 * @returns {Array<{kind:'code'|'string'|'comment', text:string}>}
 */
function parseLine(line, cfg) {
  const tokens = [];
  let buf = '';
  let i = 0;
  const n = line.length;
  const flush = () => {
    if (buf) {
      tokens.push({ kind: 'code', text: buf });
      buf = '';
    }
  };

  while (i < n) {
    const ch = line[i];

    // 注释：注释符出现在字符串外，直达行尾
    if (line.startsWith(cfg.comment, i)) {
      flush();
      // 存注释符之后的原文（含作者原有的前导空格），渲染时不再重新排版
      tokens.push({ kind: 'comment', text: line.slice(i + cfg.comment.length) });
      return tokens;
    }

    // 字符串
    if (cfg.strDelims.includes(ch)) {
      flush();
      const d = ch;
      let j = i + 1;
      let inner = '';
      while (j < n) {
        const c = line[j];
        if (c === d) {
          // matlab：'' 表示转义的单引号（折叠为一个 ' 存入内文）
          if (cfg.matlabDoubleQuote && line[j + 1] === d) {
            inner += d;
            j += 2;
            continue;
          }
          break; // 字符串结束
        }
        if (cfg.escape && c === cfg.escape && j + 1 < n) {
          // 保留反斜杠及下一字符原样，跳过这对字符
          inner += c;
          inner += line[j + 1];
          j += 2;
          continue;
        }
        inner += c;
        j += 1;
      }
      tokens.push({ kind: 'string', text: inner });
      i = j + 1;
      continue;
    }

    buf += ch;
    i += 1;
  }
  flush();
  return tokens;
}

/**
 * 把字符串原文包进目标语言的引号。
 *
 * 反斜杠转义语言（python/cpp/java）：只转义「尚未被转义」的目标引号，
 * 其余字符（含反斜杠）原样保留。
 * matlab：内部 `'` 一律双写成 `''`，反斜杠无特殊含义、原样保留。
 */
function quoteString(inner, dstCfg) {
  const q = dstCfg.quote;
  if (dstCfg.matlabDoubleQuote) {
    return q + inner.replace(/'/g, "''") + q;
  }
  let out = q;
  for (let i = 0; i < inner.length; i++) {
    const c = inner[i];
    if (c === q) {
      // 统计左侧连续反斜杠个数：奇数表示该引号在源码里已是被转义的引号，无需再转义
      let bs = 0;
      for (let k = i - 1; k >= 0 && inner[k] === '\\'; k--) bs++;
      out += bs % 2 === 1 ? q : '\\' + q;
    } else {
      out += c;
    }
  }
  return out + q;
}

/**
 * 该行代码段是否以「语法结构符」/「指令」结尾，而非一条完整语句。
 *
 * 分号语言里只有「语句」需要行尾 `;`，而这类行不需要，补了反而是语法错误
 * （曾把完整 Java/C++ 程序转 C++ 时补成 `public class Demo {;` / `};`）：
 *   - `#include` / `#define` 等预处理指令：不是语句，不补 `;`
 *   - `{`            块/类/函数体开始：`public class Demo {`、`if (x) {`
 *   - `:`            case/标签/访问说明符：`case 1:`、`public:`
 *   - 单独成行的 `}` 块收尾：`}`（`= { ... }` 初始化列表是语句、仍需 `;`，不在此列）
 */
function isStructuralEnd(code) {
  const body = code.trim();
  if (body.startsWith('#')) return true; // 预处理指令行
  const last = body[body.length - 1];
  if (last === '{' || last === ':') return true;
  if (last === '}') {
    // `}` 之前没有其它非空字符 → 是纯收尾的块结束符；否则是单行初始化列表(语句)
    return !/\S/.test(body.slice(0, -1));
  }
  return false;
}

/* ============================================================
 * ATK 三组 API 的调用形态适配
 *
 * 「语法壳」转换之外，ATK 的三个接口在五种 SDK 里的调用外形并不一样：
 *   Python / C++   atkConnect(conID, 'Graphics', '...')            —— 自由函数，3 参
 *   Java           atkConnect(conID, "Graphics", "...", "")        —— 自由函数，4 参
 *   MATLAB         ATKConnectJavaModule.atkConnect(conID, ...
 *                  ..., '')                                        —— 对象方法，4 参
 *   Octave         同 MATLAB，但保留参数用 ""（与 Java 一致）
 * 另外 Java / MATLAB / Octave 的 atkOpen 无默认参数，两个参数必须显式传入。
 *
 * 这里按目标语言把调用改写成上面的形态，作者只需写一份源码
 * （推荐 Python：`atkConnect(conID, 'New', '/ Scenario X')`）。
 * 只增删「接收者前缀」与「第 4 个保留参数」、补齐 atkOpen 的默认实参，
 * 实参里的字符串内容一律不动。
 * ============================================================ */

// 字符串 token 在整形期的占位哨兵：字符串里的括号/逗号不能参与代码结构判断
// （如 `atkConnect(conID, 'X', 'SetValue a(b), c')` 的括号是字符串内容，不是调用括号）
const SENT = '\u0000';

/** token 列表 → 扁平字符串（字符串 token 换成哨兵占位） */
function toFlat(tokens) {
  return tokens.map((t, i) => (t.kind === 'string' ? `${SENT}${i}${SENT}` : t.text)).join('');
}

/** 扁平字符串 → token 列表（把哨兵还原回原来的字符串 token） */
function fromFlat(flat, tokens) {
  const out = [];
  const re = new RegExp(`${SENT}(\\d+)${SENT}`, 'g');
  let last = 0;
  let m;
  while ((m = re.exec(flat)) !== null) {
    if (m.index > last) out.push({ kind: 'code', text: flat.slice(last, m.index) });
    out.push({ kind: 'string', text: tokens[Number(m[1])].text });
    last = m.index + m[0].length;
  }
  if (last < flat.length) out.push({ kind: 'code', text: flat.slice(last) });
  return out;
}

/** 与 openIdx 处的 `(` 配对的 `)` 下标；找不到返回 -1 */
function matchParen(flat, openIdx) {
  let depth = 0;
  for (let i = openIdx; i < flat.length; i++) {
    if (flat[i] === '(') depth++;
    else if (flat[i] === ')' && --depth === 0) return i;
  }
  return -1;
}

/** 调用实参个数（只在调用括号的下一层数逗号） */
function countArgs(flat, openIdx, closeIdx) {
  const body = flat.slice(openIdx + 1, closeIdx);
  if (!body.trim()) return 0;
  let depth = 0;
  let n = 1;
  for (const c of body) {
    if (c === '(') depth++;
    else if (c === ')') depth--;
    else if (c === ',' && depth === 0) n++;
  }
  return n;
}

/** 砍掉末尾多余的实参，只保留前 keep 个（用于回转到 3 参语言） */
function keepArgs(flat, openIdx, closeIdx, keep) {
  const body = flat.slice(openIdx + 1, closeIdx);
  let depth = 0;
  let seen = 0;
  for (let i = 0; i < body.length; i++) {
    const c = body[i];
    if (c === '(') depth++;
    else if (c === ')') depth--;
    else if (c === ',' && depth === 0 && ++seen === keep) return body.slice(0, i);
  }
  return body;
}

/**
 * 按目标语言整形一行里的 ATK 调用。
 * @param {Array} tokens 不含注释 token 的 token 列表
 * @param {object} dstCfg LANGS[dst]
 * @returns {Array} 整形后的 token 列表（无 ATK 调用时原样返回）
 */
function shapeAtkCalls(tokens, dstCfg) {
  const atk = dstCfg && dstCfg.atk;
  if (!atk) return tokens;
  // 快筛：本行没有任何 atk* 调用就不必展开
  if (!tokens.some((t) => t.kind === 'code' && t.text.includes('atk'))) return tokens;

  // 允许带接收者前缀（如别的语言里写的是 ATKConnectJavaModule.atkConnect），
  // 统一替换成目标语言的前缀；`atkOpenFile(` 因括号位置不匹配不会被命中
  const callRe = /(?:[A-Za-z_]\w*\.)?\b(atkOpen|atkConnect|atkClose)\s*\(/g;
  let flat = toFlat(tokens);
  const edits = [];
  let m;
  while ((m = callRe.exec(flat)) !== null) {
    const name = m[1];
    const openIdx = m.index + m[0].length - 1;
    const closeIdx = matchParen(flat, openIdx);
    if (closeIdx < 0) break; // 括号不闭合，放弃本行整形
    const n = countArgs(flat, openIdx, closeIdx);
    let args = flat.slice(openIdx + 1, closeIdx);
    let argsChanged = false;

    if (name === 'atkConnect') {
      if (atk.args === 4 && n === 3) {
        args = `${args.replace(/\s+$/, '')}, ${atk.emptyArg}`; // 补第 4 个保留参数
        argsChanged = true;
      } else if (atk.args === 3 && n === 4) {
        args = keepArgs(flat, openIdx, closeIdx, 3); // 回转到 3 参语言
        argsChanged = true;
      }
    } else if (name === 'atkOpen' && atk.openArgs != null && n < atk.openArgs) {
      // 无默认参数的语言：作者省略了 IP/端口，补上默认值（127.0.0.1:6655）
      args = (args.trim() ? `${args.replace(/\s+$/, '')}, ` : '') + atk.openFill;
      argsChanged = true;
    }

    edits.push({ start: m.index, end: openIdx + 1, text: `${atk.receiver}${name}(` });
    if (argsChanged) edits.push({ start: openIdx + 1, end: closeIdx, text: args });
  }
  if (!edits.length) return tokens;

  // 从后往前改，前面的下标才不会失效
  for (const e of edits.sort((a, b) => b.start - a.start)) {
    flat = flat.slice(0, e.start) + e.text + flat.slice(e.end);
  }
  return fromFlat(flat, tokens);
}

/**
 * 把一行的 token 列表渲染为目标语言的一行
 */
function renderLine(tokens, dstCfg) {
  let code = '';
  let commentText = null; // 注释体（若有），存原文

  // ATK 调用整形在渲染前做：此时字符串还是独立 token，不会被当成代码结构
  const shaped = shapeAtkCalls(
    tokens.filter((t) => t.kind !== 'comment'),
    dstCfg
  );
  for (const t of shaped) {
    if (t.kind === 'string') code += quoteString(t.text, dstCfg);
    else code += t.text;
  }
  // 注释 token 由 parseLine 保证至多一个且在行尾
  const cmt = tokens.find((t) => t.kind === 'comment');
  if (cmt) commentText = cmt.text;

  code = code.trimEnd();
  const hasCode = code.length > 0;

  if (dstCfg.semicolon) {
    // 需要分号的语言：只给「完整语句行」补分号（纯注释行、块定界符/标签行不加）
    if (hasCode && !code.endsWith(';') && !isStructuralEnd(code)) code += ';';
  } else if (hasCode && code.endsWith(';')) {
    // python：去掉语句末尾的分号
    code = code.slice(0, -1);
  }
  code = code.trimEnd();

  if (commentText === null) return code;

  const marker = dstCfg.comment;
  if (!code) return marker + commentText; // 纯注释行
  return `${code} ${marker}${commentText}`;
}

/**
 * 把 src 语言的代码转换为 dst 语言
 * @param {string} code 源码
 * @param {string} src 源码语言 key
 * @param {string} dst 目标语言 key
 */
export function convert(code, src, dst) {
  if (code == null) return code;
  // 同语言 / 不认识的 key：原样返回，保证"源码 tab"永远展示作者原文
  if (src === dst || !LANGS[src] || !LANGS[dst]) return code;
  const srcCfg = LANGS[src];
  const dstCfg = LANGS[dst];
  return code
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => renderLine(parseLine(line, srcCfg), dstCfg))
    .join('\n');
}

export { LANGS, ALL };
