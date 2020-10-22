/**
 * 组件生成器
 */
import * as fs from 'fs'
import * as path from 'path'
import { firstUpperCase } from '../utils';

/**
 * 
 * @param group 页面分组
 * @param name  页面名称
 */
const tsx = (name)=>`import cx from 'classnames'
import React from 'react'
import { View } from '@tarojs/components'
import styles from './${name}.module.less'

function ${firstUpperCase(name)}Page(){
  return <View className={cx(styles.${firstUpperCase(name)}Page,'page')}>
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
 * @param componentName 组件名称
 * @param componentDir   组件文件夹
 */
export function PageGenerator(componentName:string , appPath:string){
  componentName = firstUpperCase(componentName)
  const componentDir = path.join(appPath , "src","components")
  const dir = path.join(componentDir,componentName)

  const pageGroup ="index"
  const pageName = "index"

  //创建目录
  fs.mkdirSync(dir,{recursive:true})
  // index.tsx
  fs.writeFile(path.join(dir,`${pageName}.tsx`), tsx(pageName), writeFileErrorHandler);
  // index.less
  fs.writeFile(path.join(dir,`${pageName}.less`), style(pageName), writeFileErrorHandler);
  // 页面config
  fs.writeFile(path.join(dir,`${pageName}.less`), config(), writeFileErrorHandler);
}


