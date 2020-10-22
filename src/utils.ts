export function firstUpperCase(str:string){
    return str.replace(/\b(\w)(\w*)/g, function(_$0, $1, $2) {
        return $1.toUpperCase() + $2.toLowerCase();
    });
  }