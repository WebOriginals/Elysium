<script setup lang="ts">

</script>

<template>
  <div class="wrapper-video">
    <input
      type="checkbox"
    />
    <div class="video">
      <video
        src="https://www.robmillsarchitects.com/files/land/city/RMA_Web_land_city_1.mp4"
        loop
        muted
        autoplay
        playsinline
      ></video>
    </div>
    <div class="text">
      <span :data-text="$t('Buttons.video')"></span>
    </div>
  </div>
</template>

<style scoped>
.wrapper-video {
  --color: #1F242D;
  --color-invert: #ffffff;
  --clip-path: circle(15px at left);
  --clip-path-hover: circle(70px at left);
  --clip-path-clicked: circle(200vw at left);
  --duration: .4s;
  --timing-function: ease;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 100;

  .video {

    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 15px;
    clip-path: var(--clip-path);
    transition: clip-path var(--duration) var(--timing-function);
    video {
      position: fixed;
      background: #0E082D;
      top: 50%;
      left: 50%;
      min-width: 100%;
      min-height: 100%;
      width: auto;
      height: auto;
      transform: translate(-50%, -50%);

    }
  }
  .text {
    position: relative;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: .2px;
    opacity: var(--opacity, 1);
    transition: opacity .3s var(--timing-function) .2s;
    &::before,
    &::after {
      content:"";
      position: absolute;
      bottom: 0;
      left: -1px;
      right: 25px;
      height: 0;
    }
    &::before {
      box-shadow: 26px 0 0 1px var(--color);
      right: var(--r, 100%);
      opacity: var(--opacity, 0);
      transition: right .5s ease-in, opacity .1s linear;
    }
    &::after {
      box-shadow: 26px 0 0 1px var(--color-invert);
      clip-path: var(--clip-path);
      transition: clip-path var(--duration) var(--timing-function);
    }
    > span {
      &::before,
      &::after {
        content: attr(data-text);
        padding-left: 26px;
      }
      &::before {
        color: #ffffff;
      }
      &::after {
        color: #ffffff;
        clip-path: var(--clip-path);
        transition: clip-path var(--duration) var(--timing-function);
        position: absolute;
        left: 0;
      }
    }
  }
  input {
    width: 100%;
    height: 100%;
    margin: auto;
    position: absolute;
    left: 0;
    right: 0;
    border-radius: 40px;
    outline: none;
    z-index: 2;
    appearance: none;
    cursor: pointer;
    &:focus {
      outline: 0;
    }
    &:hover {
      ~ .video {
        clip-path: var(--clip-path-hover);
      }
      ~ .text {
        &::before {
          --r: 25px;
          --opacity: 1;
        }
        &::after {
          clip-path: var(--clip-path-hover);
        }
        > span {
          &::after {
            clip-path: var(--clip-path-hover);
          }
        }
      }
    }
    &:checked {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 0;
      ~ .video {
        clip-path: var(--clip-path-clicked);
      }
      ~ .text {
        --opacity: 0;
        transition: opacity .3s var(--timing-function);
        &::after {
          clip-path: var(--clip-path-clicked);
        }
        > span {
          &::after {
            clip-path: var(--clip-path-clicked);
          }
        }
      }
    }
  }
}

</style>
