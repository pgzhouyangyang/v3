import {withInstall} from "../../utils/with-install"

import Timer from "./src/timer.vue"

export const V3Timer = withInstall(Timer)


V3Timer.title = "计时器 Timer"
V3Timer.category = "通用"

export default V3Timer