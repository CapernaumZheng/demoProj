## Http缓存机制

```
function updateTime() {
    this.timmer = this.timmer || setInterval(() => {
        this.time = new Date().toUTCString()
    }, 5000)
    return this.time
}
const http = require('http')
http.createServer((req, res)=> {
    const { url } = req
    if('/' === url) {
        res.end(`
            <html>
                Html Update Time ${updateTime()}
                <script src='main.js'></script>
            </html>
        `)
    } else if(url === '/main.js') {
        const content = `document.writeln('<br>JS Update Time: ${updateTime()}')`
      res.setHeader('Expires', new Date(Date.now() + 10*1000).toUTCString())  // HTTP1.0 强缓存，10秒后过期
        // HTTP1.0 强缓存缺点是，客户机的时间不一定是准确的
        // HTTP1.1 强缓存 cache-control （如果有cache-control，优先级高于expires）
        /** cache-control
         * Cache-directive      说明
         * public    所有内容都将被缓存（客户端和代理服务器都可以缓存）
         * private   内容只缓存到私有缓存中（客户端可以缓存）
         * no-cache  需要使用协商缓存来验证缓存数据
         * no-store  所有内容都不会缓存
         * must-revalidation/proxy-revalidation 如果缓存的内容失败，请求必须发送到服务器/代理以进行重新验证
         * max-age=xxx(xxx is numeric)  缓存的内容将在xxx秒后失效，这个选项只在HTTP1.1可用，并如果和Last-Modified一起使用，优先级较高
         * 
         */
      res.setHeader('Cache-Control', 'max-age=10')
         // 协商缓存
         /**
          * 1. last-modified & if-modified-since  (协商时间)
          * 2. etag & if-none-match  （协商内容，将返回内容进行摘要（Hash），然后通过对比摘要判断内容是否更新）
          */
         // 上面的expires和cache-control都会访问本地缓存直接验证看是否过期，如果没有过期直接使用本地缓存，并返回200
         // 但如果设置了no-cache和no-store则本地缓存会被忽略，会去请求服务器验证资源是否更新
         // 如果没更新，才继续使用本地缓存，此时返回的是304，就是协商缓存
         // 协商缓存包括last-modified和etag
         // 浏览器回传if-modified-since询问服务器，该资源是否过期
        // 1.  last-modified & if-modified-since  (协商时间)
        res.setHeader('Cache-Control', 'no-cache')
        res.setHeader('last-modified', new Date().toUTCString())
        if(new Date(req.headers['if-modified-since']).getTime() + 10 * 1000 > Date.now()){ // 10秒后过期
            console.log('协商缓存命中...')
            res.statusCode = 304
            res.end()
            return
        } 
        // 2. etag & if-none-match  (协商内容)
        const crypto = require('crypto')
        const hash = crypto.createHash('sha1').update(content).digest('hex')
        res.setHeader('Etag', hash)
        if(req.headers['if-none-match'] === hash) {
            console.log('Etag缓存命中...')
            res.statusCode = 304
            res.end()
            return
        }
        res.statusCode = 200
        res.end(content)
    } else if(url === '/favicon.ico') {
        res.end('')
    }
})
.listen(3000, ()=> {
    console.log('Http Cache Test Run at ' + 3000)
})
```