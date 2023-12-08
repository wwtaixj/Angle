import { boot } from 'quasar/wrappers';
import VueParticles from 'vue3-particles';
export default boot(({ app }) => {
  app.use(VueParticles as never);
});
