import { injectPageToEntry } from "../index";


console.log("测试对主包和分包的处理")


const preConfig = `

import { Config } from '@tarojs/taro';

const config: Config = {
  subPackages:[
    {
      "root": "pages/pageA/",
      "pages": [
        "index",
        "pageA1",
      ]
    }, {
      "root": "pages/pageB/",
      "pages": [
        "index",
        "pageB",
      ]
    }
  ],
  pages: [ 'pages/index/index',"pages/index/lesson"],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#eef0f3',
    navigationBarTitleText: 'Study',
    navigationBarTextStyle: 'black'
  },

};
export default config;`


const resultConfig = injectPageToEntry(preConfig,"/pages/insert/insert");

const expectConfig = `import { Config } from '@tarojs/taro';
const config: Config = {
  subPackages: [{
    "root": "pages/pageA/",
    "pages": ["index", "pageA1"]
  }, {
    "root": "pages/pageB/",
    "pages": ["index", "pageB"]
  }],
  pages: ["pages/insert/insert", 'pages/index/index', "pages/index/lesson"],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#eef0f3',
    navigationBarTitleText: 'Study',
    navigationBarTextStyle: 'black'
  }
};
export default config;`
if(expectConfig==resultConfig.code){
  console.log('达到预测目标效果，不会更新分包的情况')
}else{
  console.error('无法达到目标效果，可能有错误，处理后的配置如下：')
  console.error(resultConfig.code)
}