import firebase from 'firebase/app'
import 'firebase/auth'
import store from '@/store'
import { LOADING_USER, SET_USER, UNSET_USER } from '@/store/mutations.type'

firebase.initializeApp({
	apiKey: 'AIzaSyBv_5BcbfDIcfMf5MYnMqQ4yAgHNia64HM',
	authDomain: 'hearthstone-app-554a7.firebaseapp.com',
	databaseURL: 'https://hearthstone-app-554a7.firebaseio.com',
	projectId: 'hearthstone-app-554a7',
	storageBucket: 'hearthstone-app-554a7.appspot.com',
	messagingSenderId: '30165588688'
})

/**
 * This callback is called when firebase.auth() detects user changes,
 * so just update the vuex store with the new user object.
 */
firebase.auth().onAuthStateChanged(user => {
	if (user) {
		store.commit(LOADING_USER)
		store.commit(SET_USER, user)
	} else {
		store.commit(LOADING_USER)
		store.commit(UNSET_USER)
	}
})
