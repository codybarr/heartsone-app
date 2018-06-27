<template>
    <div class="home">
        <h1>Search...</h1>
        <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
        <form>
            <input v-model="query"
                @keydown.enter.prevent
                class="form-control form-control-lg"
                type="text"
                placeholder="Search...">
        </form>
        <br>
        <div v-if="isLoading">
            <transition name="fade">
                <Loader/>
            </transition>
        </div>
        <div v-else>
            <div v-if="filteredCards.length === 0">
                <p>No cards were found...</p>
            </div>
            <table v-else class="table table-hover table-bordered table-sm">
                <thead class="thead-dark">
                    <th>Row #</th>
                    <th>Card Name</th>
                    <th>Type</th>
                    <th>Class</th>
                    <th>Card Cost</th>
                    <th>Attack</th>
                    <th>Health</th>
                </thead>
                <tbody>
                    <tr v-for="(card, index) in filteredCards" :key="card.id">
                        <td>{{ index+1 }}</td>
                        <td><CardLink :card="card"></CardLink></td>
                        <td>{{ card.type | capitalize }}</td>
                        <td>{{ card.cardClass | capitalize }}</td>
                        <td>{{ card.cost }}</td>
                        <td>{{ card.attack }}</td>
                        <td>{{ card.health }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'

import CardLink from '@/components/CardLink.vue'
import Loader from '@/components/Loader.vue'

export default {
    name: 'home',
    components: {
        CardLink,
        Loader
    },
    computed: {
        filteredCards() {
            return _.sortBy(this.cards.filter(card => card.name.toLowerCase().includes(this.query)), 'name')
        },
        ...mapGetters([
            'isLoading',
            'cards'
        ])
    },
    data() {
        return {
            query: ''
        }
    }
}

</script>
