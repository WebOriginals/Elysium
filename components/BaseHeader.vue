<template>
  <header :class="ui.wrapper" v-bind="attrs">
    <slot name="top" />

    <UContainer :class="ui.container">
      <div :class="ui.left">
        <slot name="left">
          <NuxtLink :to="to" :aria-label="ariaLabel" :class="ui.logo">
            <slot name="logo">
              {{ title || 'Nuxt UI Pro' }}
            </slot>
          </NuxtLink>
        </slot>
      </div>

      <slot name="center">
        <BaseHeaderLinks :links="links" :class="ui.center" />
      </slot>

      <div :class="ui.right">
        <slot name="right" />

        <slot name="panel-button" :open="isHeaderDialogOpen">
          <UButton
            v-if="links.length || $slots.panel"
            color="black"
            variant="ghost"
            :class="ui.button.base"
            v-bind="($ui?.button?.secondary as any)"
            :aria-label="`${isHeaderDialogOpen ? 'Close' : 'Open'} Menu`"
            :icon="isHeaderDialogOpen ? 'i-heroicons-x-mark-20-solid' : 'i-heroicons-bars-3'"
            @click="isHeaderDialogOpen = !isHeaderDialogOpen"
          />
        </slot>
      </div>
    </UContainer>

    <slot name="bottom" />

    <TransitionRoot :show="isHeaderDialogOpen" as="template">
      <Dialog as="div" @close="isHeaderDialogOpen = false">
        <DialogPanel :class="ui.panel.wrapper">
          <div :class="[ui.panel.header, ui.wrapper]">
            <div :class="ui.container">
              <div :class="ui.left">
                <slot name="left">
                  <NuxtLink :to="to" :aria-label="ariaLabel" :class="ui.logo">
                    <slot name="logo">
                      {{ title || 'Nuxt UI Pro' }}
                    </slot>
                  </NuxtLink>
                </slot>
              </div>

              <slot name="center" />

              <div :class="ui.right">
                <slot name="right" />

                <slot name="panel-button" :open="isHeaderDialogOpen">
                  <UButton
                    :class="ui.button.base"
                    color="black"
                    variant="ghost"
                    v-bind="($ui?.button?.secondary as any)"
                    :aria-label="`${isHeaderDialogOpen ? 'Close' : 'Open'} Menu`"
                    :icon="isHeaderDialogOpen ? 'i-heroicons-x-mark-20-solid' : 'i-heroicons-bars-3'"
                    @click="isHeaderDialogOpen = !isHeaderDialogOpen"
                  />
                </slot>
              </div>
            </div>
          </div>
          <div :class="ui.panel.body">
            <slot name="panel">
              <BaseAsideLinks :links="links" />
            </slot>
          </div>
        </DialogPanel>
      </Dialog>
    </TransitionRoot>
  </header>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { Dialog, DialogPanel, TransitionRoot, provideUseId } from '@headlessui/vue'
import type { DeepPartial } from '#ui/types'
import { useId } from '#imports'
import BaseHeaderLinks from "~~/components/BaseHeaderLinks.vue";


const config = computed(() => ({
  wrapper: 'bg-background/75 py-2 dark:border-gray-800 -mb-px sticky top-0 z-50',
  container: 'flex items-center justify-between gap-3 h-[--header-height]',
  left: 'lg:flex-1 flex items-center gap-1.5',
  center: 'hidden lg:flex',
  right: 'flex items-center justify-end lg:flex-1 gap-1.5',
  logo: 'flex-shrink-0 font-bold text-xl text-gray-900 dark:text-white flex items-end gap-1.5',
  panel: {
    wrapper: 'fixed  inset-0 z-50 overflow-y-auto bg-background lg:hidden',
    header: 'bg-primary-50 dark:bg-gray-950 px-4 sm:px-6',
    body: 'bg-primary-50 dark:bg-gray-950 px-4 sm:px-6 pt-3 pb-6'
  },
  button: {
    base: 'lg:hidden',
    icon: {
      open: 'i-heroicons-menu-20-solid',
      close: 'i-heroicons-x-mark-20-solid'
    }
  }
}))

defineOptions({
  inheritAttrs: false
})

const props = defineProps({
  to: {
    type: String,
    default: '/'
  },
  title: {
    type: String,
    default: undefined
  },
  links: {
    type: Array as PropType<HeaderLink[]>,
    default: () => []
  },
  class: {
    type: [String, Object, Array] as PropType<any>,
    default: undefined
  },
  ui: {
    type: Object as PropType<DeepPartial<typeof config.value>>,
    default: () => ({})
  }
})

const route = useRoute()
const slots = useSlots()
const { $ui } = useNuxtApp()
const { isHeaderDialogOpen } = useUIState()
const { ui, attrs } = useUI('header', toRef(props, 'ui'), config, toRef(props, 'class'), true)

const ariaLabel = computed(() => (props.title || (slots.logo && getSlotChildrenText(slots.logo())) || 'Logo').trim())

watch(() => route.fullPath, () => {
  isHeaderDialogOpen.value = false
})

provideUseId(() => useId() as string)
</script>
