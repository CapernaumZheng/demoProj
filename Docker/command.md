#### 启动 Docker CE
`sudo systemctl enable docker`
`sudo systemctl start docker`


#### Hello-world测试
`docker run hello-world`

### 添加镜像

```
# /etc/docker/daemon.json

{
  "registry-mirrors": [
    "https://dockerhub.azk8s.cn",
    "https://reg-mirror.qiniu.com",
    "https://docker.mirrors.ustc.edu.cn/“
  ]
}

sudo systemctl daemon-reload
sudo systemctl restart docker
```

### 查看Docker状态
`sudo service docker status`

### 查看Docker的正在运行的进程
`docker ps`

### 查看Docker中所有的进程
`docker ps -a`

### 停止某个Docker进程
`docker stop 'id前3位'`

### 开启某个Docker进程
`docker start 'id前3位'`

### 进入某一个Docker服务内部
`docker exec -it 'id前3位' /bin/bash`
退出 exit

### 删除某一个Docker进程
`docker rm 'id前3位'`

