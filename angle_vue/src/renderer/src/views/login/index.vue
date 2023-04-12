<template>
  <a-layout class="login">
    <a-layout class="login-content">
      <a-layout-content>
        <Particles
          id="tsparticles"
          :options="particOPtions"
          :particlesInit="particlesInit"
          :rules="rules"
          :key="current[0]"
        />
        <a-card class="login-card">
          <div class="login-form-title">
            <a-typography-title :level="2">Live for today</a-typography-title>
          </div>

          <a-form
            :model="formState"
            name="normal_login"
            class="login-form"
            :label-col="{ span: 4 }"
            autocomplete="off"
            @finish="onFinish"
            :rules="rules"
            @finish-failed="onFinishFailed"
          >
            <a-form-item name="username">
              <a-input
                v-model:value="formState.username"
                :placeholder="$t('login.Username')"
                :autocomplete="formState.remember ? 'on' : 'off'"
                allowClear
              >
                <template #prefix>
                  <UserOutlined class="site-form-item-icon" />
                </template>
              </a-input>
            </a-form-item>

            <a-form-item name="password" class="login-form-password">
              <a-input-password
                v-model:value="formState.password"
                @change="formState.password = formState.password.trim()"
                :placeholder="$t('login.Password')"
                :autocomplete="formState.remember ? 'on' : 'off'"
                allowClear
              >
                <template #prefix>
                  <LockOutlined class="site-form-item-icon" />
                </template>
              </a-input-password>
            </a-form-item>

            <a-form-item>
              <a-form-item name="remember" no-style>
                <a-checkbox v-model:checked="formState.remember" class="login-form-remember">{{
                  $t('login.Remember me')
                }}</a-checkbox>
              </a-form-item>
              <a-typography-link class="login-form-forgot" href="">{{
                $t('login.Forgot password')
              }}</a-typography-link>
            </a-form-item>

            <a-form-item class="login-form-button">
              <a-button block html-type="submit">
                {{ $t('login.Log in') }}
              </a-button>
            </a-form-item>
            <a-typography-link disabled class="login-form-register" delete href="">{{
              $t('login.register now')
            }}</a-typography-link>
          </a-form>
          <template #actions>
            <div class="small-menu">
              <a-dropdown :trigger="['hover']" placement="bottom">
                <span class="small-menu-icon ant-avatar ant-avatar-circle ant-avatar-icon">
                  <Transition>
                    <iconShouhuituzi two-tone-color="#eb2f96" size="32px" />
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
import { useI18n } from '@renderer/i18n';
import { useRouter } from 'vue-router';
import { useUserStore } from '@renderer/store/userStore';
import XMenu from '@renderer/components/XMenu.vue';
import iconShouhuituzi from '@renderer/components/iconfont/iconShouhuituzi.vue';
import options from '@renderer/assets/particles';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import service from '@renderer/apis/service';
import request_url from '@renderer/apis/request_url';
import _public from '@renderer/assets/public';
import { encrypt, decrypt } from '@renderer/assets/public/cryptoJs';
import type { Rule } from 'ant-design-vue/es/form';
interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

const { t } = useI18n();
const menuConfig = reactive({
  mode: 'inline',
  theme: 'dark'
});
const menuList = ref([
  {
    key: 'light',
    name: 'light'
  },
  {
    key: 'fireworks',
    name: 'fireworks'
  },
  {
    key: 'amongUs',
    name: 'amongUs'
  }
]);
const current = ref(['fireworks']); // 当前选中背景特性
const particOPtions = ref(options[current.value[0]]); // 背景特性参数
const formState = reactive<FormState>({
  // 登陆表单
  username: '',
  password: '',
  remember: true
});

let validatorPass = async (_rule: Rule, value: string): Promise<void> => {
  if (value === '') {
    return Promise.reject(t('login.Please input your password!'));
  }
};
const rules: Record<string, Rule[]> = {
  username: [
    { required: true, message: t('login.Please input your username!'), trigger: 'change' }
  ],
  password: [{ required: true, validator: validatorPass, trigger: 'change' }]
};
// 背景特性选择
const menuClick = async ({ key }) => {
  particOPtions.value = options[key];
  current.value[0] = key;
};
// 粒子特性初始化
const particlesInit = async (engine) => {
  // console.log(engine);
  await loadFull(engine);
};
// 粒子特性加载完
// const particlesLoaded = async (container) => {
//   // console.log('Particles container loaded', container);
// };
// login 表单校验成功
const router = useRouter();
const { setUserName, setToken, setPhone, setAvatarUrl } = useUserStore();
const onFinish = async (values) => {
  const { username, password } = values;
  // 生成哈希值
  const hashedPassword = encrypt(password);
  const hashedUsername = encrypt(username);
  // 存储 hash 值到数据库中
  const result = await service.postApiData(request_url.login, {
    username: hashedUsername,
    password: hashedPassword
  });
  // 返回结果提示
  _public.resultPrompt(result.data, '登录成功!', () => {
    const { token, phone, avatar_url } = result.data?.data;
    setUserName(username);
    setToken(token);
    setPhone(decrypt(phone));
    setAvatarUrl(decrypt(avatar_url));
    router.push('/home/chatGpt');
  });
};
// login 表单校验失败
const onFinishFailed = (errorInfo: never): void => {
  console.log('Failed:', errorInfo);
};
</script>
<style lang="less" scoped>
.login {
  @media screen and(max-width: 750px) {
    width: 100%;
    height: 100%;
    background: transparent !important;

    .login-content {
      background: transparent;

      #tsparticles {
        height: 100%;
        width: 100%;
      }
      .small-menu {
        display: block !important;
        position: initial;
      }
      .login-card {
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 5px;
        backdrop-filter: blur(15px);
        -webkit-backdrop-filter: blur(15px);
        border: 2px solid rgba(255, 255, 255, 0);
        position: absolute;
        right: 5%;
        top: 50%;
        transform: translateX(-5%) translateY(-50%);
        min-width: 300px;
        width: 80%;
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
      .login-form {
        .login-form-forgot {
          float: right;
        }
        .login-form-button {
          margin-bottom: 5px;
          margin-top: 10vh;
          width: 100%;
          .ant-btn {
            width: 100%;
            background-color: transparent;
            color: #fff;
          }
        }
        .login-form-remember {
          color: #fff;
        }
        .login-form-password {
        }
        .login-form-register {
          color: #fff;
        }
      }
    }
  }
  @media screen and(min-width: 751px) {
    width: 100%;
    height: 100%;
    background: transparent !important;

    .login-content {
      background: transparent;

      #tsparticles {
        height: 100%;
        width: 100%;
      }
      .small-menu {
        display: block !important;
        position: initial;
      }
      .login-card {
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 5px;
        backdrop-filter: blur(15px);
        -webkit-backdrop-filter: blur(15px);
        border: 2px solid rgba(255, 255, 255, 0);
        padding: 20px 35px;
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
      .login-form {
        .login-form-forgot {
          float: right;
        }
        .login-form-button {
          margin-bottom: 5px;
          margin-top: 5rem;
          width: 100%;
          .ant-btn {
            width: 100%;
            background-color: transparent;
            color: #fff;
          }
        }
        .login-form-remember {
          color: #fff;
        }
        .login-form-password {
        }
        .login-form-register {
          color: #fff;
        }
      }
    }
  }
}
</style>
