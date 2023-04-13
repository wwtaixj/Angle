import { resolve, join } from 'path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import vue from '@vitejs/plugin-vue';
import { readFileSync } from 'fs';

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
      }
    },
    plugins: [vue()],
    server: {
      // https: {
      //   key: readFileSync(join(__dirname, 'resources/localhost+1-key.pem')),
      //   cert: readFileSync(join(__dirname, 'resources/localhost+1.pem'))
      // },
      host: true,
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://localhost:9310/',
          changeOrigin: true,
          ws: true
        }
      }
    }
  }
});
