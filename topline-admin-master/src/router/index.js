import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/views/index'),
      name: 'index'
    },
    {
      path: '/upload',
      component: () => import('@/views/upload'),
      name: 'upload'
    }
  ]
})
