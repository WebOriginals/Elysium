<script setup lang="ts">
const props = defineProps({
  srcImg: String,
  altImg: String,
  className: {
    type: String,
    default: 'object-cover w-full h-full'
  }
})
</script>

<template>
  <div class="relative">
    <img
      :src="props.srcImg"
      :alt="props.altImg"
      :class="props.className">
  </div>
</template>

<style scoped>

</style>
