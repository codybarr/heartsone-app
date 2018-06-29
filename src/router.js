import Vue from 'vue'
import Router from 'vue-router'
import Search from './views/Search.vue'
import About from './views/About.vue'
import Card from './views/Card.vue'

Vue.use(Router)

const router = new Router({
    routes: [{
        path: '/',
        name: 'search',
        component: Search
    },
    {
        path: '/about',
        name: 'about',
        component: About
    },
    {
        path: '/card/:id/:name?',
        name: 'card',
        component: Card
    }]
})

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
      // Start the route progress bar.
      NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

export default router