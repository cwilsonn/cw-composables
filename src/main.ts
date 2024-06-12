import { createApp } from 'vue'
import '@/assets/css/main.css';

import Router from '@routes/index';
import App from './App.vue'

const app = createApp(App)

app.use(Router)
app.mount('#app');
