import {withInstall} from "../../utils/with-install"
import Table from './src/table'

export const V3Table = withInstall(Table)

export default {
    install: ()=> V3Table.install,
    title: "表格 Table",
    category: "数据展示"
}
