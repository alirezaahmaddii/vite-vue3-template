<template>
  <v-text-field
    v-model="mobilePhoneNumber"
    :rules="phoneRules"
    placeholder="شماره موبایل"
    color="bgGreen"
    prepend-inner-icon="mdi-cellphone"
    variant="outlined"
    type="text"
    single-line
  />

  <v-checkbox
    v-model="isChangeOperator"
    label="شماره وارد شده ترابرد کرده است"
    color="green"
  />
  <div v-if="isChangeOperator" class="radio-tabs">
    <v-btn-toggle
      v-model="selectedOperator"
      borderless
      class="tab-toggle w-100"
    >
      <v-btn
        v-for="tab in tabs"
        :key="tab.value"
        :value="tab.value"
        class="tab-btn border-solid border-sm"
        :class="{ active: selectedOperator === tab.value }"
      >
        {{ tab.label }}
      </v-btn>
    </v-btn-toggle>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";

const mobilePhoneNumber = defineModel<string>("mobilePhoneNumber");
const isChangeOperator = defineModel<boolean>("isChangeOperator");
const selectedOperator = defineModel<string>("selectedOperator", {
  default: "hamrahe-avval",
});

const tabs = [
  { value: "hamrahe-avval", label: "همراه اول" },
  { value: "irancell", label: "ایرانسل" },
  { value: "rightell", label: "رایتل" },
];

const emit = defineEmits<{
  (e: "hasError", hasError: boolean): void;
}>();

const phoneRules = [
  (value: string) => !!value || "شماره موبایل الزامی است.",
  (value: string) =>
    /^09[0-9]{9}$/.test(value) || "فرمت شماره موبایل صحیح نیست.",
];

watch(mobilePhoneNumber, (newValue) => {
  const hasError = phoneRules.some((rule) => rule(newValue) !== true);
  emit("hasError", hasError);
});
</script>

<style scoped lang="scss">
.radio-tabs {
  display: flex;
  justify-content: center;
}

.tab-toggle {
  display: flex;
  border-radius: 12px;
  overflow: hidden;
}

.tab-btn {
  flex: 1;
  text-align: center;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  background: transparent;
  color: #333;
  transition: all 0.3s ease;
}

.tab-btn.active {
  border: 2px solid rgba(181, 196, 88, 1) !important;
  background-color: rgba(181, 196, 88, 0.1);
  color: rgba(181, 196, 88, 1);
}
::v-deep(.v-input__details) {
  text-align: start;
}
</style>
