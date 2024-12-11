<template>
  <v-bottom-sheet v-model="surveyStore.openSurvey">
    <v-card class="px-4 rounded-t-xl">
      <div class="d-flex justify-space-between align-center w-100 mt-6 mb-10">
        <div class="fw-700 lh-32 fs-18">نظر شما</div>
        <v-icon color="#939599" @click="surveyStore.openSurvey = false">
          mdi mdi-close-circle-outline
        </v-icon>
      </div>
      <div v-for="(item, index) in data" :key="index" class="mb-2">
        <qustion-survey
          :question="item.question"
          :answers="item.answers"
        ></qustion-survey>
      </div>
    </v-card>
  </v-bottom-sheet>
</template>

<script setup lang="ts">
import { useSurveyStore } from "@/stores/survey";
import {defineAsyncComponent, ref} from "vue";
const qustionSurvey = defineAsyncComponent(() => import("./QustionSurvey.vue"));
export interface answer {
  text: string;
  id: "A" | "B" | "C";
}
interface survey {
  question: string;
  answers: answer[];
}

const data = ref<survey[]>([
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
</script>

<style scoped>
.v-card {
  border-top: 4px solid #b5c458;
}
</style>
