import fs from "fs-extra"

import { resolveDirFilesInfo, parseExportByFileInfo } from "./utils"

import createEntryTemplate from "./templates/entry"

import { ENTRY_DIR, IGNORE_DIRS, ENTRY_FILE } from "./old/constant"


// 创建入口文件文件
export default async function createEntry() {
    const fileInfo = resolveDirFilesInfo(ENTRY_DIR, IGNORE_DIRS)
    const exportModules = []
    fileInfo.forEach((f) => {
        const em = parseExportByFileInfo(f)
        if (!em) return
        exportModules.push(em)
    })

    const template = createEntryTemplate(exportModules)
    try {
        await fs.writeFile(ENTRY_FILE, template, { encoding: 'utf-8' })
    } catch (e) {
    }
}