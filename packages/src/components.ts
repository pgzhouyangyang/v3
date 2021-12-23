import type { Plugin } from 'vue'
import { DrawerService, V3Drawer } from '../components/drawer'
import { V3Ellipsis } from '../components/ellipsis'
import { ModalService, V3Modal } from '../components/modal'
import { V3Timer } from '../components/timer'

export default [
	DrawerService,
	V3Drawer,
	V3Ellipsis,
	ModalService,
	V3Modal,
	V3Timer
] as Plugin[]