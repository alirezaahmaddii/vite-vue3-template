<template>
  <v-locale-provider rtl>
    <v-app>
      <v-main>
        <router-view />
        <appLoading v-if="isLoading" />
        <AppSnackbar v-if="isSnackbar" />
        <appLogin v-if="openLoginSheet" />
      </v-main>
    </v-app>
  </v-locale-provider>
</template>

<script lang="ts" setup>
import AppSnackbar from "@/core/components/AppSnackbar.vue";

const appLoading = defineAsyncComponent(
    () => import("@/core/components/AppLoading.vue")
);
const appLogin = defineAsyncComponent(
    () => import("@/core/components/AppLogin.vue")
);

import { useSnackbarStore } from "@/stores/snackbar";
import { useLoadingStore } from "@/stores/loading";
import { useLoginStore } from "@/stores/login";
import {
  SnackbarLocationEnum,
  SnackbarStatusEnum,
} from "./core/enums/snackbar.enum";
import {computed, defineAsyncComponent, onMounted, onUnmounted} from "vue";

const snackbarStore = useSnackbarStore();
const loadingStore = useLoadingStore();
const loginStore = useLoginStore();

const isSnackbar = computed(() => snackbarStore.show);
const isLoading = computed(() => loadingStore.isLoading);
const openLoginSheet = computed(() => loginStore.openLoginState);

const updateOnlineStatus = () => {
  snackbarStore.showSnackbar({
    message: "لطفا دسترسی به اینترنت را بررسی کنید",
    type: SnackbarStatusEnum.Error,
    location: SnackbarLocationEnum.Top,
  });
};

onMounted(() => {
  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);
});

onUnmounted(() => {
  window.removeEventListener("online", updateOnlineStatus);
  window.removeEventListener("offline", updateOnlineStatus);
});
</script>
