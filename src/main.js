import Vue from 'vue'

import App from '@/App.vue'
import router from '@/router'

import store from '@/store'
import { FETCH_CARDS } from '@/store/actions.type'

import CapitalizeFilter from '@/common/capitalize.filter'

Vue.config.productionTip = false
Vue.filter('capitalize', CapitalizeFilter)

new Vue({
    router,
    store,
    created() {
        store.dispatch(FETCH_CARDS)
    },
    render: h => h(App)
}).$mount('#app')
