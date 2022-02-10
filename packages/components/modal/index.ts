import type { App } from "vue";


import {ModalService} from  "./src/sercive"

export { ModalService } 


import Modal from "./src/modal"

export const V3Modal = {
    install(app: App) {

        app.component(Modal.name, Modal)

        let anchorsContainer = document.getElementById('modal-anchors-container');
        if (!anchorsContainer) {
            anchorsContainer = document.createElement('div');
            anchorsContainer.setAttribute('id', 'modal-anchors-container');
            document.body.appendChild(anchorsContainer);
        }
        app.provide(ModalService.token, new ModalService(anchorsContainer, Modal as any));
    }
}

export default {
    install: () => V3Modal.install,
    title: "弹出框 Modal",
    category: "反馈组件"
}

export * from "./src/modal-types"
