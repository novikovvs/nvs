import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-dark-purple/theme.css'
import VueMobileDetection from "vue-mobile-detection";
import axios from "./api/axios";
import ToastService from "primevue/toastservice";
console.log(import.meta.env.VITE_API_URL);

const app = createApp(App,).use(PrimeVue).use(VueMobileDetection)

app.use(axios)
app.use(ToastService)

app.mount('#app')
