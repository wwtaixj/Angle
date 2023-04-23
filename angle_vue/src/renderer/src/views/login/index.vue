<template>
  <a-layout class="login">
    <a-layout class="login-content">
      <a-layout-content>
        <Particles
          id="tsparticles"
          :options="particOPtions"
          :particlesInit="particlesInit"
          :key="current[0]"
        />
        <a-card class="login-card">
          <div class="small-menu" key="particles">
            <a-dropdown :trigger="['hover']" placement="bottom">
              <span
                class="small-menu-icon animation-rubberBand ant-avatar ant-avatar-circle ant-avatar-icon"
              >
                <Transition>
                  <iconShouhuituzi two-tone-color="#eb2f96" size="30px" />
                </Transition>
              </span>
              <template #overlay>
                <XMenu
                  v-model:current="current"
                  :menu-config="menuConfig"
                  :menu-list="menuList"
                  @click="menuClick"
                >
                </XMenu>
              </template>
            </a-dropdown>
          </div>
          <div class="login-form-title">
            <a-typography-title :level="2">Live for today</a-typography-title>
          </div>
          <LoginForm v-show="userStore.loginState === LoginStateEnum.LOGIN" />
          <ForgetPasswordForm v-show="userStore.loginState === LoginStateEnum.RESET_PASSWORD" />
          <MobileLoginForm v-show="userStore.loginState === LoginStateEnum.MOBILE" />
          <QrCodeForm v-show="userStore.loginState === LoginStateEnum.QR_CODE" />
          <template #actions>
            <div key="mobileLogin">
              <span class="color-white" @click="userStore.setLoginState(LoginStateEnum.MOBILE)">{{
                $t('login.Mobile login')
              }}</span>
            </div>
            <div key="qrCode">
              <span class="color-white" @click="userStore.setLoginState(LoginStateEnum.QR_CODE)">{{
                $t('login.QrCode login')
              }}</span>
            </div>
            <div key="register">
              <span class="color-white" @click="userStore.setLoginState(LoginStateEnum.REGISTER)">{{
                $t('login.register now')
              }}</span>
            </div>
          </template>
        </a-card>
      </a-layout-content>
    </a-layout>
    <!-- <a-layout-footer></a-layout-footer> -->
  </a-layout>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { loadFull } from 'tsparticles';
import { Engine } from 'tsparticles-engine';
import { useUserStore } from '@renderer/store/userStore';
import { LoginStateEnum } from '@renderer/store/model';
import XMenu from '@renderer/components/XMenu.vue';
import LoginForm from './children/LoginForm.vue';
import MobileLoginForm from './children/MobileLoginForm.vue';
import ForgetPasswordForm from './children/ForgetPasswordForm.vue';
import QrCodeForm from './children/QrCodeForm.vue';
import iconShouhuituzi from '@renderer/components/iconfont/iconShouhuituzi.vue';
import options from '@renderer/assets/particles';
import { MenuItem } from '@renderer/components/model';
import { UserParticles } from '@renderer/assets/particles';

const userStore = useUserStore();
const menuConfig = reactive({
  mode: 'inline',
  theme: 'dark'
});
const menuList = ref<MenuItem[]>([
  {
    key: 'light',
    title: 'light'
  },
  {
    key: 'fireworks',
    title: 'fireworks'
  },
  {
    key: 'amongUs',
    title: 'amongUs'
  }
]);

const current = ref<UserParticles[]>([userStore.getParticlesCurrent]); // 当前选中背景特性
const particOPtions = ref(options[userStore.getParticlesCurrent]); // 背景特性参数
console.log(import.meta.env);

// 背景特性选择
const menuClick = async ({ key }) => {
  particOPtions.value = options[key];
  current.value[0] = key;
  userStore.setParticlesCurrent(key);
};
// 粒子特性初始化
const particlesInit = async (engine: Engine) => {
  // console.log(engine);
  await loadFull(engine);
};
// 粒子特性加载完
// const particlesLoaded = async (container) => {
//   // console.log('Particles container loaded', container);
// };
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background: transparent !important;
  .login-content {
    background: transparent;
    #tsparticles {
      height: 100%;
      width: 100%;
    }
    .login-card {
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 5px;
      backdrop-filter: blur(15px);
      -webkit-backdrop-filter: blur(15px);
      border: 2px solid rgba(255, 255, 255, 0);
      padding: 1.5rem 2rem;
      position: absolute;
      right: 5%;
      top: 50%;
      transform: translateX(-5%) translateY(-50%);
      min-width: 400px;
      width: 30rem;
      box-shadow: var(--shadow-card);
      :deep(.ant-card-actions) {
        background: transparent;
        border: none;
      }
      .small-menu {
        position: absolute;
        display: flex !important;
        top: 0;
        left: 0;
      }
    }
    .login-card:hover {
      transition: box-shadow 0.3s, border-color 0.3s;
    }

    .login-form-title {
      text-align: center;

      @keyframes showup {
        from {
          letter-spacing: -14px;
          filter: blur(10px);
        }
        to {
          letter-spacing: 10px;
          filter: blur(2px);
        }
      }
      .ant-typography {
        color: #fff;
        letter-spacing: 10px;
        animation: showup 3s;
        margin-bottom: 5rem;
      }
    }
  }
  @media screen and(max-width: 750px) {
    .login-content {
      .login-card {
        padding: 0.5rem 1rem;
        min-width: 300px;
        width: 80%;
        :deep(.ant-card-actions) {
          background: transparent;
          border: none;
        }
      }

      .login-form-title {
        @keyframes showup {
          from {
            letter-spacing: -1.5vw;
            filter: blur(10px);
          }
          to {
            letter-spacing: 1.5vw;
            filter: blur(2px);
          }
        }
        .ant-typography {
          color: #fff;
          letter-spacing: 1.5vw;
          animation: showup 3s;
          margin-bottom: 5vh;
          font-size: 4vw;
        }
      }
    }
  }
}
</style>
