## 引伸笔记-笔记12-1
通过react脚手架[create-react-app]创建的项目，如果需要在项目中配置一些webpack配置，需要在根目录下新建一个名称为config-overrides.js的文件。
一、配置步骤：
1、引入react-app-rewired插件
react-app-rewired的作用就是在不eject的情况下,覆盖create-react-app的配置
2、安装customize-cra
`npm install react-app-rewired customize-cra --save-dev`
3、修改 package.json 里的启动配置
```diff
/* package.json */
"scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test --env=jsdom",
+   "test": "react-app-rewired test --env=jsdom",
}
```
二、应用步骤
1、配置文件路径别名
```
const { override, addWebpackAlias} = require('customize-cra');
const path = require('path')
 module.exports = override(
   addWebpackAlias({
     assets: path.resolve(__dirname, './src/assets'),
     components: path.resolve(__dirname, './src/components'),
     pages: path.resolve(__dirname, './src/pages'),
     common: path.resolve(__dirname, './src/common')
   })
);
```
2、在开发过程中，我们经常会用到Ant Design Mobile这个组件库，在引入组件的同时，往往还需要引入组件的css样式，如果每次都单独引入就比较麻烦，我们可以在config-overrides文件下全局配置一下。如下：
```
const { override, fixBabelImports} = require('customize-cra');
 module.exports = override(
   fixBabelImports('import', {
     libraryName: 'antd-mobile',
     style: 'css',
   }),
);
```
作者：諾城
链接：https://www.jianshu.com/p/65b1f2cdcf76
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。