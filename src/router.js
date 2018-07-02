import Vue from 'vue'
import Router from 'vue-router'
import Search from '@/views/Search.vue'

import Decks from '@/views/Decks.vue'
import PublicDecks from '@/views/decks/PublicDecks.vue'
import MyDecks from '@/views/decks/MyDecks.vue'

import Card from '@/views/Card.vue'

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
        component: Decks,
        children: [
            { path: '', name: 'publicDecks', component: PublicDecks },
            { path: 'mine', name: 'myDecks', component: MyDecks }
        ]
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
// eslint-disable-next-line
NProgress.configure({ showSpinner: false })

router.beforeResolve((to, from, next) => {
    // If this isn't an initial page load.
    if (to.name) {
        // Start the route progress bar.
        // eslint-disable-next-line
        NProgress.start()
    }
    next()
})

router.afterEach(() => {
    // Complete the animation of the route progress bar.
    // eslint-disable-next-line
    NProgress.done()
})

export default router
