import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'index',
      fileName: 'index',
      formats: ['cjs', 'es'],
    },
    // rollupOptions: {
    //     input: resolve(__dirname, "./src/index.ts"),
    //     output: [
    //         {
    //             format: "esm",
    //             name: "index"
    //         },
    //         {
    //             format: "umd",
    //             name: "index"
    //         }
    //     ]
    // }
  },
})
