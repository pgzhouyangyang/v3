
import { defineComponent, ref, watch } from "vue"

import { modalProps } from "./modal-types"

import { ElDialog, ElButton } from "element-plus"

export default defineComponent({
	name: "V3Modal",
	props: modalProps,
	emits: ["update:modelValue"],
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
		watch(()=> props.modelValue, value=> {
			innerVisible.value = value
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
			 ctx.emit("update:modelValue", false)
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

			ctx.emit("update:modelValue", false)
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

			
			ctx.emit("update:modelValue", false)

		}


		const closed = ()=> {
            if ($closed.value) $closed.value();
        }

	
		ctx.expose({ innerVisible, $onOk, $onCancel, $onOpened, $onOpen, $onClose, $closed });
		return { innerVisible, innerFullscreen, open, opened, close, closed, toggleFullscreen, confirm, cancel }
	},
	components: {
		ElDialog,
		ElButton
	},
	render() {
		const slots = {} as {
			[key: string]: () => any
		}
		if (this.$slots.title) {
			slots.title = () => this.$slots.title?.()
		}
		if (this.fullscreenIcon) {
			slots.title = () => <div class="el-dialog__title">
				<div>
					{this.title}
				</div>
				<div>
					<i class="fullscreen-icon" icon-class={this.fullscreen ? 'exit-fullscreen' : 'fullscreen'} onClick={this.toggleFullscreen} />
				</div>
			</div>
		}
		if (this.showFooter) {
			slots.footer = () => <div class="dialog-footer">
				<el-button type={this.confirmType} onClick={this.confirm}>{this.confirmText}</el-button>

				{this.showCancel ? <el-button type={this.cancelType} onClick={this.cancel}>{this.cancelText}</el-button> : ""}

			</div>
		}
		return <el-dialog
			ref="dialog"
			title={this.title}
			modelValue={this.innerVisible}
			width={this.width}
			top={this.top}
			fullscreen={this.innerFullscreen}
			modal={this.modal}
			append-to-body={this.appendToBody}
			lock-scroll={this.lockScroll}
			close-on-click-modal={this.closeOnClickModal}
			close-on-press-escape={this.closeOnPressEscape}
			show-close={this.showClose}
			custom-class={this.customClass}
			center={this.center}
			destroy-on-close={this.destroyOnClose}
			before-close={this.beforeClose}
			onOpen={this.open}
			onOpened={this.opened}
			onClose={this.close}
			onClosed={this.closed}
			v-slots={slots}
		>
			{this.$slots.default?.()}
		</el-dialog>

	}
})