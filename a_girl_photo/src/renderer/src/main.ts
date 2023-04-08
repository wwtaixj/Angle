import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import i18n from './i18n';
import Particles from 'vue3-particles';
import './assets/iconfont/iconfont.js';
//import VConsole  from 'vconsole';
import 'ant-design-vue/dist/antd.css';
import './assets/css/styles.less';
import 'animate.css';
// or init with options
//const vConsole = new VConsole({ theme: 'dark' });
// remove it when you finish debugging
//vConsole.destroy();
const app = createApp(App);
app.use(router);
app.use(Antd);
app.use(i18n);
app.use(<never>Particles);
app.mount('#app');
