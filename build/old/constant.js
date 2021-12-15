import {resolve} from "path"
const { version } = require('../../package.json')


const VERSION = version

const ENTRY_DIR = resolve(__dirname, "../packages/components")

const OUTPUT_DIR = resolve(__dirname, "../dist");

const IGNORE_DIRS = ['style']

const ENTRY_FILE_NAME = "v3-ui.ts"

const ENTRY_FILE = resolve(ENTRY_DIR, ENTRY_FILE_NAME)

const INDEX_FILE_NAME = "index.ts"

const SITES_DIR = resolve(__dirname, '../docs')

const VITEPRESS_DIR = resolve(SITES_DIR, '.vitepress')

const VITEPRESS_SIDEBAR_FILE_NAME = 'sidebar.ts'

const VITEPRESS_SIDEBAR_FILE = resolve(VITEPRESS_DIR, `config/${VITEPRESS_SIDEBAR_FILE_NAME}`)

const SITES_COMPONENTS_DIR_NAME = 'components'

// 这里的分类顺序将会影响最终生成的页面侧边栏顺序
const VITEPRESS_SIDEBAR_CATEGORY = ['通用']
// , '导航', '反馈', '数据录入', '数据展示', '布局'

export {
    VERSION,
    ENTRY_DIR,
    OUTPUT_DIR,
    IGNORE_DIRS,
    ENTRY_FILE_NAME,
    ENTRY_FILE,
    INDEX_FILE_NAME,
    SITES_DIR,
    VITEPRESS_DIR,
    VITEPRESS_SIDEBAR_FILE_NAME,
    VITEPRESS_SIDEBAR_FILE,
    SITES_COMPONENTS_DIR_NAME,
    VITEPRESS_SIDEBAR_CATEGORY
}