export function useGetWidth() {
  const width = ref(0);
  const SCREEN_WIDTH = 1024;

  const isMobile = computed(() => {
    return width.value < SCREEN_WIDTH;
  });

  const onResize = () => {
    width.value = window.innerWidth;
  };

  onMounted(() => {
    onResize();
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize);
    window.removeEventListener('orientationchange', onResize);
  });

  return { isMobile, width };
}
