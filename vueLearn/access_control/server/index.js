const Koa = require('koa');
const app = new Koa();
const route = require('./route');
var cors = require('koa2-cors');
const chalk = require('chalk');
const bodyParser = require('koa-bodyparser')

app.use(cors());
app.use(bodyParser());
app.use(route.routes(), route.allowedMethods());

app.listen(3000, () => {
  console.log(chalk.green('Mock服务器已在3000端口启动，'))
});