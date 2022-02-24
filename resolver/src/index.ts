import { EP_PKG } from '../../build/utils/constants'

function kebabCase(key: string) {
  const result = key.replace(/([A-Z])/g, ' $1').trim()
  return result.split(' ').join('-').toLowerCase()
}

type ComponentResolver = {
  type: string
  resolve: (name: string) => any
}

export interface ResolverOptions {
  /**
   * import style css or sass with components
   *
   * @default 'css'
   */
  importStyle?: boolean | 'css' | 'sass'

  /**
   * use commonjs lib & source css or scss for ssr
   */
  ssr?: boolean

  /**
   * auto import for directives
   *
   * @default true
   */
  directives?: boolean

  pkgname?: string
}

type ResolverOptionsResolved = Required<ResolverOptions>

function getSideEffects(dirName: string, options: ResolverOptionsResolved) {
  const { importStyle, ssr } = options
  const themeFolder = `${options.pkgname}/theme-chalk`
  const esComponentsFolder = `${options.pkgname}/es/components`

  if (importStyle === 'sass')
    return ssr
      ? `${themeFolder}/src/${dirName}.scss`
      : `${esComponentsFolder}/${dirName}/style/index`
  else if (importStyle === true || importStyle === 'css')
    return ssr
      ? `${themeFolder}/el-${dirName}.css`
      : `${esComponentsFolder}/${dirName}/style/css`
}

function resolveComponent(name: string, options: ResolverOptionsResolved) {
  if (!name.match(/^V3[A-Z]/)) return

  const partialName = kebabCase(name.slice(2))
  const { ssr } = options

  return {
    importName: name,
    path: `${options.pkgname}/${ssr ? 'lib' : 'es'}`,
    sideEffects: getSideEffects(partialName, options),
  }
}

export function Resolver(options: ResolverOptions = {}): ComponentResolver[] {
  let optionsResolved: ResolverOptionsResolved | undefined

  async function resolveOptions() {
    if (optionsResolved) return optionsResolved
    optionsResolved = {
      ssr: false,
      importStyle: 'css',
      directives: true,
      pkgname: EP_PKG,
      ...options,
    }
    return optionsResolved
  }

  return [
    {
      type: 'component',
      resolve: async (name: string) => {
        return resolveComponent(name, await resolveOptions())
      },
    },
  ]
}
