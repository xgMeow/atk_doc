const path = require('path')
const fs = require('fs')
const process = require('process')
const os = require("os")
const cheerio = require("cheerio");
const walk = require("walk");
const isAbsoluteUrl = require("is-absolute-url");
const isUrl = require("is-url");
const css = require('css');


const docsPath = process.argv[2]

if (!docsPath) {
  throw new Error('未指定要处理的目录路径')
}

let distPath = docsPath
//let distPath = path.resolve(docsPath, '.vuepress', 'dist')


const assetsPath = path.resolve(distPath, 'assets')
const stylesPath = path.resolve(assetsPath, 'css')
const scriptsPath = path.resolve(assetsPath, 'js')

const processData = (filePath, process) => {
  const data = fs.readFileSync(filePath, 'utf8')
  const processesdData = process(data)

  fs.writeFileSync(filePath, processesdData, { encoding: 'utf8' })
}


const offlinifyStyle = fileName => {
  processData(path.resolve(stylesPath, fileName), data => {
    // Links to assets
    return data.replace(/url\((\/assets\/[^)]*)\)/g, 'url(../..$1)')
  })

  console.log(`样式文件已离线化：${fileName}`)
}

const offlinifyAppScript = fileName => {
  processData(path.resolve(scriptsPath, fileName), data => {
    // Used for scripts path
    data = data.replace(/(Object\.prototype\.hasOwnProperty.call\([^\)]+\)},)([a-z]\.p)="\/"(\W)/g, '$1$2=window.location.href.replace(/\\/[^\\/]*$$/, "/")$3')
    // Initial page path
    data = data.replace(/window\.location\.pathname/g, '(window.location.origin+window.location.pathname).replace(/^.*?(\\/[^\\/]*)$$/,"$$1")')
    // Relative href for links overrided by vue router
    data = data.replace(/([a-z]=[a-z]\.route,)([a-z])=([a-z]\.href)(\W)/g, '$1$2=($3.startsWith("/")?"."+(/^\\/(#.*)?$$/.test($3)?$3.replace(/^\\//,"/index.html"):$3):$3)$4')
    // Absolute path for vue router navigation
    data = data.replace(/(var )([a-z])(=window.history;)/g, '$1$2$3t=window.location.href.replace(/\\/[^\\/]*$$/,"")+(t.match(/^\\/(#.*)?$$/)?t.replace(/^\\/(.*)$$/,"/index.html$$1"):t);')

    return data
  })

  console.log(`脚本文件已离线化：${fileName}`)
}

const offlinifyBarsScript = fileName => {
  processData(path.resolve(scriptsPath, fileName), data => {
    // Search results links for pages
    data = data.replace(/(\.title\)&&)([a-z].push)\((s)\)(\W)/g, '$1$2(Object.assign({},$3,{path:"."+($3.path==="/"?"/index.html":$3.path)}))$4')
    // Search results links for chapters
    data = data.replace(/(\Wpath):([a-z]\.path)(\+"#"\+[a-z]\.slug)(,children:)/g, '$1:"."+($2==="/"?"/index.html":$2)$3$4')

    return data
  })

  console.log(`脚本文件已离线化：${fileName}`)
}

