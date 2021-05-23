#### 实现上传文件mock


前端：
```
<form action="/file_upload" method="post" enctype="multipart/form-data">
  <input type="file" name="file" id="">
  <br />
  <input type="submit" value="上传文件" />
</form>
```

serve端：

```
var express = require('express'); //引入express
var app = express(); // 创建实例app
var fs = require("fs"); //引入fs，fs 是node中一个文件操作模块，包括文件创建，删除，查询，读取，写入。
 
var bodyParser = require('body-parser'); // 这个模块是获取post请求传过来的数据。
var multer  = require('multer'); //multer - node.js 中间件，用于处理 enctype="multipart/form-data"（设置表单的MIME编码）的表单数据。
 
app.use('/public', express.static('public')); // 设置静态文件的中间件
app.use(bodyParser.urlencoded({ extended: false })); // 判断请求体是不是json，不是的话把请求体转化为对象
app.use(multer({ dest: '/tmp/'}).array('file'));
 
app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})
 // 上传文件api
app.post('/file_upload', function (req, res) {
 
   console.log(req.files[0]);  // 上传的文件信息
 
   var des_file = __dirname + "/" + req.files[0].originalname; //文件名
   fs.readFile( req.files[0].path, function (err, data) {  // 异步读取文件内容
        fs.writeFile(des_file, data, function (err) { // des_file是文件名，data，文件数据，异步写入到文件
         if( err ){
              console.log( err );
         }else{
               // 文件上传成功，respones给客户端
               response = {
                   message:'File uploaded successfully', 
                   filename:req.files[0].originalname
              };
          }
          console.log( response );
          res.end( JSON.stringify( response ) );
       });
   });
})
 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})
```
