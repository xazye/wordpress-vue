import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),tailwindcss()],
  server:{
    proxy:{
      "/wp-api":{
        target:"http://localhost:8000/wp-json/wp/v2",
        changeOrigin: true,
        rewrite: (path)=> path.replace(/^\/wp-api/,"")
      },
      "/media": {
          target: "http://localhost:8000/wp-json/wp/v2",
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/wp-api/, ""),
        },
    }
  }
})
