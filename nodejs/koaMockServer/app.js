const Koa = require('koa')
const app = new Koa()
var cors = require('koa2-cors')
const chalk = require('chalk')
const onerror = require('koa-onerror')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')


// routes
const index = require('./routes/index')
const reactAdmin = require('./routes/react-admin')

// error handler
onerror(app)

app.use(cors());
app.use(bodyParser({
  enableTypes:['json', 'form', 'text']
}));
app.use(logger())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(reactAdmin.routes(), reactAdmin.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

app.listen(3000, () => {
  console.log(chalk.green('Mock服务器已在3000端口启动，'))
});