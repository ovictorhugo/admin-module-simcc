import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import * as packageJson from './package.json';

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(packageJson.version),
  },
  server: {
  
    host: true,
    port: 8080
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
