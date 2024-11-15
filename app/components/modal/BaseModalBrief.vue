<template>
  <DefaultModal :model-value="true" :title="title" size="l" @update:model-value="(v) => closeModal(v)">
    <template #body>
      <h2>Заполните бриф для создания лендинга</h2>
      <UForm :schema="schema" :state="formData" class="space-y-4" @submit="submitForm">
        <UFormGroup label="Ваше имя:" name="name">
          <UInput v-model="formData.contactPerson"/>
        </UFormGroup>
        <UFormGroup label="Телефон:" name="phone">
          <UInput v-model="formData.phone" v-phone-mask/>
        </UFormGroup>
        <UFormGroup label="Опишите основные цели лендинга:" name="goals">
          <UTextarea v-model="formData.goals" />
        </UFormGroup>
        <UFormGroup label="Бюджет" name="Budget">
          <UInput v-model="formData.contactPerson"/>
        </UFormGroup>

        <UButton type="submit">
          Отправить
        </UButton>
        </UForm>
    </template>
  </DefaultModal>
</template>

<script setup lang="ts">

import DefaultModal from '~/components/modal/DefaultModal.vue'
import {useFetch} from "#app";
import {ref} from "vue";

const emit = defineEmits(['closeModal']);

interface FormData {
  contactPerson: string;
  phone: string;
  goals: string;
  budget: string;
}

const isSubmitted = ref(false)
const formData = reactive<FormData>({
  contactPerson: "",
  phone: "",
  goals: "",
  budget: ""
})

const closeModal = (value) => {
  isSubmitted.value = false
  emit('closeModal', value)
}

const submitForm = async () => {
  try {
    const message = `
    ОПА БРИФ ПОЛУЧИЛИ \n

    Имя: <b>${formData.contactPerson}</b>
    Телефон: <b>${formData.phone}</b>
    Цели и задачи лендинга: <b>${formData.goals}</b>
    Бюджет: <b>${formData.budget}</b>
    `

    await useFetch(`https://api.telegram.org/bot8174832694:AAGpV2VFAVww_FIEeDva4w-SKdXFUoEDAMQ/sendMessage`, {
      method: 'POST',
      body: {
        chat_id: '931622387',
        text: message,
        parse_mode: 'HTML'
      }
    })

    isSubmitted.value = true;
  } catch (error) {
    console.error('Error sending message to Telegram:', error)
  }
}
</script>

<style scoped lang="scss">
.presentation {
  &__title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 16px;
  }

  &__subTitle {
    font-size: 16px;
    margin-bottom: 20px;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  &__form {
    display: grid;
    align-items: center;
    gap: 10px;
    align-content: center;

    .phone-input {
      padding: 10px;
    }

    .submit-button {

    }
  }

  &__image {
    img {
      width: 100%;
      height: auto;
    }
  }

  &__politic {
    font-size: 12px;
    color: #9B9B9B;
  }

  &-thank {
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;

    @media (min-width: 768px) {
      grid-template-columns: 1fr  1fr;
    }

    h3 {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 16px;
    }

    p {
      font-size: 16px;
    }

    &__image {
      display: none;
      @media (min-width: 768px) {
        display: block;
        position: absolute;
        width: 350px;
        right: 8px;
        bottom: -47px;
      }
    }
  }

}
</style>
