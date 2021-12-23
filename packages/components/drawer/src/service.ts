
import { InjectionKey} from "vue"

import {CommonModalService} from "../../modal/src/common-service"

import {DrawerProps} from "./drawer-types"

export class DrawerService extends CommonModalService<DrawerProps>{

    static token = 'DRAWER_SERVICE_TOKEN' as unknown as InjectionKey<DrawerService>;
}