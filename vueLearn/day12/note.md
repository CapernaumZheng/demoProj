### Vue SSR基础实现
#### 理解SSR
==传统服务端渲染ssr== VS ==但页面应用SPA== VS ==服务器端渲染ssr==
传统的服务器端渲染
```
// nodejs代码
const express = require('express')
// 获取express实例
const server = express()
// 编写路由处理不同的url请求
server.get('/', (req, res) => {
    res.send('<strong>response from express</strong>')
})
// 监听端口
server.listen(80, ()=> {
    console.log('server runnning')
})
```
SPA缺点：
+ 1.seo
+ 2.首屏时间
##### 服务器端渲染Server Side Render
SSR解决方案，后端渲染出完整的首屏dom结构返回，前端拿到的内容包括首屏及完整spa结构，应用激活后依然按照spa方式运行
-----
### 实现：
使用渲染器将vue实例成html字符串并返回
安装express
`npm i vue-server-renderer -s`
安装vue-server-renderer
`npm i vue-server-renderer -s`
简单实例：
```
// nodejs代码
const express = require('express')
const path = require('path')
const Vue = require('vue')
const { createRenderer } = require('vue-server-renderer')
const renderer = createRenderer()
const fs = require('fs')
// 获取express实例
const server = express()
// 处理favicon
const favicon = require('serve-favicon')
server.use(favicon(path.join(__dirname,'../public/favicon.ico')))
// 编写路由处理不同的url请求
server.get('*', (req, res) => {
    console.log(req.url)
    // 解析模板名称
    const template = req.url.substr(1) || 'index'
    // 加载模板
    const buffer = fs.readFileSync(path.join(__dirname, `${template}.html`))
    const app = new Vue({
        template: buffer.toString(),
        data() {
            return {
                msg: 'zack msg SSR'
            }
        }
    })
    renderer.renderToString(app).then(html => {
        res.send(html)
    }).catch(err => {
        res.send(500)
        res.send('Internal Server Error, 500')
    })
})
// 监听端口
server.listen(80, ()=> {
    console.log('server runnning')
})
```
-----
#### 构建
 
对于客户端应用程序和服务器应用程序，我们都要使用webpack打包，服务器需要【服务器bundle】然后用于服务器端渲染，【客户端bundle】会发送给浏览器，用于混合静态标记
【服务器bundle】用于首屏渲染
客户端bundle】用于激活
#### 代码结构
src
 |-- main.js #用于创建vue实例
 |-- entry-client.js # 客户端入口，用于静态内容"激活"
 |-- entry-server.js # 服务端入口，用于首屏内容渲染
-----
##### 修改：router/index.js
```
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
Vue.use(VueRouter);
// 修改1:路由这里是工厂函数
export function createRouter() {
  return new VueRouter({
    routes: [
      {path: '/', component: Home},
      {path: '/about', component: About}
    ]
  })
}
```
------
##### main.js
```
import Vue from "vue";
import App from "./App.vue";
import { createRouter }  from './router';
Vue.config.productionTip = false;
// 返回工厂函数，每次请求创建一个Vue实例
export function createApp(context) {
  // 1.创建路由器的实例
  const router = createRouter()
  // 2.创建Vue实例
  const app = new Vue({
    router,
    context,  // 上下文用于给渲染器传递参数
    render: h => h(App)
  })
  return {app, router}
}
```
------
##### entry-server.js
```
// 调用main里面的工厂函数创建实例
import { createApp } from "./main";
// 该函数会被express路由处理函数调用，用于创建vue实例
export default context => {
  // 返回Promise，确保异步的操作都结束
  return new Promise((resolve, reject) => {
    const { app, router } = createApp(context);
    // 显示首屏处理
    router.onReady(() => {
      resolve(app);
    }, reject);
  });
};
```
----
##### entry-client.js
```
// 客户端也需要创建vue实例
import { createApp } from "./main";
const { app, router } = createApp()
router.onReady(() => {
    //挂载激活
    app.$mount("#app");
})
```