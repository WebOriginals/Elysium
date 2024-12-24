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
  },
  block:{
    type: Boolean,
    default: false
  }

})
</script>

<template>
  <UButton class="buttonBlue" :label="label" :block="block" :size="size" :ui="ui"/>
</template>

<style scoped lang="scss">
.buttonBlue{
  @apply bg-[#3D5AF1] text-white;

}
</style>