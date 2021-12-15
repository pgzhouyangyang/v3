import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"
// https://vitejs.dev/config/
export default defineConfig({
  // root:  path.resolve(__dirname, "./examples"),
  plugins: [vue()],
  // build: {
  //   lib: {
  //     entry: path.resolve(__dirname, "packages/components/index.ts"),
  //     name: "zyy-v3-ui",
  //     fileName: 'zyy-v3-ui',
  //     formats: ['es', 'umd']
  //   },
  //   rollupOptions: {
  //     // 请确保外部化那些你的库中不需要的依赖
  //     external: ['vue'],
  //     output: {
  //       // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
  //       globals: {
  //         vue: 'Vue'
  //       }
  //     }

  //   }
  // }
})
