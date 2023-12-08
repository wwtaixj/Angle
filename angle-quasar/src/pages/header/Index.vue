<template>
  <q-toolbar class="no-shadow">
    <q-toolbar-title shrink class="items-center row no-wrap">
      <span class="q-ml-sm">Angle</span>
    </q-toolbar-title>

    <q-space />

    <div class="items-center q-gutter-sm row no-wrap">
      <q-btn-dropdown
        v-if="$q.screen.gt.xs"
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
        v-if="$q.screen.gt.xs"
        v-model="userStore.theme"
        checked-icon="nightlight_round"
        unchecked-icon="light_mode"
        @update:model-value="darkToggle"
      >
      </q-toggle>

      <q-btn round dense flat color="grey-8" icon="notifications">
        <q-badge color="red" text-color="white" floating> 2 </q-badge>
      </q-btn>
      <q-space />
      <q-btn v-if="userStore.getToken" round flat @click="openAccount">
        <q-avatar size="26px">
          <img :src="userStore.getAvatarUrl" />
        </q-avatar>
      </q-btn>
      <q-btn v-else @click="openAccount" flat icon="face" label="登录/注册" />
    </div>
  </q-toolbar>
</template>

<script lang="ts" setup>
//import {} from 'vue';
import { useQuasar } from 'quasar';
import { useI18n } from '@/boot/i18n';
import { LOCALE } from '@/i18n';
import { useMainStore } from '@/stores/main';
import { useUserStore } from '@/stores/user';
import { DialogEventEnum } from '@/enums/main';

const $q = useQuasar();
const { t } = useI18n();
const mainStore = useMainStore();
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
function openAccount() {
  mainStore.setDialog({ title: t('AccountInfo'), class: 'q-dialog-plugin' });
  mainStore.openDialog(DialogEventEnum.ACCOUNT);
}
</script>
