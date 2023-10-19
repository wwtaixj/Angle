<!--
 * @Author: JX 761359511@qq.com
 * @Date: 2023-10-12 18:30:11
 * @LastEditors: JX 761359511@qq.com
 * @LastEditTime: 2023-10-16 18:02:02
 * @FilePath: \angle-quasar\src\pages\chat\Index.vue
-->
<template>
  <div class="WAL position-relative bg-grey-4" :style="style">
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
        <router-view />
      </q-page-container>

      <q-footer>
        <q-toolbar class="bg-grey-3 text-black row">
          <q-btn round flat icon="insert_emoticon" class="q-mr-sm" />
          <q-input
            rounded
            outlined
            dense
            class="WAL__field col-grow q-mr-sm"
            bg-color="white"
            v-model="message"
            placeholder="Type a message"
          />
          <q-btn round flat icon="mic" />
        </q-toolbar>
      </q-footer>
    </q-layout>
  </div>
</template>

<script lang="ts" setup>
import { useQuasar } from 'quasar';
import { ref, computed, reactive } from 'vue';
import Header from './components/Header/Index.vue';
import Side from './components/Side/Index.vue';
// import { useMainStore } from '../../stores/mainStore';

const $q = useQuasar();
const leftDrawerOpen = ref(false);
const message = ref('');

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
