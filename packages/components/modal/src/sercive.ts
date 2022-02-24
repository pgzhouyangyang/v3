import { CommonModalService } from './common-service'
import type { InjectionKey } from 'vue'

import type { ModalProps } from './modal-types'

export class ModalService extends CommonModalService<ModalProps> {
  static token = 'MODAL_SERVICE_TOKEN' as unknown as InjectionKey<ModalService>
}
