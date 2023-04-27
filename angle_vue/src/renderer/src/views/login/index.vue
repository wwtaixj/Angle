<template>
  <Layout class="login">
    <Layout class="login-content">
      <LayoutContent>
        <Particles
          id="tsparticles"
          :options="particOPtions"
          :particlesInit="particlesInit"
          :key="current[0]"
        />
        <Card class="login-card">
          <div class="small-menu absolute-left-top" key="particles">
            <Dropdown :trigger="['hover']" placement="bottom">
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
            </Dropdown>
          </div>
          <div class="absolute-right-top"><AppLocalePicker /></div>
          <div class="login-form-title">
            <TypographyTitle :level="2">Live for today</TypographyTitle>
          </div>
          <LoginForm v-show="userStore.loginState === LoginStateEnum.LOGIN" />
          <ForgetPasswordForm v-show="userStore.loginState === LoginStateEnum.RESET_PASSWORD" />
          <MobileLoginForm v-show="userStore.loginState === LoginStateEnum.MOBILE" />
          <QrCodeForm v-show="userStore.loginState === LoginStateEnum.QR_CODE" />
          <RegisterForm v-show="userStore.loginState === LoginStateEnum.REGISTER" />
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
        </Card>
      </LayoutContent>
    </Layout>
    <!-- <a-layout-footer></a-layout-footer> -->
  </Layout>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { Layout, LayoutContent, Card, Dropdown, TypographyTitle } from 'ant-design-vue';
import { loadFull } from 'tsparticles';
import { Engine } from 'tsparticles-engine';
import { useUserStore, useAppStore } from '@renderer/store';
import { LoginStateEnum } from '@renderer/store/model';
import XMenu from '@renderer/components/custom/XMenu.vue';
import LoginForm from './children/LoginForm.vue';
import MobileLoginForm from './children/MobileLoginForm.vue';
import ForgetPasswordForm from './children/ForgetPasswordForm.vue';
import QrCodeForm from './children/QrCodeForm.vue';
import RegisterForm from './children/RegisterForm.vue';
import iconShouhuituzi from '@renderer/components/iconfont/iconShouhuituzi.vue';
import options from '@renderer/assets/particles';
import { XMenuItem } from '@renderer/components/model';
import { UserParticles } from '@renderer/assets/particles';
import { AppLocalePicker } from '@renderer/components/Application';

const userStore = useUserStore();
const appStore = useAppStore();
const menuConfig = reactive({
  mode: 'inline',
  theme: 'dark'
});
const menuList = ref<XMenuItem[]>([
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

const current = ref<UserParticles[]>([appStore.particles]); // 当前选中背景特性
const particOPtions = ref(options[appStore.particles]); // 背景特性参数

// 背景特性选择
const menuClick = async ({ key }) => {
  particOPtions.value = options[key];
  current.value[0] = key;
  appStore.setParticlesCurrent(key);
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
      min-width: 300px;
      width: 30rem;
      box-shadow: var(--shadow-card);
      :deep(.ant-card-actions) {
        background: transparent;
        border: none;
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
  @media screen and(max-width: 640px) {
    .login-content {
      .login-card {
        padding: 0.5rem 0;
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
