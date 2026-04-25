import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import wasm from "vite-plugin-wasm";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), wasm()],
  server: {
    host: '0.0.0.0', // This tells Vite to listen on the Tailscale interface
    port: 5173,      // Explicitly set the port
    strictPort: true // Prevents Vite from switching to 5174 if 5173 is "busy"
  }
})
