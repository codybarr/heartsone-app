<template>
  <div id="app">
    <Navbar :title="title" />
    <div class="container-fluid">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar.vue';

  export default {
      name: 'home',
      components: {
          Navbar,
      },
      data() {
        return {
          title: 'Hearthstone App'
        }
      }
  }
</script>

<style lang="scss">

</style>
