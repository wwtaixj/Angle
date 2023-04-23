import { createApp } from 'vue';
import App from './App.vue';
import { setupStore } from './store';
import router from './router';
import { i18n } from './i18n';
import Antd from './assets/antdv';
import Particles from 'vue3-particles';
import './assets/iconfont/iconfont.js';
//import VConsole  from 'vconsole';
import './assets/css/styles.less';
import 'animate.css';
// or init with options
//const vConsole = new VConsole({ theme: 'dark' });
// remove it when you finish debugging
//vConsole.destroy();

const app = createApp(App);
setupStore(app);
app.use(i18n);
app.use(router);
app.use(Antd);
app.use(Particles);
app.mount('#app');
