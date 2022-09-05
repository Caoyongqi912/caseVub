<template>
  <div>
    <ul>
      <li v-for="i in info.arr">{{ i }}</li>
    </ul>
    <button @click="add"/>
  </div>
</template>

<script setup lang="ts">
import {reactive, readonly} from 'vue';

let info = reactive<{ arr: string[] }>({arr: []})
// const add = () => {
//   setTimeout(() => {
//     info.arr = ["A", "B", "C"]
//   })
// }
let list = reactive({name: "cyq"})
const read = readonly(list)
const show = ()=>{
  list.name = "im cyq"
}
</script>

