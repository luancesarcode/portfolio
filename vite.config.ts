import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig(({ command }) => ({
  // GitHub Pages uses the repository subpath; shared hosting serves from the domain root.
  base: process.env.DEPLOY_TARGET?.toLowerCase() === 'hostgator'
    ? '/'
    : command === 'build'
      ? '/portfolio/'
      : '/',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        projetos: path.resolve(__dirname, 'projetos.html'),
        mercosulAnpr: path.resolve(__dirname, 'mercosul-anpr/index.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}))
