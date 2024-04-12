import { createApp } from "vue";

// Import the global styles
import 'element-plus/dist/index.css'
import "./style.css";

// Import the App component
import App from "./App.vue";

// Import the plugins
import ElementPlus from 'element-plus'
import router from "./router";

// Create the app instance
const app = createApp(App);

// register the components
app.use(ElementPlus)
app.use(router);


// Mount the app
app.mount("#app");
