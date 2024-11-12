import { helpers, required, numeric } from '@vuelidate/validators'

export function useRulesForForm() {
  const RulesForNumeric = () => {
    return {
      required: helpers.withMessage("Поле обязательное"), required),
      numeric: helpers.withMessage("В поле можно вводить только цифры"), numeric)
    }
  }

  return {
    RulesForNumeric
  }
}
