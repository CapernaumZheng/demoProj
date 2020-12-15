import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Admin.vue')
  },
  {
    path: '/day9',
    name: 'day9',
    component: () =>
      import('../views/day9/index.vue'),
    children: [
      {
        path: 'day9params',
        name: 'day9params',
        component: () => import('../views/day9/param/index.vue')
      },
      {
        path: 'day9slot',
        name: 'day9slot',
        component: () => import('../views/day9/slot/index.vue')
      },
      {
        path: 'day9kform',
        name: 'day9kform',
        component: () => import('../views/day9/kForm/index.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  // eslint-disable-next-line no-undef
  base: process.env.BASE_URL,
  routes
})

export default router
