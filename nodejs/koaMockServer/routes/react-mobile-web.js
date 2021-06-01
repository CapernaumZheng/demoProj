const router = require('koa-router')()
const fs = require('fs')
const path = require('path')
const baseUrl = '/api'
const jsonPath = '../public/json/react-mobile-web'

// get请求
router.get('/(.*)', (ctx, next) => {
  ctx.body = '访问到Koa Mock服务器'
})

router.post(`/user/login`, (ctx, next) => {
  const content = fs.readFileSync(path.join(__dirname, `${jsonPath}/login.json`))
  ctx.body = JSON.parse(content)
})


module.exports = router