<template>
  <div class="login-page">
    <el-menu class="login-menu">
      <el-menu-item @click="goBack">
        <el-icon>
          <ArrowLeft />
        </el-icon>
        返回
      </el-menu-item>
    </el-menu>

    <div class="login-box">
      <h1 class="login-title">登录</h1>

      <el-form label-position="top" @submit.prevent="onLogin">
        <el-form-item label="学工号">
          <el-input v-model="username" placeholder="请输入您的学工号" clearable />
        </el-form-item>

        <el-form-item label="密码">
          <el-input
            v-model="password"
            type="password"
            placeholder="请输入密码"
            show-password
            @keyup.enter="onLogin"
          />
        </el-form-item>

        <el-form-item label="算术答案">
          <div class="captcha-row">
            <el-input
              v-model="captcha"
              placeholder="请输入算术答案"
              @keyup.enter="onLogin"
            />
            <img
              class="captcha-img"
              :src="captchaImg"
              alt="验证码"
              title="点击刷新"
              @click="refreshCaptcha"
            />
          </div>
        </el-form-item>

        <el-button
          class="login-btn"
          type="primary"
          :loading="submitting"
          @click="onLogin"
        >
          登 录
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ArrowLeft } from '@element-plus/icons-vue'
import { fetchCaptcha, login, saveSession } from '../../../lib/request/auth'

const router = useRouter()

const username = ref('')
const password = ref('')
const captcha = ref('')
const captchaImg = ref('')
const captchaUid = ref('')
const submitting = ref(false)

async function refreshCaptcha() {
  try {
    const data = await fetchCaptcha(captchaUid.value)
    captchaImg.value = data.content
    captchaUid.value = data.uid
    captcha.value = ''
  } catch (e) {
    ElMessage.error('验证码加载失败：' + e.message)
  }
}

async function onLogin() {
  if (!username.value || !password.value || !captcha.value) {
    ElMessage.warning('请填写账号、密码和算术答案')
    return
  }

  submitting.value = true
  try {
    const res = await login({
      username: username.value,
      password: password.value,
      captcha: captcha.value,
      uid: captchaUid.value,
    })

    const code = res?.data?.code
    if (code) {
      handleErrorCode(code, res?.data)
    } else {
      saveSession({ tgt: res?.tgt, ticket: res?.ticket })
      ElMessage.success('登录成功')
      router.push('/main/schedule')
    }
  } catch (e) {
    ElMessage.error('登录失败：' + e.message)
  } finally {
    submitting.value = false
  }
}

function handleErrorCode(code, data) {
  switch (code) {
    case 'CODEFALSE':
      ElMessage.error('验证码错误')
      refreshCaptcha()
      break
    case 'NOUSER':
      ElMessage.error('用户名或密码错误')
      refreshCaptcha()
      break
    case 'USERLOCK':
      ElMessage.error('账号已锁定，请稍后再试')
      break
    case 'USERDISABLED':
      ElMessage.error('账号已停用，请联系管理员')
      break
    default:
      ElMessage.error(data?.tips || '登录失败：' + code)
  }
}

function goBack() {
  router.push('/main/me')
}

onMounted(refreshCaptcha)
</script>

<style scoped>
.login-page {
  padding: 16px;
}

.login-menu {
  border-right: none;
  margin-bottom: 24px;
}

.login-box {
  max-width: 360px;
  margin: 0 auto;
}

.login-title {
  margin: 0 0 24px;
  text-align: center;
  font-size: 24px;
}

.captcha-row {
  display: flex;
  gap: 12px;
  width: 100%;
  align-items: center;
}

.captcha-img {
  height: 40px;
  width: 120px;
  flex-shrink: 0;
  cursor: pointer;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}

.login-btn {
  width: 100%;
}
</style>
