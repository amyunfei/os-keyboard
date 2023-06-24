import { promises as fs } from 'fs'
import { resolve, join } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

export default defineConfig({
  build: {
    lib: {
      entry: [
        resolve(__dirname, './packages/os-keyboard/index.ts')
      ],
      name: 'os-keyboard',
      fileName: format => `index.${format}.js`
    },
    outDir: 'publish/dist'
  },
  plugins: [vanillaExtractPlugin(), dts({
    include: './packages',
    rollupTypes: true,
    afterBuild: () => {
      const dtsFilePath = join(__dirname, './publish/dist/index.d.ts')
      fs.readFile(dtsFilePath, 'utf-8')
        .then(code => {
          // Use RegExp to match and replace constant content
          const regex = /(export declare const\s+\w+:\s+\w+)\s+=\s+[\s\S]*?;\r\n/g
          code = code.replace(regex, '$1;\r\n')
          // Save the modified .d.ts file
          return fs.writeFile(dtsFilePath, code)
        }).catch((err) => {
          console.error('modify .d.ts file error:', err)
        })
    }
  })]
})