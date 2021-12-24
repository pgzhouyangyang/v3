import type { Plugin } from 'vue'
import { DrawerService, V3Drawer } from '../components/drawer'
import { V3Ellipsis } from '../components/ellipsis'
import { ModalService, V3Modal } from '../components/modal'
import { V3Timer } from '../components/timer'
import { V3Table} from '../components/table'

export default [
	DrawerService,
	V3Drawer,
	V3Ellipsis,
	ModalService,
	V3Modal,
	V3Timer,
	V3Table
] as Plugin[]