<!--
 * @Author: JX 761359511@qq.com
 * @Date: 2023-10-12 11:08:01
 * @LastEditors: JX 761359511@qq.com
 * @LastEditTime: 2023-10-19 11:11:13
 * @FilePath: \angle-quasar\src\layouts\main\index.vue
-->
<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header class="bg-white text-grey-8" height-hint="64">
      <Header />
    </q-header>
    <q-drawer
      v-model="mainStore.leftDrawerOpen"
      :mini="mainStore.leftDrawerMini"
      mini-to-overlay
      show-if-above
      bordered
      :breakpoint="500"
      class="bg-white"
      :width="280"
    >
      <q-scroll-area class="fit">
        <q-list padding class="text-grey-8">
          <q-item
            class="GNL__drawer-item"
            v-ripple
            v-for="link in getSideList()"
            :key="link.text"
            clickable
            @click="listClick($event, link.key)"
          >
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <!-- dialog -->
    <q-dialog v-model="mainStore.dialogVisible">
      <Chat v-show="mainStore.dialogEvent === DialogEventEnum.CHAT" />
      <Login v-show="mainStore.dialogEvent === DialogEventEnum.LOGIN" />
    </q-dialog>
  </q-layout>
</template>

<script lang="ts" setup>
//import { ref } from 'vue';
// import { useRouter } from 'vue-router';
import Header from '../../pages/header/Index.vue';
import { DialogEventEnum } from '@/enums/main';
import { getSideList } from './constant';
import { useMainStore } from '../../stores/mainStore';
import Chat from '@/pages/chat/Index.vue';
import Login from '@/pages/login/Index.vue';

const mainStore = useMainStore();

function listClick(e: Event, key: string) {
  switch (key) {
    case DialogEventEnum.CHAT:
      mainStore.setDialogEvent(key);
      break;
  }
  mainStore.openDialog();
}
</script>

<style lang="sass" scoped>
.GNL



  &__drawer-item
    line-height: 24px
    border-radius: 0 24px 24px 0
    margin-right: 12px

    .q-item__section--avatar
      .q-icon
        color: #5f6368

    .q-item__label
      color: #3c4043
      letter-spacing: .01785714em
      font-size: .875rem
      font-weight: 500
      line-height: 1.25rem

  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem

    &:hover
      color: #000
</style>
