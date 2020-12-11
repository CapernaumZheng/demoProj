#### 1. Vue Router
基本用法
```
<div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/admin">Admin</router-link>
</div>
<router-view />
```
```
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'admin',
    component: () =>
      import('../views/Admin.vue')
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
```
##### 动态路由
把某种模式匹配到的所有路由，全都映射到同个组件。
在路由路径中增加动态路由参数
```
{ path: 'user/:name/:id', component: User }
```
获取路由参数
```
{{ $route.params }}
//  { "name": ":张三", "id": ":111" }
```
```
http://localhost:8080/user/:张三/:111
```
##### 通配符
适合做404页面路由
```
{
    // 匹配所有路径
    path: '*',
    component: () => import('../views/404.vue')
}
```
##### 嵌套路由
```
/user/post/test1
/user/post/test2
{
    path: '/user/post'
    name: 'name-post'
    component: () => import('../views/post.vue'),
    children: [
        {
            path: '/test1'
            name: 'test1'
            component: () => import('../views/post/test1.vue')
        }
    ]
}
```
##### 编程导航
`$router.push(location, onComplete?, onAbort?)`
```
// 字符串
$router.push('home')
// 对象
$router.push({ path: 'home' })
// 命名的路由
$router.push({ name: 'user', params: { userId: '123' }})
// 带查询参数，变成/register?plan=private
$router.push({ path: 'register', query: { paln: 'private' }})
```


##### 路由守卫

全局守卫

```
router.beforeEach(to, from, next) => {
  // ...
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来resolve这个钩子
}
```

路由独享守卫

```
{
  path: '/about',
  name: 'about',
  beforeEnter(to, from, next) {
    //...
  }
}
```

组件内守卫

```
beforeRouteEnter
beforeRouteUpdate
beforeRouteLeave
```
(跟生命周期同级)


##### 路由数据获取时机

2个时机

路由导航前

```
// 组件未渲染，通过给next传递回调访问组件实例
beforeRouteEnter(to, from, next) {
  getPost(to.params.id, post => {
    next(vm => vm.setData(post))
  })
}

// 组件已渲染，可以调用this直接赋值
beforeRouteUpdate(to, from, next) {
  this.post = null
  getPost(to.params,id, post=> {
    this.setData(post)
    next()
  })
}
```

路由导航后
create生命周期


##### 动态路由

通过router.addRoutes(routes)方式动态添加路由