<template>
  <div>
    <div class="d-flex">
      <img
        class="mt-1 me-2"
        width="24"
        height="24"
        src="@/assets/images/webp/question.webp"
      />
      <p class="mb-4 fw-500 lh-32 fs-16 text-surface-n40 text-justify">
        {{ question }}
      </p>
    </div>

    <div
      class="rounded-lg pa-3 mb-3 answer d-flex align-center"
      v-for="(answer, index) in answers"
      :key="index"
      :class="{
        answer__selected: selectedOption?.id === answer.id,
        ' text-surface-n40': selectedOption?.id === answer.id,
      }"
      @click="selectAnswer(answer)"
    >
      <span class="me-2 px-3">{{ index + 1 }}</span>
      <p class="fs-14 lh-32">
        {{ answer.text }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import type { answer } from "./BottomSheetSurvey.vue";

defineProps({
  question: {
    type: String,
    required: true,
  },
  answers: {
    type: Array as () => answer[],
    required: true,
  },
});

const emit = defineEmits(["selectOption"]);

const selectedOption = ref<answer | null>(null);

const selectAnswer = (answer: answer) => {
  selectedOption.value = answer;
  emit("selectOption", answer);
};
</script>

<style scoped lang="scss">
.answer {
  background: #f0f2f6;
  color: #b3b5b9;
  span {
    border-left: 1px solid #b3b5b9;
  }
  &__selected {
    border: 1px solid #b5c458;
    background: #b5c4581a;
  }
}
</style>
