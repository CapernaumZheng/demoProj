### 1. 控制台日志输出 美化      chalk
https://www.npmjs.com/package/chalk
### 2. 热更新的实现
借助的包：nodemon
步骤：
1. 全局安装nodemon
    `npm i nodemon -g`
2. 项目安装
    `npm i nodemon --save-dev`
3. 安装之后，运行不再使用node命令，使用nodemon
   `nodemon [your node app]`
4. nodemon会监听文件变化，文件修改后会重新启动应用
5. nodemon的配置（忽略一些文件的变动）
    在package.json中增加
    "nodemonConfig": {
        "ignore": ["test/*", "docs/*"],
        "delay": "2500"
    }
    配置参数文档：https://github.com/remy/nodemon/blob/master/doc/sample-nodemon.md
6. 忽略特定js文件
    `nodemon --ignore lib/app.js`
### 3. 接口mock
#### 路由index.js
```
const express = require('express')
const fs = require('fs')
const path = require('path')
const router = express.Router()
router.use((req, res, next) => {
    // 设置跨域
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next()
})
router.get('/', (req, res) => {
    res.send('访问了服务器根目录')
})
router.post('/aaa', (req, res) => {
    // 读取当前文件外层的public里的aaa.json文件
    const jsonFile = fs.readFileSync(path.join(__dirname, '../public/aaa.json'))
    // 返回json
    res.json(JSON.parse(jsonFile))  
})
module.exports = router
```
#### 启动app.js
```
const express = require('express')
const chalk = require('chalk')
var route = require('./routes/index.js')
const app = express()
app.use('/zack', route)
app.listen(3000, () => {
    console.log(chalk.green('服务已启动'))
})
```
post请求接口`http://localhost:3000/zack/aaa`mock返回`aaa.json`