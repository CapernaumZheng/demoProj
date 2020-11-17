const express = require('express')
const chalk = require('chalk')
const test1Router = require('./routes/test1')
const test2Router = require('./routes/test2')
const rootPath = require('./public/const')
const app = express()
const bodyParser = require('body-parser')
const multer  = require('multer');  //multer - node.js 中间件，用于处理 enctype="multipart/form-data"（设置表单的MIME编码）的表单数据。
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/', function (req, res) {
    res.send('POST request to the homepage')
})

app.get('/', (req, res) => {
    res.send('访问了根目录')
})

app.use('/public', express.static('public')); // 设置静态文件的中间件
app.use(multer({ dest: '/tmp/'}).array('files')); // 上传文件


app.use(rootPath, test1Router)
app.use(rootPath, test2Router)

app.listen(3000, () => {
    console.log(chalk.green('Mock服务已启动'))
})