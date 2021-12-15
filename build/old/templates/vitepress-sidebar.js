
import { SITES_COMPONENTS_DIR_NAME, VITEPRESS_SIDEBAR_CATEGORY }  from "../constant"

function buildComponentOptions(text, name) {
  return { text, link: `/${SITES_COMPONENTS_DIR_NAME}/${name}/`}
}

function buildCategoryOptions(text, children = []): rootNav {
  return { text, children }
}

export default (componentsInfo = []) => {
  const rootNav = { text: '开始', link: '/' }
  const categoryMap = VITEPRESS_SIDEBAR_CATEGORY.reduce((map, cate) => map.set(cate, []), new Map())

  componentsInfo.forEach((info) => {
    if (categoryMap.has(info.category)) {
      categoryMap.get(info.category).push(buildComponentOptions(info.title, info.name))
    }
  })

  const sidebar = [].concat(
    rootNav,
    Array.from(categoryMap).map(([k, v]) => buildCategoryOptions(k, v))
  )

  return `\
export default {
  '/': ${JSON.stringify(sidebar, null, 2).replace(/\n/g, '\n\t')}
}
`
}
