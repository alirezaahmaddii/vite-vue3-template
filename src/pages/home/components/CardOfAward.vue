<template>
  <v-card
    variant="tonal"
    rounded="lg"
    class="px-5 py-1 card-award w-100"
  >
    <div class="d-flex align-content-center justify-space-between">
      <div class="d-flex align-content-center ga-3">
        <div class="bg-white rounded-lg py-2 award__icon">
          <v-img
            :width="30"
            :src="imageSrc"
            alt="#"
          />
        </div>
        <div class="text-center align-content-center">
          <span>
            {{ title }}
          </span>
        </div>
      </div>
      <div class="text-center align-content-center">
        <img
          src="../../../assets/images/png/arrow.png"
          alt="arrow_icon"
        >
      </div>
    </div>
  </v-card>
</template>

<script lang="ts" setup>

defineProps<{
  title: string,
  imageSrc: string
}>()
</script>

<style lang="scss" scoped>
.card-award {
  .award {
    &__icon {
      z-index: 99;
    }
  }
}
</style>
