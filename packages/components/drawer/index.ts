
import type {App} from "vue"

import { DrawerService } from "./src/service"

DrawerService.install = ()=> {}

export {DrawerService}

import Drawer from "./src/drawer"


export const V3Drawer = {
    install(app: App) {
        app.component(Drawer.name, Drawer)
        let anchorsContainer = document.getElementById('modal-anchors-container');
        if (!anchorsContainer) {
            anchorsContainer = document.createElement('div');
            anchorsContainer.setAttribute('id', 'modal-anchors-container');
            document.body.appendChild(anchorsContainer);
        }

        app.provide(DrawerService.token, new DrawerService(anchorsContainer, Drawer));
    }
}



export default {
    install: ()=> V3Drawer.install,
    title: "抽屉 Drawer",
    category: "通用"
}


export * from "./src/drawer-types"