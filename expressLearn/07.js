const express = require('express')
const home = require('./route/home.js')
const admin = require('./route/admin.js')

const app = express()
app.use('/home', home)
app.use('/admin', admin)


app.listen(3000)
console.log('网站服务器启动成功')
