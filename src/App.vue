<template>
    <div id="app">
        <Navbar :title="title" />
        <div class="container-fluid">
            <router-view/>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
    name: 'home',
    components: {
        Navbar
    },
    data() {
        return {
            title: 'Hearthstone App'
        }
    }
}
</script>

<style lang="scss">
// Resource Icons
.hearthstone-icon {
    background: url('/images/hearthstone-icons.png') center center no-repeat;
    overflow: hidden;
    display: inline-block;
    text-indent: -999999px;
    position: relative;
    top: 3px;
    padding-left: 20px;
    width: 16px;
    height: 16px;

    &.icon-attack {
        background-position: -20px -0px;
    }

    &.icon-health {
        background-position: -20px -16px;
    }

    &.icon-mana {
        background-position: -20px -32px;
    }

    &.icon-weapon-attack {
        background-position: -20px -48px;
    }

    &.icon-weapon-durability {
        background-position: -20px -64px;
    }
}

//
// Card Set/Expansion Styles
[data-set-icon] {
    padding-left: 30px;
    display: inline-block;
}
@each $icon in spider, goblin, mountain, shield-crown,
    hat, eye, music, brass-knuckles, dino-footprint, icecrown, candle, spooky-tree {
    &[data-set-icon='#{$icon}'] {
        background: url('/images/expansions/#{$icon}.png') no-repeat 0 0;
    }
}
[data-set-icon='hat'] {
    background-position-y: 5px;
}

// Rarity colors
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
