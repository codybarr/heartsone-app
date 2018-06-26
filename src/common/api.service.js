import axios from 'axios'

// eslint-disable-next-line
export const CardService = {
    getAllCards() {
        return axios
            // .get('https://api.hearthstonejson.com/v1/24769/enUS/cards.json')
            .get('/cards.min.json')
        // .then(r => r.data)
        // .then(cards => {
        //     commit('SET_CARDS', cards)
        // })
    }
}
