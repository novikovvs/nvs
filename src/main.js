import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-dark-purple/theme.css'
import VueMobileDetection from "vue-mobile-detection";

createApp(App,).use(PrimeVue).use(VueMobileDetection).mount('#app')
