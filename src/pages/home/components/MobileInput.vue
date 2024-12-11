<script lang="ts" setup>
const phoneNumber = defineModel<string>("phoneNumber");
const isChangeOperator = defineModel<boolean>("isChangeOperator");
</script>

<template>
  <div>
    <v-text-field
      v-model="phoneNumber"
      label="شماره موبایل"
      color="bgGreen"
      prepend-inner-icon="mdi-cellphone"
      variant="outlined"
      type="text"
    />
    <v-checkbox
      v-model="isChangeOperator"
      label="شماره وارد شده ترابرد کرده است"
      color="green"
    />
  </div>
</template>

<style scoped lang="scss">
::v-deep(.v-input__details) {
  display: none;
}
</style>
