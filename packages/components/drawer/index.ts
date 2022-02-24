import { DrawerService } from './src/service'

import Drawer from './src/drawer'
import type { App } from 'vue'

DrawerService.install = (): void => {
  // do nothing
}

export { DrawerService }

export const V3Drawer = {
  install(app: App) {
    app.component(Drawer.name, Drawer)
    let anchorsContainer = document.getElementById('modal-anchors-container')
    if (!anchorsContainer) {
      anchorsContainer = document.createElement('div')
      anchorsContainer.setAttribute('id', 'modal-anchors-container')
      document.body.appendChild(anchorsContainer)
    }

    app.provide(
      DrawerService.token,
      new DrawerService(anchorsContainer, Drawer)
    )
  },
}

export default {
  install: () => V3Drawer.install,
  title: '抽屉 Drawer',
  category: '反馈组件',
}

export * from './src/drawer-types'
