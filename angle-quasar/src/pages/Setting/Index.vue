<template>
  <q-splitter
    v-model="splitterModel"
    class="bg-grey-2 q-ma-md"
    unit="px"
    :limits="[90, 120]"
    style="height: 350px"
  >
    <template v-slot:before>
      <q-tabs v-model="tab" vertical>
        <q-tab name="user" label="账号设置" />
        <q-tab name="common" label="通用设置" />
      </q-tabs>
    </template>

    <template v-slot:after>
      <q-tab-panels
        v-model="tab"
        animated
        swipeable
        vertical
        transition-prev="jump-up"
        transition-next="jump-up"
        class="bg-grey-2"
      >
        <q-tab-panel name="user">
          <q-card flat class="q-mx-xl">
            <q-card-section horizontal class="q-ma-xs">
              <q-card-section class="col-5 flex flex-center">
                <XAvatar
                  size="100px"
                  class="rounded-borders"
                  :text="userStore.getUserName.charAt(0)"
                  :src="userStore.getAvatarUrl"
                />
              </q-card-section>
              <q-card-actions vertical class="justify-around">
                <p>{{ userStore.getUserName }}</p>
              </q-card-actions>
            </q-card-section>
          </q-card>
          <div class="row justify-center q-mt-xl">
            <q-btn
              unelevated
              text-color="primary"
              color="grey-4"
              class="col-3"
              label="退出登录"
              @click="userStore.logout"
            />
          </div>
        </q-tab-panel>

        <q-tab-panel name="common" class="column">
          <div class="col">
            <XInput
              outlined
              v-model="userStore.serviceAddress"
              label="服务地址"
              clearable
              dense
            />
          </div>
          <div class="col row justify-end q-mt-md">
            <XButton
              unelevated
              text-color="primary"
              color="grey-4"
              class="col-2"
              label="保存"
              style="width: auto"
              @click="userStore.setServiceAddress(userStore.getServiceAddress)"
            />
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </q-splitter>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
// import { XInputPopupEdit } from '@/components';
// import { GenderEnum } from '@/enums/user';
import { XInput, XButton, XAvatar } from '@/components';

const userStore = useUserStore();

const tab = ref('user');
const splitterModel = ref(90);
</script>
