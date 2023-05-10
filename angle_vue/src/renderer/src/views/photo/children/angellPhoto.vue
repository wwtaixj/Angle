<template>
  <List
    :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3, xxxl: 2 }"
    :data-source="data"
  >
    <template #renderItem="{ item }">
      <ListItem>
        <Card :title="item.title">Card content</Card>
      </ListItem>
    </template>
  </List>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import { List, ListItem, Card } from 'ant-design-vue';
interface DataItem {
  title: string;
}
const data: DataItem[] = reactive([
  {
    title: 'Title 1'
  },
  {
    title: 'Title 2'
  },
  {
    title: 'Title 3'
  },
  {
    title: 'Title 4'
  },
  {
    title: 'Title 5'
  },
  {
    title: 'Title 6'
  }
]);
</script>
