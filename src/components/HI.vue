<template>
  <div :key="item" v-for="item in msg">{{ item }}</div>
  <div :key="i" v-for="i in arr">{{i.name}}</div>
</template>

<script setup lang="ts">
const msg: Array<number> = [1, 2, 3]
const arr: Array<any> = [{name: "cyq"}, {name: "fff"}]
</script>
