/**
 * 组件生成器
 */
import * as fs from 'fs'
import { firstUpperCase } from 'src/utils';
const path = require('path')





const tsx = name=>`import React from 'react'
import { View } from '@tarojs/components'
import classnames from 'classnames'

export interface ${name}Props  {
    className?: string
    children?:React.ReactNode
    style?:string|React.CSSProperties|undefined
  }

function ${name}(props:${name}Props){
    return <View>
    ${name}-content
    </View>
}
export {${name}}
`

const style = name=>
`.${name}{
    
}
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
export function porduct(componentName:string , componentDir:string){
    const dir = path.join(componentDir,componentName)
    //创建目录
    fs.mkdirSync(dir,{recursive:true})
 // index.tsx
    fs.writeFile(path.join(dir,`index.tsx`), tsx(firstUpperCase(componentName)), writeFileErrorHandler);
 // index.less
    fs.writeFile(path.join(dir,`index.less`), style(firstUpperCase(componentName)), writeFileErrorHandler);
}


