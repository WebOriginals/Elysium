<template>
  <UModal
    v-model="model"
    :ui="{
      width: `${sizeModal[size]}`,
      rounded: 'rounded-lg lg:rounded-2xl',
      overlay: { background: 'bg-stone-950/75 dark:bg-stone-950/75' },
      container: 'items-center'
    }"
    class="default-modal"
  >
    <div class="default-modal__wrapper">
      <UButton
        color="gray"
        variant="ghost"
        :icon="page.modal.closeIcone"
        class="default-modal__close"
        size="xl"
        @click="emit('update:modelValue', false)"
      />
      <div v-if="title || $slots.title" class="default-modal__title">
        <slot name="title">
          <h3>{{ title }}</h3>
        </slot>
      </div>
      <slot name="body">
        {{ text }}
      </slot>
    </div>
  </UModal>
</template>

<script setup>
const {data: page} = await useAsyncData('index', () => queryContent('/').findOne())
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
  },
  text: {
    type: String,
  },
  size: {
    type: String,
    default: 's',
  },
});
const emit = defineEmits(['update:modelValue']);
const sizeModal = ref({
  l: 'sm:max-w-[992px]',
  m: 'sm:max-w-[720px]',
  s: 'sm:max-w-[608px]',
});

const model = computed({ get: () => props.modelValue, set: (value) => emit('update:modelValue', value) });
</script>

<style scoped lang="scss">
.default-modal {
  &__wrapper {
    @apply py-12 px-6  relative lg:px-16 lg:rounded-2xl;
  }

  &__close {
    @apply absolute top-3 right-3 lg:top-5 lg:right-5;
  }

  &__title {
    @apply justify-items-center text-center mb-8 gap-4;
  }
}
</style>
