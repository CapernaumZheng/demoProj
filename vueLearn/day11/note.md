### Vue源码
1. clone代码库
    `git clone https://github.com/vuejs/vue.git`
2. 安装依赖
   `npm i`
3. 安装rollup
   `npm i -g rollup` 
4. 修改dev脚本，添加sourcemap，package.json
   `"dev": "rollup -w -c scripts/config.js --sourceMap --environment TARGET:web-full-dev"`
#### 目录解释：
dist: `发布目录`
examples：`范例，测试代码`
flow：`针对flow的类型声明`
packages：`核心代码之外的独立库`
scripts：`构建脚本`
src：`源码`
&emsp;|---compiler: `编译器相关`
&emsp;|---core：`核心代码`
&emsp;&emsp;&emsp;|---components: `通用组件，如：keep-alive ` 
&emsp;&emsp;&emsp;|---global-api: `全局api`
&emsp;&emsp;&emsp;|---instance：`构造函数等`
&emsp;&emsp;&emsp;|---observer：`响应式相关`
&emsp;&emsp;&emsp;|---vdom: `虚拟DOM相关`
types：`ts类型声明`
#### 名词解释
+ runtime：仅包含运行时，不包含编译器
+ common：cjs规范，用于webpack1
+ esm：ES模块，用于webapck2+
+ umd：universal module definition.，兼容cjs和amd，用于浏览器
#### 研究
##### src\platforms\web\entry-runtime-with-compiler.js
入口文件，覆盖$mount，执行模板解析和编译工作
##### src\platforms\web\runtime\index.js
定义$mount
##### src\core\index.js
定义全局API
##### src\core\instance\index.js
定义构造函数地方
##### src\core\instance\init.js
初始化方法_init定义处
创建的时候是自上而下的，挂载是自下而上的
```
    initLifecycle(vm)   // 声明$parent、$root、$children、$refs
    initEvents(vm)     // 添加监听父组件传入事件和回调
    initRender(vm)     // 声明$slots,$createElement()
    callHook(vm, 'beforeCreate')
    initInjections(vm) // 注入数据
    initState(vm)     // 数据的初始化，响应式
    initProvide(vm) // 提供数据
    callHook(vm, 'created')
```
### 初始化过程