<script setup lang="ts"></script>

<template>
  <section class="objections">
    <div class="objections__wrapper">
      <h2>{{ $t('Lending.objections.title') }}</h2>
      <ul class="objections__lists objections-lists">
        <li class="objections-lists__list" v-for="(item, index) in $tm('Lending.objections.items')" :key="$rt(index)">
          {{ $rt(item) }}
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
.objections{
  @apply p-5 md:p-12 my-14 md:my-24  bg-sky-300 dark:bg-sky-900 rounded-3xl overflow-hidden;

  &__wrapper{
    @apply grid gap-14 lg:gap-8 lg:grid-cols-[max(430px)_1fr] 2xl:grid-cols-[max(666px)_1fr];
  }
  &-lists{
    @apply grid gap-5;

    &__list{
      @apply rounded-full p-5 text-center text-base md:text-2xl text-white;

      &:nth-child(1){
        @apply bg-sky-500
      }
      &:nth-child(2){
        @apply bg-sky-600
      }
      &:nth-child(3){
        @apply bg-sky-800
      }
      &:nth-child(4){
        @apply bg-sky-900
      }
      &:nth-child(5){
        @apply bg-sky-950
      }
    }
  }
}
</style>
