#### 统一状态管理vuex
vuex是一个专为vue.js应用程序开发的状态管理模式，采用集中式存储管理应用的所有组件状态
store => 包含：state,Mutation,Action
##### 1. state
全局状态定义在state中(==在内存中，刷新页面丢失==)
```
state: {
    isLogin: false
}
```
##### 实例：
声明store
```
import Vuex from 'vuex'
export default new Vuex.store({
    state: {
        isLogin: false
    },
    mutations: {
    },
    actions: {
    },
    modules: {
    }
})
```
获取store
```
import store from './store'
if(store.isLogin) {
    // ...
}
this.$store.state.isLogin
```
##### 2. Mutation
修改state只能通过mutation
```
mutations: {
    login(state) {
        state.isLogin = true
    },
    loginout(state) {
        state.isLogin = false
    }
}
```
修改store
```
this.$store.commit('login')
```
##### 3. Action
类似于Mutation，不同在于
+ Action提交的是mutation
+ Action可以包含任意异步操作
```
actions: {
    // 参数1是vuex传递的上下文context: {commit, dispatch, state}
    login({commit}, username) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(username === 'admin') {
                    commit('login')
                    resolve()
                }else{
                    reject()
                }
            }, 1000)
        })
    }
}
```
派发动作
```
this.$store.dispatch('login', 'admin').then(() => {
    this.$router.push(this.$router.query.redirect)
}).catch(()=> {
    alert('用户名或密码错误')
})
```
##### 模块化
```
import Vuex from 'vuex'
import user from './user'
export default new Vue.store({
    modules: {
        user
    }
})
```
user.js
```
export default {
    namespaced: true,  // 设置独立的命名空间，避免命名冲突
    state: {
        isLogin: false
    },
    mutations: {
        test(state) {
            // ...
        }
    },
    actions: {
        login({commit}, userName) {
            // ....
        }
    }
}
```
使用：
```
this.$store.user.isLogin
this.$store.user.commit('test')
this.$store.dispatch('user/login','admin').then(()=>{})
映射：
import { mapState } from 'vuex'
computed: {
    ...mapState('user', ['isLogin'])
}
computed: {
    ...mapState({
        isLogin: state => state.user.isLogin
    })
}
{{isLogin}}
------
import {mapActions} from 'vuex'
methods: {
    login() {
        this['user/login']('admin').then(...)
    },
    ...mapActions([
        'user/login',  // this['user/login']
        'user/logout'
    ])
    ...mapActions('user/', [
        'login', // -> this.login()
        'logout' // -> this.logout()
    ])
}
```
##### 4. Getters
可以使用getter从store的state中派生出一些状态
(相当于在vuex中的计算属性)
user.js
```
export default {
    namespaced: true,
    state: {
        isLogin: false,
        username: ''
    },
    mutations: {
        setUserName(state, username) {
            state.username = username
        }
    },
    getters: {
        //派生出欢迎信息
        welcome: state => {
            return state.username + '，欢迎回来'
        }
    },
    actions: {
        // ...
    }
}
```
获取派生状态
```
import { mapGetters } form 'vuex'
computed: {
    ...mapGetters('user', ['welcome'])
}
```

##### 5. 严格模式
 strict: true
```
import Vuex from 'vuex'
export default new Vuex.store({
    state: {
        isLogin: false
    },
    mutations: {
    },
    actions: {
    },
    modules: {
    },
    strict: true
})
```

#### 6. vuex插件
vuex的store接受plugins选项，这个选项暴露每次mutation的钩子。vuex插件就是一个函数，接收store作为唯一参数
```
const myPlugin = store => {
    // 当store初始化调用
}
```
注册插件
```
const store = new Vuex.store({
    //...
    plugins: [myPlugin]
})
```
实例：
状态信息持久化
```
export default store => {
    // store初始化的时候，将存储在localStorage中的状态还原
    if(localStorage) {
        const user = JSON.parse(localStorage.getItem('user'))
        if(user) {
            // 提交mutation将某个状态设置为user.username的值
            store.commit('login', user.username)
        }
    }
    // 如果用户相关状态发生变化，自动存入localStorage
    store.subscribe((mutation, state) => {
        // {type: 'user/login'}
        // {type: 'user/logout'}
        if(mutation.type === 'user/login') {
            const user = JSON.stringify(state.user)
            localStorage.setItem('user', user)
        }else if(mutation.type === 'user/logout') {
            localStorage.removeItem('user')
        }
    })
}
```