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
  dark: 'dark:text-red dark:bg-{color}-800 w-full sm:w-auto ',
  darkFocus: 'dark:focus-visible:outline-{color}-400',
  darkHover: 'dark:hover:bg-{color}-600',
  light: 'shadow-sm text-white bg-sky-500 w-full sm:w-auto ',
  lightFocus:
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-{color}-500',
  lightHover: 'hover:bg-white hover:text-black',
};
const outline = {
  disabled:
    'disabled:bg-sky-300 disabled:text-sky-400 disabled:opacity-100 dark:disabled:bg-sky-300 dark:disabled:border dark:disabled:ring-sky-300 disabled:border disabled:ring-sky-300 dark:disabled:text-sky-400',
  dark: 'dark:text-sky-800 dark:border-sky-800 dark:bg-transparent',
  darkFocus: 'dark:focus-visible:border-{color}-400',
  darkHover: 'dark:hover:bg-{color}-500 dark:hover:text-white dark:hover:border-sky-500',
  light: 'border border-sky-950 border-current bg-transparent text-sky-950',
  lightFocus: 'focus-visible:ring-2 focus-visible:border-sky-500',
  lightHover: 'hover:border-sky-600 hover:bg-sky-600 hover:text-white',
};
const soft = {
  disabled:
    'dark:disabled:bg-transparent disabled:ring-sky-300 dark:disabled:text-sky-400 disabled:bg-sky-300 disabled:text-sky-400 disabled:opacity-100 dark:disabled:bg-sky-300 ',
  dark: 'dark:text-white dark:bg-sky-900 ',
  darkFocus: 'dark:focus-visible:ring-sky-900',
  darkHover: 'dark:hover:bg-{color}-500 dark:hover:text-white',
  light: 'text-sky-500 ',
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
  <UButton :ui="btnStyle" :label="label" :block="block" :size="size" />
</template>

