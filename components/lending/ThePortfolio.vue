<script setup lang="ts">

</script>

<template>
  <section class="portfolio">
    <div class="portfolio__wrapper">
      <h2>{{ $t('Lending.portfolio.title') }}</h2>
      <div class="portfolio__grid">
        <div class="portfolio__card portfolio-card" v-for="(item, index) in $tm('Lending.portfolio.items')" :key="$rt(index)">
          <div class="portfolio-card__cover" :style="{ backgroundImage: `url('${$rt(item.bg_url)}')` }">
            <div class="portfolio-card__logo" >
              <img :src="$rt(item.logo_url)" alt="">
            </div>
          </div>
          <div class="portfolio-card__description" v-html="$rt(item.description)"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.portfolio{

  &__grid{
    @apply grid gap-3.5;
  }

  &-card{
    @apply grid grid-cols-2 gap-2;

    &__cover{
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      border-radius: 24px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }

    &__description{
      @apply bg-sky-300 p-8 rounded-3xl;
    }
  }

}
</style>