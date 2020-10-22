/**
 * 组件生成器
 */
const fs = require('fs');
const path = require('path')

const tsx = name=>`
import React from 'react';
import { View } from '@tarojs/components';

function ${name}(){
    return <View>
    ${name}-content
    </View>
}
export {${name}}
`

const style = name=>`
.${name}{
    
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
    const dir = componentDir
 // index.tsx
    fs.writeFile(path.join(dir,`index.tsx`), tsx(componentName), writeFileErrorHandler);
 // index.less
    fs.writeFile(path.join(dir,`index.module.less`), style(componentName), writeFileErrorHandler);
}


