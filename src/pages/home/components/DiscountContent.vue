<template>
  <div>
    <div class="expire bg-info d-inline-block pa-2 rounded-lg">
      <span class="text-">
        تاریخ اعتبار:
      </span>
      {{ formatDateToJalali(expireDate) }}
    </div>
    <div class="mt-5">
      <CopyInput :title="title" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import CopyInput from "@/pages/home/components/CopyInput.vue";
import {formatDateToJalali} from "@/core/utils/jalali-format";

defineProps<{
title: string;
expireDate: string;
}>()
</script>

<style lang="scss" scoped>
::v-deep(.v-badge__badge) {
  border-radius: 8px;
  padding: 20px 10px;
}

.expire {
  width: fit-content;
}
</style>
