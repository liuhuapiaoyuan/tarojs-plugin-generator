
import { IPluginContext } from '@tarojs/service'
import path from 'path'
import {porduct} from './generators/components'


function firstUpperCase(str:string){
  return str.replace(/\b(\w)(\w*)/g, function($0, $1, $2) {
      return $1.toUpperCase() + $2.toLowerCase();
  });
}


// taro gen --component=Empty  组件名称要大写
// taro gen --component=/pages/index/components/Empty
export default (ctx:IPluginContext, pluginOpts) => {
  ctx.registerCommand({
    // 命令名
    name: 'gen', 
    // 执行 taro upload --help 时输出的 options 信息
    optionsMap: {
      '--component': '组件名称(大写)'
    },
    // 执行 taro upload --help 时输出的使用例子的信息
    synopsisList: [
      'taro gen --component Button'
    ],
    async fn () {
      const { chalk }     = ctx.helper
      let   { component } = ctx.runOpts
      const { appPath }   = ctx.paths
      console.log("------->",component)
      if (typeof component !== 'string') {
        return console.log(chalk.red('请输入需要创建的页面名称'))
      }
      component = firstUpperCase(component)
      //创建几个页面
      const outputDir = path.join(appPath , "src","components")
      porduct(component , outputDir)

    }
  })
}
