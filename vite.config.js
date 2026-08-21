import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    pool: 'threads',
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
      '@components': path.resolve(import.meta.dirname, './src/components'),
      '@sections': path.resolve(import.meta.dirname, './src/sections'),
      '@hooks': path.resolve(import.meta.dirname, './src/hooks'),
      '@data': path.resolve(import.meta.dirname, './src/data'),
      '@animations': path.resolve(import.meta.dirname, './src/animations'),
      '@utils': path.resolve(import.meta.dirname, './src/utils'),
      '@assets': path.resolve(import.meta.dirname, './src/assets'),
      '@constants': path.resolve(import.meta.dirname, './src/constants'),
    },
  },
})
