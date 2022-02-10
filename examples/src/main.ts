import { createApp } from "vue";

import App from "./App.vue"

const vm =  createApp(App)

import V3UI from "../../packages/src"

import "../../packages/theme-chalk/src/index.scss"


import ElementPlus from 'element-plus'
import "element-plus/theme-chalk/index.css"




vm.use(V3UI)
vm.use(ElementPlus)
vm.mount("#app")