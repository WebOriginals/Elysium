import { onMounted, onUnmounted } from 'vue';

type ScrollAnimationOptions = {
  className?: string; // Класс анимируемых элементов
  activeClass?: string; // Класс, добавляемый при видимости
  noHideClass?: string; // Класс, который предотвращает удаление activeClass
  animStartRatio?: number; // Порог видимости элемента (высота окна / animStartRatio)
  onVisible?: (el: Element) => void; // Callback при активации
  onHidden?: (el: Element) => void; // Callback при деактивации
  throttleMs?: number; // Задержка выполнения через throttle
};

const defaultOptions: ScrollAnimationOptions = {
  className: '_anim-items',
  activeClass: '_active',
  noHideClass: '_anim-no-hide',
  animStartRatio: 4,
  throttleMs: 100,
};

export function useScrollAnimation(userOptions: ScrollAnimationOptions = {}) {
  const options = { ...defaultOptions, ...userOptions };
  let throttleTimeout: NodeJS.Timeout | null = null;

  const handleScroll = () => {
    const animItems = document.querySelectorAll(`.${options.className}`);
    if (!animItems.length) return;

    animItems.forEach((animItem) => {
      const animItemHeight = animItem.clientHeight;
      const animItemOffset = getOffset(animItem).top;
      const animStart = options.animStartRatio;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      // Проверяем, виден ли элемент
      const isVisible =
        window.scrollY > animItemOffset - animItemPoint &&
        window.scrollY < animItemOffset + animItemHeight;

      const alreadyActive = animItem.classList.contains(options.activeClass!);

      if (isVisible && !alreadyActive) {
        animItem.classList.add(options.activeClass!);
        options.onVisible?.(animItem); // Вызываем callback при активации
      } else if (!isVisible && alreadyActive) {
        if (!animItem.classList.contains(options.noHideClass!)) {
          animItem.classList.remove(options.activeClass!);
          options.onHidden?.(animItem); // Вызываем callback при деактивации
        }
      }
    });
  };

  const throttledScrollHandler = () => {
    if (throttleTimeout) return;
    throttleTimeout = setTimeout(() => {
      handleScroll();
      throttleTimeout = null;
    }, options.throttleMs);
  };

  const getOffset = (el: Element) => {
    const rect = el.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  };

  onMounted(() => {
    handleScroll(); // Initial check
    window.addEventListener('scroll', throttledScrollHandler);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', throttledScrollHandler);
    if (throttleTimeout) clearTimeout(throttleTimeout);
  });
}
