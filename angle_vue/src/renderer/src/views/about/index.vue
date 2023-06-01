<template>
  <Card key="ellipsis">
    <template #cover>
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    </template>
    <template #actions>
      <setting-outlined />
      <edit-outlined />
      <ellipsis-outlined />
    </template>
    <CardMeta title="Card title" description="This is the description">
      <template #avatar>
        <Avatar src="https://joeschmoe.io/api/v1/random" />
      </template>
    </CardMeta>
  </Card>
</template>
<script lang="ts" setup>
import { Card, CardMeta, Avatar } from 'ant-design-vue';
import { SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons-vue';
</script>
