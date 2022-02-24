import { drawerProps as edrawerProps } from 'element-plus'
import { commonModalProps } from '../../modal/src/modal-types'
import type { ExtractPropTypes } from 'vue'

import type { commonModalOptions } from '../../modal/src/modal-types'

export const drawerProps = {
  ...edrawerProps,
  ...commonModalProps,
} as const

export type DrawerProps = ExtractPropTypes<typeof drawerProps>

export type DrawerOptions = commonModalOptions<DrawerProps>
