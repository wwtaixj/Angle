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
    <XDialog
      v-model="mainStore.dialog.visible"
      :type="dialogType"
      :options="mainStore.dialog"
      @hide="mainStore.resetDialog"
      persistent
    >
      <Chat v-show="mainStore.dialog.event === DialogEventEnum.CHAT" />
      <Login v-show="mainStore.dialog.event === DialogEventEnum.LOGIN" />
      <Account v-show="mainStore.dialog.event === DialogEventEnum.ACCOUNT" />
    </XDialog>
  </q-layout>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
// import { useRouter } from 'vue-router';
import Header from '@/pages/header/Index.vue';
import { DialogEventEnum } from '@/enums/main';
import { getSideList } from './constant';
import { useMainStore } from '@/stores/main';
import Chat from '@/pages/chat/Index.vue';
import Login from '@/pages/login/Index.vue';
import { XDialog, DialogTypeEnum } from '@/components/dialog';
import Account from '@/pages/account/Index.vue';

const mainStore = useMainStore();

const dialogType = computed(() => {
  if (mainStore.dialog.event === DialogEventEnum.CHAT)
    return DialogTypeEnum.NATIVE;
  if (mainStore.dialog.event === DialogEventEnum.LOGIN)
    return DialogTypeEnum.CARD;
  return DialogTypeEnum.CARD;
});

function listClick(e: Event, key: string) {
  switch (key) {
    case DialogEventEnum.CHAT:
      mainStore.openDialog(key);
      break;
  }
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
