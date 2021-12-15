import {series, parallel} from "gulp"

import createEntry from "../createEntry"

import createVitepressSidebar from "./createVitepressSidebar"

import buildComponents, {generateDts} from "./buildComponents"

// 创建入口文件
const createEntryTask = async ()=> {
    createEntry()
}

// 创建文档导航
const createVitepressSidebarTask = async ()=> {
    createVitepressSidebar()
}



// 打包组件
const buildComponentsTask = async ()=> {
    await buildComponents()
    generateDts()
}



export default parallel(createEntryTask, createVitepressSidebarTask, buildComponentsTask)