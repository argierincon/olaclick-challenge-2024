import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
const pinia = createPinia();

import "./assets/fonts/index.css";
import "./style.css";

const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount("#app");
