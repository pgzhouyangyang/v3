
import {withInstall} from "../../utils/with-install"

import Modal from "./src/modal.vue";

export const V3Modal = withInstall(Modal)

export const V3Drawer = {name: "V3Drawer"}


export default {
    install: ()=> V3Modal.install,
    title: "弹出框 Modal",
    category: "通用"
}


