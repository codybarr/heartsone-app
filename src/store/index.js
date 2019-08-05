import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import cards from './cards.module'
import user from './user.module'
// import decks from './decks.module'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		cards,
		user
	}
})
