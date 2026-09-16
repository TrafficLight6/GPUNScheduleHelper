<template>
  <el-menu class="me-menu" mode="vertical" router :default-active="$route.path">
    <el-menu-item index="/main/me/login">
      <el-icon><User /></el-icon>
      <span>登录</span>
    </el-menu-item>
    <el-menu-item index="settings">
      <el-icon><Setting /></el-icon>
      <span>设置</span>
    </el-menu-item>
    <el-menu-item index="about">
      <el-icon><InfoFilled /></el-icon>
      <span>关于</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { User, Setting, InfoFilled } from '@element-plus/icons-vue'
</script>

<style scoped>
.me-menu {
  height: 100%;
  border-right: none;
}
</style>
