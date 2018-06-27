import axios from 'axios'

// eslint-disable-next-line
export const CardService = {
    getAllCards() {
        return axios
            .get('/cards.min.json')
    }
}
