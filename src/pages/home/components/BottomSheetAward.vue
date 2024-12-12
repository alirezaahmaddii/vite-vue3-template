<template>
  <div class="award text-center">
    <v-bottom-sheet
      v-model="isOpenBottomSheet"
      class="award__sheet"
    >
      <v-card class="award__content text-center pa-4 rounded-t-xl">
        <div class="d-flex justify-space-between align-center w-100">
          <div class="text-h5 font-weight-bold">
            جوایز من
          </div>
          <div
            class="text-h5 font-weight-bold"
            @click="isOpenBottomSheet = false"
          >
            <span class="mdi mdi-close-circle-outline" />
          </div>
        </div>

        <div class="ma-auto">
          <v-img
            :src="icon"
            width="120px"
            height="120px"
          />
        </div>

        <div class="mb-4">
          <div class="text-h5 font-weight-bold">
            {{ title }}
          </div>
          <div>{{ description ?? description }}</div>
        </div>

        <slot :name="slotType" />
        <v-btn
          class="w-sm-50 w-100 mt-10 mx-auto"
          @click="handleClick"
        >
          {{ textBtn }}
        </v-btn>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>


<script lang="ts" setup>
import { ref } from "vue";

const isOpenBottomSheet = defineModel("isOpenBottomSheet",{ default: false, required: true, type: Boolean });

defineProps<{
  title: string,
  description?: string,
  icon: string,
  textBtn: string,
}>()

const emit = defineEmits<{
  (event: "submitBottomSheet"): void
}>()

const slotType = ref("content");
const handleClick = () => emit("submitBottomSheet");
</script>

<style lang="scss" scoped>
.award {
  &__content {
    border-block-start: 4px solid #B5C458;
  }
  &__sheet {
    ::v-deep(.v-overlay__content) {
      box-shadow: unset;
    }
  }
}

</style>
