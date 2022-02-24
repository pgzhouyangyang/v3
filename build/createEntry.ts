import { resolve } from 'path'
import fs from 'fs-extra'
import { resolveDirFilesInfo, parseExportByFileInfo } from './utils/parse'

import createEntryTemplate from './template/entry'

import { compRoot, epRoot, ignoreDirs } from './utils/paths'

// 创建入口文件文件
export const createEntry = async () => {
  const fileInfo = resolveDirFilesInfo(compRoot, ignoreDirs)

  const exportModules = []
  fileInfo.forEach((f) => {
    const em = parseExportByFileInfo(f)
    if (!em) return
    exportModules.push(em)
  })

  const { comTemplate, srcTemplate } = createEntryTemplate(exportModules)
  try {
    await Promise.all([
      fs.writeFile(resolve(compRoot, `index.ts`), comTemplate, {
        encoding: 'utf-8',
      }),
      fs.writeFile(resolve(epRoot, `components.ts`), srcTemplate, {
        encoding: 'utf-8',
      }),
    ])
  } catch (e) {}
}
