import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT) || 5173, // For local dev
  },
  preview: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT) || 4173, // For Render preview
  },
})
