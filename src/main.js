import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import { FETCH_CARDS } from '@/store/actions.type'

/* Imports */
// Font-Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
// consider 'gem' for mana, 'shield-alt' for durability,
// heart or possibly 'tint' for health
// no sword yet https://github.com/FortAwesome/Font-Awesome/issues/1449
import { faSort, faSortUp, faSortDown, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Filters
import CapitalizeFilter from '@/common/capitalize.filter'
import LowerCaseFilter from '@/common/lowercase.filter'

/* Add to Vue */
// Font-Awesome
library.add(faSort, faSortUp, faSortDown, faHeart)
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
