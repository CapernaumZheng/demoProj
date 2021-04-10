const router = require('koa-router')()
const fs = require('fs')
const path = require('path')

// get请求
router.get('/(.*)', (ctx, next) => {
  ctx.body = '访问到服务器'
})

// Mock树数据
router.post('/mock/treeData', (ctx, next) => {
  const content = fs.readFileSync(path.join(__dirname, './json/access_tree.json'))
  ctx.body = JSON.parse(content)
})

module.exports = router