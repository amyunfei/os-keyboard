import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

export default defineConfig({
  build: {
    lib: {
      entry: [
        resolve(__dirname, './packages/os-keyboard/index.ts'),
        resolve(__dirname, './packages/theme/index.ts')
      ],
      name: 'Bundle',
      fileName: 'bundle'
    }
  },
  plugins: [vanillaExtractPlugin(), dts({ include: './packages' })]
})