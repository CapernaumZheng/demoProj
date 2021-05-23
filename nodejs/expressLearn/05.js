// 捕获错误

// 引入express框架
const express = require('express')
// 创建网站服务器
const fs = require('fs')
const promisify = require('util').promisify
const readFile = promisify(fs.readFile)
const app = express()



app.get('/index', async (req, res, next) => {
   // 异步错误
   try {
        await readFile('./demo.txt')   
   } catch (error) {
       next(error)
   }
})


// 错误处理中间件
app.use((err, req, res, next) => {
    res.status(500).send(err.message)
})

app.listen(3000)
console.log('网站服务器启动成功')