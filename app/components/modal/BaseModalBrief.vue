<template>
  <DefaultModal :model-value="true" :title="title" size="l" @update:model-value="(v) => closeModal(v)">
    <template #body>
      <div v-if="!isSubmitted">
        <h2>Заполните бриф для создания лендинга</h2>
        <UForm  :schema="schema" :state="formData" class="space-y-4" @submit="submitForm">
          <UFormGroup label="Ваше имя:" name="name">
            <UInput
              v-model="formData.contactPerson"
              :error="v$.contactPerson.$error"
              :errors="v$.contactPerson.$errors"
              :show-error="true"
              @change="v$.contactPerson.$touch"
            />
            <p class="text-xs text-red-500" v-if="v$.contactPerson.$error">{{ v$.contactPerson.$errors[0].$message }}</p>
          </UFormGroup>
          <UFormGroup label="Телефон:" name="phone">
            <UInput
              v-model="formData.phone"
              v-phone-mask
              :error="v$.phone.$error"
              :errors="v$.phone.$errors"
              :show-error="true"
              @change="v$.phone.$touch"
            />
            <p class="text-xs text-red-500" v-if="v$.phone.$error">{{ v$.phone.$errors[0].$message }}</p>
          </UFormGroup>
          <UFormGroup label="Опишите основные цели лендинга:" name="goals">
            <UTextarea
              v-model="formData.goals"
              :error="v$.goals.$error"
              :errors="v$.goals.$errors"
              :show-error="true"
              @change="v$.goals.$touch"
            />
            <p class="text-xs text-gray-500">Длина текста: {{ formData.goals.length }} символов</p>
            <p class="text-xs text-red-500" v-if="v$.goals.$error">{{ v$.goals.$errors[0].$message }}</p>
          </UFormGroup>

          <URadioGroup
            v-model="formData.budget"
            legend="Требуется ли создание контента для лендинга?"
            :options="optionsBudget"/>
          <UButton type="submit">
            Отправить
          </UButton>
        </UForm>
      </div>
      <div class="presentation__thank presentation-thank" v-else>
        <div class="presentation-thank__text">
          <h3>Спасибо, что выбрали Elysium!</h3>
          <p>Дорогой, {{formData.contactPerson}}. Ваш бриф успешно отправлен, и наша команда уже приступила к его изучению. В ближайшее время мы свяжемся с вами, чтобы предложить решения, идеально подходящие для вашего проекта. <br><br>
            В знак благодарности мы подготовили для вас подарок – [например: чек-лист, скидку, полезное руководство]. Мы уверены, он станет отличным дополнением к нашему сотрудничеству!<br><br>
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
import { useVuelidate } from '@vuelidate/core';
import DefaultModal from '~/components/modal/DefaultModal.vue'
import {useFetch} from "#app";
import {ref} from "vue";

const emit = defineEmits(['closeModal'])
const { RulesForFormName, RulesForFormPhone, RulesForFormGoals } = useRulesForForm();
const toast = useToast()
interface FormData {
  contactPerson: string;
  phone: string;
  goals: string;
  budget: string;
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
const isSubmitted = ref(false)
const formData = reactive<FormData>({
  contactPerson: "",
  phone: "",
  goals: "",
  budget: ""
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
      formData.phone = formData.phone.replace(/\s+/g, '')
      const message = `ОПА БРИФ ПОЛУЧИЛИ \n
Имя: <b>${formData.contactPerson}</b>\n
Телефон: <b>${formData.phone}</b>\n
Цели и задачи лендинга: ${formData.goals}\n
Бюджет: <b>${formData.budget}т. руб.</b>`

      await useFetch(`https://api.telegram.org/bot8174832694:AAGpV2VFAVww_FIEeDva4w-SKdXFUoEDAMQ/sendMessage`, {
        method: 'POST',
        body: {
          chat_id: '931622387',
          text: message,
          parse_mode: 'HTML'
        }
      }).then(() => {
        console.log('Success')
        isSubmitted.value = true
      }).catch((error) => {
        console.error('Error sending message to Telegram1:', error)
        toast.add({ title: 'В пункте "Цели и задачи лендинга" слишком много в символов' })
      })
    }
    catch (error) {
      toast.add({ title: 'В пункте "Цели и задачи лендинга" слишком много в символов' })
    }
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
