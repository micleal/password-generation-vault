import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'
import tsConfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config
export default defineConfig({
  plugins: [tsConfigPaths(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
