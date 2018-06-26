<template>
  <div class="card">
    <div v-if="isLoading">
        <transition name="fade">
            <Loader/>
        </transition>
    </div>
    <div v-if="card">
        <h1>{{ card.name }}</h1>
        <img :src="`/card-images/${card.dbfId}.png`">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Loader from '@/components/Loader.vue'

export default {
    name: 'card',
    components: {
        Loader
    },
    computed: {
        card() {
            return this.cards.find(hcard => hcard.dbfId.toString() === this.$route.params.id)
        },
        ...mapGetters([
            'isLoading',
            'cards'
        ])
    }
}

</script>