const offlinifySearchPro = fileName => {
  processData(path.resolve(scriptsPath, fileName), data => {
    // console.log("fileName", fileName)
    // console.log("data", data)
    let match = data.match(/"([^":]*?worker\.js)"/)
    if(match)
    {
      let workerjs = path.resolve(distPath, match[1])
      //console.log("workerjs", workerjs)
      let script = fs.readFileSync(workerjs, {encoding:"utf8"})
      let scriptContent = JSON.stringify(script)
      let replaceScript = `new Worker(URL.createObjectURL(new Blob([${scriptContent}], {type:'application/javascript'})),{})`
      // 只匹配「首个参数以字符串字面量开头、且带 options 对象 `,{}`」的 Worker 调用（即 search-pro 的 worker）。
      // 旧正则 /new Worker\(.*?\{\}\)/ 会误命中 Prism 等库中 `new Worker(_.filename)` 这类无 options 的调用，
      // 惰性匹配一直越过整段代码找到远处的 `{}`，把 7MB+ 的真实代码替换成 worker 源码，导致打包产物语法错误。
      data = data.replace(/new Worker\(\s*["'`][\s\S]*?,\s*\{\}\)/, replaceScript)
      fs.rmSync(workerjs)
    }
    return data
  })
  console.log(`搜索插件已离线化：${fileName}`)
}

const styles = fs.readdirSync(stylesPath)
styles.forEach(style => offlinifyStyle(style))

const scripts = fs.readdirSync(scriptsPath)
scripts.forEach(script => {
  if (script.startsWith('app.')) {
    // offlinifyAppScript(script)
  }else if(script.endsWith("app.js")){
    // Hopefully that script keeps to be named this way no matter what
    // offlinifyBarsScript(script)
  }else if(script.endsWith(".txt")){

  }else{
    offlinifySearchPro(script)
  }
})






function offlineCssFile(fileName) {
  const content = fs.readFileSync(fileName, "utf-8");
  const cssAst = css.parse(content);
  cssAst.stylesheet.rules.forEach((rule, index) => {
      if (rule.type !== "import") {
          return;
      }
      const importParsed = /url\((.*?)\)/.exec(rule.import);
      if (importParsed === null) {
          return;
      }
      const urlContent = importParsed[1].replace(/["'()]/g, '');
      if (isUrl(urlContent)) {
          return;
      }
      if (!path.isAbsolute(urlContent)) {
          return;
      }
      const realAttributeValue = path.join(distPath, urlContent);
      const relativeValue = path.relative(path.dirname(fileName), realAttributeValue);
      rule.import = `url(${relativeValue})`;
      fs.writeFileSync(fileName, css.stringify(cssAst), "utf-8");
  });

}

function url_relative(from, absurl)
{
  let relurl = path.relative(from, absurl)
  if(absurl.endsWith("\\") || absurl.endsWith("/")){
    relurl = path.join(relurl, "index.html");
  }
  relurl = relurl.replace(/\\/g, "/");
  // console.log(from, absurl, relurl)
  return relurl;
}


// 只有「根绝对路径」才需要改写成相对路径：以 / 开头、且不是协议相对地址(//host/x)。
// 其余一律跳过，包括：
//   - 没有 href 的 <a id="x"></a>、没有 src 的 <img>（取值是 undefined）
//   - #锚点、http(s)://、mailto:、data: 等外链
//   - 已经是相对路径的值（保证脚本重复执行时结果不变）
function isRootAbsolutePath(value) {
  if (typeof value !== "string") {
    return false;
  }
  return value.startsWith("/") && !value.startsWith("//");
}

function offlineHtmlFile(fileName) {
  // 本次改写的属性个数，用于处理结束后的汇总输出
  let rewritten = 0;
  const htmlContent = fs.readFileSync(fileName, "utf-8");
  const $ = cheerio.load(htmlContent);
  // CSS
  $("link").each((index, element) => {
      const attributeValue = $(element).attr("href");
      // <link rel="preconnect"> 之类没有 href 的标签直接跳过
      if (!isRootAbsolutePath(attributeValue)) {
          return;
      }
      const realAttributeValue = path.join(distPath, attributeValue);
      const relativeValue = url_relative(path.dirname(fileName), realAttributeValue);
      $(element).attr("href", relativeValue);
      rewritten++;
      //console.log(fileName, attributeValue, "->", relativeValue)
  });
  // JS
  $("script").each((index, element) => {
      const attributeValue = $(element).attr("src");
      if(!attributeValue){
          return;
      }
      const realAttributeValue = path.join(distPath, attributeValue);
      const relativeValue = url_relative(path.dirname(fileName), realAttributeValue)
      $(element).attr("src", relativeValue);
      //console.log(fileName, attributeValue, "->", relativeValue)

  });
  // a.href
  $("a").each((index, element) => {
      const attributeValue = $(element).attr("href");
      // 没有 href 的锚点(<a id="x"></a>)、#锚点、外链、已相对化的链接都跳过
      if (!isRootAbsolutePath(attributeValue)) {
          return;
      }
      let realAttributeValue = path.join(distPath, attributeValue);
      if (fs.existsSync(path.join(realAttributeValue, "index.html"))) {
          realAttributeValue = path.join(realAttributeValue, "index.html");
      }
      const relativeValue = url_relative(path.dirname(fileName), realAttributeValue);
      $(element).attr("href", relativeValue);
      rewritten++;
      //console.log(fileName, attributeValue, "->", relativeValue)

  });
  // img
  $("img").each((index, element) => {
      const attributeValue = $(element).attr("src");
      // 没有 src 的 <img> 直接跳过（isAbsoluteUrl 传入 undefined 会抛异常）
      if (typeof attributeValue !== "string" || attributeValue === "") {
          return;
      }
      if (isAbsoluteUrl(attributeValue)) {
          return;
      }
      if (attributeValue.startsWith("//")) {
          // replace like //example.com/1.png
          $(element).attr("src", `https:${attributeValue}`);
          rewritten++;
          //console.log(fileName, attributeValue, "->", `https:${attributeValue}`)
      } else if (isRootAbsolutePath(attributeValue)) {
          const realAttributeValue = path.join(distPath, attributeValue);
          const relativeValue = url_relative(path.dirname(fileName), realAttributeValue);
          $(element).attr("src", relativeValue);
          rewritten++;
          //console.log(fileName, attributeValue, "->", relativeValue)
      }
  });

  const transformedHtml = $.html();
  fs.writeFileSync(fileName, transformedHtml, "utf-8");

  return rewritten;
}



const walker = walk.walk(distPath, {
  followLinks: false
});


// 处理过程中的统计，结束时统一输出，避免「静默只处理了一部分」的情况
const stats = {
  html: 0,
  rewritten: 0,
  failed: [],
};

walker.on("file", (root, fileStats, next) => {
  const extName = path.extname(fileStats.name);
  const file = path.join(root, fileStats.name);
  if (extName === ".html") {
      //console.log(`Offline ${file}`);
      try {
          stats.rewritten += offlineHtmlFile(file);
          stats.html++;
      } catch (error) {
          // 单个文件异常不再中断整批处理
          stats.failed.push(file);
          console.error(`离线化失败：${file}\n  ${error && error.stack ? error.stack : error}`);
      }
  } else if (extName === ".css") {
      // console.log(`Offline ${file}`);
      // offlineCssFile(file);
  }
  next();
});


walker.on("errors", (root, nodeStatsArray, next) => {
  next();
});

walker.on("end", () => {
  console.log(`全部完成：处理 ${stats.html} 个 html 文件，改写 ${stats.rewritten} 个属性，失败 ${stats.failed.length} 个`);
  if (stats.failed.length > 0) {
    console.error(`以下文件离线化失败：\n${stats.failed.join("\n")}`);
    // 有文件没处理成功时以非 0 退出，避免打包产物半成品却没人发现
    process.exitCode = 1;
  }
});