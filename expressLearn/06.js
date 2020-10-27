// 构建模块化路由

// 引入express框架
const express = require('express')
const app = express()

const home = express.Router()
app.use('/home', home)

home.get('/index', (req, res) => {
    res.send('欢迎来到博客首页页面')
})

