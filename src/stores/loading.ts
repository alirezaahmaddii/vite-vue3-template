import { defineStore } from "pinia";

export interface LoadingState {
  isLoading: boolean;
}

export const useLoadingStore = defineStore("loading", {
  state: (): LoadingState => ({
    isLoading: false,
  }),
  getters: {
    isLoading: (state) => state.isLoading,
  },
  actions: {
    setLoading(isLoading: boolean) {
      this.isLoading = isLoading;
    },
  },
});
