<template>
  <div class="bar-layout">
    <div class="bar-layout__content">
      <router-view />
    </div>
    <el-menu class="bar-layout__menu" mode="horizontal" :ellipsis="false" router :default-active="$route.path">
      <el-menu-item index="/main/line" class="bar-layout__item">
        <el-icon><Clock /></el-icon>
        <span>时间线</span>
      </el-menu-item>
      <el-menu-item index="/main/schedule" class="bar-layout__item">
        <el-icon><Calendar /></el-icon>
        <span>日程</span>
      </el-menu-item>
      <el-menu-item index="/main/me" class="bar-layout__item">
        <el-icon><User /></el-icon>
        <span>我的</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { Clock, Calendar, User } from '@element-plus/icons-vue'
</script>

<style scoped>
.bar-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
}

.bar-layout__content {
  flex: 1;
  min-height: 0;
  overflow: auto;
}

.bar-layout__menu {
  display: flex;
  width: 100%;
  flex-shrink: 0;
  border-top: 1px solid var(--el-border-color-light);
}

.bar-layout__menu :deep(.el-menu-item) {
  flex: 1 1 0;
  min-width: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 64px;
  line-height: 1;
}

.bar-layout__menu :deep(.el-menu-item .el-icon) {
  margin-right: 0;
  font-size: 20px;
}

.bar-layout__menu :deep(.el-menu-item span) {
  font-size: 12px;
}
</style>
