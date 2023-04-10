<template>
  <a-menu
    v-model:selected-keys="currentModel"
    v-model:mode="menuConfigModel.mode"
    v-model:theme="menuConfigModel.theme"
    v-model:inline-collapsed="menuConfigModel.inlineCollapsed"
    @select="select"
    @click="click"
  >
    <a-menu-item v-for="item in menuList" :key="item.key">
      <template #icon>
        <slot :name="item.key + 'icon'"></slot>
      </template>
      {{ item.name }}
    </a-menu-item>
  </a-menu>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'XMenu',
  props: {
    menuConfig: {
      type: Object,
      default: () => ({
        mode: 'inline', // vertical | horizontal | inline
        theme: 'light', // light | dark
        inlineCollapsed: false
      })
    },
    menuList: {
      type: Array,
      default: () => [],
      required: true
    },
    current: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  emits: ['select', 'update:current', 'update:menuConfig', 'click'],
  computed: {
    currentModel: {
      get() {
        return this.current;
      },
      set(v) {
        this.$emit('update:current', v);
      }
    },
    menuConfigModel: {
      get() {
        return new Proxy(this.menuConfig, {
          set(obj, name, val): boolean {
            this.$emit('update:menuConfig', {
              ...obj,
              [name]: val
            });
            return true;
          }
        });
      },
      set(v) {
        this.$emit('update:menuConfig', v);
      }
    }
  },
  methods: {
    select({ item, key, selectedKeys }) {
      this.$emit('select', { item, key, selectedKeys });
    },
    click({ item, key, keyPath }) {
      this.$emit('click', { item, key, keyPath });
    }
  }
});
</script>
