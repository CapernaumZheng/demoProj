#### 1. 渲染函数

在一些场景中，需要js的完全编程能力，可以使用渲染函数，比模板更接近编译器

##### 基础

```

render: function(createElement) {
    // createElement函数会返回VNode
    return createElement (
        tag,   // 标签名称
        data,  // 传递数据
        children // 子节点数组
    )
}


// createElement一般使用h代替
```

##### 范例
```
Vue.component('heading', {
    props: ['level', 'title'],
    render(h) {
        return h (
            'h' + this.level,
            children
        )
    }
})
```

#### 2. 虚拟DOM

vue通过建立一个虚拟DOM来追踪自己要如何改变真实DOM

##### 范例

```
// 输出虚拟DOM观察其结构
Vue.component('heading', {
    props: {
        level: {
            type: Number,
            required: true
        }
    },
    render(h) {
        const vnode = h(
            'h' + this.level,
            this.$slots.default
        )
        console.log('vnode :>> ', vnode)
        return vnode
    },
})

```

#### 3. createElement参数
```
// @return {VNode}
createElement (
    // {String | Object | Function}
    // 一个HTML标签名，组件选项对象，或者reslove了上述任何一种的一个async函数
    //必填项



    // { Object }
    // 一个与模板中属性对应的数据对象，可选
    {
        // ....
    },



    // {String | Array}
    // 子级虚拟节点 { VNodes }，由createElement()构建而成
    // 也可以使用字符串来生成"文本虚拟节点"，可选
    [
        '先写一些文字',
        createElement('h1', '一则头条'),
        createElement(MyComponent, {
            props: {
                someProp: 'foobar'
            }
        })
    ]
)
```