/* eslint-disable */

import { UserService } from '@/common/api.service'
import { LOGIN, LOGOUT } from './actions.type'
import { LOADING_USER, SET_USER, UNSET_USER } from './mutations.type'

const state = {
    user: { email: ''},
    loggedIn: false,
    loadingUser: true
}

const getters = {
    user(state) {
        return state.user
    },
    loggedIn(state) {
        return state.loggedIn
    },
    loadingUser(state) {
        return state.loadingUser
    }
}

const actions = {
    [LOGIN]({ commit }) {
        // commit(FETCH_START)
        return UserService.login()
            .then(({ user }) => {
                commit(SET_USER, user)
            })
            .catch((error) => {
                console.log('Error logging in...', error)
                throw new Error(error)
            })
    },
    [LOGOUT]({ commit }) {
        return UserService.logout()
            .then(() => commit(UNSET_USER))
    }
}

const mutations = {
    [LOADING_USER](state) {
        console.log('Loading user...')
        state.loadingUser = true
    },
    [SET_USER](state, user) {
        console.log('Setting user...', user)
        state.user = user
        state.loggedIn = true
        state.loadingUser = false
    },
    [UNSET_USER](state) {
        console.log('Unsetting user...')
        state.user = {}
        state.loggedIn = false
        console.log('Logged out...')
        state.loadingUser = false
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
