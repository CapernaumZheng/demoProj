// 插件需要实现install
const MyPlugin = {
    install(Vue, options) {
        Vue.component('heading', {
            functional: true,
            props: {
                level: {
                    type: Number,
                    required: true
                },
                title: {
                    type: String,
                    default: ''
                },
                icon: String
            },
            render(h, context) {
                let children = []

                // 属性获取
                const { icon, title, level } = context.props

                if(icon) {
                    children.push(h(
                        'span',
                        {class: 'icon'},
                        [h(
                            'img',
                            {attrs: {src: '../../day4/codes/' + icon + '.svg'}}
                        )]
                    ))
                }

                // 拼接子节点

                children = children.concat(context.children)

                const vnode = h(
                    'h' + level,
                    { attrs: {title} },
                    children
                )

                console.log('vnode :>> ', vnode)
                return vnode
            },
        })
    }
}

if(typeof window !== 'undefined' && window.Vue) {
    // 使用插件 Vue.use()
    window.Vue.use(MyPlugin)
}