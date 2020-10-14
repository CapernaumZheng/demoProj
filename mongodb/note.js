// MongoDB 下载地址：https://www.mongodb.com/download-center/community

// DOS启动数据库：
// 开 DOS 窗口运行：mongod
// 另开 DOS 窗口运行：mongo

// 数据库相关概念：

// 术语                解释说明
//database             数据库，mongoDB 数据库软件可以建立多个数据库
//collection          集合，一组数据的集合，可以理解为 js 中的数组
//document           文档，一条具体的数据，可以理解为 js 中的对象
//field              字段，文档中的属性名称，可以理解为 js 中的对象属性

// node第三方插件mongoose连接数据库
// 创建windows服务
/** 
进入cmd删除已配置的服务 : sc delete MongoDB
删除已安装db文件夹里所有的文件 , 也就是命令mongod -dbpath 生成的文件
重新配置服务 (换成你自己的路径)
mongod --dbpath "C:\Program Files\MongoDB\data\db" --logpath "C:\Program Files\MongoDB\log\MongoDB.log" --install --serviceName "MongoDB"
最后再执行mongod -dbpath "C:\Program Files\MongoDB\data\db"
*/
// 启动MongoDB   net start mongoDB

/////////////////////////////////
/////------数据库连接-------/////////////////////////////////////////////////////
/////////////////////////////////
/**
  1.使用mongoose提供的connect方法连接数据库

  mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('数据库连接成功'))
  .catch(err => console.log('数据库连接失败', err))
 */
