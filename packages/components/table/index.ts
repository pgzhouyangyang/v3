import {withInstall} from "../../utils/with-install"
import Table from './src/index'

export const V3Table = withInstall(Table)

export default {
    install: ()=> V3Table.install,
    title: "",
    category: ""
}
