import { createApp } from "vue"
import App from "./App.vue"
import "vuetify/styles/main.sass"
import "./core/styles/settings.scss"
import "./assets/styles/font.scss";
import "./assets/styles/vutify.scss";
import { registerPlugins } from "@/plugins"
import { useOTP } from "./core/composable/useOTP";

const { verificationCode } = useOTP();
const app = createApp(App)

app.provide("verificationCode", verificationCode);
window.fillOTPInput = function (otpCode: string) {
    verificationCode.value = otpCode;
};

app.use(registerPlugins).mount("#app")
