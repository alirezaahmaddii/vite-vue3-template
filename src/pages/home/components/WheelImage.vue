<script setup lang="ts">

defineProps<{
  chanceNumber: number;
  imageWheelOfLuck: string;
  durationAnimation: string;
  carouselIcon: string;
  spinWheelImage: string;
  rotationAngle: number
}>();

const emit = defineEmits<{
  (event: "done"): void;
  (event: "spinWheel") : void;
}>();

</script>

<template>
  <div class="wheel position-relative ma-auto">
    <div
      class="wheel__center-container position-absolute d-flex align-center justify-center"
      @click="() => emit(`spinWheel`)"
    >
      <img
        class="w-100"
        :src="spinWheelImage"
        alt="Center"
      >
      <div class="wheel__center-text text-red text-center position-absolute">
        بچرخون
        <br>
        {{ chanceNumber }} شانس
      </div>
      <img
        :src="carouselIcon"
        alt=""
        class="wheel__carousel-icon position-absolute"
      >
    </div>
    <div
      class="wheel__spinner-shadow pa-4 w-100 h-100 position-absolute top-0 left-0"
      :style="{ transform: `rotate(${rotationAngle}deg)`, transitionDuration: `${durationAnimation}s` }"
      @transitionend="() => emit(`done`)"
    >
      <img
        :src="imageWheelOfLuck"
        alt=""
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wheel {
  width: clamp(100px, 90%, 850px);
  height: clamp(100px, 90%, 485px);
  max-width: 850px;
  max-height: 370px;

  &__spinner-shadow {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url("/shadow.png");
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: transform cubic-bezier(0.35, 1, 0.35, 1);
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__center-container {
    top: clamp(20px, 49%, 200px);
    left: 50%;
    width: clamp(50px, 34%, 126px);
    transform: translate(-50%, -50%);
    z-index: 99;
  }

  &__center-text {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: clamp(13px, 5vw, 18px);
    white-space: nowrap;
  }
  &__carousel-icon {
    left: 40%;
    width: 25px;
    z-index: 99;
    bottom: 100%;
    transform: translate(0, -85px);
    @media (max-width: 390px) {
      left: 40%;
      transform: translate(0, -75px);
    }
  }
}
</style>
