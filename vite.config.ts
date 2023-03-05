import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, './packages/os-keyboard/index.ts'),
      name: 'Bundle',
      fileName: 'bundle'
    }
  },
  plugins: [dts({ include: './packages' })]
})