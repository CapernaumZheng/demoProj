const router = require('koa-router')()
const fs = require('fs')
const path = require('path')
const baseUrl = '/api'
const jsonPath = '../public/json/react-admin'

// get请求
router.get('/(.*)', (ctx, next) => {
  ctx.body = '访问到服务器'
})

// 登录接口
router.post(`${baseUrl}/login/account`, (ctx, next) => {
  const content = fs.readFileSync(path.join(__dirname, `${jsonPath}/account.json`))
  ctx.body = JSON.parse(content)
})

// 登出接口
router.post(`${baseUrl}/login/outLogin`, (ctx, next) => {
  ctx.body = JSON.parse({ data: {}, success: true })
})

module.exports = router