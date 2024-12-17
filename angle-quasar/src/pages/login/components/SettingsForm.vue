<template>
  <q-layout>
    <q-header>
      <XWinBar class="bg-white text-grey-9" :showMaximized="false">
        <template #before>
          <XButton
            style="-webkit-app-region: no-drag"
            icon="arrow_back_ios"
            color="primary"
            flat
            round
            @click="userStore.setLoginDialogType(LoginDialogTypeEnum.LOGIN)"
          />
        </template>
      </XWinBar>
    </q-header>
    <q-page-container>
      <q-page>
        <q-splitter v-model="splitterModel" class="window-height">
          <template v-slot:before>
            <q-tabs v-model="tab" vertical class="text-teal">
              <q-tab
                name="service"
                icon="miscellaneous_services"
                label="service"
              />
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
            >
              <q-tab-panel name="service">
                <div class="col">
                  <XInput
                    outlined
                    v-model="userStore.serviceAddress"
                    label="服务地址"
                    clearable
                    dense
                  />
                </div>
                <div class="justify-end col row q-mt-md">
                  <XButton
                    unelevated
                    text-color="primary"
                    color="grey-4"
                    class="col-2"
                    label="保存"
                    style="width: auto"
                    @click="
                      userStore.setServiceAddress(userStore.getServiceAddress)
                    "
                  />
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </template>
        </q-splitter>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useI18n } from '@/boot/i18n';
//import { QFormProps } from 'quasar';
import { encrypt } from '@/utils';
import { useUserStore } from '@/stores/user';
import { LoginDialogTypeEnum } from '@/enums/login';
import {
  XButton,
  XInput,
  XInputPassword,
  XButtonVerifyCode,
  XWinBar,
} from '@/components';

const { t } = useI18n();
const tab = ref('user');
const userStore = useUserStore();
const splitterModel = ref(90);
</script>
