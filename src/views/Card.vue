<template>
  <div>
    <div v-if="isLoading">
        <transition name="fade">
            <Loader/>
        </transition>
    </div>
    <div v-if="card" class="row">
        <div class="col-md-5 push-md-7 text-center" id="card-image">
            <img :src="`/images/card-images/${card.dbfId}.png`">
        </div>
        <div class="col-md-7 pull-md-5" id="card-info">
            <div class="card">
                <div class="card-body">
                    <h1 class="card-title">
                        {{ card.name }}
                        <small class="text-muted">{{ card.type | capitalize }}</small>
                    </h1>
                    <table class="table table-sm">
                        <tbody>
                            <tr v-if="card.cost >= 0">
                                <th>Cost</th>
                                <td>
                                    {{ card.cost }}
                                    <span v-if="card.cost >= 0"
                                        class="hearthstone-icon icon-mana"></span>
                                </td>
                            </tr>
                            <tr v-if="minionOrWeapon">
                                <th>{{ isWeapon ? "Weapon Attack" : "Attack"}}</th>
                                <td>
                                    <AttackIcon :attack="card.attack" :type="card.type">
                                    </AttackIcon>
                                </td>
                            </tr>
                            <tr v-if="minionOrWeapon">
                                <th>{{ isWeapon ? "Durability" : "Health" }}</th>
                                <td>
                                    <HealthIcon :health="card.health"
                                        :durability="card.durability"
                                        :type="card.type">
                                    </HealthIcon>
                                </td>
                            </tr>
                            <tr>
                                <th>Set</th>
                                <td><span :data-set-icon="icon">{{ expansionName }}</span></td>
                            </tr>
                            <tr>
                                <th>Class</th>
                                <td>{{ card.cardClass | capitalize }}</td>
                            </tr>
                            <tr>
                                <th>Rarity</th>
                                <td>
                                    <span :data-card-rarity="card.rarity | lowercase">
                                        {{ card.rarity | capitalize }}
                                    </span>
                                </td>
                            </tr>
                            <tr v-if="card.text">
                                <th>Card Text</th>
                                <td v-html="card.text"></td>
                            </tr>
                            <tr v-if="card.flavor">
                                <th>Flavor Text</th>
                                <td v-html="card.flavor"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ExpansionMixin from '@/common/expansion.mixin'

import Loader from '@/components/Loader.vue'
import AttackIcon from '@/components/AttackIcon.vue'
import HealthIcon from '@/components/HealthIcon.vue'

export default {
    name: 'card',
    mixins: [ExpansionMixin],
    components: {
        Loader,
        AttackIcon,
        HealthIcon
    },
    computed: {
        card() {
            return this.cards.find(hcard => hcard.dbfId.toString() === this.$route.params.id)
        },
        minionOrWeapon() {
            return this.card.type.toLowerCase() === 'weapon' ||
                this.card.type.toLowerCase() === 'minion'
        },
        isWeapon() {
            return this.card.type.toLowerCase() === 'weapon'
        },
        ...mapGetters([
            'isLoading',
            'cards'
        ])
    }
}
</script>

<style scoped lang="scss">
table tr th {
    white-space: nowrap;
}
</style>
