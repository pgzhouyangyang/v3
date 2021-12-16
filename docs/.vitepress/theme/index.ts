
import DefaultTheme from 'vitepress/dist/client/theme-default'
import Demo from 'vitepress-theme-demoblock/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/components/DemoBlock.vue'
import v3Ui from "../../../packages/src"
import "zyy-v3-ui/dist/index.css"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "./index.scss"
export default {
    ...DefaultTheme,
    enhanceApp({app}) {
        app.use(v3Ui);
        app.component('Demo', Demo);
        app.component('DemoBlock', DemoBlock);
        app.use(ElementPlus);
    }
}