/* eslint-disable */

import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import { FETCH_CARDS } from '@/store/actions.type'

// Font-Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSort, faSortUp, faSortDown, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faSort, faSortUp, faSortDown, faHeart)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// Filters
import CapitalizeFilter from '@/common/capitalize.filter'
import LowerCaseFilter from '@/common/lowercase.filter'
Vue.filter('capitalize', CapitalizeFilter)
Vue.filter('lowercase', LowerCaseFilter)

// Firebase
import './initFirebase'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    comments: true,
    created() {
        store.dispatch(FETCH_CARDS)
    },
    render: h => h(App)
}).$mount('#app')
