/**
 * 组件生成器
 */
import * as fs from 'fs'
import * as path from 'path'
import { firstUpperCase, getCssModuleExt } from '../utils';

/**
 * 
 * @param group 页面分组
 * @param name  页面名称
 */
const tsx = ({name,cssExt,cssModule})=>`import React from 'react'
${cssModule ?　`import cx from 'classnames'` : '' }
import { View } from '@tarojs/components'
import${cssModule?' styles from':''} './${name}${getCssModuleExt(cssModule)}.${cssExt}'


function ${firstUpperCase(name)}Page(){
  return <View className=${ cssModule ? `{cx(styles.${firstUpperCase(name)}Page,'page')}` : `'${firstUpperCase(name)}Page page'` }>
    ${firstUpperCase(name)}Page
  </View>
}

export default ${firstUpperCase(name)}Page
`


// index.module.less
const style = name=>
`.${firstUpperCase(name)}Page{
    
}
`

const config = ()=>`import { PageConfig } from '@tarojs/taro'

const config :PageConfig=  {
  navigationBarTitleText: 'weChat'
}

export default config
`

function writeFileErrorHandler(err) {
    if (err) throw err;
  }

//生产
/**
 * 
 * @param componentName 页面
 * @param componentDir   页面目录
 * @param cssExt:文件后缀
 * @param log 日志工具
 */
export function PageGenerator({cssExt,pagePath , appPath , chalk,cssModule}:any){
  //判断页面情况
  const pages = pagePath.split('/')
  if(pages.length!==1 && pages.length!==2){
    throw "页面参数必须是  index或者 index/index"
  }
  let pageGroup = ""
  let pageName = ""
  if(pages.length === 1){
    pageGroup= pages[0]
    pageName= pages[0]
  }
  if(pages.length === 2){
    pageGroup= pages[0]
    pageName= pages[1]
  }

  const componentDir = path.join(appPath , "src","pages")
  const dir = path.join(componentDir,pageGroup)

  //创建目录
  fs.mkdirSync(dir,{recursive:true})
  // index.tsx
  fs.writeFile(path.join(dir,`${pageName}.tsx`), tsx({name:pageName,cssExt,cssModule}), writeFileErrorHandler);
  console.log(chalk.green("创建成功=>"+path.join(dir,`${pageName}.tsx`)) )
  // index.less
  fs.writeFile(path.join(dir,`${pageName}${getCssModuleExt(cssModule)}.${cssExt}`), style(pageName), writeFileErrorHandler);
  console.log(chalk.green("创建成功=>"+path.join(dir,`${pageName}${getCssModuleExt(cssModule)}.${cssExt}`) ) )
  // 页面config
  fs.writeFile(path.join(dir,`${pageName}.config.ts`), config(), writeFileErrorHandler);
  console.log(chalk.green("创建成功=>"+path.join(dir,`${pageName}.config.ts`) ) )

  //返回页面名称
  return `pages/${pageGroup}/${pageName}`
}


