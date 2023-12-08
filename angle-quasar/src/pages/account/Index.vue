<template>
  <div class="q-m-sm">
    <q-card-section horizontal>
      <q-card-section class="col-8">
        <div>
          <span class="text-overline text-primary q-mr-xs"
            >{{ $t('login.Username') }}:</span
          >

          <XInputPopupEdit
            class="inline"
            :model-value="userStore.getUserName"
            @update:model-value="userStore.setUsername"
          />
        </div>
        <div>
          <span class="text-overline text-primary q-mr-xs"
            >{{ $t('Phone') }}:</span
          >

          <XInputPopupEdit
            class="inline"
            :model-value="userStore.getPhone"
            @update:model-value="userStore.setPhone"
          />
        </div>
        <div>
          <span class="text-overline text-primary q-mr-xs"
            >{{ $t('Email') }}:</span
          >

          <XInputPopupEdit
            class="inline"
            :model-value="userStore.getEmail"
            @update:model-value="userStore.setEmail"
          />
        </div>
        <div>
          <span class="text-overline text-primary q-mr-xs"
            >{{ $t('Gender') }}:</span
          >
          {{
            userStore.getGender === GenderEnum.FEMALE ? $t('Woman') : $t('Man')
          }}
        </div>
        <div>
          <span class="text-overline text-primary q-mr-xs"
            >{{ $t('Age') }}:</span
          >

          <XInputPopupEdit
            class="inline"
            :model-value="String(userStore.getAge)"
            @update:model-value="userStore.setAge"
          />
        </div>
      </q-card-section>

      <q-card-section class="col-4 flex flex-center">
        <q-img class="rounded-borders q-mt-md" :src="userStore.getAvatarUrl" />
      </q-card-section>
    </q-card-section>

    <q-separator />

    <q-card-actions align="between">
      <q-btn flat round icon="settings" />
      <q-btn flat round icon="logout" @click="userStore.logout" />
    </q-card-actions>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { XInputPopupEdit } from '@/components';
import { GenderEnum } from '@/enums/user';

const userStore = useUserStore();
</script>
