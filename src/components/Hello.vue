<template>
  <div class="card">
    <div class="card-header">
      <div>主标题</div>
      <div>副标题</div>
    </div>

    <div v-if="content" class="card-body">
      <p>{{ content }}</p>
    </div>
  </div>

</template>

<script setup lang="ts">

type Props = {
  content?: string

}
defineProps<Props>()


</script>

<style scoped lang="less">
@border: #ccc;
.card {
  border: 1px solid @border;
  &-header {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid @border;
  }
  &-body {
    padding: 20px;
  }
}
</style>
