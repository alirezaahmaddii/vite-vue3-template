<template>
  <v-bottom-sheet v-model="surveyStore.openSurvey">
    <v-card class="px-4 rounded-t-xl">
      <div class="d-flex justify-space-between align-center w-100 mt-6 mb-10">
        <div class="fw-700 lh-32 fs-18">
          نظر شما
        </div>
        <v-icon 
          color="#939599"
          @click="closeSurvey"
        >
          mdi mdi-close-circle-outline
        </v-icon>
      </div>
      <div
        v-for="(item, index) in data"
        :key="index"
        class="mb-2"
      >
        <qustion-survey
          :question="item.question"
          :answers="item.answers"
          @select-option="selectOption($event, index)"
        />
      </div>

      <v-btn
        class="mb-10"
        outlined
        block
        type="submit"
        :disabled="!isAnswered"
        :loading="loading"
      >
        <span
          style="color: white"
          @click="registerSurveyResponses" 
        > تایید </span>
      </v-btn>
    </v-card>
  </v-bottom-sheet>
</template>

<script setup lang="ts">
export interface IAnswer {
  text: string;
  id: "A" | "B" | "C";
}

interface ISurvey {
  question: string;
  answers: IAnswer[];
}

import { useSurveyStore } from "@/stores/survey";
import { computed, defineAsyncComponent, ref } from "vue";
import { useRegisterWheelConfirm } from "@/core/composable/useRegisterWheel";
import { ISurveyResult } from "@/core/models/login.interface";

const qustionSurvey = defineAsyncComponent(() => import("./QustionSurvey.vue"));
const { registerWheelConfirm } = useRegisterWheelConfirm();
const surveyResults = ref<ISurveyResult[]>([]);
const data = ref<ISurvey[]>([
  {
    question:
      "یک سوال با مضمون محصولی از کاربر پرسیده میشود،که 2 یا سه گزینه پاسخ دارد؟",
    answers: [
      {
        text: "گزینه اول",
        id: "A",
      },
      {
        text: "گزینه 2",
        id: "B",
      },
      {
        text: "گزینه 3",
        id: "C",
      },
    ],
  },
  {
    question:
      "یک سوال با مضمون محصولی از کاربر پرسیده میشود،که 2 یا سه گزینه پاسخ دارد؟",
    answers: [
      {
        text: "گزینه اول",
        id: "A",
      },
      {
        text: "گزینه 2",
        id: "B",
      },
      {
        text: "گزینه 3",
        id: "C",
      },
    ],
  },
]);
const surveyStore = useSurveyStore();
const loading = ref<boolean>(false);
const isAnswered = computed(
  () => surveyResults.value.length === data.value.length
);

const selectOption = (event: IAnswer, index: number) => {
  surveyResults.value[index] = { key: index + 1, value: event.id };
};
const closeSurvey = () => {
  surveyStore.openSurvey = false;
};
const registerSurveyResponses = () => {
  registerWheelConfirm(surveyResults.value);
};
</script>

<style scoped>
.v-card {
  border-top: 4px solid #b5c458;
}
</style>
