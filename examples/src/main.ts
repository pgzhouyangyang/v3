import { createApp } from "vue";

import App from "./App.vue"

const vm =  createApp(App)

import ElementPlus from "element-plus"
import "element-plus/theme-chalk/index.css"
vm.use(ElementPlus)


import {V3Timer} from "zyy-v3-ui"


import "../../dist/zyy-v3-ui/theme-chalk/index.css"
console.log(V3Timer)


vm.use(v3ui)
vm.mount("#app")