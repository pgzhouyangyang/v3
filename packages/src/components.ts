import type { Plugin } from 'vue'
import { V3Cus } from '../components/cus'
import { V3Ellipsis } from '../components/ellipsis'
import { V3Modal, V3Drawer } from '../components/modal'
import { V3Timer } from '../components/timer'

export default [
	V3Cus,
	V3Ellipsis,
	V3Modal,
	V3Drawer,
	V3Timer
] as Plugin[]