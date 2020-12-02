#### 1. 过滤器

 适用于一些常见的文本格式化

```
 在花括号中
 {{ msg | capitalize }}

 在v-bind中
 <div v-bind:id="randId | formatId"></div>
 ```

 ##### 范例：

```
 // 显示货币符号的价格

 {{ c.price | currency('RMB') }}

 filters: {
     currency(value, symbol = '$') {
         return symbol + value
     }
 }
 ```

 ---

#### 2. 自定义指令

对普通DOM元素进行底层操作复用，会用到自定义指令

##### 范例：
```
// 输入框获取焦点
Vue.directive('focus', {
    inserted(el) {
        el.focus
    }
})

使用： <input v-focus />
```

###### 自定义指令的钩子函数：

+ `bind`:只调用一次。指令第一次绑定到元素上调用，可以进行初始设置
+ `inserted`:被绑定元素插入父节点时调用（仅保证父节点存在，但不一定被插入到文档中）
+ `update`: 所在的组件VNode更新时调用，==但是可能发生在其子VNode更新之前==
+ `componentUpdate`: 指令所在组件的VNode及其子VNode全部更新后调用
+ `unbind`: 只调用一次，指令与元素解绑时调用


钩子函数参数：`el`、`binding`、`vnode`、`oldVnode`


##### 范例：

```
Vue.directive('permission', {
    inserted(el, binding) {
        // 若指定用户角色和当前用户角色不匹配则删除当前指令绑定的的元素
        if(role !== binding.value) {
            el.parentElement.removeChild(el)
        }
    }
})
```

---

