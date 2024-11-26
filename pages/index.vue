<script setup lang="ts">
import Brik from "~~/content/icons/Brik.vue";
import Keepcode from "~~/content/icons/keepcode.vue";
import Mishako from "~~/content/icons/mishako.vue";
import Teejet from "~~/content/icons/teejet.vue";
import Reformat from "~~/content/icons/reformat.vue";
import ProxySA from "~~/content/icons/proxySA.vue";
import PortfolioImg from "~~/components/PortfolioImg.vue";
import BaseModalPresent from "~~/components/modal/BaseModalPresent.vue";
import BaseModalBrief from "~~/components/modal/BaseModalBrief.vue";
import Messenger from "~~/components/Messenger.vue";
import SectionHero from "~~/components/SectionHero.vue";
import SectionGrid from "~~/components/SectionGrid.vue";


const {data: page} = await useAsyncData('index', () => queryContent('/').findOne())

// useSeoMeta({
//   title: page?.value.title,
//   ogTitle: page?.value.title,
//   description: page?.value.description,
//   ogDescription: page?.value.description
// })

const showModalGiftSuccessfulLanding = ref(false)
const showModalBriff = ref(false)

const openModalGiftSuccessfulLanding = () => {
  showModalGiftSuccessfulLanding.value = !showModalGiftSuccessfulLanding.value
}
const openModalBriff = () => {
  showModalBriff.value = !showModalBriff.value
}

const handleClick = (clickAction: string) => {
  if (clickAction === 'openModalGiftSuccessfulLanding') {
    openModalGiftSuccessfulLanding()
  } else if (clickAction === 'openModalBriff') {
    openModalBriff()
  }
}
</script>

<template>
  <div>
    <SectionHero
      :title="page?.hero.title"
      :description="page?.hero.description"
      :links="page?.hero.links">

      <ImagePlaceholder
        :src-img="page?.hero.image.src"
        :alt-img="page?.hero.image.alt"
      />
      <SectionLogos
        :title="page?.logos.title"
        align="center"
      >
        <nuxt-link to="https://weboriginals.github.io/reformat/" target="_blank">
          <reformat/>
        </nuxt-link>
        <nuxt-link to="https://weboriginals.github.io/childSchool/dist/" target="_blank">
          <Brik/>
        </nuxt-link>
        <nuxt-link to="https://keepcode.org/" target="_blank">
          <keepcode/>
        </nuxt-link>
        <nuxt-link to="https://myskhako.ru/" target="_blank">
          <mishako/>
        </nuxt-link>
        <nuxt-link to="https://weboriginals.github.io/proxy-mobile/dist/" target="_blank">
          <proxy-s-a/>
        </nuxt-link>
        <nuxt-link to="https://weboriginals.github.io/Power_of_three/app/" target="_blank">
          <teejet/>
        </nuxt-link>
      </SectionLogos>
    </SectionHero>

    <SectionPortfolio
      id="portfolio"
      v-for="(section, index) in page?.sections"
      :key="index"
      :title="section.title"
      :description="section.description"
      :align="section.align"
      :features="section.features"
      :ui="{
        links: 'flex justify-start space-x-2 -ml-8',
      }"
    >
      <PortfolioImg
        :src-img="section.image.src"
        :alt-img="section.image.alt"
        class-name="object-contain"
      />

      <template v-slot:links>
        <UButton
          v-for="(link, linkIndex) in section.links"
          :key="linkIndex"
          v-bind="link"
          @click="link.label === 'Получить подарок' && handleClick(link.click)"
        />
      </template>
    </SectionPortfolio>

    <DefaultSection
      :title="page?.features.title"
      :description="page?.features.description"
      :headline="page?.features.headline"
    >
      <SectionGrid
        id="features"
        class="scroll-mt-[calc(var(--header-height)+140px+128px+96px)]"
      >
        <SectionCard
          v-for="(item, index) in page?.features.items"
          :key="index"
          v-bind="item"
        />
      </SectionGrid>
    </DefaultSection>

    <DefaultSection>
      <SectionCTA
        v-bind="page?.ctaCostCalculation"
        :card="true"
        align="right"
      >
        <template v-slot:links>
          <UButton
            v-for="(link, linkIndex) in page?.ctaCostCalculation.links"
            :key="linkIndex"
            v-bind="link"
            @click="link.label === 'Заполнить бриф' && handleClick(link.click)"
          />
        </template>

        <img
          :src="page?.ctaCostCalculation.image.src"
          class="w-full"
        />
      </SectionCTA>
    </DefaultSection>

    <DefaultSection
      :headline="page?.testimonials.headline"
      :title="page?.testimonials.title"
      :description="page?.testimonials.description"
    >
      <SectionColumns
        id="testimonials"
        class="xl:columns-4 scroll-mt-[calc(4rem+140px+128px+96px)]"
      >
        <div
          v-for="(testimonial, index) in page?.testimonials.items"
          :key="index"
          class="break-inside-avoid"
        >
          <LandingTestimonial v-bind="testimonial"/>
        </div>
      </SectionColumns>
    </DefaultSection>

    <DefaultSection class="bg-primary-50 dark:bg-primary-400 dark:bg-opacity-10">
      <SectionCTA
        v-bind="page?.ctaGiftSuccessfulLanding"
        :card="false"
        align="left"
      >
        <template v-slot:links>
          <UButton
            v-for="(link, linkIndex) in page?.ctaGiftSuccessfulLanding.links"
            :key="linkIndex"
            v-bind="link"
            @click="link.label === 'Получить подарок' && handleClick(link.click)"
          />
        </template>

        <img
          :src="page?.ctaGiftSuccessfulLanding.image.src"
          class="w-full"
        />

      </SectionCTA>

    </DefaultSection>

    <DefaultSection
      id="faq"
      :title="page?.faq.title"
      :description="page?.faq.description"
      class="scroll-mt-[var(--header-height)]"
    >
      <SectionFAQ
        multiple
        :items="page?.faq.items"
        :ui="{
          button: {
            label: 'font-semibold',
            trailingIcon: {
              base: 'w-6 h-6'
            }
          }
        }"
        class="max-w-4xl mx-auto"
      />
    </DefaultSection>

    <messenger/>
    <base-modal-present
      v-if="showModalGiftSuccessfulLanding"
      @close-modal="openModalGiftSuccessfulLanding"
    />
    <base-modal-brief
      v-if="showModalBriff"
      @close-modal="openModalBriff"
    />
  </div>
</template>
