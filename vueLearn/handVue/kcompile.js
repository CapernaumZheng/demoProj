// 编译器
// 递归遍历dom树
// 判断节点类型，如果是文本，判断是否是插值绑定
// 如果是元素，则遍历其属性判断是否是指定或者事件，然后遍历子元素

class Compiler {
    // el是宿主元素
    // vm是kVue实例
    constructor(el, vm) {
        this.$vm = vm
        this.$el = document.querySelector(el)

        if(this.$el) {
            //执行编译
            this.compile(this.$el)
        }
    }

    compile(el) {
        //遍历el树
        const childNodes = el.childNodes
        Array.from(childNodes).forEach(node => {
            // 判断是否是元素
            if(this.isElement(node)) {
                console.log('编译元素', node.nodeName)

                this.compileElement(node)
            } else if(this.isInter(node)) {
                console.log('编译插值绑定', node.textContent)

                this.compileText(node)
            }

            // 递归子节点
            if(node.childNodes && node.childNodes.length > 0) {
                this.compile(node)
            }
        });
    }

    // 判断是否是元素
    isElement(node) {
        return node.nodeType === 1
    }

    //判断是否是文本
    isInter(node) {
        // 首先是文本，内容是{{XX}}
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }

    compileText(node) {
        console.log('$vm is', this.$vm)
        this.update(node, RegExp.$1, 'text')
    }

    compileElement(node) {
        // 节点是元素
        // 遍历其属性列表
        const nodeAttrs = node.attributes
        Array.from(nodeAttrs).forEach(attr => {
            // 规定，指令以k-xx="oo" 定义
            const attrName = attr.name   // k-xx => k-text
            const exp = attr.value  // oo => counter
            if(this.isDirective(attrName)) {
                const dir = attrName.substring(2)  // xx => text
                // 执行指令
                this[dir] && this[dir](node, exp)  // this.text(node, 'counter')
            }

        })
    }

    isDirective(attr) {
        return attr.indexOf('k-') === 0
    }

    // k-text
    text(node, exp) {
        this.update(node, exp, 'text')
    }

    // k-html
    html(node, exp) {
        this.update(node, exp, 'html')
    }

    // 更新函数
    update(node, exp, dir) {
        // 初始化
        // 指令对应的更新函数，xxUpdater
        const fn = this[dir + 'Updater']
        fn && fn(node, this.$vm[exp])

        new Watcher(this.$vm, exp, function(val) {
            fn && fn(node, val)
        })
    }

    textUpdater(node, value) {
        node.textContent = value
    }


    htmlUpdater(node, value) {
        node.innerHTML = value
    }
}