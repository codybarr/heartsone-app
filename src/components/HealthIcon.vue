<template>
    <div>
        <span v-if="health >= 0">
            {{ health }}
            <span class="hearthstone-icon icon-health"></span>
        </span>
        <span v-if="durability >= 0">
            {{ durability }}
            <span class="hearthstone-icon icon-weapon-durability"></span>
        </span>
    </div>
</template>

<script>
export default {
    name: 'health-icon',
    props: ['health', 'durability', 'type']
}
</script>
