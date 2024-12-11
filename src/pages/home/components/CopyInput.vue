<template>
  <v-card class="pa-1 px-3 bg-blue-grey-lighten-5">
    <div class="d-flex justify-center align-center justify-space-between">
      <div
        class="d-flex flex-row align-items-center bg-green-100 text-green pa-4 py-2 rounded-lg ga-2"
        @click="copyToClipBoard"
      >
        <div>
          <span class="mdi mdi-content-copy" />
        </div>
        کپی کردن
      </div>
      <div>
        {{ title }}
      </div>
    </div>
  </v-card>
</template>

<script lang="ts" setup>
import {useSnackbarStore} from "@/stores/snackbar";
import {SnackbarStatusEnum} from "@/core/enums/snackbar.enum";

const props = defineProps<{
  title: string
}>()

const snackbarStore = useSnackbarStore();

const copyToClipBoard = () => {
  navigator.clipboard
    .writeText(props.title);
  snackbarStore.showSnackbar({
    message: "با موفقیت کپی شد",
    type: SnackbarStatusEnum.Success,
  });
}

</script>

<style lang="scss" scoped></style>
