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
  throw new Error('No path specified')
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

  console.log(`Style offlinified: ${fileName}`)
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

  console.log(`Script offlinified: ${fileName}`)
}

const offlinifyBarsScript = fileName => {
  processData(path.resolve(scriptsPath, fileName), data => {
    // Search results links for pages
    data = data.replace(/(\.title\)&&)([a-z].push)\((s)\)(\W)/g, '$1$2(Object.assign({},$3,{path:"."+($3.path==="/"?"/index.html":$3.path)}))$4')
    // Search results links for chapters
    data = data.replace(/(\Wpath):([a-z]\.path)(\+"#"\+[a-z]\.slug)(,children:)/g, '$1:"."+($2==="/"?"/index.html":$2)$3$4')

    return data
  })

  console.log(`Script offlinified: ${fileName}`)
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
      data = data.replace(/new Worker\(.*?\{\}\)/, replaceScript)
      fs.rmSync(workerjs)
    }
    return data
  })
  console.log(`SearchPro offlinified: ${fileName}`)
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


function offlineHtmlFile(fileName) {
  const htmlContent = fs.readFileSync(fileName, "utf-8");
  const $ = cheerio.load(htmlContent);
  // CSS
  $("link").each((index, element) => {
      const attributeValue = $(element).attr("href");
      const realAttributeValue = path.join(distPath, attributeValue);
      const relativeValue = url_relative(path.dirname(fileName), realAttributeValue);
      $(element).attr("href", relativeValue);
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
      if (isUrl(attributeValue)) {
          return;
      }
      if(attributeValue.startsWith("#")){
          return;
      }
      let realAttributeValue = path.join(distPath, attributeValue);
      if (fs.existsSync(path.join(realAttributeValue, "index.html"))) {
          realAttributeValue = path.join(realAttributeValue, "index.html");
      }
      const relativeValue = url_relative(path.dirname(fileName), realAttributeValue);
      $(element).attr("href", relativeValue);
      //console.log(fileName, attributeValue, "->", relativeValue)

  });
  // img
  $("img").each((index, element) => {
      const attributeValue = $(element).attr("src");
      if (isAbsoluteUrl(attributeValue)) {
          return;
      }
      if (isUrl(attributeValue)) {
          // replace like //example.com/1.png
          $(element).attr("src", `https:${attributeValue}`);
          //console.log(fileName, attributeValue, "->", `https:${attributeValue}`)
      } else {
          const realAttributeValue = path.join(distPath, attributeValue);
          const relativeValue = url_relative(path.dirname(fileName), realAttributeValue);
          $(element).attr("src", relativeValue);
          //console.log(fileName, attributeValue, "->", relativeValue)
      }
  });

  const transformedHtml = $.html();
  fs.writeFileSync(fileName, transformedHtml, "utf-8");
}



const walker = walk.walk(distPath, {
  followLinks: false
});


walker.on("file", (root, fileStats, next) => {
  const extName = path.extname(fileStats.name);
  const file = path.join(root, fileStats.name);
  if (extName === ".html") {
      //console.log(`Offline ${file}`);
      offlineHtmlFile(file);
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
  console.log("All Completed");
});