<template>
  <ClientOnly>
    <UButton
      class="themeMode"
      :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
      color="gray"
      variant="ghost"
      aria-label="Theme"
      @click="isDark = !isDark"
    ></UButton>
    <template #fallback>
      <div class="w-8 h-8"></div>
    </template>
  </ClientOnly>
</template>

<script setup>
const { isDark } = useDarkMode();
</script>

<style scoped lang="scss">
.themeMode{
  @apply relative z-20;
}
</style>