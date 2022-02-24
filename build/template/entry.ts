import { relative, resolve } from 'path'

import { compRoot, epRoot } from '../utils/paths'

const relativePath = (from, to) => {
  return relative(from, to)
    .replace(/\\/g, '/')
    .replace('/index.ts', '')
    .replace(/(.*)\.\.\//, '$1./')
    .replace(/\/\.\//, '/')
}

export default (exportModules = []): Record<string, any> => {
  const packages = []
  const { comTemplate, srcTemplate } = exportModules.reduce(
    (res, cur) => {
      const relativePath1 = relativePath(
        resolve(compRoot, `index.ts`),
        cur.fileInfo.path
      )

      const relativePath2 = relativePath(
        resolve(epRoot, `index.ts`),
        cur.fileInfo.path
      )

      res.comTemplate.push(`export * from '${relativePath1}'\n`)

      res.srcTemplate.push(
        `import { ${cur.parts.join(', ')} } from '${relativePath2}'\n`
      )

      packages.push(...cur.parts)

      return res
    },
    { comTemplate: [], srcTemplate: [] }
  )

  return {
    comTemplate: comTemplate.join(''),
    srcTemplate: `import type { Plugin } from 'vue'\n${srcTemplate.join(
      ''
    )}\nexport default [\n\t${packages.join(',\n\t')}\n] as Plugin[]`,
  }
}
