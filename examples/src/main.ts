import { createApp } from "vue";

import App from "./App.vue"

const vm =  createApp(App)

import ElButton from "element-plus"

import { V3Ellipsis } from "v3-ui/es"

console.log(V3Ellipsis)

vm.use(V3Ellipsis)
vm.mount("#app")