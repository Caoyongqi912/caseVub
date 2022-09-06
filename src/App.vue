<template>
  <Layout title="im title" :data="list" @toFather="getInfo"/>
  <h1>{{ info }}</h1>
  <Card content="hi"/>

  <br>
  <div>
    <div @click="c(item) " :key="item.index" v-for="(item,index) in data">
      {{ item.name }}
    </div>
    <component :is="current.comName"/>
  </div>

</template>

<script setup lang="ts">
import Layout from "./layout/index.vue"
import A from './layout/Content/A.vue'
import B from './layout/Content/B.vue'

import {markRaw, reactive, ref} from "vue";

let info = ref<string>("")
const list = reactive<number[]>([1, 2, 3])
const getInfo = (value: string) => {
  info.value = value
}

type Tabs = {
  name: string,
  comName: any
}
const data = reactive<Tabs[]>([
  {
    name: "im A",
    comName: markRaw(A)
  },
  {
    name: "im B",
    comName: markRaw(B)
  },
])

type ICurrent = Pick<Tabs, "comName">
let current = reactive<ICurrent>({
  comName: data[0].comName
})

const c = (item: Tabs) => {
  current.comName = item.comName
}
</script>

