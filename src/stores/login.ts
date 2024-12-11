import { defineStore } from "pinia";

export interface LoginState {
  loginText: string;
  openLoginState: boolean;
  loginFunction?: () => void;
}

export const useLoginStore = defineStore("login", {
  state: (): LoginState => ({
    loginText: "شماره موبایلت رو وارد کن تا بتونی تو گردونه شانس بادصبا شرکت کنی و جایزه ببری!",
    openLoginState: false,
    loginFunction: undefined,
  }),
  actions: {
    setOpenLoginState(openLoginState: boolean) {
      this.openLoginState = openLoginState;
    },
    setLoginText(loginText: string) {
      this.loginText = loginText;
    },
    setLoginFunction(loginFunction: () => void) {
      this.loginFunction = loginFunction;
    },
  },
});
