import { createApp } from "vue";
import App from "@/App.vue";
import { router } from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
// register the plugin on vue
import 'simple-notify/dist/simple-notify.min.css'

loadFonts();

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.mount("#app");
