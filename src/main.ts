import { createApp } from "vue";

// Import the global styles
import "./style.css";

// Import the App component
import App from "./App.vue";

// Import the router
import router from "./router";

// Create the app instance
const app = createApp(App);

// register the components
app.use(router);

// Mount the app
app.mount("#app");
