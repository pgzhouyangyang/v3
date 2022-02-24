import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import V3UI from '../../packages/src'
import App from './App.vue'
import 'element-plus/theme-chalk/index.css'
import '../../packages/theme-chalk/src/index.scss'

const vm = createApp(App)

vm.use(V3UI)
vm.use(ElementPlus)
vm.mount('#app')
