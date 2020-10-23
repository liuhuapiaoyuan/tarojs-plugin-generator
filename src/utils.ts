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