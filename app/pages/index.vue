<script setup lang="ts">
import Brik from "~~/content/icons/Brik.vue";
import Keepcode from "~~/content/icons/keepcode.vue";
import Mishako from "~~/content/icons/mishako.vue";
import Teejet from "~~/content/icons/teejet.vue";
import Reformat from "~~/content/icons/reformat.vue";
import ProxySA from "~~/content/icons/proxySA.vue";

const { data: page } = await useAsyncData('index', () => queryContent('/').findOne())

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description
})
</script>

<template>
  <div>
    <ULandingHero
      :title="page.hero.title"
      :description="page.hero.description"
      :links="page.hero.links"
    >
      <ImagePlaceholder
        :src-img="page.hero.image.src"
        :alt-img="page.hero.image.alt"
      />

      <ULandingLogos
        :title="page.logos.title"
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
      </ULandingLogos>
    </ULandingHero>

    <ULandingSection
      v-for="(section, index) in page.sections"
      :key="index"
      :title="section.title"
      :description="section.description"
      :align="section.align"
      :features="section.features"
    >
      <ImagePlaceholder />
    </ULandingSection>

    <ULandingSection
      :title="page.features.title"
      :description="page.features.description"
      :headline="page.features.headline"
    >
      <UPageGrid
        id="features"
        class="scroll-mt-[calc(var(--header-height)+140px+128px+96px)]"
      >
        <ULandingCard
          v-for="(item, index) in page.features.items"
          :key="index"
          v-bind="item"
        />
      </UPageGrid>
    </ULandingSection>

    <ULandingSection
      :title="page.pricing.title"
      :description="page.pricing.description"
      :headline="page.pricing.headline"
    >
      <UPricingGrid
        id="pricing"
        compact
        class="scroll-mt-[calc(var(--header-height)+140px+128px+96px)]"
      >
        <UPricingCard
          v-for="(plan, index) in page.pricing.plans"
          :key="index"
          v-bind="plan"
        />
      </UPricingGrid>
    </ULandingSection>

    <ULandingSection
      :headline="page.testimonials.headline"
      :title="page.testimonials.title"
      :description="page.testimonials.description"
    >
      <UPageColumns
        id="testimonials"
        class="xl:columns-4 scroll-mt-[calc(var(--header-height)+140px+128px+96px)]"
      >
        <div
          v-for="(testimonial, index) in page.testimonials.items"
          :key="index"
          class="break-inside-avoid"
        >
          <ULandingTestimonial v-bind="testimonial" />
        </div>
      </UPageColumns>
    </ULandingSection>

    <ULandingSection class="bg-primary-50 dark:bg-primary-400 dark:bg-opacity-10">
      <ULandingCTA
        v-bind="page.cta"
        :card="false"
      />
    </ULandingSection>

    <ULandingSection
      id="faq"
      :title="page.faq.title"
      :description="page.faq.description"
      class="scroll-mt-[var(--header-height)]"
    >
      <ULandingFAQ
        multiple
        :items="page.faq.items"
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
    </ULandingSection>
  </div>
</template>
