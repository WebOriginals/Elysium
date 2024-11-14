import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('phone-mask', {
    mounted(el: HTMLElement, binding) {
      let inputEl: HTMLInputElement | null = el instanceof HTMLInputElement ? el : el.querySelector('input');
      if (!inputEl) return;

      inputEl.addEventListener('input', () => {
        let value = inputEl!.value.replace(/\D/g, '');
        if (value.length > 11) {
          value = value.slice(0, 11);
        }
        if (value.length > 1 && value.length <= 4) {
          value = value.replace(/(\d{1})(\d{1,3})/, '+7 ($2');
        } else if (value.length > 4 && value.length <= 6) {
          value = value.replace(/(\d{1})(\d{3})(\d{1,2})/, '+7 ($2) $3');
        } else if (value.length > 6 && value.length <= 8) {
          value = value.replace(/(\d{1})(\d{3})(\d{2})(\d{1,2})/, '+7 ($2) $3-$4');
        } else if (value.length > 8 && value.length <= 11) {
          value = value.replace(/(\d{1})(\d{3})(\d{2})(\d{2})(\d{1,3})/, '+7 ($2) $3-$4-$5');
        }
        inputEl!.value = value;
        inputEl!.dispatchEvent(new Event('input'));
        binding.instance[binding.expression] = value;
      });
    },
    getSSRProps() {
      return {};
    }
  });
});
