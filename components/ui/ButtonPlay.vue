<template>
  <a class="link" href="https://vkvideo.ru/video-219407444_456239041" data-fancybox="gallery" data-type="iframe">
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
<!--      <path-->
<!--        class="link__arrow"-->
<!--        d="M 75 100 L 125 100 L 110 85 M 125 100 L 110 115"-->
<!--        fill="none"-->
<!--      />-->

      <g transform="translate(70, 70)" width="61" height="61" >
        <circle cx="30.625" cy="30.1177" r="36"  fill-opacity="0.1" stroke="none"/>
        <path d="M36.625 28.5848C37.9583 29.3546 37.9583 31.2791 36.625 32.0489L27.625 37.245C26.2917 38.0148 24.625 37.0526 24.625 35.513L24.625 25.1207C24.625 23.5811 26.2917 22.6188 27.625 23.3886L36.625 28.5848Z" fill="white"/>
      </g>

      <text class="link__text">
        <textPath href="#link-circle" stroke="none">
          {{$t('Buttons.play')}}
        </textPath>
      </text>
    </svg>
  </a>
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
  position: relative;
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
  transform-origin: 50% 50%;  /* Центрирование элемента */
  transition: transform var(--hoverDuration) / 2 var(--easeIn);
}

.link:hover .link__arrow {
  transform: scale(1.1);
  transition: transform 0.3s cubic-bezier(0.33, 1, 0.68, 1);
}

.link__arrow {
  stroke-width: 0.075em;
}

.link__text {
  animation: rotateScale 20s linear infinite;
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
    transform:  rotate(0deg);
  }
  to {
    transform:  rotate(360deg);
  }
}
</style>
