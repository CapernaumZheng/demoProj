### 定制nodeJS镜像

1. 进入source/docker目录
2. 新建node目录
3. 进入node文件夹下
`npm init -y`
`npm i koa -s`
4. node目录文件夹
   写文件app.js
   ```
      const Koa = require('koa')
      const app = new Koa()
      app.use(ctx => {
              ctx.body = 'Hello NodeJS!!!!!'
      })

      app.listen(3000, () => {
              console.log('app started at 3000')
      })
   ```
5. 写文件
   Dockerfile
   ```
      FROM node:10-alpine
      ADD . /app/
      WORKDIR /app
      RUN npm install
      EXPOSE 3000
      CMD ["node","app.js"]

   ```

6. 进入Dockerfile目录定制镜像 
   `docker build -t mynode .`

7. 启动
   `docker run -p 3000:3000 mynode`