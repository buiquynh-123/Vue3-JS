import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router/router";
import App from "./App.vue";
import { registerGlobalComponents } from "./utils/import";

import "@/assets/style/tailwind.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import Vuelidate from "vuelidate";
import { LoadingPlugin } from "vue-loading-overlay";
import VueChartkick from "vue-chartkick";

const pinia = createPinia();
const app = createApp(App);

registerGlobalComponents(app);
library.add(fas, fab, far);
app.use(pinia);
app.use(router);
app.use(VueSweetalert2);
app.use(LoadingPlugin);
app.use(Vuelidate);
app.use(VueChartkick);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
