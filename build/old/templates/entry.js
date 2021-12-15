const { relative } = require('path')


import { INDEX_FILE_NAME, VERSION, ENTRY_FILE } from "../constant"

export default (exportModules = []) => {
  const packages = []
  const imports = []
  const installs = []

  exportModules.forEach((m) => {
    const { fileInfo } = m
    const relativePath = relative(ENTRY_FILE, fileInfo.path)
      .replace(/\\/g, '/')
      .replace('..', '.')
      .replace('/' + INDEX_FILE_NAME, '')

    const importStr = `import ${m.default}, { ${m.parts.join(', ')} } from '${relativePath}'`

    packages.push(...m.parts)
    imports.push(importStr)
    installs.push(m.default)
  })

  const template = `\
import type { App } from 'vue'

${imports.join('\n')}

const installs = [
  ${installs.join(',\n\t')}
]

export {
  ${packages.join(',\n\t')}
}

export default {
  version: '${VERSION}',
  install(app: App): void {
    installs.forEach((p) => app.use(p as any))
  }
}
`

  return template
}
