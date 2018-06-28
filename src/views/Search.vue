<template>
    <div class="search">
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
        <div v-if="isLoading || localLoading">
            <Loader/>
        </div>
        <div v-else>
            <div v-if="filteredCards.length === 0">
                <p>No cards were found...</p>
            </div>
            <table v-else class="table table-hover table-bordered table-sm">
                <thead class="thead-dark">
                    <th>Row #</th>
                    <th>Card Name</th>
                    <th class="text-center">Rarity</th>
                    <th class="text-center">Type</th>
                    <th class="text-center">Class</th>
                    <th class="text-center">Card Cost</th>
                    <th class="text-center">Attack</th>
                    <th class="text-center">Health</th>
                    <th>Set</th>
                </thead>
                <tbody>
                    <tr v-for="(card, index) in filteredCards" :key="card.id">
                        <td>{{ index+1 }}</td>
                        <td><CardLink :card="card"></CardLink></td>
                        <td class="text-center">{{ card.rarity | capitalize }}</td>
                        <td class="text-center">{{ card.type | capitalize }}</td>
                        <td class="text-center">{{ card.cardClass | capitalize }}</td>
                        <td class="text-center">
                            {{ card.cost }}
                            <span v-if="card.cost >= 0"
                                class="hearthstone-icon icon-mana">
                            </span>
                        </td>
                        <td class="text-center">
                            <AttackIcon :attack="card.attack" :type="card.type"></AttackIcon>
                        </td>
                        <td class="text-center">
                            <HealthIcon :health="card.health"
                                :durability="card.durability"
                                :type="card.type">
                            </HealthIcon>
                        </td>
                        <td>{{ card.set }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'

import Loader from '@/components/Loader.vue'
import CardLink from '@/components/CardLink.vue'
import AttackIcon from '@/components/AttackIcon.vue'
import HealthIcon from '@/components/HealthIcon.vue'

export default {
    name: 'search',
    components: {
        Loader,
        CardLink,
        AttackIcon,
        HealthIcon
    },
    computed: {
        ...mapGetters([
            'isLoading',
            'cards'
        ])
    },
    data() {
        return {
            query: '',
            localLoading: false,
            filteredCards: []
        }
    },
    watch: {
        cards: function cards() {
            this.filterCards()
        },
        query: function query() {
            this.localLoading = true
            this.debouncedQuery()
        }
    },
    created() {
        this.debouncedQuery = _.debounce(this.filterCards, 500)
    },
    mounted() {
        this.filterCards()
    },
    methods: {
        filterCards() {
            this.filteredCards = _.sortBy(this.cards
                .filter(card => card.name.toLowerCase().includes(this.query)), 'name')
            this.localLoading = false
        }
    }
}
</script>

<style lang="scss">

</style>
