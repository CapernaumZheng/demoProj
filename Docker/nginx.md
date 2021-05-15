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