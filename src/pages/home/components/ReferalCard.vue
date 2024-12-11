<template>
  <div>
    <v-card class="text-surface-n40 mb-2 pa-3">
      <div class="d-flex mb-5">
        <img
          src="@/assets/images/webp/referal.webp"
          width="23"
          class="me-1"
        >
        <p class="fw-700 fs-12 lh-24">
          هر دوستت رو که دعوت کنی یک شانس دریافت میکنی
        </p>
      </div>
      <v-btn
        v-if="userInfo.userData?.referralLink"
        color="#f5f7e9"
        outlined
        elevation="0"
        block
        @click="handleShareLink"
      >
        <div class="d-flex align-center justify-space-between w-100">
          <v-icon color="#939599">
            mdi mdi-content-copy
          </v-icon>
          <p>
            {{ userInfo.userData.referralLink }}
          </p>
        </div>
      </v-btn>
      <v-btn
        v-else
        color="white"
        outlined
        elevation="0"
        block
        class="py-2"
        @click="loginStore.setOpenLoginState(true)"
      >
        <p class="text-surface-n40 lh-24 fs-12 fw-500">
          برای دریافت لینک اختصاصی خود وارد شوید!
        </p>
      </v-btn>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { SnackbarStatusEnum } from "@/core/enums/snackbar.enum";
import { useLoginStore } from "@/stores/login";
import { useSnackbarStore } from "@/stores/snackbar";
import { useUserInfoStore } from "@/stores/user-info";

const loginStore = useLoginStore();
const userInfo = useUserInfoStore();
const snackbarStore = useSnackbarStore();

const handleShareLink = async () => {
  if (navigator.share) {
    // const response = await fetch(charityDetail.value.image)
    // const blob = await response.blob()
    // const file = new File([blob], 'image.jpg', { type: blob.type })
    navigator
      .share({
        title: "گردونه شانس بادصبا",
        // text: charityDetail.value?.description,
        url: userInfo.userData.referralLink,
        // files: [file]
      })
      .then(() => {
        console.log("Content shared successfully");
      })
      .catch((error) => {
        console.error("Error sharing content:", error);
      });
  } else {
    const inputElement = document.createElement("input");
    inputElement.value = userInfo.userData.referralLink || "";
    document.body.appendChild(inputElement);
    inputElement.select();
    inputElement.setSelectionRange(0, 99999); // for mobile devices
    document.execCommand("copy"); // Copy the text inside the text field
    document.body.removeChild(inputElement);

    snackbarStore.showSnackbar({
      message: "با موفقیت کپی شد",
      type: SnackbarStatusEnum.Success,
    });
  }
};
</script>

<style scoped>
.v-card {
  border: 2px solid #b5c458;
  background: #b5c45833;
  border-radius: 15px;
}
:deep(.v-btn__content) {
  width: 100% !important;
}
</style>
