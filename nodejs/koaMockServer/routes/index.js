const router = require('koa-router')()
const {svgCaptcha, CONFIG} = require('../src/utils/verificationCode')

router.get('/', async (ctx, next) => {
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

// 生成验证码
router.get('/verify/svg', async (ctx, next) => {
  let svgVerify = svgCaptcha.create(CONFIG)
  let img = svgVerify.data // 验证码
  let text = svgVerify.text.toLowerCase() // 验证码字符，忽略大小写
  ctx.session.svgVerify = text;
  ctx.type = 'svg'
  ctx.body = `${img}`
})


module.exports = router
