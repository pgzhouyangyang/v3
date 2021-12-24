import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// import { Resolver } from "zyy-v3-ui-resolver"


interface ResolverOptions {
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

	pkgname?: string,

	prefix?: string
}

function kebabCase(key: string) {
	const result = key.replace(/([A-Z])/g, ' $1').trim()
	return result.split(' ').join('-').toLowerCase()
}

function getSideEffects(dirName, options: ResolverOptions = {}) {
	const { importStyle, ssr } = options
	const themeFolder = `${options.pkgname}/theme-chalk`
	const esComponentsFolder = `${options.pkgname}/es/components`

	if (importStyle === 'sass')
		return ssr ? `${themeFolder}/src/${dirName}.scss` : `${esComponentsFolder}/${dirName}/style/index`
	else if (importStyle === true || importStyle === 'css')
		return ssr ? `${themeFolder}/${options.prefix}-${dirName}.css` : `${esComponentsFolder}/${dirName}/style/css`
}

// https://vitejs.dev/config/
export default defineConfig({
	// root:  path.resolve(__dirname, "./examples"),
	plugins: [
		vue(),
		vueJsx(),
		// AutoImport({
		// 	resolvers: [
		// 		ElementPlusResolver()
		// 	],
		// }),
		Components({
			deep: true,
			resolvers: [
				ElementPlusResolver()
				// (name) => {
				// 	let path = "";
				// 	let prefix = ""
				// 	if (name.startsWith('V3')) {
				// 		path = 'zyy-v3-ui'
				// 		prefix = "v3"
				// 	} else if (name.startsWith('El')) {
				// 		path = 'element-plus'
				// 		prefix = "el"
				// 	}
				// 	const partialName = kebabCase(name.slice(2))
				// 	return {
				// 		importName: name,
				// 		path,
				// 		sideEffects: getSideEffects(partialName, {
				// 			pkgname: path,
				// 			prefix,
				// 			ssr: false,
				// 			importStyle: 'css',
				// 		}),
				// 	}
				// }
			],
		})
	]
})
