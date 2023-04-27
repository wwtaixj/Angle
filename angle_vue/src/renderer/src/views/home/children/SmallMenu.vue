<template>
  <div class="small-menu mobile-menu">
    <Dropdown v-model:visible="smallMenuVisible" :trigger="['click']" placement="top">
      <span
        class="small-menu-icon animation-rubberBand ant-avatar ant-avatar-circle ant-avatar-icon"
      >
        <Transition>
          <FrownTwoTone v-show="!smallMenuVisible" />
        </Transition>
        <Transition>
          <SmileTwoTone v-show="smallMenuVisible" two-tone-color="#eb2f96" />
        </Transition>
      </span>
      <template #overlay>
        <homeMenu
          :menu-config="{
            mode: 'inline',
            theme: 'light'
          }"
          small-menu
        />
      </template>
    </Dropdown>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { Dropdown } from 'ant-design-vue';
import { FrownTwoTone, SmileTwoTone } from '@ant-design/icons-vue';
const smallMenuVisible = ref(false);
</script>
