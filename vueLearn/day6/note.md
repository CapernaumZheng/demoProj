##### 1. Vue cli
...略

##### 2. 处理资源路径

当在js、css或vue文件中使用相对路径（必须以`.`开头）引用一个静态资源时，该资源将被webpack处理

##### 转换规则：

1. 如果URL是一个绝对路径(/imgs/test.jpg)，将会保留不变
   ```
    <img src="/assets/logo.png">
    <img src="http://www.xxxx.com/assets/logo.png">
   ```
2. 如果URL以`.`开头会作为一个相对模块请求被解释并基于文件系统相对路径
   ```
    <img src="./assets/logo.png">
   ```
3. 如果URL以～开头会作为一个模块请求被解析，可以引用Node模块中的资源
   ```
   <img src="~some-npm-package/foo.png">
   ```
4. 如果URL以@开头，`vue cli会默认设置一个指向src的别名@`
   ```
   import Hello from '@/components/Hello.vue'
   ```


##### 何时使用public文件夹

通过webpack处理有好处：

+ 脚本和样式表会被压缩且打包在一起，从而避免额外的网络请求
+ 文件丢失会直接在编译时报错，而不是到了用户端才产生404错误
+ 最终生成的文件名包含了内容哈希，因此你不必担心浏览器会缓存老版本

如下情况考虑使用public文件夹：

+ 你需要在构建输出中指定一个固定的文件名字
+ 你有上千个图片，需要动态引用它们的路径
+ 有些和webpack不兼容的库，需要独立的\<script\>标签引入

<font color=#FF0000 >
public文件夹使用注意：

可能需要在webpack配置publicPath
</font>