

import {withInstall} from "../../utils/with-install"

import Ellipsis from "./src/ellipsis.vue";


export const V3Ellipsis = withInstall(Ellipsis)

export default  {
    install: ()=> V3Ellipsis.install,
    title: "文本省略 Ellipsis",
    category: "通用"
}