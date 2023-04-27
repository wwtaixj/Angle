<template>
  <div class="clearfix">
    <Upload
      name="images"
      v-model:file-list="fileList"
      class="ant-upload-class"
      action="http://loose.net.cn:9310/api/v1/uploadPhoto"
      list-type="picture-card"
      :multiple="true"
      accept="image/*"
      :headers="{
        token: authStore.getToken,
        username: encrypt(userStore.getUserName)
      }"
      @preview="handlePreview"
    >
      <div>
        <upload-outlined />
        <div style="margin-top: 8px">Click or drag file to this area to upload</div>
      </div>
    </Upload>
    <Modal :visible="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </Modal>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { Upload, Modal } from 'ant-design-vue';
import type { UploadFile } from 'ant-design-vue/es/upload';
import { UploadOutlined } from '@ant-design/icons-vue';
import { useAuthStore, useUserStore } from '@renderer/store';
import { encrypt } from '@renderer/utils/cryptoJs';

const authStore = useAuthStore();
const userStore = useUserStore();
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');
const fileList = ref<UploadFile[]>([
  {
    uid: '-4',
    name: 'image.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
  },
  {
    uid: '-xxx',
    percent: 50,
    name: 'image.png',
    status: 'uploading',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
  },
  {
    uid: '-5',
    name: 'image.png',
    status: 'error'
  }
]);

const handleCancel = () => {
  previewVisible.value = false;
  previewTitle.value = '';
};

const handlePreview = async (file) => {
  if (!file.url && !file.preview) {
    file.preview = await getBase64(file.originFileObj);
  }
  previewImage.value = file.url || file.preview;
  previewVisible.value = true;
  previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
};
</script>
<style lang="less" scoped>
.ant-upload-class {
  @uploadMarginTop: 110px;
  margin-top: @uploadMarginTop;
  :deep(.ant-upload.ant-upload-select-picture-card) {
    width: 100%;
    margin-top: -2 * @uploadMarginTop;
  }
  .anticon.anticon-upload {
    font-size: 33px;
    color: #40a9ff;
  }
}
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
