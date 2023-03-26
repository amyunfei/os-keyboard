import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

export default defineConfig({
  build: {
    lib: {
      entry: [
        resolve(__dirname, './packages/os-keyboard/index.ts')
      ],
      name: 'os-keyboard'
    }
  },
  plugins: [vanillaExtractPlugin(), dts({ include: './packages' })]
})