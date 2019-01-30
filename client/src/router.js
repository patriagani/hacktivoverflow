import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "about" */ './views/Register.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "about" */ './views/Dashboard.vue')
    },
    {
      path: '/question/:questionId',
      name: 'question',
      component: () => import(/* webpackChunkName: "about" */ './views/Question.vue')
    },
    {
      path: '/question/edit/:questionId',
      name: 'editquestion',
      component: () => import(/* webpackChunkName: "about" */ './views/EditQuestion.vue')
    },
    {
      path: '/answer/edit/:answerId',
      name: 'editasnwer',
      component: () => import(/* webpackChunkName: "about" */ './views/EditAnswer.vue')
    }
  ],
  mode: 'history'
})
