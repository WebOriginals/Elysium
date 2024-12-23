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
  <UButton class="button-transparent" :label="label"  :size="size" :ui="ui" color="transparent"/>
</template>

<style scoped lang="scss">
.button-transparent{
  @apply border-2 bg-transparent text-[#0E082D] border-[#0E082D] ;
}
</style>