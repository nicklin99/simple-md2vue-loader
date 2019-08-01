
/**
 * webpack loader
 * 将一个md文件转出一个vue组件
 * 
 * 主要特点
 * 1. 简单实现
 * 2. 支持代码演示，代码拷贝，发布到codepen,代码高亮
 * 3. 默认使用demo作为演示代码组件，demo组件可以自己自定义， 可以参考默认实现demo
 * 
 * @example  支持演示，根据语言中是否包含 : , : 后面的如果有多个务必要设置一个名称，不设置会引起bug
 * 
 * ```vue:hello
 * // 这里的代码将作为vue组件,组件局部注册为 VueHello
 * ```
 * 
 * ```vue
 * // 这里的代码不会作为演示
 * ```
 */
const marked = require('marked')
const renderer = new marked.Renderer();
const hljs = require('highlight.js')
const path = require('path')
const fs = require('fs')
const _ = require('lodash/string');
// var loaderUtils = require('loader-utils');

const getFileNameFromType = type => {
  return type.split(':').map(item => {
    return _.upperFirst(item)
  }).join('')
}

marked.setOptions({
  renderer,
  breaks: true
})

const cacheDirName = '.vuefiles'
if (!fs.existsSync(cacheDirName)) {
  fs.mkdirSync(cacheDirName)
}

module.exports = function (source) {
  const __file = path.relative(this.context,this.resourcePath)
  // console.log('loader', __file)
  const paths = __file.split(path.sep)
  let parentName = ''
  for (let index = 0; index < paths.length; index++) {
    parentName += _.upperFirst(paths[index])
  }
  parentName = parentName.replace('.md','')

  // 代码演示处理
  renderer.code = function (code, type, escaped) {
    const codes = hljs.highlight('html', code)
  
    if (type.indexOf(':') === -1) {
      return `<pre v-pre><code>${codes.value}</code></pre>`
    }
  
    const fileName = parentName + getFileNameFromType(type)
    
    // console.log(code, type, escaped);
    const parts = marked.lexer(code)
    const sources = {}
    parts.forEach(part => {
      if (part.text.indexOf('template') > -1) {
        sources.html = part.text
      }
      if (part.text.indexOf('script') > -1) {
        sources.script = part.text
      }
      if (part.text.indexOf('style') > -1) {
        sources.style = part.text
      }
    })
  
    const codestr = _.escape(JSON.stringify(sources))
    return `<demo :code="${codestr}">
              <div slot="highlight"><pre v-pre><code>${codes.value}</code></pre></div>
              <${fileName} slot="vue"/>
            </demo>`
  }
  const html = marked(source)
  const tokens = marked.lexer(source)

  let imports = []
  let keys = []
  tokens.forEach(token => {
    if (token.type === 'code') {
      if (token.lang.indexOf(':')=== -1) {
        return
      }
      const fileName = parentName + getFileNameFromType(token.lang)
      const filePath = path.resolve('./',cacheDirName, `${fileName}.vue`)
      fs.writeFileSync(filePath, token.text, 'utf8')
      imports.push(`import ${fileName} from '${filePath}';`)
      keys.push(`${fileName}`)
    }
  })
  
  const script = `${imports.join('\n')} export default {components:{${keys.join(',')}}}`
  const vue = `<template><div class="md">${html}</div></template><script>${script}</script>`;
  return vue
}