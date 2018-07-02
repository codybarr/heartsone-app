import axios from 'axios'
import * as localforage from 'localforage'
import firebase from 'firebase/app'

// eslint-disable-next-line
export const CardService = {
    getAllCards() {
        localforage.config({
            // driver      : localforage.WEBSQL, // should default to IndexedDB
            name: 'hearthstone_app',
            version: 1.0,
            storeName: 'hearthstone_app', // Should be alphanumeric, with underscores.
            description: 'some description'
        })

        // Always try to get the list of cards from localstorage/IndexedDB first
        return localforage.getItem('cards').then((cards) => {
            // If it doesn't exist, or it's an old version (bump version in config above)
            // then fetch cards from the api
            if (cards === null) {
                return axios.get('/cards.min.json').then((response) => {
                    // put cards in localstorage
                    // console.log('querying api, setting cards in lstorage', response)
                    localforage.setItem('cards', response.data)

                    // forward the response to the store
                    return Promise.resolve(response)
                })
            }

            // forward the cards from the indexeddb to the store
            // console.log('grabbing cards from lstorage', cards)
            return Promise.resolve({ data: cards })
        })
    }
}

export const UserService = {
    login() {
        console.log('kicking off the login...')
        // firebase.initializeApp(FIREBASE_CONFIG)
        const provider = new firebase.auth.GoogleAuthProvider()
        return firebase.auth().signInWithRedirect(provider)
        // return firebase.auth().signInWithPopup(provider)
        //     .then((result) => {
        //         console.log('authsuccess!', result)
        //         return result.user
        //     })
        //     .catch(err => {
        //         console.log('autherror', err)
        //         return err
        //     })
    },
    logout() {
        console.log('kicking off the logout...')
        return firebase.auth().signOut()
    }
}
