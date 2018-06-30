<template>
    <div>
        <div class="card-tooltip" v-show="hovering">
            <img :src="image" :style="{ top: y + 'px', left: x + 'px' }"/>
        </div>
        <router-link :to="slug"
            class="link-text"
            :data-card-rarity="card.rarity | lowercase"
            :data-set-icon="card.set | setIcon"
            @mouseover.native="hover"
            @mousemove.native="moved"
            @mouseleave.native="leave">
            {{ card.name }}
        </router-link>
    </div>
</template>

<script>
// import _ from 'lodash'
import SetMixin from '@/common/set.mixin'

const CARD_WIDTH = 286
const CARD_HEIGHT = 395
const CURSOR_PADDING = 100

export default {
    name: 'CardLink',
    props: ['to', 'card'],
    mixins: [SetMixin],
    data() {
        return {
            hovering: false,
            image: '',
            x: 0,
            y: 0
        }
    },
    methods: {
        sanitize(value) {
            return value.toLowerCase().replace(/:/g, '').replace(/ /g, '-')
        },
        hover(e) {
            this.image = `/images/card-images/${this.card.dbfId}.png`
            this.setTooltipPosition(e.clientX, e.clientY)

            this.hovering = true
        },
        moved(e) {
            this.setTooltipPosition(e.clientX, e.clientY)
        },
        leave() {
            this.hovering = false
        },
        setTooltipPosition(x, y) {
            // Set X
            this.x = x > (window.innerWidth / 2)
                ? x - CURSOR_PADDING - CARD_WIDTH
                : x + CURSOR_PADDING

            // Set Y
            if (y < (window.innerHeight / 3)) {
                this.y = y
            } else if (y > (window.innerHeight / 3) && y < ((window.innerHeight / 3) * 2)) {
                this.y = y - (CARD_HEIGHT / 2)
            } else {
                this.y = y - CARD_HEIGHT
            }
        }
    },
    computed: {
        slug() {
            const tempSlug = this.card.name.toLowerCase().replace(/:/g, '').replace(/ /g, '-')
            return `/card/${this.card.dbfId}/${tempSlug}`
        }
    }
}
</script>

<style scoped lang="scss">

a:hover {
    text-decoration: none !important;
}

.card-tooltip img {
    position: fixed;
    z-index: 10;
}

// Card Rarity Styles
[data-card-rarity] {
    font-weight: bold;
}
</style>
