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

// Mock保存接口
router.post('/mock/saveData', (ctx, next) => {
  ctx.body = ctx.request.body;
  fs.writeFile(path.join(__dirname, './json/save_access_tree.json'), JSON.stringify(ctx.body), (err) => {
    if (err) {
        throw err;
    }
    console.log("保存树的状态");
  });
  const content = fs.readFileSync(path.join(__dirname, './json/save_res.json'))
  ctx.body = JSON.parse(content)
})

// Mock查询树数据
router.post('/mock/queryData', (ctx, next) => {
  const content = fs.readFileSync(path.join(__dirname, './json/save_access_tree.json'))
  ctx.body = JSON.parse(content)
})

module.exports = router