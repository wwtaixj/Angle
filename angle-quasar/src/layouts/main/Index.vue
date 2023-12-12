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
                <q-avatar
                  class="cursor-pointer"
                  size="md"
                  @click="mainStore.openAccount"
                >
                  <XImg :src="userStore.getAvatarUrl" />
                </q-avatar>
              </q-item-section>
            </q-item>
            <q-item
              :class="`${tool?.class}`"
              v-ripple
              v-for="tool in getSideList()"
              :key="tool.key"
              clickable
              :active="toolActive === tool.key"
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
            <q-item
              class="col-2"
              v-ripple
              clickable
              @click="openSettingAndOther"
            >
              <q-item-section avatar>
                <q-icon name="menu" />
                <q-tooltip
                  transition-show="scale"
                  transition-hide="scale"
                  :delay="800"
                  anchor="bottom right"
                  >{{ '设置及其他' }}</q-tooltip
                >
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
    </XDialog>
  </q-layout>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
// import Header from '@/pages/header/Index.vue';
import { DialogEventEnum } from '@/enums/main';
import { getSideList } from './constant';
import { useMainStore } from '@/stores/main';
import { useUserStore } from '@/stores/user';
//import Login from '@/pages/login/Index.vue';
import { XDialog, XImg } from '@/components';
import Account from '@/pages/account/Index.vue';
import { SideListKeyEnum } from '@/enums/main';

const mainStore = useMainStore();
const router = useRouter();
const userStore = useUserStore();
const toolActive = ref<SideListKeyEnum>();

function listClick(key: SideListKeyEnum) {
  if (toolActive.value === key) return;
  toolActive.value = key;
  const tool = getSideList().find((i) => i.key === key);

  if (tool?.router) router.push(`/${key}`);
}
function openSettingAndOther() {
  //
}
onMounted(() => {
  listClick(SideListKeyEnum.CHAT);
});
</script>

<style lang="scss" scoped>
.tool-active {
  color: $green-6;
}
</style>
