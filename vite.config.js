import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    proxy: {
      '/api': {
        target: 'https://event-booking-backend-rsnj.onrender.com', // Django backend hosted on Render
        changeOrigin: true,
      }
    }
  }
})
