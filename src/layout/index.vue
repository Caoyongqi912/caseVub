<template>
  <div>
    <p>{{ title }}</p>
    <p>{{ data }}</p>
    <button @click="toFather"/>
  </div>
</template>

<script setup lang="ts">

type Props = {
  title: string
  data: number[]
}
defineProps<Props>()
const emit = defineEmits(['toFather'])
const toFather = () => {
  emit('toFather',"我是子组件")
}
</script>

<style lang="less" scoped>

</style>