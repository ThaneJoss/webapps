import '@fontsource/space-grotesk/400.css'
import '@fontsource/space-grotesk/500.css'
import '@fontsource/space-grotesk/700.css'
import '@fontsource/jetbrains-mono/500.css'
import 'uno.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router/index.js'
import './styles.css'

createApp(App).use(router).mount('#app')
