// GlobalComponents for Volar
declare module 'vue' {
  export interface GlobalComponents {
    V3Ellipsis: typeof import('zyy-v3-ui')['V3Ellipsis']
    V3Timer: typeof import('zyy-v3-ui')['V3Timer']
  }
}

export {}
