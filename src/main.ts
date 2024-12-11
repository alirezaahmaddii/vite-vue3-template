import { createApp } from "vue"
import App from "./App.vue"
import "vuetify/styles/main.sass"
import "./core/styles/settings.scss"
import router from "./router";
import { registerPlugins } from "@/plugins"

createApp(App).use(registerPlugins).use(router).mount("#app")
