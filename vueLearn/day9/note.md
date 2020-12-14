### Vue组件化
#### 组件通信常用方式：
1. ##### props (父给子传值)
   ```
   // child
   props: { msg: string }
   // parent
   <Helloworld msg="welcome">
   ```
2. ##### eventbus(任意组件传参)
    ```
    // Bus: 事件派发、监听和回调管理
    class Bus {
        constructor() {
            this.callbacks = {}
        }
        $on(name, fn) {
            this.callbacks[name] = this.callbacks[name] || []
            this.callbacks[name].push(fn)
        }
        $emit(name, args) {
            if(this.callbacks[name]) {
                this.callbacks[name].forEach(cb => cb(args))
            }
        }
    }
    // main.js
    Vue.prototype.$bus = new Bus()
    //child1
    this.$bus.$on('foo', handle)
    ///child2
    this.$bus.$emit('foo')
    ```
3. ##### vuex
4. ##### 自定义事件 ($emit子给父传值)
   ```
   // child
   this.$emit('add', good)
   // parent
   <Cart @add="cartAdd($event)"></Cart>
   ```
5. ##### 边界情况 
  - ##### \$parent/\$root
    &emsp;&emsp;兄弟组件之间通信可通过共同祖辈搭桥，\$parent或\$root
    ```
    // brother1
    this.$parent.$on('foo', handle)
    // brother2
    this.$parent.$emit('foo')
    ```
  - ##### $children
    ==这里注意，\$children拿到的子组件不能保证顺序==
  - ##### $refs
  - ##### provide/inject
    &emsp;&emsp;能够实现祖先和后代之间传值
```
// 祖先
provide() {
    return {foo: 'foo'}
}
// 后代
inject: ['foo']
```
 ##### 非prop特性
  - ##### \$attrs
  - ##### \$listeners
   &emsp;&emsp;\$attrs包含了父作用域中不作为prop被识别（且获取）的特性绑定（class和style除外）。当一个组件没有声明任何prop时，这里会包含所有父作用域的绑定（class和style除外），并且可以通过v-bind="\$attrs"传入内部组件，在创建高级别组件时非常有用
```
//child，并未在props中声明foo
<p>{{$attrs.foo}}</p>
// parent
<Helloworld foo="foo" />
```
&emsp;&emsp;\$listeners直接在父组件内对子组件添加事件，子组件内添加\$listeners监听
```
//child中监听  
//$listeners会被展开并监听  
<p v-on="$listeners"></p>  
// parent
// <Helloworld @click="fatherMethod" />
```
#### 插槽
插槽语法是Vue实现的内容分发API，用于复合组件开发