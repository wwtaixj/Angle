<template>
  <div class="WAL position-relative bg-white" :style="style">
    <q-layout view="lHh Lpr lFf" class="WAL__layout shadow-3" container>
      <q-header elevated>
        <Header />
      </q-header>

      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        bordered
        :breakpoint="690"
      >
        <Side />
      </q-drawer>

      <q-page-container>
        <router-view v-slot="{ Component, route }">
          <component :is="Component" :key="route.fullPath" />
        </router-view>
      </q-page-container>

      <q-footer> <Footer /> </q-footer>
    </q-layout>
  </div>
</template>

<script lang="ts" setup>
import { useQuasar } from 'quasar';
import { ref, computed } from 'vue';
import Header from './components/Header/Index.vue';
import Side from './components/Side/Index.vue';
import Footer from './components/Footer/Index.vue';
// import { useMainStore } from '../../stores/main';
//import { useChatStore } from '@/stores/chat';
import { useUserStore } from '@/stores/user';

const $q = useQuasar();

const userStore = useUserStore();
//const socketStore = useSocketStore();
const leftDrawerOpen = ref(false);

const style = computed(() => ({
  height: $q.screen.height + 'px',
}));
</script>

<style lang="sass" scoped>
.WAL
  width: 100%
  height: 100%
  max-width: 1200px
  &__layout
    margin: 0 auto
    z-index: 4000
    height: 100%
    width: 100%
    max-width: 1200px
    border-radius: 5px

  &__field.q-field--outlined .q-field__control:before
    border: none

  .q-drawer--standard
    .WAL__drawer-close
      display: none

@media (max-width: 850px)
  .WAL
    padding: 0
    &__layout
      width: 100%
      border-radius: 0

@media (min-width: 691px)
  .WAL
    &__drawer-open
      display: none

.conversation__summary
  margin-top: 4px

.conversation__more
  margin-top: 0!important
  font-size: 1.4rem
</style>
