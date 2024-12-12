<template>
  <p class="lh-24 fw-700 fs-14 text-surface-n40 mb-3">
    روش های گرفتن شانس
  </p>
  <ReferalCard class="mb-3" />
  <div class="d-flex mb-6">
    <div class="d-flex flex-column pe-1 w-100">
      <luckWaysCard
        :title="bill.title"
        :description="bill.description"
        :link="bill.link"
      />
      <luckWaysCard
        :title="internet.title"
        :description="internet.description"
        :link="internet.link"
        :image-src="internet.imageSrc"
      />
    </div>
    <div class="d-flex flex-column ps-1 w-100">
      <luckWaysCard
        :title="charge.title"
        :description="charge.description"
        :link="charge.link"
        :image-src="charge.imageSrc"
      />
      <luckWaysCard
        :title="charity.title"
        :description="charity.description"
        :link="charity.link"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import luckWaysCard, { type LuckyWaysCard } from "./LuckyWaysCard.vue";
import ReferalCard from "./ReferalCard.vue";

import chargeImage from "@/assets/images/webp/charge.webp";
import internetImage from "@images/webp/internet.webp";
import { ref } from "vue";

const bill = ref<LuckyWaysCard>({
  title: "پرداخت قبوض",
  description: "هر تراکنش ،یک شانس",
  link: "https://app.badesaba.ir/v1/?uri=badesaba://paymentService?tab=bill",
});

const charge = ref<LuckyWaysCard>({
  title: "خــرید شــــارژ",
  description: "هر شارژ ،یک شانس ",
  link: "https://app.badesaba.ir/v1/?uri=badesaba://paymentService?tab=charge",
  imageSrc: chargeImage,
});
const internet = ref<LuckyWaysCard>({
  title: "خرید بسته اینترنت",
  description: "هر بسته ،یک شانس ",
  link: "https://app.badesaba.ir/v1/?uri=badesaba://paymentService?tab=internet",
  imageSrc: internetImage,
});

const charity = ref<LuckyWaysCard>({
  title: "نیکوکاری",
  description: "هر تراکنش ،یک شانس",
  link: "https://app.badesaba.ir/v1/?uri=badesaba://paymentService?tab=charity",
});
</script>

<style scoped></style>
