<template>
  <div class="page">
    <page-background>
      <p class="page_title">{{ page_title }}</p>
      <el-button class="d2-mt" @click="$router.replace({ path: '/login' })">
        {{ message }}
      </el-button>
    </page-background>
  </div>
</template>
<script>
import PageBackground from "../components/page-background";
export default {
  components: { PageBackground },
  data() {
    return {
      page_title: "Verify Email Successfully!",
      message: "前往登录",
    };
  },
};
</script>
<style lang="scss" scoped>
.page {
  height: 100%;
  .page_title {
    font-size: 20px;
    color: #303133;
  }
  .page-login {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .d2-mt{
      z-index: 0ind;
  }
}
</style>
