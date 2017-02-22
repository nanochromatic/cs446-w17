import Vue from 'vue'
import Router from 'vue-router'
import Landing from 'pages/Landing'
import Single from 'pages/Single'
import Multi from 'pages/Multi'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/sp',
      name: 'Single Player',
      component: Single
    },
    {
      path: '/mp',
      name: 'Multiplayer',
      component: Multi
    }
  ]
})
