import {camelCase, upperFirst} from "lodash"

import fs from "fs-extra"

import { resolve } from "path"

import { INDEX_FILE_NAME, ENTRY_DIR }  from "./constant"

import * as babelParser from "@babel/parser"

import traverse from "@babel/traverse"

const resolveDirFilesInfo = (targetDir, ignoreDirs = []) => {

    const fileList = fs.readdirSync(targetDir).filter(dir => {
        // 过滤：必须是目录，且不存在与忽略目录内，拥有 INDEX_FILE_NAME
        return fs.statSync(resolve(targetDir, dir)).isDirectory() && 
        !ignoreDirs.includes(dir) && 
        fs.existsSync(resolve(targetDir, dir, INDEX_FILE_NAME))
    })

    return fileList.map((dir) => ({
        name: upperFirst(camelCase(dir)),
        dirname: dir,
        path: resolve(targetDir, dir, INDEX_FILE_NAME)
    }))
}




const parseExportByFileInfo = (fileInfo) => {
    const exportModule = {}
    const indexContent = fs.readFileSync(fileInfo.path, { encoding: 'utf-8' })
    const ast = babelParser.parse(indexContent, {
        sourceType: 'module',
        plugins: [
            'typescript'
        ]
    })
    
    const exportName = []
    let exportDefault = ""

    traverse(ast, {
        ExportNamedDeclaration({ node }) {
            if (node.specifiers.length) {
                node.specifiers.forEach((specifier) => {
                    exportName.push(specifier.local.name)
                })
            } else if (node.declaration) {
                if (node.declaration.declarations) {
                    node.declaration.declarations.forEach(dec => {
                        exportName.push(dec.id.name)
                    })
                } else if (node.declaration.id) {
                    exportName.push(node.declaration.id.name)
                }
            }
        },
        ExportDefaultDeclaration() {
            exportDefault = fileInfo.name + 'Install'
        }
    })

    exportModule.default = exportDefault
    exportModule.parts = exportName
    exportModule.fileInfo = fileInfo
    return exportModule
}


const parseComponentInfo = (name) => {
    const componentInfo = {
        name
    }
    let hasExportDefault = false
    const indexContent = fs.readFileSync(resolve(ENTRY_DIR, name, INDEX_FILE_NAME), { encoding: 'utf-8' })

    const ast = babelParser.parse(indexContent, {
        sourceType: 'module',
        plugins: [
            'typescript'
        ]
    })
    traverse(ast, {
        ExportDefaultDeclaration({ node }) {
            hasExportDefault = true
            if (node.declaration && node.declaration.properties) {
                const properties = node.declaration.properties
                properties.forEach(pro => {
                    if (pro.type === 'ObjectProperty') {
                        if(pro.key.name) {
                            componentInfo[pro.key.name] = pro.value.value
                        }
                       
                    }
                })
            }
        }
    })
    return componentInfo
}
export {
    resolveDirFilesInfo,
    parseExportByFileInfo,
    parseComponentInfo
}