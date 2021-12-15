import fs from "fs-extra"

import { resolveDirFilesInfo,  parseComponentInfo} from "./utils"

import createVitepressSidebarTemplate from "./templates/vitepress-sidebar"

import { ENTRY_DIR, IGNORE_DIRS, VITEPRESS_SIDEBAR_FILE } from "./old/constant"

export default async function createVitepressSidebar() {
    const fileInfo = resolveDirFilesInfo(ENTRY_DIR, IGNORE_DIRS)
    const componentsInfo = []

    fileInfo.forEach((f) => {
        const info = parseComponentInfo(f.dirname)

        if (!info) return

        componentsInfo.push(info)
    })

    const template = createVitepressSidebarTemplate(componentsInfo)
    await fs.writeFile(VITEPRESS_SIDEBAR_FILE, template, { encoding: 'utf-8' })
}