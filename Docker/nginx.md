## 简单Nginx服务

#### 拉取官方镜像 - 面向docker的只读模板

`docker pull nginx`

#### 查看
`docker images nginx`

#### 建文件夹www
`mkdir www`

#### 写入内容
`echo 'Hello Docker' >> www/index.html`

#### 启动（实体服务器8000端口，虚拟机80端口）
`docker run -p 8000:80 -v $PWD/www:/usr/share/nginx/html nginx`

#### 后台运行

`docker run -p 8000:80 -v $PWD/www:/usr/share/nginx/html -d nginx`


浏览器输入服务器地址+8000端口，即可


----

## 定制Web服务器

1. 进入source/docker目录
2. 新建文件夹nginx
3. 新建文件DockerFile
4. 写入内容
   ```
   #Dockerfile
   FROM nginx:latest
   RUN echo '<h1>Hello, Docker!</h1>' >
   /usr/share/nginx/html/index.html
   ```

5. 进入Dockerfile目录定制镜像
   `docker build -t nginx:zack .`
   (zack是版本的意思)
   (.定制的Dockerfile在当前目录下)


6. 启动（实体服务器8000端口，虚拟机80端口）
`docker run -p 8000:80 nginx:zack`