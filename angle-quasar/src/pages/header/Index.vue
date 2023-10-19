<!--
 * @Author: JX 761359511@qq.com
 * @Date: 2023-10-12 16:35:10
 * @LastEditors: JX 761359511@qq.com
 * @LastEditTime: 2023-10-19 14:10:11
 * @FilePath: \angle-quasar\src\pages\header\index.vue
-->
<template>
  <q-toolbar>
    <q-btn
      flat
      dense
      round
      @click="useMainStore().setLeftDrawerMini"
      aria-label="Menu"
      icon="menu"
      class="q-mr-sm"
    />

    <q-toolbar-title
      v-if="$q.screen.gt.xs"
      shrink
      class="row items-center no-wrap"
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
      class="w-300px"
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

    <div class="q-gutter-sm row items-center no-wrap">
      <q-btn-dropdown
        :label="$t('language')"
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
      <q-btn round flat>
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
//import { useI18n } from '../../boot/i18n';
import { LOCALE } from '../../i18n';
import { useMainStore } from '../../stores/mainStore';
import { useUserStore } from '../../stores/userStore';

const $q = useQuasar();
const search = ref('');
const userStore = useUserStore();
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
</script>
