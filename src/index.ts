import {ComponentGenerator} from './generators/components'
import {PageGenerator} from './generators/page'
import { cssExt, getCssModuleMode } from './utils'

 
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
      const { chalk }     = ctx.helper
      let   { component,page } = ctx.runOpts.options
      const { appPath }   = ctx.paths
      if (typeof component !== 'string' && typeof page !== 'string') {
        return console.log(chalk.red('请输入需要创建的组件/页面名称！！'))
      }

      if(typeof component =='string'){
        return ComponentGenerator({cssModule:cssModuleMode.component,pageComponentCssModule:cssModuleMode.page,component , appPath ,cssExt:cssExtStr,chalk})  
      }

      //如果是创建页面
      if(typeof page==="string"){
        try{
          return PageGenerator({cssModule:cssModuleMode.page,pagePath:page , appPath , chalk,cssExt:cssExtStr})
        }catch(e){
          console.log(chalk.red(e))
        }
      }

    }
  })
}
