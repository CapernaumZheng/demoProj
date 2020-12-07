#### 1. 函数式组件

组件没有管理任何状态，也没有监听任何传递给它的状态，也没有生命周期方法时，可以将组件标记为functional，这意味着它无状态（没有响应式数据），也没有实例（没有this上下文）


#### 2. 混入

混入（mixin）分发vue组件中可复用功能，一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项

 
<font color=#0000FF >
1.  data、methods、components 和 directives将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。      
</font> 
<br/>
<font color=#0000FF >
2.  同名钩子函数将合并为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子之前调用。
</font>

```
// 定义一个混入对象
var myMixin = {
    created: function() {
        this.hello()
    },
    methods: {
        hello: function() {
            console.log('Hello from mixin')
        }
    }
}

// 定义一个使用混入对象的组件
Vue.component('comp', {
    mixins: [myMixin]
})
```


#### 3. 插件

插件通常用来为Vue添加全局功能，插件的作用范围一般有以下几种：

1. 添加全局方法或者属性。如：vue-custom-element
2. 添加全局资源：指令/过滤器/过渡等。如：vue-router
3. 通过全局混入来添加一些组件选项。如：vue-router
4. 添加Vue实例方法，通过把它们添加到Vue.prototype上实现
5. 一个库，提供自己的API，同时提供上面提到的一个或多个功能。如：vue-router

##### 插件声明

Vue.js的插件应该暴露一个install方法，这个方法的第一个参数是Vue构造器，第二个参数是一个可选的选项对象

```
MyPlugin.install = function (Vue, options) {
    // 1. 添加全局方法或属性
    Vue.myGlobalMethod = function() {}

    // 2.添加全局资源
    Vue.directive('my-directive', {})

    // 3. 注入组件选项
    Vue.mixin({
        created: function() {
            // 代码
        }
    })

    // 4. 添加实例方法
    Vue.prototype.$myMethod = function (methodOptions) {}
}

```



   