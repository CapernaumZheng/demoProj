const express = require('express')
const app = express()

app.use(fn({a: 1}))

function fn(obj) {
    return function(req, res, next) {
        if(obj.a == 1) {
            console.log('url :>> ', req.url);
        } else {
            console.log('req :>> ', req.method)
        }
        next()
    }
}

app.get('/', (req, res) => {
    res.send('ok')
})

app.listen(3000)
console.log('网站服务器启动成功')