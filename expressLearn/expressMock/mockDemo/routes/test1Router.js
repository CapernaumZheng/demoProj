const express = require('express')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const test1Router = express.Router()

test1Router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin)  // 跨域
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.header("Access-Control-Allow-Credentials", "true")
    next()
})

// 普通post请求
test1Router.post('/test1/queryList', (req, res) => {
    console.log(chalk.green('/test1/queryList请求参数', JSON.stringify(req.body)))
    const content = fs.readFileSync(path.join(__dirname, '../public/test1/queryList.json'))
    res.json(JSON.parse(content))  
})


// 下载文件接口-post下载一个Excel，改get也行
test1Router.post('/test1/downExcel', (req, res) => {
    // set headers
    res.setHeader('Content-Type', 'application/ostet-stream;charset=UTF-8')
    res.setHeader('Content-Disposition', contentDisposition(path.join(__dirname,'../public/static/test.xlsx')))
    // res.setHeader('Content-Disposition', `attachment; filename=${urlencode('mock')}.xlsx`)
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition')

    // send file
    var stream = fs.createReadStream(path.join(__dirname,'../public/static/test.xlsx')) //读取/public/static/文件夹下test.xlsx文件
    stream.pipe(res)
    onFinished(res, function () {
        destroy(stream)
    })
})


 // 上传文件接口
 test1Router.post('/test1/uploadFile', (req, res) => {
 
    console.log(req.files[0]);  // 上传的文件信息
  
    var des_file = path.join(__dirname,  `../public/static/${req.files[0].originalname}`) //文件名指定路径
    var response
    fs.readFile( req.files[0].path, function (err, data) {  // 异步读取文件内容
         fs.writeFile(des_file, data, function (err) { // des_file是文件名，data，文件数据，异步写入到文件
          if(err){
               console.log(err)
          } else {
                // 文件上传成功，respones给客户端
                response = {
                    message:'文件上传成功', 
                    filename:req.files[0].originalname
               };
           }
           console.log(response)
           res.end(JSON.stringify(response))
        });
    });
 })

module.exports = test1Router