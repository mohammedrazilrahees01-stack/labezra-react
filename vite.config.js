import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // This tells Vite to use relative paths for assets (fixes the white screen)
  base: './', 
  plugins: [react()],
})