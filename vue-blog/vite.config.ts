import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

const wpAPITarget = "http://localhost:8888/wp-json"

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),tailwindcss()],
  server:{
    proxy:{
      "/wp-api":{
        target: wpAPITarget + '/wp/v2',
        changeOrigin: true,
        rewrite: (path)=> path.replace(/^\/wp-api/,"")
      },
      "/media": {
          target:  wpAPITarget + '/wp/v2',
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/wp-api/, ""),
        },
        "/menu": {
          target:  wpAPITarget + '/myroutes/menu',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/menu/, ""),
        },
        "/sidebars": {
          target:  wpAPITarget + '/myroutes/sidebars',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/sidebars/, ""),
        },
    }
  }
})
