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