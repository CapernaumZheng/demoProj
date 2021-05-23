// 错误处理中间件

// 引入express框架
const express = require('express')
// 创建网站服务器
const app = express()
const fs = require('fs')

app.get('/index', (req, res, next) => {
   // 同步错误
   // throw new Error('程序发生了未知错误')
   // 异步错误
   fs.readFile('./demo.txt', 'utf8', (err, result) => {
        if(err != null) {
            next(err)
        } else {
            res.send(result)
        }
   })
})


// 错误处理中间件
app.use((err, req, res, next) => {
    res.status(500).send(err.message)
})

app.listen(3000)
console.log('网站服务器启动成功')