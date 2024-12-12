<template>
  <p
    v-if="!isUsed"
    class="mb-3"
  >
    لطفا شماره موبایلی که میخواهید
    {{ typeRewardTwoStep === "internet" ? 'بسته' : "شارژ" }}
    به اون واریز بشه رو وارد کنید.
  </p>
  <SendNumberForChargeContent
    v-if="!isUsed"
    v-model:mobile-phone-number="mobilePhoneNumber"
    v-model:is-change-operator="isChangeOperator"
    v-model:selected-operator="selectedOperator"
    @has-error="hasError"
  />

  <v-badge
    v-if="isUsed"
    :content="`${typeRewardTwoStep === 'internet' ? 'بسته' : 'شارژ'} شما تا 24 ساعت آینده فعال خواهد شد`"
    inline
    color="light-green-lighten-4"
    text-color="light-green"
    class="badge-padding"
  />
</template>

<script setup lang="ts">
import SendNumberForChargeContent from "./SendNumberForChargeContent.vue";
import { defineProps } from "vue";

defineProps<{
  isUsed: boolean,
  typeRewardTwoStep: "internet" | "charge"
}>()

const emit = defineEmits<{
  (e: "hasError", hasError: boolean): void;
}>()

const mobilePhoneNumber = defineModel<string>("mobilePhoneNumber");
const isChangeOperator = defineModel<boolean>("isChangeOperator");
const selectedOperator = defineModel<string>("selectedOperator");

const hasError = (hasError: boolean) => {
  emit("hasError", hasError)
};
</script>

<style scoped lang="scss">
::v-deep(.v-badge__badge) {
  padding: 30px;
}
::v-deep(.v-input__details) {
  text-align: start;
}
</style>
