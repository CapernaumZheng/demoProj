## 模板语法

#### 1. Vue模板语法

```
{{data}}

<h2 :title="title">
    {{title}}
 </h2>
```
#### 2. 列表渲染
   
```
<div v-for="item in list" :key="item">
    {{ item }}
</div>
```

#### 3. 表单输入绑定

```
v-model

<input v-model="value" type="text" />
```


#### 4. 事件处理

```
<button @click="submit"></button>
```

#### 5. 绑定style和class

```
<div v-for="item in list" :key="item" 
    :class="{active: selected === item}"
    @click="selected = item">
    {{ item }}
</div>
<div v-for="item in list" :key="item"
    @click="selected = item"
    :style="{backgroundColor: selected === item ? '#ddd' : 'transparent'}">
    {{ item }}
</div>
```

#### 6. 条件渲染

```
v-if
v-else
v-show
```

#### 7. 模板语法

`模板被编成成js`

#### 8. 计算属性和监听器

```
// 计算属性
computed: {
    total() {
        return this.list.length + '个' 
    }
},
```
   
+ 计算属性有缓存性：如果值没有发生变化，则页面不会重新渲染
+ 监听器选项提供了更通用的方法，适合执行异步操作或较大开销操作的情况

```
// 监听器
watch: {
    // 默认情况下watch初始化时不执行
    list(newValue, oldValue) {
        this.totalCount = newValue.length + '个'
    }
},
watch: {
    list: {
        // 立即执行
        immediate: true,
        // 深度监听
        deep: true,
        handler(newValue, oldValue) {
            this.totalCount = newValue.length + '个'
        }
    }
},
```

#### 9. 生命周期

每个vue实例在被创建时都要经过一系列的初始化过程，需要设置数据监听、编译模板、将实例挂载到DOM并在数据变化时更新DOM等，称为Vue实例的生命周期


##### 使用场景分析：

```
beforeCreate() {}   
// 执行时，组件实例还未创建，通常用于插件开发中执行一些初始化任务
created() {}
// 组件初始化完毕，各种数据可以使用，常用于异步数据获取
beforeMounted() {}
// 未执行渲染，更新、dom未创建
mounted() {}
// 初始化结束，dom已创建，可用于获取访问数据和dom元素
beforeUpdate() {}
// 更新前，可用于获取更新前各种状态
updated() {}
// 更新后，所有状态已是最新
beforeDestroy() {}
// 销毁前，可用于一些定时器或订阅的取消
destroyed() {}
// 组件已销毁，作用同上
```

#### 10. 组件化

1.组件是可复用的vue实例

```
Vue.component(id, [definition])
```

2.自定义事件及监听

```
this.$emit('event', […args])
```

3.自定义组件实现双绑

##### （数据状态放在父组件，进一步使组件内聚高可用）

```

v-model="test"会被转化为：

:value="test" @input="test-$event"

```



```
// 父组件中
<my-add @add-one="addList" v-model="test"></my-add>

addList() {
    this.test && this.list.push(this.test)
    this.test = ''
}

// 新增组件-实现双绑
Vue.component('my-add', {
    props: {
        // 这里是固定的value
        // 因为v-model转化为:value=""
        value: {
            type: String,
            default: ''
        }
    },
    template: `
        <div>
            <input type="text" :value="value"
            @input="onInput"
            v-on:keydown.enter="addList">
            <button @click="addList">新增</button>
        </div>
    `,
    methods: {
        addList() {
            this.$emit('add-one')
        },
        onInput(e) {
            this.$emit('input', e.target.value)
        }
    },
})
```

4. 通过插槽分发内容

```
:show.sync="ifShow"  => @update:show=""
父组件省一步处理，相当于子组件更新父组件数据
```

#### 11. 组件化的理解

##### 定义：
组件化是可复用的vue实例，准确讲它们是VueComponent的实例，继承自vue
##### 优点：
组件化可以增加代码的复用性、可维护性和可测试性
##### 使用场景：
+ 通用组件：实现最基本的功能，具有通用性，复用性，例如按钮组件、输入框组件、布局组件等
+ 业务组件：它们完成具体业务，具有一定的复用性，例如登陆组件，轮播图组件
+ 页面组件：组织应用各部分独立内容，需要时在不同页面组件间切换，例如列表页，详情页组件
##### 如何使用组件：
- 定义：Vue.component(),components选项，sfc
- 分类：有状态组件，functional，abstract
- 通信：props，\$emit()/$on(),provide/inject,\$children/\$parent/\$root/\$attrs/\$listeners
- 内容分发：\<slot>，\<template>,v-slot
- 使用及优化：is、keep-alive、异步组件
##### 组件的本质
vue中的组件经历如下过程
组件配置->VueComponent实例->render()->Virtual DOM->DOM
组件的本质是产生虚拟DOM
