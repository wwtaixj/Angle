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
        <XAvatar
          size="100px"
          class="rounded-borders"
          :text="userStore.getUserName.charAt(0)"
          :src="userStore.getAvatarUrl"
        />
      </q-card-section>
    </q-card-section>

    <q-separator />
    <q-card-actions align="right">
      <XButton
        size="sm"
        flat
        round
        color="primary"
        icon="fa-solid fa-upload"
        @click="upload"
      >
        <q-tooltip>更换头像</q-tooltip>
      </XButton>
    </q-card-actions>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { XInputPopupEdit, XButton, XAvatar } from '@/components';
import { GenderEnum } from '@/enums/user';
import { uploadAvatar } from '@/axios';
import { notify } from '@/utils';

const userStore = useUserStore();

function upload() {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.setAttribute('multiple', 'false');
  input.setAttribute('style', 'display: none');
  input.click();
  input.onchange = async () => {
    const files = input?.files;
    if (files && files.length > 0) {
      const formData = new FormData();
      formData.append('avatar', files[0]);
      const result = await uploadAvatar(formData);
      if (result.status !== '0') return;
      userStore.setAvatarUrl(result.data.url);
      notify({
        message: '上传成功',
        type: 'positive',
      });
    }
    input.remove();
  };
}
</script>
<style lang="scss" scoped>
.q-img__content > div {
  padding: 0;
  border-radius: 20%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}
</style>
