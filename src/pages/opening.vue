<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import logo from '../assets/GPNU-logo.jpg'

const router = useRouter()
const visible = ref(true)

onMounted(() => {
  setTimeout(() => {
    visible.value = false
  }, 800)

  setTimeout(() => {
    router.push('/main/line')
  }, 1000)
})
</script>

<template>
  <div class="opening">
    <transition name="el-fade-in">
      <div v-show="visible" class="opening__content">
        <img class="opening__logo" :src="logo" alt="GPNU Logo" />
        <h1 class="opening__title">日程助手</h1>
      </div>
    </transition>
  </div>
</template>
<style scoped>
.opening {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.opening__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.opening__logo {
  width: 50%;
  border: none;
  outline: none;
  display: block;
}

.opening__title {
  margin: 8px 0 0;
  text-align: center;
}
</style>
