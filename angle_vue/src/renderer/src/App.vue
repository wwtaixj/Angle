<template>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import service from './apis/service';
import url from './apis/request_url';
import { getLocation } from '@renderer/utils';

onMounted(async () => {
  getLocations()
  const result = await getLocation();
  console.log(result)
})
const getLocations = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            coords: {
              longitude: pos.coords.longitude,
              latitude: pos.coords.latitude
            },
            message: '获取位置信息成功!'
          });
        },
        (error) => {
          switch (error.code) {
            case 1:
              setLocation({
                message: '位置服务被拒绝!'
              });
              break;
            case 2:
              setLocation({
                message: '暂时获取不到位置信息!'
              });
              break;
            case 3:
              setLocation({
                message: '获取信息超时!'
              });
              break;
            case 4:
              setLocation({
                message: '未知错误!'
              });
              break;
          }
        }
    );
    return;
  }
  setLocation({
    message: '不支持获取GPS地理位置!'
  });
}
const setLocation = (params) =>  {
  service.postApiData(url.setLocation, {
    ...params,
    createTime: new Date()
  });
}
</script>
