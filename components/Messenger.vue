<template>
  <div class="floating-button-container">
    <UButton
      class="main-button"
      :icon="page?.widget.iconMain"
      @click="toggleButtons"
    />
    <transition-group name="slide">
      <UButton
        v-if="showButtons"
        :icon="page?.widget.iconTelegram"
        class="sub-button"
        @click="openTelegram"
        key="telegram"
      />
      <UButton
        v-if="showButtons"
        :icon="page?.widget.iconVK"
        class="sub-button"
        @click="openVK"
        key="vk"
      />
      <UButton
        v-if="showButtons"
        :icon="page?.widget.iconWhatsapp"
        class="sub-button"
        @click="openWhatsApp"
        key="whatsapp"
      />
    </transition-group>
  </div>
</template>

<script setup lang="ts">
const {data: page} = await useAsyncData('index', () => queryContent('/').findOne())
import { ref } from 'vue'

const showButtons = ref(false)

const toggleButtons = () => {
  showButtons.value = !showButtons.value
}

const openTelegram = () => {
  window.open('https://t.me/DimaObora', '_blank')
}

const openVK = () => {
  window.open('https://vk.me/dimaobora', '_blank')
}

const openWhatsApp = () => {
  window.open('https://wa.me/+79885242737', '_blank')
}
</script>

<style scoped>
.floating-button-container {
  z-index: 1;
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
}

.main-button {
  @apply bg-blue-500 text-white;
  background-color: #007bff;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
  font-size: 24px;
}

.sub-button {
  background-color: #007bff;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
  font-size: 20px;
  margin-bottom: 10px;
}
.main-button:hover,
.sub-button:hover {
  @apply text-white bg-blue-600 ;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from, .slide-leave-to {
  transform: translateY(30px);
  opacity: 0;
}
</style>
