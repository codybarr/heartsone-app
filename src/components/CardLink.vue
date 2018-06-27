<template>
    <div>
        <div class="card-tooltip" v-if="hovering">
            <img :src="image" :style="{ top: y + 'px', left: x + 'px' }"/>
        </div>
        <router-link :to="slug"
            class="link-text"
            :data-card-rarity="card.rarity | lowercase"
            :data-set-icon="icon"
            @mouseover.native="hover"
            @mousemove.native="moved"
            @mouseleave.native="leave">
            {{ card.name }}
        </router-link>
    </div>
</template>

<script>
// import _ from 'lodash'
import ExpansionMixin from '@/common/expansion.mixin.js'

const CARD_WIDTH = 286
const CARD_HEIGHT = 395
const CURSOR_PADDING = 100

export default {
    name: 'CardLink',
    props: ['to', 'card'],
    mixins: [ExpansionMixin],
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
            let tempSlug = this.card.name.toLowerCase().replace(/:/g, '').replace(/ /g, '-')
            return '/card/' + this.card.dbfId + '/' + tempSlug
        }
    }
}
</script>

<style lang="scss">

.card-tooltip img {
    position: fixed;
}

// Card Set/Expansion Styles
[data-set-icon] {
    padding-left: 30px;
    display: inline-block;
}
@each $icon in spider, goblin, mountain, shield-crown, hat, eye, music, brass-knuckles, dino-footprint, icecrown, candle, spooky-tree {
    &[data-set-icon='#{$icon}'] {
        background: url('/images/expansions/#{$icon}.png') no-repeat 0 0;
    }
}
[data-set-icon='hat'] {
    background-position-y: 5px;
}


// Card Rarity Styles
[data-card-rarity] {
    font-weight: bold;
}
[data-card-rarity='common'], [data-card-rarity='free'] {
    color: #0FAF03;
}
[data-card-rarity='rare'] {
    color: #198EFF;
}
[data-card-rarity='epic'] {
    color: #AB48EE;
}
[data-card-rarity='legendary'] {
    color: #F07000;
}
</style>
