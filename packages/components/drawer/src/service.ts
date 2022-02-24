import { CommonModalService } from '../../modal/src/common-service'
import type { InjectionKey } from 'vue'

import type { DrawerProps } from './drawer-types'

export class DrawerService extends CommonModalService<DrawerProps> {
  static token =
    'DRAWER_SERVICE_TOKEN' as unknown as InjectionKey<DrawerService>
}
