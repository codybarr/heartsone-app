<template>
    <font-awesome-icon :icon="icon" class="sort-icon" size="lg"/>
</template>

<script>
export default {
    name: 'sort-icon',
    props: ['sorted', 'sortAscending'],
    data() {
        return {
            classes: ''
        }
    },
    computed: {
        icon() {
            let icon = 'sort'

            if (this.sorted && this.sortAscending) icon += '-up'
            if (this.sorted && !this.sortAscending) icon += '-down'

            return icon
        }
    }
}
</script>

<style lang="scss">
.sort-icon {
    top: 2px;
    position: relative;
    left: 10px;
}
</style>
