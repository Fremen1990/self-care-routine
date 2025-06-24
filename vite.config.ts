/// <reference types="node" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// @ts-ignore
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  base: 'self-care-routine',
  css: {
    postcss: './postcss.config.js',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})