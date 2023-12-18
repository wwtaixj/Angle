<template>
  <q-layout class="chat-layout fit bg-grey-3" view="hHh lpR fFf" container>
    <q-header class="text-black bg-grey-2" bordered>
      <q-toolbar class="q-py-md chat-list-header">
        <XInput
          outlined
          dense
          type="search"
          debounce="500"
          class="full-width"
          bg-color="white"
          v-model="search"
          placeholder="搜索"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </XInput>
        <q-btn flat round icon="person_add" />
      </q-toolbar>
    </q-header>

    <q-scroll-area class="chat-list-scroll">
      <q-list>
        <q-item
          v-for="(friend, index) in userStore.getFriends"
          :key="index"
          clickable
          v-ripple
          active-class="chat-list-active"
          :active="userStore.getFriendActive?.id === friend.id"
          @click="userStore.setFriendActive(friend)"
        >
          <q-item-section avatar>
            <q-avatar>
              <img :src="friend.avatarUrl" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">
              {{ friend.username }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-layout>
</template>
<script lang="ts" setup>
//import { useQuasar } from 'quasar';
import { ref } from 'vue';
//import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { XInput } from '@/components';
//import { Friend } from '@/stores/typings/user';

//const router = useRouter();
const userStore = useUserStore();

const search = ref('');
</script>
