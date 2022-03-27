import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/Home'
    },
    {
      path: '/Home',
      name: 'Home',
      meta: {
        title: "首页"
      },
      component: () => import("../components/Home.vue"),
    }
  ]
})
