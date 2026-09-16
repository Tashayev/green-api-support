import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // или @vitejs/plugin-react-swc

export default defineConfig({
  plugins: [react()],
})
