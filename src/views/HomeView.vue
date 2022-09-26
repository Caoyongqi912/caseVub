<template>
  <h1>im Home</h1>
  <h1>hi {{ store.state.user.username }}</h1>
</template>

<script setup lang="ts">


import {useStore} from "vuex";
import {computed, onMounted, onBeforeMount, ref} from "vue";

const username = ref()
onBeforeMount(() => {
  store.dispatch("user/userinfo")


})
const store = useStore()
</script>

<style scoped>

</style>