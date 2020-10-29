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


