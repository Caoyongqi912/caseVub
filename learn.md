### 2022-9-5

---

- `v-text` 显示文本

```vue

<script setup lang="ts">
const msg: string = "hello"
</script>

<teleport>
<h1 v-text="msg"></h1>
</teleport>
```

- `v-html` 展示富文本

```vue

<script setup lang="ts">
const msg: string = "<p>hello</p>"
</script>

<teleport>
<div v-html="msg"></div>
</teleport>
```

- `v-if` 控制元素显示与隐藏 （切换真的假DOM）

```vue

<template>
  <div>
    <h1 v-if="show">show</h1>
  </div>
</template>

<script setup lang="ts">
const show: boolean = false
</script>
```

- `v-show` 用来控制元素的显示隐藏（display none block Css切换） 性能 > `v-if`

```vue

<template>
  <div>
    <h1 v-show="show">show</h1>
  </div>
</template>

<script setup lang="ts">
const show: boolean = false
</script>
```

- `v-else-if` `v-else` 表示 `v-if` 的“else if 块”。可以链式调用 与收尾

```vue

<template>
  <div>
    <h1 v-if="msg === 'A'">A</h1>
    <h1 v-else-if="msg === 'B'">B</h1>
    <h1 v-else>C</h1>
  </div>
</template>

<script setup lang="ts">
const msg: string = "B"
</script>
```

- `v-on` 添加事件 简写 `@`

```vue

<template>
  <div>
    <button @click="submit">SUBMIT</button>
  </div>
</template>

<script setup lang="ts">
const submit = () => {
  console.log("submit")
}
</script>
```

- `v-bind` 绑定元素属性 简写 `:`

```vue

<template>
  <div :class="[flag ? 'active':'other']">hi</div>
  <div :class="temp">{{temp}}</div>
</template>
<script setup lang="ts">
const flag: boolean = true
type cls = {
  other: boolean,
  active: boolean
}
const temp: cls = {
  active: true,
  other: false
}
</script>
<style>
.active {
  color: red;
}

.other {
  color: white;
}
</style>
```

- `v-model`  双向绑定

```vue

<template>
  <input type="text" v-model="msg">
</template>

<script setup lang="ts">
import {ref} from 'vue'

const msg = ref('v-model')
</script>
```

- `v-for` 循环

```vue

<template>
  <div :key="item" v-for="item in msg">{{item}}</div>
  <div :key="i" v-for="i in arr">{{i.name}}</div>
</template>

<script setup lang="ts">
const msg: Array<number> = [1, 2, 3]
const arr: Array<any> = [{name: "cyq"}, {name: "fff"}]
</script>

```

---

#### ref

| 接受一个内部值并返回一个响应式且可变的 ref 对象。ref 对象仅有一个 .value property，指向该内部值。

```vue

<template>
  <div>
    <button @click="change"/>
    <div>{{ message }}</div>
  </div>
</template>

<script setup lang="ts">
import {ref, Ref, isRef} from 'vue';

type Man = {
  name: string
}
const man: Ref<Man> = ref({name: "man"})
const woman: number = 123
const change = () => {
  man.value.name = "im man"
  console.log(isRef(man)) //true
  console.log(isRef(woman)) //false
}
</script>
```

- `shallowRef` 创建一个跟踪自身`.value` 变化的`ref` 但是值不会变成响应式
    - 不可与`ref` 写在一起 会被`triggerRef` 强制更新

```vue

<script setup lang="ts">
import {ref, Ref, shallowRef} from 'vue';

type Man = {
  name: string
}
const man: Ref<Man> = shallowRef({name: "man"})
const woman: number = 123
const change = () => {
  man.value.name = "im man" //不会被渲染
  man.value = {
    name: "im man"
  } // 这次会被渲染
}
</script>
```

- `triggerRef ` 强制更新页面DOM

```vue

<script setup lang="ts">
import {triggerRef, Ref, shallowRef} from 'vue';

type Man = {
  name: string
}
const man: Ref<Man> = shallowRef({name: "man"})
const woman: number = 123
const change = () => {
  man.value.name = "im man"
  triggerRef(man)
}
</script>

```

- `customRef` 自定义ref 需要实现`get`、`set` 方法

```vue

<script setup lang="ts">
import {customRef} from "vue";

function myRef<T>(val: T) {
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return val
      },
      set(newVal) {
        val = newVal
        trigger()
      }
    }
  })
}

const name = myRef<string>("cyq")
const change = () => {
  name.value = "im cyq"
}
</script>

```

---

### activate

```vue

<template>
  <div>
    <form>
      <input type="text" v-model="info.name">
      <br>
      <input type="text" v-model="info.age">
      <br>
      <button @click.prevent="submit"/>
    </form>
  </div>
</template>

<script setup lang="ts">
import {reactive} from 'vue';

type Info = {
  name: string,
  age: number
}
let info = reactive<Info>({name: "cyq", age: 1})
const submit = () => {
  console.log(info)
}
</script>

<style scoped>

</style>
```

