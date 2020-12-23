// 响应式
function defineReactive(obj, key, val) {
    // 问题1 递归-针对深对象
    observe(val)
    // 对传入的obj进行访问拦截
    Object.defineProperty(obj, key, {
        get() {
            console.log('get>>:', key)
            return val
        },
        set(newVal) {
            if(newVal !== val){
                console.log('set>>' + key + ':' + newVal)
                // 问题2 如果传入的newVal依然是obj，需要做响应式处理
                observe(newVal)  // 针对赋值为对象
                val = newVal
            }
        }
    })
}

function observe(obj) {
    if(typeof obj !== 'object' || obj == null) {
        // 希望传入的是obj
        return 
    }

    Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key])
    })
}

// defineReactive(obj, 'foo', 'foo')

// obj.foo
// obj.foo = 'foooooooooooo'

const obj = {foo: 'foo', bar: 'bar', baz: {a:1}, arr: []}

// 遍历做响应化处理
observe(obj)

function set(obj, key, val) {
    /**
     * 问题3 其他代码
     */
    defineReactive(obj, key, val)
}

obj.foo
obj.foo = 'foooooooo'
obj.bar
obj.bar = 'barrrrrrrr'

/**
 * 问题1. 深对象无法监听
 * 问题2. 对象属性直接设置为对象，新设置的对象无法监听
 * 问题3. 新加的属性无法监听
 * 问题4. 对象属性为数组，无法监听
 */

// obj.baz.a = 10  // 问题1 递归后可以
obj.baz = { a:100 }  // 问题2 这样不可以，因为set的时候没有经过监听方法
obj.baz.a = 100000

// obj.dong = 'dong'    // 问题3 这样设置新的属性没有监听，实现一个set方法
// obj.dong = 'dongdongdong'

set(obj, 'dong', 'dong')
obj.dong
obj.dong = 'dongdongdong'

// Object.defineProperty 对数组无效
// 改变数组的方法有7个，覆盖数组的7个方法
// 替换数组实例的原型方法，使之可以修改数组的同时，发出通知
obj.arr.push(1)