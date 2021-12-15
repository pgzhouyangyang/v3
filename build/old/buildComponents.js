
import path from "path"

import fs from "fs"

import fsExtra from "fs-extra"

import { defineConfig, build } from "vite"

import vue from "@vitejs/plugin-vue"

import { ENTRY_DIR, OUTPUT_DIR} from "./constant"

const baseConfig = defineConfig({
  configFile: false,
  publicDir: false,
  plugins: [
    vue()
  ],
});

const rollupOptions = {
  external: ["vue"],
  output: {
    globals: {
      vue: "Vue"
    },
  },
};

const buildSingle = async (name) => {
  await build(
    defineConfig({
      ...baseConfig,
      build: {
        rollupOptions,
        lib: {
          entry: path.resolve(ENTRY_DIR, name),
          name: "index",
          fileName: "index",
          formats: ["es", "umd"],
        },
        outDir: path.resolve(OUTPUT_DIR, name),
      },
    })
  );
};

const buildAll = async () => {
  await build(
    defineConfig({
      ...baseConfig,
      build: {
        rollupOptions,
        lib: {
          entry: path.resolve(ENTRY_DIR, "zyy-v3-ui.ts"),
          name: "zyy-v3-ui",
          fileName: "zyy-v3-ui",
          formats: ["es", "umd"],
        },
        outDir: OUTPUT_DIR,
      },
    })
  );
};

const createPackageJson = (name) => {
  const fileStr = `{
  "name": "${name}",
  "version": "0.0.0",
  "main": "index.umd.js",
  "module": "index.es.js",
  "style": "style.css"
}`;

  fsExtra.outputFile(
    path.resolve(OUTPUT_DIR, `${name}/package.json`),
    fileStr,
    "utf-8"
  );
};



const  generateIndexDts = (buildDir)=> {
  const fileStr = `import { App } from 'vue';
  declare function install(app: App): void
  declare const _default: {
      install: typeof install;
      version: string;
  };
  export default _default;`
  fsExtra.outputFileSync(path.resolve(buildDir, 'index.d.ts'), fileStr, 'utf8')
}

export async function generateDts(){
  generateIndexDts(OUTPUT_DIR)

  const components = fs.readdirSync(ENTRY_DIR).filter(name => {
    const componentDir = path.resolve(ENTRY_DIR, name)
    const isDir = fs.lstatSync(componentDir).isDirectory()
    return isDir && fs.readdirSync(componentDir).includes('index.ts')
  })
  const srcDts = path.resolve(OUTPUT_DIR, 'index.d.ts')

  for(const name of components) {
    const destDts = path.resolve(OUTPUT_DIR, `${name}/index.d.ts`)
    fs.copyFile(srcDts, destDts, (err) => {
      if (err) {
      }
    })
  }
}

export default async function buildStart() {
  await buildAll();

  const components = fs.readdirSync(ENTRY_DIR).filter((name) => {
    const componentDir = path.resolve(ENTRY_DIR, name);
    const isDir = fs.lstatSync(componentDir).isDirectory();
    return isDir && fs.readdirSync(componentDir).includes("index.ts");
  });

  for (const name of components) {
    await buildSingle(name);
    createPackageJson(name);
  }
};



