### 1、
#### 问题描述：
&emsp;&emsp;项目下已经安装`express-art-template`
或者全局安装`express-art-template`，在`require('express-art-template')`时
仍然报`Cannot find module express-art-template`
##### 状态：<font color=#008000 >已解决</font>

##### 解决办法：require代码是没有问题的，尝试另起一行重新写了一遍一模一样的require代码，删除原先的require代码，就好了，就好了？？，就好了？？？？

##### 相关知识：


> 相关链接：https://sobird.me/node-path-module-talk-about.htm      (NODE_PATH浅谈) 

>&emsp;&emsp;凡是第三方模块都可以通过npm来下载
使用的时候可以同require('包名')的方式进行加载才可以使用（非路径形式）
不可能有一个第三方名字与核心模块名字相同
查找规则（以art-template模块为例）
> 1. 先找到当前文件所处目录中的node_modules目录（这个目录就是用来存放第三方模块的）
> 2. 找node_modules/art-template
> 3. 找node_modules/art-template/package.json 文件
> 4. 找node_modules/art-template/package.json文件中的“main”属性
mian属性中就记录了art-template的入口模块
> 5. 然后加载使用这个第三方包，实际上最后加载的还是文件
如果package.json文件不存在或者main指定的入口模块也没有，则node会自动找该目录下的index.js作为默认备选项
> 6. 若以上所有任何一个条件都不成立，则会进入上一级目录中的node_modules目录查找，规则如上
> 7. 如果上一级还没有，则继续往上上一级查找，知道磁盘根目录还找不到，最后报错：can not find module xxx，==反正要找到node_modules目录==


-----

### 2、
#### 问题描述：

运行`yarn android`报错

```
Could not unzip C:\Users\Administrator\.gradle\wrapper\dists\gradle-6.2-all\dvufqs6kielxeao781pmk5huj\gradle-6.2-all.zip to C:\Users\Administrator\.gradle\wrapper\dists\gradle-6.2-all\dvufqs6kielxeao781pmk5huj.
Reason: error in opening zip file
```

##### 状态：<font color=#008000 >已解决</font>

##### 解决办法：直接浏览器下载gradle-6.2-all.zip文件，复制到指定文件夹中

------
### 3、
#### 问题描述：运行`yarn android`报错
```
Could not determine the dependencies of task ':app:installDebug'.
> Failed to install the following Android SDK packages as some licences have not been accepted.
     build-tools;28.0.3 Android SDK Build-Tools 28.0.3
     platforms;android-29 Android SDK Platform 29
```

##### 状态：<font color=#008000 >已解决</font>

##### 解决办法：Android SDK文件夹内的build-tools文件夹内缺28.0.3，platforms文件夹内缺android-29，下好文件解压放进去就行了

------
###  4、
#### 问题描述： js无法获取响应header的Content-Disposition字段（控制台看到了返回头，但是js获取不到）  
#### 发送协议请求一个文件流，需要在回包里拿到响应头里的Content-Disposition字段的值，从中分离出文件名，控制台可以看到，但是js获取不到

##### 状态：<font color=#008000 >已解决</font>

### 原因：
根据MDN文档：Access-Control-Expose-Headers
默认情况下，header只有六种 simple response headers （简单响应首部）可以暴露给外部：
Cache-Control
Content-Language
Content-Type
Expires
Last-Modified
Pragma
这里的暴露给外部，意思是让客户端可以访问得到，既可以在Network里看到，也可以在代码里获取到他们的值。
上面问题提到的content-disposition不在其中，所以即使服务器在协议回包里加了该字段，但因没“暴露”给外部，客户端就“看得到，拿不到”。
而响应首部 Access-Control-Expose-Headers 就是控制“暴露”的开关，它列出了哪些首部可以作为响应的一部分暴露给外部。
所以如果想要让客户端可以访问到其他的首部信息，服务器不仅要在heade里加入该首部，还要将它们在 Access-Control-Expose-Headers 里面列出来
#### 解决办法：
返回头设置：
`res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition')`

------
###  5、
#### 问题描述： element-ui框架中Message组件连续调用重叠问题

##### 状态：<font color=#008000 >已解决</font>

#### 解决办法：

```
setTimeout(()=> {
  this.$message({
      message: '提示信息',
      showClose: true
  })
},0)
```

------
###  6、
#### 问题描述： 多个仓库提交，其中github提示：‘Logon failed, use ctrl+c to cancel basic credential prompt.’

##### 状态：<font color=#008000 >已解决</font>

#### 解决办法：

在git bash 命令行下输入如下的命令
```
setx GIT_TRACE ""
setx GCM_TRACE ""
```
之后关闭所有的console，然后在开启一个重新push登陆

### 7 、Debian安装NVM出错
Failed to connect to raw.githubusercontent.com port 443

问题

执行 sudo docker-compose up -d nginx mysql指令，报错：

Service 'workspace' failed to build. Failed to connect to raw.githubusercontent.com port 443: Connection refused. /bin/sh: 1: .: Can't open /home/laradock/.nvm/nvm.sh

原因

由于某些你懂的因素，导致GitHub的raw.githubusercontent.com域名解析被污染了。

解决方法

通过修改hosts解决此问题。

查询真实IP

在https://www.ipaddress.com/查询raw.githubusercontent.com的真实IP。

修改hosts

sudo vim /etc/hosts

添加如下内容：

199.232.28.133 raw.githubusercontent.com

重新执行

重新执行sudo docker-compose up -d nginx mysql 即可。