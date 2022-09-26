<template>
  <a-form
      :model="from"
      :rules="routes"
      ref="formRef"
      @keyup.enter="submit"
  >
    <a-form-item
        label="Username"
        name="username"

    >
      <a-input v-model:value="from.username"/>
    </a-form-item>
    <a-form-item
        label="Password"
        name="password"
    >
      <a-input-password v-model:value="from.password"/>
    </a-form-item>

    <a-form-item>
      <a-button type="primary" @click="submit()">Submit</a-button>
    </a-form-item>
  </a-form>
</template>
<script setup lang="ts">
import {reactive, ref, UnwrapRef} from 'vue';
import {LoginFrom} from "../types/api/login";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {message} from 'ant-design-vue'

const from = data_from()
const routes = reactive({
  username: [{
    required: true,
    message: "input username",
    trigger: "change"
  }],
  password: [{
    required: true,
    message: "input password",
    trigger: "change"
  }],
})
const formRef = ref()
const store = useStore()
const router = useRouter()

const submit = (): void => {
  formRef.value.validate().then(() => {
    store.dispatch("user/login", from).then(res => {
      const route = router.currentRoute.value
      const url = route.query.redirect || "/"


      router.push(url as string)
      message.success("login success")

    }).catch(err => {
      message.error(err.msg)
    })
  })
}


function data_from() {
  const from: UnwrapRef<LoginFrom> = reactive({
    username: undefined,
    password: undefined
  })
  return from
}
</script>