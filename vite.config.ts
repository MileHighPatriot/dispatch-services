import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, './src') },
  },
  // Uncommon ports so this doesn't clash with the other projects' dev servers.
  server: { port: 4210, strictPort: true, host: '127.0.0.1' },
  preview: { port: 4211, strictPort: true, host: '127.0.0.1' },
  test: { include: ['src/**/*.test.ts'] },
})
