import { ButtonType, dialogProps } from "element-plus"
import type { DefineComponent, ExtractPropTypes, PropType, VNode } from "vue"

export const commonModalProps = {
    modelValue: Boolean,
    confirmText: {
        type: String,
        default: "确 定"
    },
    confirmType: {
        type: String as () => ButtonType,
        default: "primary"
    },
    cancelText: {
        type: String,
        default: "取 消"
    },
    cancelType: {
        type: String as () => ButtonType,
        default: "default"
    },
    showCancel: {
        type: Boolean,
        default: true
    },
    showFooter: {
        type: Boolean,
        default: true
    },
    onOpen: Function as PropType<(data?: any)=> void>,
    onOpened: Function as PropType<(data?: any)=> void>,
    onOk: Function as PropType<(data?: any)=> void>,
    onCancel: Function as PropType<(data?: any)=> void>,
    onClose: Function as PropType<(data?: any)=> void>,
    content: [Function, Object, String] as PropType<(data?: any)=> void | VNode | string>,
}


export interface commonModalOptions<Props> {
    props?: Partial<Props>,
    content?: any,
    $onOk?: Function,
    $onCancel?: Function
    $onOpen?: Function
    $onOpened?: Function
    $onClose?: Function
    parent?: DefineComponent,
}

export const modalProps = {
    ...dialogProps,
   ...commonModalProps,
   fullscreenIcon: Boolean,
} as const



export type ModalProps = ExtractPropTypes<typeof modalProps>

export type ModalOptions = commonModalOptions<ModalProps>