<template>
  <DefaultModal :model-value="true" :title="title" size="l" @update:model-value="(v) => closeModal(v)">
    <template #body>
      <div class="presentation" v-if="!isSubmitted">
        <h2 class="presentation__title">Заполните бриф для создания лендинга</h2>
        <p class="presentation__subTitle">Расскажите нам о своём проекте, чтобы мы могли создать лендинг, идеально отражающий ваши цели и ценности!</p>
        <div class="presentation__grid">
          <UForm :state="formData" class="presentation__form" @submit="submitForm">
            <UFormGroup
              name="name"
              :error="v$.contactPerson.$error"
              :errors="v$.contactPerson.$errors"
              :show-error="true"
              @change="v$.contactPerson.$touch">
              <template #default="{ error }">
                <UInput
                  placeholder="Иван Иванов"
                  v-model="formData.contactPerson"
                  :trailing-icon="error ? 'i-heroicons-exclamation-triangle-20-solid' : undefined"
                />
                <p class="text-xs text-red-500 mt-2" v-if="v$.contactPerson.$error">
                  {{ v$.contactPerson.$errors[0].$message }}</p>
              </template>

            </UFormGroup>
            <UFormGroup
              name="phone"
              :error="v$.phone.$error"
              :errors="v$.phone.$errors"
              :show-error="true"
              @change="v$.phone.$touch"
            >
              <template #default="{ error }">
                <UInput
                  v-model="formData.phone"
                  v-phone-mask
                  placeholder="+7(999) 99-99-999"
                  :trailing-icon="error ? 'i-heroicons-exclamation-triangle-20-solid' : undefined"
                />
                <p class="text-xs text-red-500  mt-2" v-if="v$.phone.$error">{{ v$.phone.$errors[0].$message }}</p>
              </template>

            </UFormGroup>
            <UFormGroup name="goals" class="relative">
              <UTextarea
                placeholder="Опишите основные цели лендинга"
                textareaClass="pb-5"
                v-model="formData.goals"
                autoresize
                :maxrows="6"
                :error="v$.goals.$error"
                :errors="v$.goals.$errors"
                :show-error="true"
                @change="v$.goals.$touch"
              />
              <p class="text-xs text-gray-500 absolute bottom-2 right-2 p-0.5 bg-white dark:bg-gray-900"
                 :class="{ 'text-red-500': v$.goals.$error }"> {{ formData.goals.length }} символов</p>
            </UFormGroup>

            <URadioGroup
              v-model="formData.budget"
              legend="Предполагаемый бюджет"
              :options="optionsBudget"/>
            <URadioGroup
              v-model="formData.date"
              legend="Когда нужен сайт?"
              :options="optionsDate"/>
            <UButton type="submit"
                     class="mt-8"
                     block
                     :disabled="v$.$invalid">
              Отправить
            </UButton>
          </UForm>
          <div class="presentation__image">
            <img src="/brief.jpg" alt="бриф"/>
          </div>
        </div>
      </div>
      <div class="presentation__thank presentation-thank" v-else>
        <div class="presentation-thank__text">
          <h3>Спасибо, что выбрали Elysium!</h3>
          <p>Дорогой, {{ formData.contactPerson }}. Ваш бриф успешно отправлен, и наша команда уже приступила к его
            изучению. В ближайшее время мы свяжемся с вами, чтобы предложить решения, идеально подходящие для вашего
            проекта. <br><br>
            В знак благодарности мы отправили для вас подарок –  Инсайдерский чек-лист для успешного запуска лендинга . Мы
            уверены, он станет отличным дополнением к нашему сотрудничеству!<br><br>
            Если у вас возникнут вопросы, наша команда всегда на связи. Спасибо за доверие!
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
import {useVuelidate} from '@vuelidate/core';
import DefaultModal from '~/components/modal/DefaultModal.vue'
import {useFetch} from "#app";
import {ref} from "vue";

const emit = defineEmits(['closeModal'])
const {RulesForFormName, RulesForFormPhone, RulesForFormGoals} = useRulesForForm();
const toast = useToast()

interface FormData {
  contactPerson: string;
  phone: string;
  goals: string;
  budget: string;
  date: string;
}

const optionsBudget = [
  {
    value: '80-120',
    label: '80-120 тыс. руб.'
  },
  {
    value: '150-300',
    label: '150-300 тыс. руб.'
  }
]
const optionsDate = [
  {
    value: '0',
    label: 'Сегодня'
  },
  {
    value: '1',
    label: 'Через месяц'
  },
  {
    value: '2',
    label: 'Через два месяца'
  }
]
const isSubmitted = ref(false)
const formData = reactive<FormData>({
  contactPerson: "",
  phone: "",
  goals: "",
  budget: "",
  date: ""
})

const rules = computed(() => {
  return {
    contactPerson: RulesForFormName(),
    phone: RulesForFormPhone(),
    goals: RulesForFormGoals()
  };
});
const v$ = useVuelidate(rules, formData);

const closeModal = (value) => {
  isSubmitted.value = false
  emit('closeModal', value)
}

const submitForm = async () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    try {
      const phone = formData.phone.replace(/\s+/g, '');
      const message = `ОПА БРИФ ПОЛУЧИЛИ \n
Имя: <b>${formData.contactPerson}</b>\n
Телефон: <b>${phone}</b>\n
Цели и задачи лендинга: ${formData.goals ? formData.goals : 'Не указаны'}\n
Бюджет: <b>${formData.budget ? formData.budget + 'т. руб.' : 'Не указан'}</b>\n
Когда нужен сайт: <b>${formData.date ? optionsDate.find(item => item.value === formData.date).label : 'Не указан'}</b>`;

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
      toast.add({title: 'В пункте "Цели и задачи лендинга" слишком много в символов'})
    }
  }
}

const downloadFile = () => {
  const link = document.createElement('a')
  link.href = 'doc/Chek-list-dlya-uspeshnogo-zapuska-lendinga.pdf'
  link.download = 'Chek-list-dlya-uspeshnogo-zapuska-lendinga.pdf'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
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
    grid-template-columns: 1fr 2fr;
    gap: 20px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
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
