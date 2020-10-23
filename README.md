# taro-plugin-generator

> Taro 页面/组件创建工具，全部使用函数式组件+typescropt+hooks，提供良好的页面提示。



## 安装

在 Taro 项目根目录下安装

```bash
$ npm i taro-plugin-generator --save
```

## 使用

### 引入插件

请确保 Taro CLI 已升级至 Taro3 的最新版本。

修改项目 `config/index.js` 中的 plugins 配置为如下

```js
const config = {
  ...
  plugins: [
    ...其余插件

    'taro-plugin-generator'
  ]
  ...
}
```

```js
//可配置css编译器： 支持 
// 'none':
// 'sass':
// 'less':
// 'stylus':
const config = {
  ...
  plugins: [
    ...其余插件

    ['tarojs-plugin-generator',{
      css:'sass'
    }]
  ]
  ...
}
```

### 插件配置
generator插件支持以下参数

| 参数项 | 类型 | 是否可选 | 用途 | 默认值 |
| :-----| :---- | :---- | :---- |
| css | string | 是 | 指定css类型，可选择 ```none```,```sass```,```less```,```stylus``` | ```none```|
| module | string | 是 | 
  ``` 'page'  开启页面cssModule（包括页面组件也会自动module化），文件命名为 page.module.css```  ,
  ``` 'component'  开启组件cssModule，文件命名为 component.module.css```  
  ``` 'page,component'  同时开启上述功能```  
| ```'page'``` |




这样可通过 `taro gen  参数` 来自动化创建页面

### 命令行参数

generator插件支持以下参数

| 参数项 | 类型 | 是否可选 | 用途 |
| :-----| :---- | :---- | :---- |
| --component | string | 是 | 创建一个组件/页面级组件 |
| --page | string | 是 | 创建一个页面 |


#### 使用案例

##### 1.创建项目组件
```bash
 taro gen --component Button
```
生成结果：
```
-- 组件:      components/Button/index.tsx
-- 组件样式:  components/Button/index.less
```



##### 2.创建页面组件
```bash
 taro gen --component index/Button  // index为页面文件夹名称，自动查询为 pages/index
```

生成结果：
```
-- 组件:      pages/index/components/Button/index.tsx
-- 组件样式:  pages/index/components/Button/index.less
```



##### 3.创建页面(简化版)
```bash
 taro gen --page mime 
```

生成结果：
```
-- 页面:          pages/mime/mime.tsx
-- 页面配置:       pages/mime/mime.config.tsx
-- 页面样式:      pages/mime/mime.less
```



##### 4.创建页面(指定具体页面名称)
```bash
 taro gen --page index/search 
```

生成结果：
```
-- 页面:          pages/index/search.tsx
-- 页面配置:       pages/index/search.config.tsx
-- 页面样式:      pages/index/search.less
```

```其中注意，页面组件命名自动为页面首字母大写，如上则生成页面为：SearchPage
```


