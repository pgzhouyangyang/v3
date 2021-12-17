import { resolve } from 'path'
import {EP_PKG} from "./constants"
export const projRoot = resolve(__dirname, '..', '..')
export const pkgRoot = resolve(projRoot, 'packages')
export const compRoot = resolve(pkgRoot, 'components')
export const themeRoot = resolve(pkgRoot, 'theme-chalk')
export const hookRoot = resolve(pkgRoot, 'hooks')
export const localeRoot = resolve(pkgRoot, 'locale')
export const directiveRoot = resolve(pkgRoot, 'directives')
export const epRoot = resolve(pkgRoot, 'src')
export const utilRoot = resolve(pkgRoot, 'utils')
export const docRoot = resolve(projRoot, 'docs')
export const ignoreDirs = ['style']

/** dist */
export const buildOutput = resolve(projRoot, 'dist')
/** dist/EP_PKG */
export const epOutput = resolve(buildOutput, EP_PKG)

export const projPackage = resolve(projRoot, 'package.json')
export const compPackage = resolve(compRoot, 'package.json')
export const themePackage = resolve(themeRoot, 'package.json')
export const hookPackage = resolve(hookRoot, 'package.json')
export const localePackage = resolve(localeRoot, 'package.json')
export const directivePackage = resolve(directiveRoot, 'package.json')
export const epPackage = resolve(projRoot, 'package.json')
export const utilPackage = resolve(utilRoot, 'package.json')
export const docPackage = resolve(docRoot, 'package.json')


/** docs */


export const docsRoot = resolve(__dirname, '../../docs')

export const docsConfig = resolve(docsRoot, '.vitepress/config/sidebar.ts')



