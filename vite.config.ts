import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [react(),
    dts({ include: ['lib'] })],
  build: {
    lib: {
      entry: resolve('src', 'components/Table/Table.tsx'),
      name: 'ReactTableLibrary',
      formats: ['es', 'umd'],
      fileName: (format) => `te-react-table-library.${format}.js`,
    },
    copyPublicDir: false,
  },
  server: {
    host: true,
    port: 8000, // This is the port which we will use in docker
 },
 test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTest.ts',
    // speed up since test don't rely on css
    css: false,
    coverage: {
       reporter: ['text', 'json', 'html'],
    },
 },
})
