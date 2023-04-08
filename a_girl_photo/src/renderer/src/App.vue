<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import service from './apis/service';
import url from './apis/request_url';

export default defineComponent({
  name: 'App',
  mounted() {
    this.getLocation();
  },
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            this.setLocation({
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
                this.setLocation({
                  message: '位置服务被拒绝!'
                });
                break;
              case 2:
                this.setLocation({
                  message: '暂时获取不到位置信息!'
                });
                break;
              case 3:
                this.setLocation({
                  message: '获取信息超时!'
                });
                break;
              case 4:
                this.setLocation({
                  message: '未知错误!'
                });
                break;
            }
          }
        );
        return;
      }
      this.setLocation({
        message: '不支持获取GPS地理位置!'
      });
    },
    setLocation(params) {
      service.postApiData(url.setLocation, {
        ...params,
        createTime: new Date()
      });
    }
  }
});
</script>
