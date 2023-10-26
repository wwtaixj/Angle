<!--
 * @Author: JX 761359511@qq.com
 * @Date: 2023-10-12 16:35:10
 * @LastEditors: JX 761359511@qq.com
 * @LastEditTime: 2023-10-25 18:11:11
 * @FilePath: \Angle\angle-quasar\src\pages\header\Index.vue
-->
<template>
  <q-toolbar>
    <q-btn
      flat
      dense
      round
      @click="mainStore.setLeftDrawerMini"
      aria-label="Menu"
      icon="menu"
      class="q-mr-sm"
    />

    <q-toolbar-title
      v-if="$q.screen.gt.xs"
      shrink
      class="items-center row no-wrap"
    >
      <span class="q-ml-sm">Angle</span>
    </q-toolbar-title>

    <q-space />

    <q-input
      outlined
      dense
      v-model="search"
      color="bg-grey-7 shadow-1"
      placeholder="Search for topics, locations & sources"
    >
      <template v-slot:prepend>
        <q-icon v-if="search === ''" name="search" />
        <q-icon
          v-else
          name="clear"
          class="cursor-pointer"
          @click="search = ''"
        />
      </template>
    </q-input>

    <q-space />

    <div class="items-center q-gutter-sm row no-wrap">
      <q-btn-dropdown
        :label="$t('Language')"
        round
        dense
        flat
        dropdown-icon="language"
      >
        <q-list>
          <q-item
            clickable
            v-close-popup
            v-for="(item, index) in localeOptions"
            :key="index"
            @click="onItemClick($event, item.value)"
          >
            <q-item-section>
              <q-item-label>{{ item.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <q-toggle
        v-model="userStore.theme"
        checked-icon="nightlight_round"
        unchecked-icon="light_mode"
        @update:model-value="darkToggle"
      />

      <q-btn
        v-if="$q.screen.gt.sm"
        round
        dense
        flat
        color="grey-8"
        icon="notifications"
      >
        <q-badge color="red" text-color="white" floating> 2 </q-badge>
        <q-tooltip>Notifications</q-tooltip>
      </q-btn>
      <q-btn round flat @click="openAccount">
        <q-avatar size="26px">
          <img :src="userStore.getAvatarUrl" />
        </q-avatar>
        <q-tooltip>Account</q-tooltip>
      </q-btn>
    </div>
  </q-toolbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useI18n } from '@/boot/i18n';
import { LOCALE } from '@/i18n';
import { useMainStore } from '@/stores/mainStore';
import { useUserStore } from '@/stores/userStore';
import { DialogEventEnum } from '@/enums/main';

const $q = useQuasar();
const { t } = useI18n();
const mainStore = useMainStore();
const userStore = useUserStore();
const search = ref('');
const localeOptions = [
  { value: LOCALE.ZH_CN, label: '中文' },
  { value: LOCALE.EN_US, label: 'English' },
];
function onItemClick(e: Event, value: LOCALE) {
  useUserStore().setLocales(value);
}
function darkToggle(isDark: boolean) {
  userStore.setTheme(isDark);
}
function openAccount() {
  mainStore.setDialog({ title: t('AccountInfo') });
  mainStore.openDialog(DialogEventEnum.ACCOUNT);
}
</script>
