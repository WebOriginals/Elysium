import { required, email, helpers, minLength, sameAs, numeric, minValue, maxLength } from '@vuelidate/validators';

export function useRulesForForm() {
  const isCapitalLetter = helpers.regex(/[A-Z]/);
  const mustBeNumber = helpers.regex(/\d/);
  const leastOneSpecialCharacter = helpers.regex(/[^\dA-Za-z]/);
  const latinLetterPattern = helpers.regex(/^[\w!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~№\-]*$/);
  const phonePattern = helpers.regex(/^\+7 \(\d{3}\) \d{2}-\d{2}-\d{3}$/);
  const notSameAs = (data: { oldPassword: string; password: string }) => () => {
    return data.oldPassword !== data.password;
  };

  const RulesForFormEmail = () => {
    return {
      required: helpers.withMessage('Электронная почта обязательна', required),
      email: helpers.withMessage('Неверный формат электронной почты', email),
    };
  };
  const RulesForFormPassword = () => {
    return {
      required: helpers.withMessage('Пароль обязателен', required),
      isCapitalLetter: helpers.withMessage('Пароль должен содержать хотя бы одну заглавную букву', isCapitalLetter),
      mustBeNumber: helpers.withMessage('Пароль должен содержать хотя бы одну цифру', mustBeNumber),
      latinLetterPattern: helpers.withMessage('Пароль должен содержать только латинские буквы и символы', latinLetterPattern),
      leastOneSpecialCharacter: helpers.withMessage('Пароль должен содержать хотя бы один специальный символ', leastOneSpecialCharacter),
      minLength: helpers.withMessage('Пароль должен быть не менее 8 символов', minLength(8)),
    };
  };
  const RulesForFormConfirmPassword = (passwordInput) => {
    return {
      required: helpers.withMessage('Подтверждение пароля обязательно', required),
      sameAs: helpers.withMessage('Пароли не совпадают', sameAs(passwordInput)),
    };
  };
  const RulesForFormNewPassword = (data: { oldPassword: string; password: string }) => {
    return {
      required: helpers.withMessage('Пароль обязателен', required),
      isCapitalLetter: helpers.withMessage('Пароль должен содержать хотя бы одну заглавную букву', isCapitalLetter),
      mustBeNumber: helpers.withMessage('Пароль должен содержать хотя бы одну цифру', mustBeNumber),
      latinLetterPattern: helpers.withMessage('Пароль должен содержать только латинские буквы и символы', latinLetterPattern),
      leastOneSpecialCharacter: helpers.withMessage('Пароль должен содержать хотя бы один специальный символ', leastOneSpecialCharacter),
      minLength: helpers.withMessage('Пароль должен быть не менее 8 символов', minLength(8)),
      notSameAs: helpers.withMessage('Новый пароль не должен совпадать с текущим', notSameAs(data)),
    };
  };
  const RulesForFormTwoFA = () => {
    return {
      required: helpers.withMessage('Двухфакторная аутентификация обязательна', required),
    };
  };
  const RulesForFormCodeFromEmail = () => {
    return {
      required: helpers.withMessage('Код из электронной почты обязателен', required),
    };
  };
  const RulesForFormPhone = () => {
    return {
      required: helpers.withMessage('Телефон обязателен', required),
      phonePattern: helpers.withMessage('Неверный формат телефона', phonePattern),
    };
  };
  const RulesForFormGoals = () => {
    return {
      maxLength: helpers.withMessage('Длина сообщения не должна превышать 500 символов', maxLength(500)),
    };
  };
  const RulesForNumeric = (minV) => {
    return {
      required: helpers.withMessage('Числовое значение обязательно', required),
      numeric: helpers.withMessage('Значение должно быть числом', numeric),
      min: helpers.withMessage(`Значение должно быть не менее ${minV}`, minValue(minV)),
    };
  };

  const RulesForFormName = () => {
    return {
      required: helpers.withMessage('Имя обязательно', required),
      latinLetterPattern: helpers.withMessage('Имя должно содержать только латинские и кириллические буквы', helpers.regex(/^[A-Za-zА-Яа-я\s]+$/)),
      minLength: helpers.withMessage('Поле должно быть не более 50 символов', maxLength(50))
    }
  }

  return {
    RulesForFormEmail,
    RulesForFormPassword,
    RulesForFormConfirmPassword,
    RulesForFormTwoFA,
    RulesForFormCodeFromEmail,
    RulesForFormNewPassword,
    RulesForFormPhone,
    RulesForFormGoals,
    RulesForNumeric,
    RulesForFormName
  };
}
