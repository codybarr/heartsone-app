import Vue from 'vue'

import App from '@/App.vue'
import router from '@/router'

import store from '@/store'
import { FETCH_CARDS } from '@/store/actions.type'

import CapitalizeFilter from '@/common/capitalize.filter'
import LowerCaseFilter from '@/common/lowercase.filter'

Vue.config.productionTip = false
Vue.filter('capitalize', CapitalizeFilter)
Vue.filter('lowercase', LowerCaseFilter)

new Vue({
    router,
    store,
    comments: true,
    created() {
        store.dispatch(FETCH_CARDS)
    },
    render: h => h(App)
}).$mount('#app')
