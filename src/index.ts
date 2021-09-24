import {ComponentGenerator} from './generators/components'
import {PageGenerator} from './generators/page'
import { cssExt, getCssModuleMode } from './utils'
import * as path from 'path'
import * as t from '@babel/types'
// const traverse = require('@babel/traverse').default
import traverse from '@babel/traverse' 
import generator from '@babel/generator'
// taro gen --component=Empty  组件名称要大写
//创建页面
// taro gen --page=/pages/index/components/Empty
//创建哪个的页面组件  页面，页面路径，组件名称
// taro gen --component=index/Empty
// export default (ctx, pluginOpts) => {
export default (ctx,pluginOpts) => {
  const {css='less' , cssModules='none'} = pluginOpts
  const cssModuleMode = getCssModuleMode(cssModules)
  ctx.registerCommand({
    // 命令名
    name: 'gen', 
    // 执行 taro upload --help 时输出的 options 信息
    optionsMap: {
      '--component': '组件名称(大写)',
      '--page': '页面路径 ',
    },
    // 执行 taro upload --help 时输出的使用例子的信息
    synopsisList: [
      'taro gen --component Button             (生成=>/components/Button/index.tsx)',
      'taro gen --component 页面名称/Banner     (生成=>/pages/页面名称/components/Banner.tsx)',
      'taro gen --page index                   (生成=>pages/index/index)',
      'taro gen --page mime                    (生成=>pages/mime/mime)',
      'taro gen --page mime/balance            (生成=>pages/mime/balance)',
    ],
    async fn () {
      const cssExtStr =  cssExt(css)
      const {  fs, chalk, resolveScriptPath }     = ctx.helper
      let   { component,page } = ctx.runOpts.options
      const { appPath,sourcePath }   = ctx.paths

  


      if (typeof component !== 'string' && typeof page !== 'string') {
        return console.log(chalk.red('请输入需要创建的组件/页面名称！！'))
      }

      if(typeof component =='string'){
        return ComponentGenerator({cssModule:cssModuleMode.component,pageComponentCssModule:cssModuleMode.page,component , appPath ,cssExt:cssExtStr,chalk})  
      }

      //如果是创建页面
      if(typeof page==="string"){
        try{
          const pagePath = PageGenerator({cssModule:cssModuleMode.page,pagePath:page , appPath , chalk,cssExt:cssExtStr})
          const entryPath = resolveScriptPath(path.join(sourcePath, 'app.config.ts'))
          parseEntry(ctx, entryPath,pagePath )
        }catch(e){
          console.log(chalk.red(e))
        }
      }

    }
  })
}


function parseEntry (ctx, entryPath , newPagePath) {
  const { fs, chalk, normalizePath } = ctx.helper
  const { sourcePath } = ctx.paths
  const entryCode = fs.readFileSync(entryPath).toString()
  const ast = createAst(entryCode)
  const parseResult = parseAst(ast , newPagePath)
  // 写入 entry config file
  const entryConfigPath = entryPath.replace(path.extname(entryPath), '.ts')
  console.log("entryCode.code",entryCode)
  fs.writeFileSync(entryConfigPath, 
    parseResult.code
      .replace(new RegExp(`"/pages/`, "gm"),`\r\n    "/pages/`)
      .replace(`'@tarojs/taro';`,`'@tarojs/taro';\r\n`)
  
  )
  console.log(`${chalk.green(`入口配置文件已经更新，已插入:${newPagePath}`)
}
 

function createAst (code) {
  const parser = require('@babel/parser')
  return parser.parse(code, {
    sourceType: 'module',
    plugins: [
      'typescript',
      'asyncGenerators',
      'bigInt',
      'classProperties',
      'classPrivateProperties',
      'classPrivateMethods',
      'decorators-legacy',
      'doExpressions',
      'dynamicImport',
      'exportDefaultFrom',
      'exportNamespaceFrom',
      'functionBind',
      'functionSent',
      'importMeta',
      'logicalAssignment',
      'nullishCoalescingOperator',
      'numericSeparator',
      'objectRestSpread',
      'optionalCatchBinding',
      'optionalChaining',
      'partialApplication',
      'throwExpressions',
      'topLevelAwait'
    ]
  })
}

function parseAst (ast,newPagePath) { 
  traverse(ast, {
    ArrayExpression(astPath){
      if(astPath.parent.key.name ==="pages"){
        //新节点，修复/开头
        if(newPagePath.startsWith("/")){
          newPagePath = newPagePath.substring(1)
        }
        const newpageNode = t.stringLiteral(newPagePath)
        const elements = astPath.node.elements
        astPath.node.elements  =  elements.filter(item=>{
          if(!item) return true 
          if(item.value!=newPagePath) return true
        })
        //新节点直接插入到头部
        astPath.node.elements.unshift(newpageNode)
      }
    } 
  })
  return generator(ast,{})
  
}
