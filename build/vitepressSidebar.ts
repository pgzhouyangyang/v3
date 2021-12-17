import fs from "fs-extra"

import { resolveDirFilesInfo,  parseComponentInfo} from "./utils/parse"

import createVitepressSidebarTemplate from "./template/vitepress-sidebar"

import { compRoot, docsConfig, ignoreDirs } from "./utils/paths"

export const createVitepressSidebar =  async ()=> {
    const fileInfo = resolveDirFilesInfo(compRoot, ignoreDirs)
    const componentsInfo = []
    fileInfo.forEach((f) => {
        const info = parseComponentInfo(f.dirname)

        if (!info) return

        componentsInfo.push(info)
    })

    const template = createVitepressSidebarTemplate(componentsInfo)
    await fs.writeFile(docsConfig, template, { encoding: 'utf-8' })
}