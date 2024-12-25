<template>
  <div class="link">
    <svg
      viewBox="0 0 200 200"
      width="200"
      height="200"
      xmlns="http://www.w3.org/2000/svg"
      class="link__svg"
      aria-labelledby="link1-title link1-desc"
    >
      <path
        id="link-circle"
        class="link__path"
        d="M 20, 100 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
        stroke="none"
        fill="none"
      />
      <path
        class="link__arrow"
        d="M 75 100 L 125 100 L 110 85 M 125 100 L 110 115"
        fill="none"
      />
      <text class="link__text">
        <textPath href="#link-circle" stroke="none">
          смотреть о нас&ensp; смотреть о нас
        </textPath>
      </text>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'LinkButton',
};
</script>

<style scoped>
:root {
  --rotationDuration: 20s;
  --hoverDuration: 0.3s;

  --easeIn: cubic-bezier(0.32, 0, 0.67, 0);
  --easeOut: cubic-bezier(0.33, 1, 0.68, 1);

  --textColor: #2B2024;
  --bgColor: #DCFFCA;
}


.link {
}

.link__svg {
  transform-box: fill-box;
  fill: #FFFFFF;
  stroke: #FFFFFF;
  stroke-width: 0.05em;
  stroke-linecap: round;
  stroke-linejoin: round;

  @apply text-4xl uppercase tracking-[.3rem] w-32 h-32 font-semibold;
}

.link__arrow {
  transform-origin: 50% 50%;
  transition: transform var(--hoverDuration) / 2 var(--easeIn);
}

.link:hover .link__arrow {
  transform: scale(1.1);
  transition: transform var(--hoverDuration) var(--easeOut);
}

.link__arrow {
  stroke-width: 0.075em;
}

.link__text {
  animation: rotateScale var(--rotationDuration) linear infinite;
  transform-origin: 50% 50%;
  font-size: 0.5em; /* Уменьшение текста в два раза */
}

.link:hover .link__text {
  animation-play-state: paused;
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}

@keyframes rotateScale {
  from {
    transform: scale(1) rotate(0deg);
  }
  to {
    transform: scale(0.5) rotate(360deg);
  }
}
</style>
