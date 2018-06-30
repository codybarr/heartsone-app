import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import { FETCH_CARDS } from '@/store/actions.type'

/* Imports */
// Font-Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Filters
import CapitalizeFilter from '@/common/capitalize.filter'
import LowerCaseFilter from '@/common/lowercase.filter'

/* Add to Vue */
// Font-Awesome
library.add(faSort, faSortUp, faSortDown)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// Filters
Vue.filter('capitalize', CapitalizeFilter)
Vue.filter('lowercase', LowerCaseFilter)

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
