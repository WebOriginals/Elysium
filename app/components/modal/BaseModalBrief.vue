<template>
  <DefaultModal :model-value="true" :title="title" size="l" @update:model-value="(v) => closeModal(v)">
    <template #body>
      <h2>Заполните бриф для создания лендинга</h2>
      <form @submit.prevent="submitForm">
        <label>
          Название компании:
          <input type="text" v-model="formData.companyName" required/>
        </label>
        <label>
          Контактное лицо (Имя):
          <input type="text" v-model="formData.contactPerson" required/>
        </label>
        <label>
          Контактный телефон:
          <input type="tel" v-model="formData.phone" required/>
        </label>
        <label>
          Электронная почта:
          <input type="email" v-model="formData.email" required/>
        </label>
        <h3>Требуется ли создание контента для лендинга?</h3>
        <label>
          <input type="radio" value="yes" v-model="formData.contentCreation"/> Да
        </label>
        <label>
          <input type="radio" value="no" v-model="formData.contentCreation"/> Нет, контент уже есть
        </label>

        <h3>Нужно ли разрабатывать уникальный дизайн?</h3>
        <label>
          <input type="radio" value="yes" v-model="formData.designNeeded"/> Да
        </label>
        <label>
          <input type="radio" value="no" v-model="formData.designNeeded"/> Нет, дизайн готов
        </label>

        <h3>Интеграция с CRM-системами</h3>
        <label>
          Требуется ли интеграция с CRM?
          <select v-model="formData.crmIntegration">
            <option value="none">Не требуется</option>
            <option value="bitrix24">Bitrix24</option>
            <option value="amocrm">AMO CRM</option>
            <option value="other">Другая (укажите ниже)</option>
          </select>
        </label>
        <label v-if="formData.crmIntegration === 'other'">
          Название CRM:
          <input type="text" v-model="formData.otherCrm"/>
        </label>

        <h3>Цели и задачи лендинга</h3>
        <label>
          Опишите основные цели лендинга:
          <textarea v-model="formData.goals"></textarea>
        </label>

        <h3>Дополнительные услуги</h3>
        <label>
          <input type="checkbox" v-model="formData.additionalServices.seo"/> SEO-оптимизация
        </label>
        <label>
          <input type="checkbox" v-model="formData.additionalServices.analytics"/> Подключение аналитики
        </label>
        <label>
          <input type="checkbox" v-model="formData.additionalServices.copywriting"/> Копирайтинг
        </label>

        <button type="submit">Отправить бриф</button>
      </form>
    </template>
  </DefaultModal>
</template>

<script setup lang="ts">
import DefaultModal from '~/components/modal/DefaultModal.vue'
import {useFetch} from "#app";
import {ref} from "vue";

const emit = defineEmits(['closeModal']);
const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})

interface FormData {
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  contentCreation: "yes" | "no";
  designNeeded: "yes" | "no";
  crmIntegration: "none" | "bitrix24" | "amocrm" | "other";
  otherCrm: string;
  goals: string;
  additionalServices: {
    seo: boolean;
    analytics: boolean;
    copywriting: boolean;
  };
}

const isSubmitted = ref(false)
const formData = reactive<FormData>({
  companyName: "",
  contactPerson: "",
  phone: "",
  email: "",
  contentCreation: "no",
  designNeeded: "no",
  crmIntegration: "none",
  otherCrm: "",
  goals: "",
  additionalServices: {
    seo: false,
    analytics: false,
    copywriting: false,
  }
})

const closeModal = (value) => {
  isSubmitted.value = false
  emit('closeModal', value)
}

const submitForm = async () => {
  try {
    const message = `
    ОПА БРИФ на разработку пришел
    Название компании: <b>${formData.companyName}</b>
    Контактное лицо: <b>${formData.contactPerson}</b>
    Контактный телефон: <b>${formData.phone}</b>
    Электронная почта: <b>${formData.email}</b>
    Требуется ли создание контента: <b>${formData.contentCreation === 'yes' ? 'Да' : 'Нет'}</b>
    Нужно ли разрабатывать уникальный дизайн: <b>${formData.designNeeded === 'yes' ? 'Да' : 'Нет'}</b>
    Интеграция с CRM: <b>${formData.crmIntegration}</b>
    Название CRM: <b>${formData.otherCrm}</b>
    Цели и задачи лендинга: <b>${formData.goals}</b>
    Дополнительные услуги:
      - SEO-оптимизация: <b>${formData.additionalServices.seo ? 'Да' : 'Нет'}</b>
      - Подключение аналитики: <b>${formData.additionalServices.analytics ? 'Да' : 'Нет'}</b>
      - Копирайтинг: <b>${formData.additionalServices.copywriting ? 'Да' : 'Нет'}</b>
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
