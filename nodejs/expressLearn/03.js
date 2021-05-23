// 中间件应用

// 引入express框架
const express = require('express')
// 创建网站服务器
const app = express()

// 网站公告
// app.use((req, res, next) => {
//    res.send('网站正在维护')
// })

app.use('/admin', (req, res, next) => {
    let isLogin = false

    if(isLogin) {
        next()
    } else {
        res.send('您还没有登陆，不能访问/admin这个页面')
    }
}) 

app.get('/admin', (req, res) => {
    res.send('您已经登陆 可以访问当前页面')
})

app.get('/list', (req, res) => {
    res.send('列表页面')
})


// 定义所有路由的最后，404拦截
app.use((req, res, next) => {
    res.status(404).send('没有找到该页面')
})

app.listen(3000)
console.log('网站服务器启动成功')