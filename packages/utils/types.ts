import type { CSSProperties, Plugin } from "vue"


export type SFCWithInstall<T> = T & Plugin

export type StyleValue = string | CSSProperties | Array<StyleValue>