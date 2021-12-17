import {withInstall} from "../../utils/with-install"

import Timer from "./src/timer.vue"

export const V3Timer = withInstall(Timer)

export default {
    install: ()=> V3Timer.install,
    title: "计时器 Timer",
    category: "通用"
}
