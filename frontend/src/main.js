import { createApp } from "vue";
import App from "./App.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import router from "./router";
import { createPinia } from "pinia";
import "./assets/main.css";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

const app = createApp(App);
const pinia = createPinia();

app.component("Loading", Loading);
app.component("Header", Header);
app.component("Footer", Footer);

app.use(router);
app.use(pinia);

app.mount("#app");
