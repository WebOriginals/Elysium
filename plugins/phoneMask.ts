export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('phone-mask', {
    mounted(el) {
      el.addEventListener('input', (event) => {
        let value = el.value.replace(/\D/g, '');
        if (value.length > 3 && value.length <= 6) {
          value = value.replace(/(\d{3})(\d{1,3})/, '($1) $2');
        } else if (value.length > 6) {
          value = value.replace(/(\d{3})(\d{3})(\d{1,4})/, '($1) $2-$3');
        }
        el.value = value;
      });
    },
    getSSRProps(binding, vnode) {
      return {};
    }
  });
});
