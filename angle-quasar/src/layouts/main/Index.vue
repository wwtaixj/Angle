<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-2">
    <q-drawer
      :mini="true"
      show-if-above
      bordered
      :breakpoint="500"
      class="bg-grey-3"
      :width="200"
    >
      <div class="fit text-grey-6 bg-grey-10 column">
        <div class="col-6">
          <q-list class="fit column justify-start">
            <q-item class="col-2">
              <q-item-section avatar>
                <XAvatar
                  class="cursor-pointer text-black"
                  :text="userStore.getUserName.charAt(0)"
                  :src="userStore.getAvatarUrl"
                  @click="mainStore.openAccount"
                />
              </q-item-section>
            </q-item>
            <q-item
              :class="`${tool?.class}`"
              v-ripple
              v-for="tool in getSideList()"
              :key="tool.key"
              clickable
              :active="mainStore.getToolActive === tool.key"
              active-class="tool-active"
              @click="listClick(tool.key)"
            >
              <q-item-section avatar>
                <q-icon :name="tool.icon" />
                <q-tooltip
                  transition-show="scale"
                  transition-hide="scale"
                  :delay="800"
                  anchor="bottom right"
                  >{{ tool.label }}</q-tooltip
                >
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="col-6">
          <q-list class="fit column justify-end">
            <q-item class="col-2">
              <q-item-section avatar>
                <q-btn flat icon="menu">
                  <q-menu anchor="top right" self="top left" class="bg-grey-10">
                    <q-list class="text-grey-6 text-subtitle2">
                      <q-item
                        clickable
                        @click="openSettingAndOther"
                        v-close-popup
                      >
                        <q-item-section>设置</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component, route }">
        <component :is="Component" :key="route.fullPath" />
      </router-view>
    </q-page-container>
    <!-- dialog -->
    <XDialog
      v-model="mainStore.dialog.visible"
      v-bind="mainStore.dialog"
      @hide="mainStore.resetDialog"
      persistent
    >
      <Account v-show="mainStore.dialog.event === DialogEventEnum.ACCOUNT" />
      <Setting v-show="mainStore.dialog.event === DialogEventEnum.SETTING" />
    </XDialog>
  </q-layout>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { DialogEventEnum } from '@/enums/main';
import { getSideList } from '@/assets/constant';
import { useMainStore } from '@/stores/main';
import { useUserStore } from '@/stores/user';
//import Login from '@/pages/login/Index.vue';
import { XDialog, XAvatar } from '@/components';
import Account from '@/pages/account/Index.vue';
import { SideListKeyEnum } from '@/enums/main';
import Setting from '@/pages/Setting/Index.vue';

const mainStore = useMainStore();
const router = useRouter();
const userStore = useUserStore();

function listClick(key: SideListKeyEnum, isClick = true) {
  if (mainStore.getToolActive === key && isClick) return;
  mainStore.setToolActive(key);
  const tool = getSideList().find((i) => i.key === key);
  if (tool?.router) router.push(`/${key}`);
}
/**
 * @description: 打开设置和其他
 */
function openSettingAndOther() {
  mainStore.setDialog({
    title: '设置',
    visible: true,
    style: {
      minWidth: '560px',
      minHeight: '400px',
    },
    event: DialogEventEnum.SETTING,
  });
}
onMounted(() => {
  listClick(mainStore.getToolActive, false);
});
</script>

<style lang="scss" scoped>
.tool-active {
  color: $primary;
}
</style>
