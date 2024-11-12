<template>
  <DefaultModal :model-value="true" :title="title" size="l" @update:model-value="(v) => emit('closeModal', v)">
    <template #body>
      <div class="presentation">
        <h2 class="presentation__title">Получите подарок — презентацию <br> "5 ключевых элементов успешного лендинга для мероприятий"!</h2>
        <p class="presentation__subTitle">Узнайте, как сделать вашу страницу эффективной и привлекать больше участников! Оставьте свои данные, чтобы скачать бесплатную презентацию и применить проверенные методы уже сегодня.</p>
        <div class="presentation__grid">
          <form @submit.prevent="submitForm" class="presentation__form">
            <UInput
              v-model="phoneNumber"
              id="phone"
              color="blue"
              variant="outline"
              size="lg"
              placeholder="Телефон" />
            <UButton
              type="submit"
              class="submit-button"
              size="xl"
              color="blue"
              block
            >Получить подарок</UButton>
            <p class="presentation__politic">Нажав на кнопку, я даю согласие на обработку персональных данных</p>
          </form>
          <div class="presentation__image">
            <img src="/gift.png" alt="Подарок" />
          </div>
        </div>
      </div>
    </template>
  </DefaultModal>
</template>

<script setup>
import DefaultModal from '~/components/modal/DefaultModal.vue';
import { ref } from 'vue'
import { useFetch } from '#app'

const emit = defineEmits()

const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})

const phoneNumber = ref('')
const isSubmitted = ref(false)

const submitForm = async () => {
  try {
    await useFetch(`https://api.telegram.org/bot8174832694:AAGpV2VFAVww_FIEeDva4w-SKdXFUoEDAMQ/sendMessage`, {
      method: 'POST',
      body: {
        chat_id: '931622387',
        text: `ОПА СКАЧАЛИ ПРЕЗЕНТАЦИЮ \n"5 ключевых элементов успешного лендинга для мероприятий" \nНомер телефона: ${phoneNumber.value}`
      }
    })
    isSubmitted.value = true
  } catch (error) {
    console.error('Error sending message to Telegram:', error)
  }
}
</script>

<style scoped lang="scss">
.presentation{
  &__title{
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 16px;
  }
  &__subTitle{
    font-size: 16px;
    margin-bottom: 20px;
  }
  &__grid{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  &__form{
    display: grid;
    align-items: center;
    gap: 10px;
    align-content: center;

    .phone-input{
      padding: 10px;
    }

    .submit-button{

    }
  }
  &__image{
    img{
      width: 100%;
      height: auto;
    }
  }
  &__politic{
    font-size: 12px;
    color: #9B9B9B;
  }
}
</style>
