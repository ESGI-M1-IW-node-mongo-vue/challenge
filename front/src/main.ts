import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vue3GoogleLogin from 'vue3-google-login'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(vue3GoogleLogin, {
    clientId: '642667688966-urrgb8an0706ts0tu8mr48j5eqkvne2e.apps.googleusercontent.com'
})
app.use(router)

app.mount('#app')
