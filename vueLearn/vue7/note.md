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