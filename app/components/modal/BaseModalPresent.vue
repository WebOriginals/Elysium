<template>
  <DefaultModal :model-value="true" :title="title" size="l" @update:model-value="(v) => closeModal(v)">
    <template #body>
      <div class="presentation" v-if="!isSubmitted">
        <h2 class="presentation__title">Получите подарок — презентацию "5 ключевых элементов успешного лендинга"!</h2>
        <p class="presentation__subTitle">Узнайте, как сделать вашу страницу эффективной и привлекать больше участников!
          Оставьте свои данные, чтобы скачать бесплатную презентацию и применить проверенные методы уже сегодня.</p>
        <div class="presentation__grid">
          <form @submit.prevent="submitForm" class="presentation__form">
            <UFormGroup label="Ваше имя:" name="name">
              <UInput
                v-model="formData.contactPerson"
                color="blue"
                variant="outline"
                size="lg"
                placeholder="Артем"
                required
              />
            </UFormGroup>
            <UFormGroup label="Телефон:" name="phone">
              <UInput
                v-phone-mask
                v-model="formData.phone"
                id="phone"
                color="blue"
                variant="outline"
                size="lg"
                placeholder="+7 (999) 99 99 999"
                required
              />
            </UFormGroup>

            <UButton
              type="submit"
              class="submit-button"
              size="xl"
              color="blue"
              block
            >
              Получить подарок
            </UButton>
            <p class="presentation__politic">Нажав на кнопку, я даю согласие на обработку персональных данных</p>
          </form>
          <div class="presentation__image">
            <img src="/gift.png" alt="Подарок"/>
          </div>
        </div>
      </div>
      <div class="presentation__thank presentation-thank" v-else>
        <div class="presentation-thank__text">
          <h3>Спасибо, что выбрали Elysium!</h3>
          <p>Ваша презентация уже отправлена, и совсем скоро вы сможете познакомиться с ключевыми элементами создания
            успешного лендинга. Мы благодарны за ваше доверие и рады поделиться с вами лучшими практиками, которые
            помогут вывести ваш проект на новый уровень. <br> <br> Если у вас появятся вопросы или понадобится дополнительная
            помощь — наша команда всегда на связи и готова поддержать вас на каждом этапе. <br> <br> У нас есть еще интересные статьи , можете с ними ознакомиться на
          <UButton
            label="Дзен"
            to="https://dzen.ru/id/66f503af06ec2b139e271289"
            color="blue"
            variant="link"
            size="md"
            target="_blank"
            />
            <br> <br>
            <p style="text-align: right">Основатель Elysium <br> Дмитрий Обора</p>
          </p>
        </div>
        <div class="presentation-thank__image">
          <img src="/Dima.png" alt="Подарок"/>
        </div>
      </div>
    </template>
  </DefaultModal>
</template>

<script setup lang="ts">
import DefaultModal from '~/components/modal/DefaultModal.vue';
import {ref} from 'vue'
import {useFetch} from '#app'

const emit = defineEmits(['closeModal']);

const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})

interface FormData {
  contactPerson: string;
  phone: string;
}

const formData = reactive<FormData>({
  contactPerson: "",
  phone: "",
})


const isSubmitted = ref(false)

const submitForm = async () => {
  try {
    formData.phone = formData.phone.replace(/\s+/g, '')
    const message = `ОПА СКАЧАЛИ ПРЕЗЕНТАЦИЮ \n
<i>"5 ключевых элементов успешного лендинга для мероприятий"</i> \n
Имя: <b>${formData.contactPerson}</b> \n
Номер телефона: <b>${formData.phone}</b>`

    await useFetch(`https://api.telegram.org/bot8174832694:AAGpV2VFAVww_FIEeDva4w-SKdXFUoEDAMQ/sendMessage`, {
      method: 'POST',
      body: {
        chat_id: '931622387',
        text: message,
        parse_mode: 'HTML'
      }
    })
    isSubmitted.value = true
   setTimeout(() => downloadFile(), 10000)
  } catch (error) {
    console.error('Error sending message to Telegram:', error)
  }
}

const downloadFile = () => {
  const link = document.createElement('a')
  link.href = 'doc/gift.pdf'
  link.download = 'gift.pdf'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
const closeModal = (value) => {
  isSubmitted.value = false
  emit('closeModal', value)
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

    &__image{
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