```vue

<template>
  <div>
    <ul>
      <li v-for="i in info.arr">{{ i }}</li>
    </ul>
    <button @click="add"/>
  </div>
</template>

<script setup lang="ts">
import {reactive} from 'vue';

let info = reactive<{ arr: string[] }>({arr: []})
const add = () => {
  setTimeout(() => {
    info.arr = ["A", "B", "C"]
  })
}
</script>
```

- `toRef`
    - 如果原始对象是非相应式、不更新视图、只更新数据
    - 是响应式、都更新

```vue

<script setup lang="ts">
import {toRef, toRefs, toRaw, reactive} from "vue";

const man = reactive({name: "cyq", age: 1})
const name = toRef(man, "name")
const onChange = () => {
  name.value = "im cyq"
}

</script>
```

- `toRefs`
    - 批量创建ref 方便解构

```vue

<script setup lang="ts">
import {toRef, toRefs, toRaw, reactive} from "vue";

const man = reactive({name: "cyq", age: 1})
const {name, age} = toRefs(man)
</script>
```

- `toRaw`
    - 将响应式对象转化为普通对象

```vue

<script setup lang="ts">
import {toRef, toRefs, toRaw, reactive} from "vue";

const man = reactive({name: "cyq", age: 1})
const m = toRaw(man) //{name: "cyq", age: 1}
</script>
```

### 2022-9-6

- `computed` 计算属性
    - 当依赖的属性发生变化时、触发他的更改、不发生变化时、使用缓存中的值

```vue

<template>
  <div>
    <input v-model="start" type="text">
    <input type="text" v-model="todo">
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";

let start = ref<string>("")
let todo = computed<string>({
  get() {
    return start.value
  },
  set(value) {
    console.log(value)
    start.value += value
  }
})
</script>
```

- `watch`

```vue

<template>
  <div>
    <input v-model="start" type="text">
    <input v-model="end" type="text">
  </div>
</template>

<script setup lang="ts">
import {watch, ref} from "vue";

let start = ref<string>("1")
let end = ref<string>("1")
let obj = ref({
  nav: {
    bar: {
      name: "cyq"
    }
  }
})
watch(start, (newVal, oldVal) => {
  console.log(newVal) //2
  console.log(oldVal) //1

})
watch([start, end], (newVal, oldVal) => {
  console.log(newVal) //[2,1]
  console.log(oldVal) //[1,1]

})
watch(obj, (nV, oV) => {
  console.log(nV)
  console.log(oV)
}, {deep: true})
</script>


```

- `watchEffect` 高级监听
    - 立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数。
    - 如果用到message 就只会监听message 就是用到几个监听几个 而且是非惰性 会默认调用一次

```vue

<template>
  <div>
    <input v-model="start" type="text">
    <br>
    <input v-model="end" type="text">
    <br>
    <button @click="stop"/>
  </div>
</template>

<script setup lang="ts">
import {watchEffect, ref} from "vue";

let start = ref("1")
let end = ref("2")

const w = watchEffect((onCleanup) => {
  onCleanup(() => {
    console.log("onCleanup")
  })
  console.log(start.value)
}, {
  flush: "post" //更新后执行、pre 更新前执行、sync 强制效果始终同步触发
})
const stop = () => w() //停止监听
</script>


```

- 生命周期

```vue

<template>
  <div>
    <p>{{ count }}</p>
    <button @click="count += 1 "/>
  </div>
</template>

<script setup lang="ts">
import {onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, onUpdated, ref} from "vue";

const count = ref(0)
console.log("setup")
onBeforeMount(() => {
  console.log("创建之前onBeforeMount")
})
onMounted(() => {
  console.log("创建完成onMounted")
})
onBeforeUpdate(() => {
  console.log("更新之前onUpdated")
})
onUpdated(() => {
  console.log("更新完成onUpdated")
})
onBeforeUnmount(() => {
  console.log("卸载之前onUpdated")
})
onUnmounted(() => {
  console.log("卸载完成onUnmounted")
})
</script>


```

##### `组件父亲转子 、子传夫`

- 父传子


```vue
<template>
  <Layout title="im title" :data="list"/>
</template>

<script setup lang="ts">
import Layout from "./layout/index.vue"
import {reactive} from "vue";
const list = reactive<number[]>([1, 2, 3])
</script>

```
```vue
<template>
  <div>
    <p>{{ title }}</p>
  </div>
</template>

<script setup lang="ts">
type Props = {
  title: string
}
withDefaults(defineProps<Props>(),
        {title:"我是默认"}
)
</script>
```

- 子传夫

```vue
<template>
  <Layout @chileData="getInfo"/>
  <h1>{{ info }}</h1>
</template>

<script setup lang="ts">
import Layout from "./layout/index.vue"
import {reactive, ref} from "vue";
let info = ref<string>("")
const getInfo = (value: string) => {
  info.value = value
}
</script>
```

```vue
<template>
  <div>
    <button @click="chileData"/>
  </div>
</template>

<script setup lang="ts">

type Props = {
  title: string
  data: number[]
}
const emit = defineEmits(['chileData'])
const toFather = () => {
  emit('chileData',"我是子组件")
}
</script>
```