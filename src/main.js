import './assets/main.css'
import "bootstrap/dist/css/bootstrap.min.css"

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./assets/custom.css"
import "bootstrap"
import store from "./store/store"
const app = createApp(App)

app.use(router)

app.mount('#app')
app.use(store)