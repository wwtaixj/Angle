import { resolve } from 'path'; // join
import type { PluginOption } from 'vite';
import { loadEnv } from 'vite';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';
// import { readFileSync } from 'fs';

function setupPlugins(env): PluginOption[] {
	const plugins = [vue()];

	if (env.VITE_GLOB_APP_PWA === 'true') {
		VitePWA({
			injectRegister: 'auto',
			manifest: {
				name: 'chatGPT',
				short_name: 'chatGPT',
				icons: [
					{ src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
					{ src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' }
				]
			}
		});
	}
	return plugins;
}

export default defineConfig(({ mode }) => {
	const viteEnv = loadEnv(mode, process.cwd());
	console.log(process.cwd());

	return {
		main: {
			plugins: [externalizeDepsPlugin()]
		},
		preload: {
			plugins: [externalizeDepsPlugin()]
		},
		renderer: {
			resolve: {
				alias: {
					'@renderer': resolve(process.cwd(), 'src/renderer/src')
				}
			},
			plugins: setupPlugins(viteEnv),
			server: {
				// https: {
				//   key: readFileSync(join(__dirname, 'resources/localhost+1-key.pem')),
				//   cert: readFileSync(join(__dirname, 'resources/localhost+1.pem'))
				// },
				host: true,
				port: 5173,
				proxy: {
					'/api': {
						target: 'http://localhost:9310',
						changeOrigin: true,
						ws: true
					}
				}
			},
			build: {
				reportCompressedSize: false,
				sourcemap: false,
				commonjsOptions: {
					ignoreTryCatch: false
				}
			}
		}
	};
});
