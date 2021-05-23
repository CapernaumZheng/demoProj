const express = require('express')
const path = require('path')
const app = express()

// 1.告诉express框架使用什么模板引擎渲染什么后缀的模板文件
// 第1个参数：模板后缀
// 第2个参数：使用模板的引擎

app.engine('art', require('express-art-template'))

// 2.告诉express框架模板存放的位置是什么
// 第1个参数views 固定参数
// 第2个views是文件夹的名字
app.set('views', path.join(__dirname,'views'))

// 3.告诉express框架模板的默认后缀什么
app.set('view engine', 'art')

app.get('/index', (req, res) => {
    // 1.拼接了模板路径
    // 2.拼接了模板后缀，比如下面是index.art
    // 3.哪一个模板哪一个模板拼接
    // 4.将拼接结果响应给了客户端
    res.render('index', {
        msg: 'message信息'
    })
})

app.listen(3000)
console.log('网站服务器启动成功')