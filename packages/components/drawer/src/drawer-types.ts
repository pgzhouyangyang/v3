import {ExtractPropTypes, DefineComponent} from "vue"

import { commonModalProps, commonModalOptions } from '../../modal/src/modal-types'
import { drawerProps as edrawerProps } from 'element-plus'

export const drawerProps = {
    ...edrawerProps,
    ...commonModalProps,
} as const

export type DrawerProps = ExtractPropTypes<typeof drawerProps>

export type DrawerOptions = commonModalOptions<DrawerProps>