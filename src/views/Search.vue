<template>
    <div class="search">
        <h1>Search...</h1>
        <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
        <form>
            <div class="form-group row">
                <div class="col-sm-10">
                    <input v-model="query"
                        @keydown.enter.prevent
                        class="form-control"
                        type="text"
                        placeholder="Search...">
                </div>
                <div class="col-sm-2">
                    <button class="btn btn-danger btn-block" @click.prevent="reset">
                        Reset
                    </button>
                </div>
            </div>
            <div class="collapse" id="advancedSearch">
                <div class="card card-body">
                    <div class="row">
                        <div class="col-sm">
                            <!-- Class Filter checkboxes -->
                            <div class="form-group row">
                                <div class="col-sm-2 font-weight-bold">Class</div>
                                <div class="col-sm-10">
                                    <div class="form-check-inline"
                                        v-for="(cardClass, index) in classes"
                                        :key="index">
                                        <input class="form-check-input"
                                            type="checkbox"
                                            :value="cardClass | lowercase"
                                            :id="'class-' + cardClass | capitalize"
                                            v-model="checkedCardClasses">
                                        <label class="form-check-label"
                                            :for="'class-' + cardClass | lowercase">
                                            {{ cardClass | capitalize}}
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <!-- Card Type Filter checkboxes -->
                            <div class="form-group row">
                                <div class="col-sm-2 font-weight-bold">Type</div>
                                <div class="col-sm-10">
                                    <div class="form-check-inline"
                                        v-for="(cardType, index) in types"
                                        :key="index">
                                        <input class="form-check-input"
                                            type="checkbox"
                                            :value="cardType | lowercase"
                                            :id="'class-' + cardType | capitalize"
                                            v-model="checkedCardTypes">
                                        <label class="form-check-label"
                                            :for="'class-' + cardType | lowercase">
                                            {{ cardType | capitalize}}
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <!-- Rarity Filter checkboxes -->
                            <div class="form-group row">
                                <div class="col-sm-2 font-weight-bold">Rarity</div>
                                <div class="col-sm-10">
                                    <div class="form-check-inline"
                                        v-for="(rarity, index) in rarities"
                                        :key="index">
                                        <input class="form-check-input"
                                            type="checkbox"
                                            :value="rarity | lowercase"
                                            :id="'class-' + rarity | lowercase"
                                            v-model="checkedRarities">
                                        <label class="form-check-label"
                                            :for="'class-' + rarity | lowercase">
                                            {{ rarity | capitalize}}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm">
                            <!-- Card Set Filter multiselect -->
                            <div class="form-group row">
                                <div class="col-sm-2 font-weight-bold">Card Set</div>
                                <div class="col-sm-10">
                                    <select v-model="selectedCardSets"
                                        class="custom-select"
                                        multiple>
                                        <option v-for="(cardSet, index) in sets"
                                            :key="index"
                                            :value="cardSet"
                                            :id="'set-' + cardSet | lowercase">
                                            {{ cardSet | setName }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <p>You have checked: {{ selectedCardSets }}</p> -->
                </div>
            </div>
            <a class="float-right"
                data-toggle="collapse"
                href="#advancedSearch"
                role="button"
                aria-expanded="false"
                aria-controls="advancedSearch">
                Advanced Search
            </a>
        </form>
        <br>
        <Pager :page="page" :perPage="perPage" :total="totalFilteredCards"></Pager>
        <br>
        <div v-if="isLoading || localLoading">
            <Loader/>
        </div>
        <div v-else>
            <div v-if="filteredCards.length === 0">
                <p>No cards were found...</p>
            </div>
            <table v-else class="table table-hover table-bordered table-sm table-responsive-md">
                <thead class="thead-dark">
                    <th>Row #</th>
                    <th>
                        <a @click.prevent="orderBy('name')" href="#" class="column-header">
                            Name
                            <SortIcon :sorted="sortField === 'name'"
                                :sortAscending="sortAscending">
                            </SortIcon>
                        </a>
                    </th>
                    <th class="text-center">
                        <a @click.prevent="orderBy('rarity')" href="#" class="column-header">
                            Rarity
                            <SortIcon :sorted="sortField === 'rarity'"
                                :sortAscending="sortAscending">
                            </SortIcon>
                        </a>
                    </th>
                    <th class="text-center">
                        <a @click.prevent="orderBy('type')" href="#" class="column-header">
                            Type
                            <SortIcon :sorted="sortField === 'type'"
                                :sortAscending="sortAscending">
                            </SortIcon>
                        </a>
                    </th>
                    <th class="text-center">
                        <a @click.prevent="orderBy('cardClass')" href="#" class="column-header">
                            Class
                            <SortIcon :sorted="sortField === 'cardClass'"
                                :sortAscending="sortAscending">
                            </SortIcon>
                        </a>
                    </th>
                    <th class="text-center">
                        <a @click.prevent="orderBy('cost')" href="#" class="column-header">
                            Cost
                            <SortIcon :sorted="sortField === 'cost'"
                                :sortAscending="sortAscending">
                            </SortIcon>
                        </a>
                    </th>
                    <th class="text-center">
                        <a @click.prevent="orderBy('attack')" href="#" class="column-header">
                            Attack
                            <SortIcon :sorted="sortField === 'attack'"
                                :sortAscending="sortAscending">
                            </SortIcon>
                        </a>
                    </th>
                    <th class="text-center">
                        <a @click.prevent="orderBy('health')" href="#" class="column-header">
                            Health/Durability
                            <SortIcon :sorted="sortField === 'health'"
                                :sortAscending="sortAscending">
                            </SortIcon>
                        </a>
                    </th>
                </thead>
                <tbody>
                    <tr v-for="(card, index) in filteredCards" :key="card.id">
                        <td>{{ start+index+1 }}</td>
                        <td id="hearthstone-card-name">
                            <CardLink :card="card" :title="card.set | setName"></CardLink>
                        </td>
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
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'

import SetMixin from '@/common/set.mixin'

import Pager from '@/components/Pager.vue'
import Loader from '@/components/Loader.vue'
import CardLink from '@/components/CardLink.vue'
import AttackIcon from '@/components/AttackIcon.vue'
import HealthIcon from '@/components/HealthIcon.vue'
import SortIcon from '@/components/SortIcon.vue'

import CLASSES from '@/common/data/classes'
import TYPES from '@/common/data/types'
import SETS from '@/common/data/sets'
import RARITIES from '@/common/data/rarities'

export default {
    name: 'search',
    mixins: [SetMixin],
    components: {
        Pager,
        Loader,
        CardLink,
        AttackIcon,
        HealthIcon,
        SortIcon
    },
    computed: {
        page() {
            return Number(this.$route.query.page) || 1
        },
        start() {
            return (this.page - 1) * this.perPage
        },
        end() {
            return this.start + this.perPage
        },
        ...mapGetters([
            'isLoading',
            'cards'
        ])
    },
    data() {
        return {
            query: '',
            localLoading: false,
            filteredCards: [],
            totalFilteredCards: 0,
            perPage: 50,

            classes: CLASSES,
            checkedCardClasses: [],

            types: TYPES,
            checkedCardTypes: [],

            sets: Object.keys(SETS),
            selectedCardSets: [],

            rarities: RARITIES,
            checkedRarities: [],

            sortField: 'name',
            sortAscending: true
        }
    },
    watch: {
        cards: function cards() {
            this.debouncedQuery()
        },
        query: function query() {
            this.localLoading = true
            this.$router.push({ query: { page: 1 } })
            this.debouncedQuery()
        },
        checkedCardClasses: function checkedCardClasses() {
            this.localLoading = true
            this.$router.push({ query: { } })
            this.debouncedQuery()
        },
        checkedCardTypes: function checkedCardTypes() {
            this.localLoading = true
            this.$router.push({ query: { } })
            this.debouncedQuery()
        },
        checkedRarities: function checkedRarities() {
            this.localLoading = true
            this.$router.push({ query: { } })
            this.debouncedQuery()
        },
        selectedCardSets: function selectedCardSets() {
            this.localLoading = true
            this.$router.push({ query: { } })
            this.debouncedQuery()
        },
        $route: function routeUpdate() {
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
        orderBy(field) {
            if (field === this.sortField) this.sortAscending = !this.sortAscending
            this.sortField = field
            this.filterCards()
        },
        reset() {
            this.query = ''
            this.checkedCardClasses = []
            this.checkedCardTypes = []
            this.selectedCardSets = []
        },
        filterCards() {
            let tempFilter = this.cards
                .filter(card => card.name.toLowerCase().includes(this.query.toLowerCase()))

            if (this.checkedCardClasses.length > 0) {
                tempFilter = tempFilter
                    .filter(card => this.checkedCardClasses
                        .indexOf(card.cardClass.toLowerCase()) > -1)
            }

            if (this.checkedCardTypes.length > 0) {
                tempFilter = tempFilter
                    .filter(card => this.checkedCardTypes
                        .indexOf(card.type.toLowerCase()) > -1)
            }

            if (this.checkedRarities.length > 0) {
                tempFilter = tempFilter
                    .filter(card => this.checkedRarities
                        .indexOf(card.rarity.toLowerCase()) > -1)
            }

            if (this.selectedCardSets.length > 0) {
                tempFilter = tempFilter
                    .filter(card => this.selectedCardSets
                        .indexOf(card.set) > -1)
            }

            this.totalFilteredCards = tempFilter.length

            const sortOrder = this.sortAscending === true ? 'asc' : 'desc'
            // special check for 'health' since weapons call it durability
            // still needs some tweaking, not exactly sure how to do this
            if (this.sortField === 'health') {
                tempFilter = _.orderBy(tempFilter, ['health', 'durability'], [sortOrder, sortOrder])
            } else {
                tempFilter = _.orderBy(tempFilter, this.sortField, sortOrder)
            }

            this.filteredCards = tempFilter.slice(this.start, this.end)
            this.localLoading = false
        }
    }
}
</script>

<style scoped lang="scss">
table thead th {
    white-space: nowrap;

    .column-header {
        display: inline-block;
        &, &:hover {
            color: white;
            text-decoration: none;
        }
    }
}

#hearthstone-card-name {
    white-space: nowrap;
}
</style>
