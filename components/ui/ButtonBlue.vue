<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: "xl"
  },
  ui: {
    type: Object,
    default: {rounded: 'rounded-full'}
  }
})
</script>

<template>
  <UButton :label="label"  :size="size" :ui="ui"/>
</template>

<style scoped lang="scss">

</style>