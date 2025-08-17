import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// We have removed the import for '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    // We have removed tailwindcss() from the plugins array
  ],
})