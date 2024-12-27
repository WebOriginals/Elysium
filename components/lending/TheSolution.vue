<script setup lang="ts">

</script>

<template>
  <section class="solution">
    <div class="solution__wrapper">
      <div class="solution__left">
        <h2>{{ $t('Lending.solution.title') }}</h2>
        <p>{{ $t('Lending.solution.description') }}</p>
        <UiButtonBlue
          class="solution__button w-2/3 max-lg:hidden"
          size="xxl"
          block
          :label="$t('Buttons.leave_a_request')"
        />
      </div>
      <div class="solution__right">
        <div class="solution__card solution-card" v-for="(item, index) in $tm('Lending.solution.list')" :key="$rt(index)">

          <div class="flex mb-14 items-center justify-between">
            <div class="solution-card__up-title">{{ $rt(item.up_title) }}</div>
            <div class="solution-card__icon">
              <img :src="$rt(item.icon)" alt="">
            </div>
          </div>


          <h3 class="solution-card__title">{{ $rt(item.title) }}</h3>
          <p>{{ $rt(item.description) }}</p>
        </div>
        <UiButtonBlue
          class="solution__button lg:hidden"
          size="xxl"
          block
          :label="$t('Buttons.leave_a_request')"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.solution{
  @apply p-5 md:p-12 my-14 md:my-24  bg-sky-950 dark:bg-sky-900 rounded-3xl overflow-hidden;

  &__wrapper{
    @apply grid gap-14 lg:grid-cols-[5fr_max(460px)] xl:grid-cols-[5fr_max(560px)];
  }

  h3, h2, p{
    @apply text-white;
  }

  h2{
    @apply mb-8 ;
  }


  &__left{
    @apply flex flex-col ;
  }

  &__button{
    @apply  mt-auto lg:w-2/3 max-lg:mt-3.5 h-fit sm:self-end lg:self-start;
  }

  &-card{
    @apply p-5 md:p-7 text-white rounded-3xl flex flex-col gap-2.5 content-start;

    &__up-title{
      @apply rounded-full border-2 text-xs  px-4 py-3 text-center text-white dark:text-sky-400 w-auto border-white dark:border-sky-400;
    }

    &__title{

    }

    &__icon{
      @apply w-[40px] h-[40px] rounded-full overflow-hidden flex items-center justify-center p-1.5 bg-white;

      img{
        @apply w-full
      }
    }

    &:nth-child(1){
      @apply bg-sky-500
    }
    &:nth-child(2){
      @apply bg-white text-sky-950;

      .solution-card__up-title{
        @apply text-sky-950 border-sky-950;
      }
      .solution-card__title,p{
        @apply text-sky-950;
      }

    }
    &:nth-child(3){
      @apply bg-white;

      .solution-card__up-title{
        @apply text-sky-950 border-sky-950;
      }
      .solution-card__title,p{
        @apply text-sky-950;
      }
    }
    &:nth-child(4){
      @apply bg-sky-950
    }
  }

  &__right{
    @apply grid gap-2.5 md:gap-5 md:grid-cols-2 lg:grid-cols-1;
  }
}
</style>