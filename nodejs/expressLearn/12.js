const express = require('express')
const path = require('path')
const app = express()

// app.use(express.static(path.join(__dirname, 'public')))

// 访问public文件夹下css文件夹内style.css
// http://localhost:3000/css/style.css

app.use('/static', express.static(path.join(__dirname, 'public')))

// 访问public文件夹下css文件夹内style.css
// http://localhost:3000/static/css/style.css

app.listen(3000)
console.log('网站服务器启动成功')