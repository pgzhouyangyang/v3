import { epPackage } from './paths'
import { getPackageDependencies } from './pkg'

import { EP_PKG } from './constants'
import type { OutputOptions, RollupBuild } from 'rollup'

export const generateExternal = async (options: { full: boolean }) => {
  return (id: string) => {
    const packages: string[] = ['vue']
    if (!options.full) {
      packages.push(`${EP_PKG}/theme-chalk`)
      // dependencies
      packages.push('@vue', ...getPackageDependencies(epPackage))
    }

    return [...new Set(packages)].some(
      (pkg) => id === pkg || id.startsWith(`${pkg}/`)
    )
  }
}

export function writeBundles(bundle: RollupBuild, options: OutputOptions[]) {
  return Promise.all(options.map((option) => bundle.write(option)))
}
