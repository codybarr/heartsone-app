/* eslint-disable */

import { CardService } from '@/common/api.service'
import { FETCH_CARDS, FETCH_CARD } from './actions.type'
import { FETCH_START, SET_CARDS, SET_CARD } from './mutations.type'

const state = {
    cards: [],
    card: null,
    isLoading: true
}

const getters = {
    cards(state) {
        return state.cards
    },
    card(state) {
        return state.card
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
            .catch((error) => {
                console.log(error)
                throw new Error(error)
            })
    },
    // [FETCH_CARD] ({ commit }, id) {
    //   commit(FETCH_START)
    //   return CardService.getAllCards()
    //     .then(({ data }) => {
    //       console.log('Data', data)
    //       commit(SET_CARD, data.find(card => card.dbfId.toString() === id))
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //       throw new Error(error)
    //     })
    // },
    [FETCH_CARD](context, id) {
        return CardService.getAllCards()
            .then(({ data }) => {
                context.commit(SET_CARD, data.find(card => card.dbfId.toString() === id))
                return data
            })
    },
}

/* eslint no-param-reassign: ["error", { "props": false }] */
const mutations = {
    [FETCH_START](state) {
        state.isLoading = true
    },
    [SET_CARDS](state, cards) {
        console.log('Cards: ', cards)
        state.cards = cards
        state.isLoading = false
    },
    [SET_CARD](state, card) {
        console.log('Card:', card)
        state.card = card
        state.isLoading = false
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
