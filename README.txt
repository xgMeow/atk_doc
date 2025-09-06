# 注意

1. 更改了`node_modules\@vuepress\plugin-redirect\lib\node\generate\generateRedirectFiles.js`

```js
import { entries, isLinkAbsolute, isLinkHttp, removeEndingSlash, removeLeadingSlash, } from '@vuepress/helper';
import { fs, path } from 'vuepress/utils';
import { logger } from '../logger.js';
import { getRedirectHTML } from './getRedirectHTML.js';

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


export const generateRedirectFiles = async ({ dir, options }, config, hostname = '') => {
    const resolvedHostname = hostname
        ? removeEndingSlash(isLinkHttp(hostname) ? hostname : `https://${hostname}`)
        : '';
    const { succeed } = logger.load('Generating redirect files');
    await Promise.all(entries(config).map(async ([from, to]) => {
        const filePath = dir.dest(removeLeadingSlash(from.replace(/(?:\.(?:md|html))?$/, '.html')));
        if (!fs.existsSync(filePath)) {
            to = url_relative(path.dirname(from), to)
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

2. 更改了`node_modules\prismjs\components\prism-atks.js`

```js
Prism.languages.atks = {
	'comment': [
		/%\{[\s\S]*?\}%/,
		/%.+/
	],
	'string': {
		pattern: /\B'(?:''|[^'\r\n])*'/,
		greedy: true
	},
	// FIXME We could handle imaginary numbers as a whole
	'number': /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[eE][+-]?\d+)?(?:[ij])?|\b[ij]\b/,
	'keyword': /\b(?:NaN|break|case|catch|continue|else|elseif|end|for|function|if|inf|otherwise|parfor|pause|pi|return|switch|try|while)\b/,
	'function': /\b(?!\d)\w+(?=\s*\()/,
	'operator': /\.?[*^\/\\']|[+\-:@]|[<>=~]=?|&&?|\|\|?/,
	'punctuation': /\.{3}|[.,;\[\](){}!]/
};

```

3. `node_modules\prismjs\components.js`新增了atks的配置



