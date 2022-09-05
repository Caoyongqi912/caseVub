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


