import { DrawerService, V3Drawer } from '../components/drawer'
import { V3Ellipsis } from '../components/ellipsis'
import { ModalService, V3Modal } from '../components/modal'
import { V3Table } from '../components/table'
import { V3Timer } from '../components/timer'
import type { Plugin } from 'vue'

export default [
  DrawerService,
  V3Drawer,
  V3Ellipsis,
  ModalService,
  V3Modal,
  V3Table,
  V3Timer,
] as Plugin[]
