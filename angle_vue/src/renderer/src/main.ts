import { createApp } from 'vue';
import App from './App.vue';
import { setupStore } from './store';
import { setupRouter } from './router';
import { setupI18n } from './i18n';
import { setupAssets, setupScrollbarStyle } from './plugins';
import Particles from 'vue3-particles';
//import VConsole  from 'vconsole';
// or init with options
//const vConsole = new VConsole({ theme: 'dark' });
// remove it when you finish debugging
//vConsole.destroy();

async function init() {
	const app = createApp(App);
	setupAssets();
	setupScrollbarStyle();
	setupStore(app);
	setupI18n(app);
	await setupRouter(app);
	app.use(Particles);
	app.mount('#app');
}
init();
