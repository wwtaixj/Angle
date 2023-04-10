import { resolve } from 'path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import vue from '@vitejs/plugin-vue';
import VueI18nPlugin from '@intlify/vite-plugin-vue-i18n';

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
        'vue-i18n': 'vue-i18n/dist/vue-i18n.esm-bundler.js'
      }
    },
    plugins: [
      vue(),
      VueI18nPlugin({
        include: resolve(__dirname, './path/to/src/locales/**')
      })
    ],
    server: {
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
