<template>
  <MobileInput
    v-model:phone-number="mobilePhoneNumber"
    v-model:is-change-operator="isChangeOperator"
  />
  <div class="radio-tabs" v-if="isChangeOperator">
    <v-btn-toggle
      v-model="selected"
      borderless
      class="tab-toggle"
    >
      <v-btn
        v-for="tab in tabs"
        :key="tab.value"
        :value="tab.value"
        class="tab-btn"
        :class="{ active: selected === tab.value }"
      >
        {{ tab.label }}
      </v-btn>
    </v-btn-toggle>
  </div>
</template>

<script setup lang="ts">
import MobileInput from "@/pages/home/components/MobileInput.vue";
const mobilePhoneNumber = ref("");
const isChangeOperator = ref(false);
const tabs = [
  { value: "tab1", label: "Tab 1" },
  { value: "tab2", label: "Tab 2" },
  { value: "tab3", label: "Tab 3" },
];
const selected = ref("tab1");
</script>

<style scoped>
.radio-tabs {
  display: flex;
  justify-content: center;
}

.tab-toggle {
  display: flex;
  border: 1px solid #ccc;
  border-radius: 12px;
  overflow: hidden;
}

.tab-btn {
  flex: 1;
  text-align: center;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  background: transparent;
  color: #333;
  transition: all 0.3s ease;
}

.tab-btn.active {
  border: 2px solid rgba(181, 196, 88, 1);
  background-color: rgba(181, 196, 88, 0.1);
  color: rgba(181, 196, 88, 1);
}

.tab-btn:not(.active):hover {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>>
