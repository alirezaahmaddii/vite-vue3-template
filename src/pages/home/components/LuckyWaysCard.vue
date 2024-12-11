<template>
  <v-card
    class="text-surface-n40 mb-2 pa-3"
    @click="handleClick"
  >
    <img
      v-if="imageSrc"
      :src="imageSrc"
      class="mb-5"
    >
    <div class="lh-24 fw-700 fs-12 mb-1">
      {{ props.title }}
      <v-icon
        color="#28303F"
        class="mr-1"
      >
        mdi-arrow-left
      </v-icon>
    </div>
    <p class="fs-12 fw-400 lh-24">
      {{ props.description }}
    </p>
  </v-card>
</template>

<script setup lang="ts">
import { useLoginStore } from "@/stores/login";
import { useUserInfoStore } from "@/stores/user-info";

const loginStore = useLoginStore();
const userInfo = useUserInfoStore();
export interface LuckyWaysCard {
  title: string;
  description: string;
  link: string;
  imageSrc?: string;
}

const props = defineProps<LuckyWaysCard>();
const handleClick = () => {
  if (!userInfo.userData.referralLink) {
    loginStore.setOpenLoginState(true);
  } else {
    window.open(props.link);
  }
};
</script>

<style scoped>
.v-card {
  border: 2px solid #ff4749;
  background: #ffe5e5;
  border-radius: 15px;
}

img {
  max-width: 100%;
  width: 100px;
  height: auto;
}
</style>
