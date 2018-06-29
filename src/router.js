import Vue from 'vue'
import Router from 'vue-router'
import Search from './views/Search.vue'
import Decks from './views/Decks.vue'
import Card from './views/Card.vue'

Vue.use(Router)

const router = new Router({
    routes: [{
        path: '/',
        name: 'search',
        component: Search
    },
    {
        path: '/decks',
        name: 'decks',
        component: Decks
    },
    {
        path: '/card/:id/:name?',
        name: 'card',
        component: Card
    },
    {
        path: '*',
        redirect: '/'
    }]
})

// NProgress settings
NProgress.configure({ showSpinner: false });

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