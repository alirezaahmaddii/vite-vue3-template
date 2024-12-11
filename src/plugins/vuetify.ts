import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import "../core/styles/settings.scss";

export default createVuetify({
  defaults: {
    VBtn: { color: "bgBtn" },
  },
  theme: {
    defaultTheme: "customTheme",
    themes: {
      customTheme: {
        colors: {
          info: "#F0F2F6",
          bgBtn: "#B5C458",
          "on-bgBtn": "#FFF",
          red: "#FF4749",
          bgRed: "#FFE5E5",
          green: "#B5C458",
          "green-100": "#EAEDDE",
          gray: "#F0F2F6",
          bgGreen: "#B5C45833",
          "on-surface": "#191B1D",
          "surface-n20":"#191B1D",
          "surface-n40":"#393B3E",
          "surface-n50":"#939599",
        },
      },
    },
  },
});
