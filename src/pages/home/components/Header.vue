<template>
  <div
    class="header rounded-lg d-flex justify-center align-center mb-4 position-relative"
  >
    <img
      class="position-absolute right-0 mr-3"
      src="@/assets/images/png/logo-badesaba.png"
      width="24"
      height="24"
      alt="badesaba-icon"
    />
    <p class="d-flex text-center text-white lh-44 fs-14 fw-900">
      بـــچرخـــون و بـــبر
    </p>
    <v-icon
      v-if="userInfo.userData.referralLink"
      class="position-absolute left-0 me-3"
      color="white"
    >
      mdi-account-outline
    </v-icon>
  </div>
</template>

<script setup lang="ts">
import {useUserInfoStore} from "@/stores/user-info";

const userInfo = useUserInfoStore();
</script>

<style scoped>
.header {
  background-image: url(../../../assets/images/png/header.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #ff6363;
  width: 100%;
  height: 48px;
}
</style>
