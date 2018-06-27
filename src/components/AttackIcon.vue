<template>
    <span>
        {{ attack }}
        <span v-if="attack >= 0" 
            :class="['hearthstone-icon', isWeapon ? 'icon-weapon-attack' : 'icon-attack']">
        </span>
</span>
</template>

<script>
export default {
    name: 'attack-icon',
    props: ['attack', 'type'],
    computed: {
        isWeapon() {
            return this.type.toLowerCase() === "weapon"
        }
    }
}
</script>
