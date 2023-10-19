import { defineStore } from 'pinia';
import type { AppState, Theme } from './helper';
import type { Language } from '@renderer/i18n/model';
import type { UserParticles } from '@renderer/assets/particles';
import { getLocalSetting, setLocalSetting } from './helper';
// import { store } from '@renderer/store';

export const useAppStore = defineStore('app-store', {
  state: (): AppState => getLocalSetting(),
  actions: {
    setSiderCollapsed(collapsed: boolean) {
      this.siderCollapsed = collapsed;
      this.recordState();
    },

    setTheme(theme: Theme) {
      this.theme = theme;
      this.recordState();
    },
    setLanguage(language: Language) {
      if (this.language !== language) {
        this.language = language;
        this.recordState();
        //  window.location.reload();
      }
    },
    setParticlesCurrent(particles: UserParticles) {
      if (!particles) return;
      if (this.particles !== particles) {
        this.particles = particles;
        this.recordState();
      }
    },

    recordState() {
      setLocalSetting(this.$state);
    }
  }
});

// export function useAppStoreWithOut() {
//   return useAppStore(store);
// }
