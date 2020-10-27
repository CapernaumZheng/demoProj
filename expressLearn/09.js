const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.post('/add', (req, res) => {
    // 接收请求参数
    res.send(req.body)
})
app.listen(3000)
console.log('网站服务器启动成功')