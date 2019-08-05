/* eslint-disable */

import { CardService } from '@/common/api.service'
import { FETCH_CARDS } from './actions.type'
import { FETCH_START, SET_CARDS } from './mutations.type'

const state = {
	cards: [],
	card: null,
	isLoading: true
}

const getters = {
	cards(state) {
		return state.cards
	},
	isLoading(state) {
		return state.isLoading
	}
}

const actions = {
	[FETCH_CARDS]({ commit }) {
		commit(FETCH_START)
		return CardService.getAllCards()
			.then(({ data }) => {
				commit(SET_CARDS, data)
			})
			.catch(error => {
				console.log(error)
				throw new Error(error)
			})
	}
}

const mutations = {
	[FETCH_START](state) {
		state.isLoading = true
	},
	[SET_CARDS](state, cards) {
		state.cards = cards
		state.isLoading = false
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
