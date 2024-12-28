<script setup lang="ts">
import { useScrollAnimation } from '@/composables/useScrollAnimation';
useScrollAnimation({
  className: '_anim-items',
  activeClass: '_active',
  noHideClass: '_anim-no-hide',
  animStartRatio: 1,
  throttleMs: 200,
  onVisible: (el) => {
    console.log(`Element ${el} is now visible.`);
  },
  onHidden: (el) => {
    console.log(`Element ${el} is now hidden.`);
  },
});
</script>

<template>
  <section class="portfolio">
    <div class="portfolio__wrapper">
      <h2>{{ $t('Lending.portfolio.title') }}</h2>
      <div class="portfolio__grid">
        <div class="portfolio__card portfolio-card _anim-items " v-for="(item, index) in $tm('Lending.portfolio.items')" :key="$rt(index)">
          <div class="portfolio-card__cover" :style="{ backgroundImage: `url('${$rt(item.bg_url)}')` }">
            <div class="portfolio-card__logo" >
              <img :src="$rt(item.logo_url)" alt="">
            </div>
          </div>
          <div class="fake"></div>
          <div class="portfolio-card__description">
            <div class="portfolio-card__text" v-html="$rt(item.description)"></div>
            <UiButtonBlue
              class="solution__button mt-8 w-2/3"
              size="xxl"
              block
              :label="$t('Buttons.leave_a_request')"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.portfolio{
  @apply my-14 md:my-24;

  h2{
    @apply mb-8 md:mb-14;
  }

  &__grid{
    @apply grid gap-3.5;
  }

  &-card{
    @apply grid grid-cols-2 gap-2 relative overflow-hidden;


    &._anim-items{

      &._active{
        .portfolio-card__cover{
          transition: width 1s ease-in-out;
          width: calc(50% - 4px);
        }

        .portfolio-card__description{
          transition: opacity 1s ease-in-out;
          transition-delay: 1s;
          opacity: 1;
        }
      }

    }


    &__cover{
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      border-radius: 24px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
    }

    &__description{
      @apply bg-sky-300 p-8 rounded-3xl opacity-0;
    }
  }
}
</style>