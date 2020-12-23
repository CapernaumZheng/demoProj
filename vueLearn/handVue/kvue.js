
// 创建kvue构造函数

function defineReactive(obj, key, val) {
    observe(val)


    // 创建一个Dep和当前key一一对应
    const dep = new Dep()

    Object.defineProperty(obj, key, {
        get() {
            console.log('get>>:', key)
            // 依赖收集在这里
            Dep.target && dep.addDep(Dep.target)
            return val
        },
        set(newVal) {
            if(newVal !== val){
                console.log('set>>' + key + ':' + newVal)
                observe(newVal) 
                val = newVal

                // 
                // watchers.forEach(w => w.update())
                debugger
                dep.notify()
            }
        }
    })
}

function observe(obj) {
    if(typeof obj !== 'object' || obj == null) {
        // 希望传入的是obj
        return 
    }

    // 创建Observer实例（）
    new Observer(obj)
}

// 代理函数，方便用户直接访问$data中的数据
function proxy(vm, sourceKey) {
    Object.keys(vm[sourceKey]).forEach(key => {
        // 将$data中的key代理到vm属性中
        Object.defineProperty(vm, key, {
            get() {
                return vm[sourceKey][key]
            },
            set(newVal) {
                vm[sourceKey][key] = newVal
            }
        })
    })
}




class kVue {
    constructor(options) {
        // 保存选项

        this.$options = options
        // 响应化处理
        this.$data = options.data
        observe(this.$data)

        // 代理,可以直接访问
        proxy(this, '$data')


        // 创建编译器
        new Compiler(options.el, this)
    }
}

// 根据数据类型决定如何做响应化
class Observer {
    constructor(value) {
        this.value = value

        // 判断其类型
        if(typeof value === 'object') {
            this.walk(value)
        }
    }

    // 对象数据的响应化
    walk(obj) {
        Object.keys(obj).forEach(key => {
            defineReactive(obj, key, obj[key])
        })
    }


    // 数组数据的响应化
    /**
     * 待补充
     */
}


// 观察者：保存更新函数，值发生变化调用更新函数
// const watchers = []
class Watcher {
    constructor(vm, key, updateFn) {
        this.vm = vm
        this.key = key
        this.updateFn = updateFn

        // watchers.push(this)

        // Dep.target静态属性上设置为当前watcher实例
        Dep.target = this
        this.vm[this.key]   // 读取触发了getter
        Dep.target = null  // 收集完就置空
    }

    update() {
        this.updateFn.call(this.vm, this.vm[this.key])
    }
}

// Dep:依赖，管理某个key相关所有Watcher实例

class Dep {
    constructor() {
        this.deps = []
    }

    addDep(dep) {
        this.deps.push(dep)
    }

    notify() {
        this.deps.forEach(dep => dep.update())
    }
}