#### 如何模拟实现post、get请求文件下载Excel

```
var contentDisposition = require('content-disposition')
var onFinished = require('on-finished')
var destroy = require('destroy')


app.post('/credit/downloadTemplateFile', (req, res) => {
    // set headers
    res.setHeader('Content-Type', 'application/ostet-stream;charset=UTF-8')
// 本地文件夹public里的mock.xlsx文件
    res.setHeader('Content-Disposition', contentDisposition(path.join(__dirname,'../public/static/mock.xlsx')))
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition')
    // send file
    var stream = fs.createReadStream(path.join(__dirname,'../public/static/mock.xlsx'))
    stream.pipe(res)
    onFinished(res, function () {
        destroy(stream)
    })
})
```