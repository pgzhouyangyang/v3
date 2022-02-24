import { createApp } from 'vue'
import type { commonModalOptions } from './modal-types'

export abstract class CommonModalService<Options> {
  constructor(public anchorContainer: HTMLElement, public modal: any) {}
  static install: () => void
  root: any
  app: any
  create(root) {
    this.root = root
    return this
  }
  open(data: commonModalOptions<Options>) {
    const { props, $onOk, $onCancel, $onOpen, $onOpened, $onClose } = data
    const app = (this.app = createApp(this.root, props))
    const vm = app
      .component(this.modal.name, this.modal)
      .mount(this.anchorContainer)
    const ref = vm.$refs.modal as any
    if (!ref) {
      throw new Error('根组件缺少ref=modal属性')
    }
    ref.innerVisible = true
    return new Promise((resolve) => {
      let res = false
      ref.$onOk = async (data) => {
        if ($onOk) {
          const res = await $onOk(data)
          if (res === false) return
        }

        ref.innerVisible = false
        res = data || true
      }
      ref.$onCancel = async (data) => {
        if ($onCancel) {
          const res = await $onCancel(data)
          if (res === false) return
        }

        ref.innerVisible = false
        res = false
      }
      ref.$onOpened = () => {
        if ($onOpened) {
          return $onOpened()
        }
      }
      // 打开时事件
      ref.$onOpen = () => {
        if ($onOpen) {
          return $onOpen()
        }
      }
      ref.$onClose = async (data) => {
        if ($onClose) {
          const res = await $onClose(data)
          if (res === false) return
        }
        ref.innerVisible = false
        res = false
      }

      ref.$closed = () => {
        resolve(res)
      }
    }).then((value) => {
      // 结束时销毁弹窗的实例
      this.app.unmount()
      return value
    })
  }
}
