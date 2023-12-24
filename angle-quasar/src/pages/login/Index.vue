<template>
  <q-layout>
    <q-header class="text-black bg-grey-2" bordered> <XWinBar /> </q-header>
    <div class="login-content">
      <Particles
        id="tsparticles"
        :options="particOPtions"
        :particlesInit="particlesInit"
        :key="current[0]"
      />
      <q-card class="login-card">
        <q-card-section class="q-pt-none">
          <div class="q-pa-lg position-relative">
            <LoginForm
              v-show="userStore.loginDialogType === LoginDialogTypeEnum.LOGIN"
            />
            <RegisterForm
              v-show="
                userStore.loginDialogType === LoginDialogTypeEnum.REGISTER
              "
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import LoginForm from './components/LoginForm.vue';
import RegisterForm from './components/RegisterForm.vue';
import { LoginDialogTypeEnum } from '@/enums/login';
import { useUserStore } from '@/stores/user';
import options, { UserParticles } from '@/assets/particles';
import { loadFull } from 'tsparticles';
import { Engine } from 'tsparticles-engine';
import { XWinBar } from '@/components';
// import { useQuasar } from 'quasar';

const userStore = useUserStore();
// const $q = useQuasar();
const current = ref<UserParticles[]>([userStore.particles]); // 当前选中背景特性
const particOPtions = ref(options[userStore.particles]); // 背景特性参数

// 粒子特性初始化
const particlesInit = async (engine: Engine) => {
  // console.log(engine);
  await loadFull(engine);
};
</script>
<style lang="scss" scoped>
.login-content {
  background: transparent;
  #tsparticles {
    height: 100%;
    width: 100%;
  }
  .login-card {
    border-radius: 5px;
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border: 2px solid rgba(255, 255, 255, 0);
    position: absolute;
    right: 5%;
    top: 50%;
    transform: translateX(-5%) translateY(-50%);
    min-width: 400px;
    box-shadow: var(--shadow-card);
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
  }
}
</style>
