import { defineStore } from "pinia";
import { SnackbarLocationEnum, SnackbarStatusEnum } from "@/core/enums/snackbar.enum";

export interface SnackbarState {
  show: boolean;
  duration: number;
  type: SnackbarStatusEnum;
  message: string;
  location: SnackbarLocationEnum;
}

export const useSnackbarStore = defineStore("snackbar", {
  state: (): SnackbarState => ({
    show: false,
    duration: 3000,
    type: SnackbarStatusEnum.Success,
    message: "",
    location: SnackbarLocationEnum.Bottom,
  }),
  getters: {
    snackbarDetail: (state): SnackbarState => state,
  },
  actions: {
    showSnackbar(payload: Partial<SnackbarState>) {
      this.show = true;
      this.duration = payload.duration ?? 3000;
      this.type = payload.type ?? SnackbarStatusEnum.Success;
      this.message = payload.message ?? "";
      this.location = payload.location ?? SnackbarLocationEnum.Bottom;

      // Hide snackbar after the specified duration
      setTimeout(() => {
        this.hideSnackbar();
      }, this.duration);
    },
    hideSnackbar() {
      this.show = false;
    },
  },
});
