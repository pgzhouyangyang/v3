
import type {App} from "vue"
import type {SFCWithInstall} from "../../utils/types"
import {withInstall} from "../../utils/with-install"
import { DrawerService as V3DrawerService} from "./src/service"

import Drawer from "./src/drawer"

export const V3Drawer = withInstall(Drawer)

const DrawerService = V3DrawerService as SFCWithInstall<typeof V3DrawerService>


DrawerService.install = (app: App)=> {
    let anchorsContainer = document.getElementById('modal-anchors-container');
    if (!anchorsContainer) {
        anchorsContainer = document.createElement('div');
        anchorsContainer.setAttribute('id', 'modal-anchors-container');
        document.body.appendChild(anchorsContainer);
    }

    app.provide(DrawerService.token, new DrawerService(anchorsContainer, Drawer));
}

export { DrawerService }

export default {
    install: ()=> V3Drawer.install,
    title: "抽屉 Drawer",
    category: "通用"
}


export * from "./src/drawer-types"