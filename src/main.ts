import { createApp } from "vue"
import App from "./App.vue"
import "vuetify/styles/main.sass"
import "./core/styles/settings.scss"
import { registerPlugins } from "@/plugins"

createApp(App).use(registerPlugins).mount("#app")
