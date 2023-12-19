import { boot } from 'quasar/wrappers';
import VueParticles from 'vue3-particles';
import 'katex/dist/katex.min.css';
export default boot(({ app }) => {
  app.use(VueParticles as never);
});
