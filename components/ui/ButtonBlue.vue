<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: "xl",
  },
  variant: {
    type: String,
    default: 'solid',
  },
  rounded: {
    type: String,
    default: 'rounded-full',
  },
  icon: {
    type: String,
    default: null,
  },
  block:{
    type: Boolean,
    default: false,
  },
})
const solid = {
  disabled: 'disabled:bg-sky-300 disabled:text-sky-400 disabled:opacity-100 dark:disabled:bg-sky-300 ',
  dark: 'dark:text-red dark:bg-{color}-800 active:scale-[0.9]',
  darkFocus: 'dark:focus-visible:outline-{color}-400',
  darkHover: 'dark:hover:bg-{color}-600',
  light: 'shadow-sm text-white bg-sky-500 active:scale-[0.9]  active:bg-sky-950 active:text-white',
  lightFocus:
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-{color}-500 ',
  lightHover: 'hover:bg-white hover:text-black',


};
const outline = {
  disabled:
    'disabled:bg-sky-300 disabled:text-sky-400 disabled:opacity-100 dark:disabled:bg-sky-300 dark:disabled:border dark:disabled:ring-sky-300 disabled:border disabled:ring-sky-300 dark:disabled:text-sky-400',
  dark: 'dark:text-sky-600 dark:border-sky-600 dark:bg-transparent dark:ring-sky-600 active:scale-[0.9]',
  darkFocus: 'dark:focus-visible:border-sky-900',
  darkHover: 'dark:hover:bg-sky-900 dark:hover:text-white dark:hover:border-sky-900 dark:hover:ring-sky-900',
  light: 'ring-sky-950 border-current bg-transparent text-sky-950 active:scale-[0.9]',
  lightFocus: 'focus-visible:ring-2 focus-visible:border-sky-500',
  lightHover: 'hover:ring-sky-950 hover:bg-sky-950 hover:text-white',
};
const soft = {
  disabled:
    'dark:disabled:bg-transparent disabled:ring-sky-300 dark:disabled:text-sky-400 disabled:bg-sky-300 disabled:text-sky-400 disabled:opacity-100 dark:disabled:bg-sky-300 ',
  dark: 'dark:text-white dark:bg-sky-700 active:scale-[0.9]',
  darkFocus: 'dark:focus-visible:ring-sky-700',
  darkHover: 'dark:hover:bg-sky-950 dark:hover:text-white',
  light: 'text-sky-500 bg-sky-200 active:scale-[0.9]',
  lightFocus: 'focus-visible:ring-2 focus-visible:ring-sky-500',
  lightHover: 'hover:bg-sky-100 hover:text-sky-600',
};
const btnStyle = {
  base: 'focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed justify-center',
  size: {
    '2sm': 'text-sm',
    sm: 'text-sm',
    lg: 'text-base',
    xl: 'text-base',
    xxl: 'text-2xl',
  },
  padding: {
    '2sm': 'py-0.5 px-0.5',
    sm: 'py-0.5 px-0.5',
    md: 'p-1 px-2',
    lg: 'py-2 px-4',
    xl: 'py-3 px-6',
    xxl: 'py-3.5 px-6',
  },
  rounded: props.rounded,
  font: 'font-semibold',
  variant: {
    outline: `${outline.light} ${outline.lightFocus} ${outline.lightHover} ${outline.dark} ${outline.darkFocus} ${outline.darkHover} ${outline.disabled}`,
    solid: `${solid.light} ${solid.lightFocus} ${solid.lightHover} ${solid.dark} ${solid.darkFocus} ${solid.darkHover} ${solid.disabled}`,
    soft: `${soft.light} ${soft.lightFocus} ${soft.lightHover} ${soft.dark} ${soft.darkFocus} ${soft.darkHover} ${soft.disabled}`,
  },
  icon: {
    base: 'flex-shrink-0',
    size: {
      '2xs': 'h-4 w-4',
      xs: 'h-4 w-4',
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-5 w-5',
      xl: 'h-6 w-6',
    },
  },
};
</script>

<template>
  <UButton :ui="btnStyle" :variant="variant" :label="label" :block="block" :size="size" />
</template>

