import type { App } from "vue";
import type {SFCWithInstall} from "../../utils/types"
import {withInstall} from "../../utils/with-install"

import {ModalService as V3ModalService} from  "./src/sercive"

import Modal from "./src/modal"

export const V3Modal = withInstall(Modal)


const ModalService = V3ModalService as SFCWithInstall<typeof V3ModalService>

ModalService.install = (app: App)=> {
    let anchorsContainer = document.getElementById('modal-anchors-container');
    if (!anchorsContainer) {
        anchorsContainer = document.createElement('div');
        anchorsContainer.setAttribute('id', 'modal-anchors-container');
        document.body.appendChild(anchorsContainer);
    }

    app.provide(ModalService.token, new ModalService(anchorsContainer, Modal as any));
}

export { ModalService } 



export default {
    install: () => V3Modal.install,
    title: "弹出框 Modal",
    category: "通用"
}

export * from "./src/modal-types"
