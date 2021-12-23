
import { defineComponent, ref, watch } from "vue"

import { drawerProps } from "./drawer-types"

import { ElDrawer, ElButton, ElScrollbar } from "element-plus"

export default defineComponent({
  name: "V3Drawer",
  props: drawerProps,
  setup(props, ctx) {

    const $onOk = ref<any>(null)
    const $onCancel = ref<any>(null)
    const $onOpened = ref<any>(null)
    const $onOpen = ref<any>(null)
    const $onClose = ref<any>(null)
    const $closed = ref<any>(null)

    const innerVisible = ref<boolean>(false)
    const innerFullscreen = ref<boolean>(props.fullscreen)

    const toggleFullscreen = () => {
      innerFullscreen.value = !innerFullscreen.value
    }

    watch(() => props.fullscreen, (value) => {
      innerFullscreen.value = value
    })

    const open = () => {
      // $onOpend 是外部注入的方法
      let data;
      if ($onOpen.value) {
        data = $onOpen.value();
      }
      if (data && props.onOpen) {
        props.onOpen(data);
      }


    }

    const opened = () => {
      // $onOpend 是外部注入的方法
      let data;
      if ($onOpened.value) {
        data = $onOpened.value();
      }
      if (data && props.onOpened) {
        props.onOpened(data);
      }

    }

    const close = async () => {
      // 如果 res 返回最终为 false 将不关闭弹窗
      let res;
      if (props.onClose) {

        res = await props.onClose();
        if (res === false) return;
      }
      // $onOk 是外部注入的方法， res 将会作为 openModal 方法的结果返回
      if ($onClose.value) return $onClose.value(res);
    }

    const confirm = async () => {
      // 如果 res 返回最终为 false 将不关闭弹窗
      let res;
      if (props.onOk) {
        res = await props.onOk();
        if (res === false) return;
      }
      // $onOk 是外部注入的方法， res 将会作为 openModal 方法的结果返回
      if ($onOk.value) return $onOk.value(res);
    }


    const cancel = async () => {
      //如果 res 返回最终为 false 将不关闭弹窗
      let res;
      if (props.onCancel) {
        res = await props.onCancel();
        if (res === false) return;
      }
      // $onCancel 是外部注入的方法
      if ($onCancel.value) return $onCancel.value(res);
    }


    const closed = () => {
      if ($closed.value) $closed.value();
    }


    ctx.expose({ innerVisible, $onOk, $onCancel, $onOpened, $onOpen, $onClose, $closed });
    return { innerVisible, innerFullscreen, open, opened, close, closed, toggleFullscreen, confirm, cancel }
  },
  components: {
    ElDrawer,
    ElButton,
    ElScrollbar
  },
  render() {
    const slots = {} as {
      [key: string]: () => any
    }
    if (this.$slots.title) {
      slots.title = () => this.$slots.title?.()
    }
    if (this.$slots.descriptions) {
      slots.descriptions = () => <div class="drawer__descriptions">{this.$slots.descriptions?.()}</div> 
    }
    return <el-drawer
      title={this.title}
      modelValue={this.innerVisible}
      append-to-body={true}
      size={this.width}
      destroy-on-close={this.destroyOnClose}
      custom-class={`custom-drawer-class ${this.customClass}`}
      before-close={this.beforeClose}
      onClose={this.close}
      onClosed={this.closed}
      onOpen={this.open}
      v-slots={slots}
    >
      <el-scrollbar class="drawer__content el-scrollbar__notscrollx">
        <div class="custom-drawer__body">
          {this.$slots.default?.()}
        </div>

      </el-scrollbar>

      {this.showFooter ? <div class="drawer__footer">
        {this.showCancel ? <el-button type={this.cancelType} onClick={this.cancel}>{this.cancelText}</el-button> : ""}
        <el-button type={this.confirmType} onClick={this.confirm}>{this.confirmText}</el-button>
      </div> : ""}
    </el-drawer>

  }
})