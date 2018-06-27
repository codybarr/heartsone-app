import Vue from 'vue'
import Router from 'vue-router'
import Search from './views/Search.vue'
import About from './views/About.vue'
import Card from './views/Card.vue'

Vue.use(Router)

export default new Router({
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
