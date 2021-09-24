// const t = require('@babel/types')
import  * as t from '@babel/types'

/** 首字母大写 */
export function firstUpperCase(str:string){
    return str.replace(/\b(\w)(\w*)/g, function(_$0, $1, $2) {
        return $1.toUpperCase() + $2;
    });
  }

const cssExts = {
'none':'css',
'sass':'scss',
'less':'less',
'stylus':'styl',
}
  /** 计算css后缀 */
export function cssExt(css){
    return cssExts[css]
}

//计算开启模式
export function getCssModuleMode(cssModuleConfig){
  if(cssModuleConfig==="page"){
    return {page:true,component:false}
  }
  if(cssModuleConfig==="page,component"){
    return {page:true,component:true}
  }
  if(cssModuleConfig==="component"){
    return {page:false,component:true}
  }
  return {page:false,component:false}
}

/**
 * 补充一下后缀，生成　.module
 * */
export function getCssModuleExt(cssModuleOpened){
  return cssModuleOpened?'.module':''
}

export function getCssModuleClassName(className,cssModuleOpened){
  return cssModuleOpened ? `{styles.${className}}`:`"${className}"`
}



//自动更新 app.confit.ts
export function traverseObjectNode (node , newpagePath:string) {
  if (node.type === 'ClassProperty' || node.type === 'ObjectProperty') {
    const properties = node.value.properties
    const obj = {}
    properties.forEach(p => {
      let key = t.isIdentifier(p.key) ? p.key.name : p.key.value
      obj[key] = traverseObjectNode(p.value,newpagePath)
    })
    return obj
  }
  if (node.type === 'ObjectExpression') {
    const properties = node.properties
    const obj= {}
    properties.forEach(p => {
      let key = t.isIdentifier(p.key) ? p.key.name : p.key.value
      obj[key] = traverseObjectNode(p.value,newpagePath)
    })
    return obj
  }
  if (node.type === 'ArrayExpression') { 
    const newpage = t.stringLiteral(newpagePath)
    return [newpage].concat(node.elements).map(item => traverseObjectNode(item,newpagePath))
  }
  if (node.type === 'NullLiteral') {
    return null
  }
  if(node.type ==="VariableDeclaration"){
    return node.declarations.map(item => traverseObjectNode(item,newpagePath))
  }
  if(node.type ==="VariableDeclarator"){
    if(node.id.name ==="config"){
      return traverseObjectNode(node.init,newpagePath)
    }
  }

  return node.value
}