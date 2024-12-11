import { createApp } from "vue"
import App from "./App.vue"
import "vuetify/styles/main.sass"
import "./core/styles/settings.scss"
import "./assets/styles/font.scss";
import "./assets/styles/vutify.scss";
import { registerPlugins } from "@/plugins"

createApp(App).use(registerPlugins).mount("#app")
