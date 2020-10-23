export function firstUpperCase(str:string){
    return str.replace(/\b(\w)(\w*)/g, function(_$0, $1, $2) {
        return $1.toUpperCase() + $2.toLowerCase();
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
