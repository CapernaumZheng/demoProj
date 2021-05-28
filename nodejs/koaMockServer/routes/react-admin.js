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

// 登出接口
router.post(`/lecturer/lists`, (ctx, next) => {
  ctx.body = 
  [
    {
        "id": "22",
        "title": "22文章哈哈哈e",
        "category_id": "1",
        "content": "第七位轻微轻微轻微请问请问请问去",
        "recommend": "1",
        "message": "0",
        "good": "122",
        "view": "33",
        "author": "wqw",
        "sort": "1",
        "status": "0",
        "icon": "/Uploads/article/icon/icon-22.png",
        "create_time": "2018-05-21 20:38:01",
        "update_time": "2018-05-23 20:15:52"
    },
    {
        "id": "18",
        "title": "我18是第一个文章标题",
        "category_id": "1",
        "content": "第七位轻微轻微轻微请问请问请问去",
        "recommend": "1",
        "message": "0",
        "good": "0",
        "view": "0",
        "author": "",
        "sort": "0",
        "status": "0",
        "icon": "",
        "create_time": "2018-05-21 20:38:01",
        "update_time": "2018-05-23 16:03:10"
    }
]
})

module.exports = router