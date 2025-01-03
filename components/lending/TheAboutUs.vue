<script setup lang="ts">
</script>

<template>
  <section class="about-us">
    <div class="about-us__wrapper">
      <h2>{{$t('Lending.about_us.title')}}</h2>
      <div class="about-us__grid">
        <div
          class="about-us__card about-us-card"
          v-for="(item, index) in $tm('Lending.about_us.items')"
          :key="$rt(index)"
        >
          <template v-if="item.tips">
            <ul class="about-us-card__tips " >
              <li v-for="(tip, idx) in item.tips"  :key="$rt(idx)">
                {{ $rt(tip) }}
              </li>
            </ul>
          </template>
          <h3 class="about-us-card__title ">{{ $rt(item.title) }}</h3>
          <div class="about-us-card__description ">{{ $rt(item.description) }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.about-us{
  @apply p-5 md:p-12 my-14 md:my-24  bg-sky-300 dark:bg-sky-700 rounded-3xl overflow-hidden;

  &__grid{
    @apply grid sm:grid-cols-2 lg:grid-cols-3 mt-8 md:mt-12 gap-3;
  }

  &-card{
    @apply text-white rounded-3xl p-5 md:p-8 bg-sky-950 grid gap-4 items-end content-end min-h-52 relative overflow-hidden;

    &__tips{
      @apply flex flex-col gap-2.5 flex-wrap text-sm items-end relative z-10;

      li{
        @apply rounded-full border-2 text-xs  px-4 py-3 text-center text-white dark:text-sky-400 w-auto border-white dark:border-sky-400;
      }
    }

    &:first-child,&:last-child{
      @apply md:col-span-2;
    }

    &:first-child::before {
      content: '';
      position: absolute;
      top: -34px;
      left: -100px;
      z-index: 0;
      border-radius: 50%;
      width: 450px; // Диаметр круга
      height: 450px; // Диаметр круга
      background: radial-gradient(
          circle,
          rgba(61, 90, 241, 0.75), // Яркий центр
          rgba(61, 90, 241, 0.6) 30%, // Плавное затухание
          rgba(61, 90, 241, 0.44) 50% // Полное исчезновение
      );
      transform: translateY(-50%);
      filter: blur(300px); // Добавляем размытие
      pointer-events: none; // Отключаем взаимодействие
    }
    &:last-child::before {
      content: '';
      position: absolute;
      bottom: -200%;
      right: -100px;
      z-index: 0;
      border-radius: 50%;
      width: 450px; // Диаметр круга
      height: 450px; // Диаметр круга
      background: radial-gradient(
          circle,
          rgb(61, 90, 241) 30%, // Яркий центр
          rgb(61, 90, 241) 80%, // Плавное затухание
          rgb(61, 90, 241) 100% // Полное исчезновение
      );
      transform: translateY(-50%);
      filter: blur(300px); // Добавляем размытие
      pointer-events: none; // Отключаем взаимодействие
    }

    &:nth-child(2){
      background-image: url("/img/fig1.png");
      background-repeat: no-repeat;
      background-position: 147% 61%;
      background-size: contain;
      @media only screen and (min-width: 1400px) {
        background-position: 120% 61%;
      }

    }
    &:nth-child(3){
      background-image: url("/img/fig2.png");
      background-repeat: no-repeat;
      background-position: 18% 27%;

      @media only screen and (min-width: 1400px) {
        background-position: -29% 3%;
      }
      @media only screen and (min-width: 1800px) {
        background-position: 350% 3%;
      }
    }

    &__title{
      @apply relative z-10 max-w-xl;
    }
    &__description{
      @apply relative z-10 max-w-xl;
    }
  }
}
</style>
