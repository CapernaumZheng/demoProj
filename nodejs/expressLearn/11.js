const express = require('express')
const app = express()


app.get('/index/:id/:name/:age', (req, res) => {
    res.send(req.params)
})

// 访问http://localhost:3000/index/123/张三/20
// 必须有参数才能访问

app.listen(3000)
console.log('网站服务器启动成功')