import { defineStore } from "pinia";

export interface SurveyState {
  openSurvey: boolean;
}

export const useSurveyStore = defineStore("survey", {
  state: (): SurveyState => ({
    openSurvey: false,
  }),
  actions: {
    setOpenSurveyState(openLoginState: boolean) {
      this.openSurvey = openLoginState;
    },
  },
});
