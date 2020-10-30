<template>
  <div class="page-login">
    <page-background>
      <account-form>
        <!-- logo -->
        <img class="page-login--logo" src="./image/logo@2x.png" />
        <!-- form -->
        <div class="page-login--form">
          <el-card shadow="never">
            <el-form
              ref="regitrationForm"
              label-position="top"
              :rules="rules"
              :model="formSignup"
              size="default"
            >
              <el-form-item prop="username">
                <el-input
                  type="text"
                  v-model="formSignup.username"
                  placeholder="用户名"
                >
                  <i slot="prepend" class="fa fa-user-circle-o"></i>
                </el-input>
              </el-form-item>
              <el-form-item prop="email">
                <el-input
                  type="email"
                  v-model="formSignup.email"
                  placeholder="邮箱"
                >
                  <i slot="prepend" class="fa fa-envelope-o"></i>
                </el-input>
              </el-form-item>
              <el-form-item prop="password1">
                <el-input
                  type="password"
                  v-model="formSignup.password1"
                  placeholder="密码"
                >
                  <i slot="prepend" class="fa fa-keyboard-o"></i>
                </el-input>
              </el-form-item>
              <el-form-item prop="password2">
                <el-input
                  type="password"
                  v-model="formSignup.password2"
                  placeholder="确认密码"
                >
                  <i slot="prepend" class="fa fa-keyboard-o"></i>
                </el-input>
              </el-form-item>
              <el-form-item prop="code">
                <el-input
                  type="text"
                  v-model="formSignup.code"
                  placeholder="验证码"
                >
                  <template slot="append">
                    <img class="login-code" src="./image/login-code.png" />
                  </template>
                </el-input>
              </el-form-item>
              <el-button
                size="default"
                @click="submit"
                type="primary"
                class="button-login"
              >
                注册
              </el-button>
            </el-form>
          </el-card>
          <p class="page-login--options" flex="main:justify cross:center">
            <span @click="redirect_to_login()"
              ><d2-icon name="question-circle" /> 已有账户</span
            >
          </p>
        </div>
      </account-form>
    </page-background>
  </div>
</template>

<script>
import PageBackground from "../components/page-background";
import AccountForm from "../components/account-form";
import { mapActions } from "vuex";
import localeMixin from "@/locales/mixin.js";
export default {
  components: { PageBackground, AccountForm },
  mixins: [localeMixin],
  data() {
    return {
      users: [
        {
          name: "Admin",
          email: "admin",
          password: "admin",
        },
        {
          name: "Editor",
          email: "editor",
          password: "editor",
        },
        {
          name: "User1",
          email: "user1",
          password: "user1",
        },
      ],
      // 表单
      formSignup: {
        username: "ias",
        email: "ias@szu.edu.cn",
        password1: "",
        password2: "",
        code: "v9am",
      },
      // 表单校验
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "请输入Email",
            trigger: "blur",
          },
        ],
        password1: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
        password2: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions("d2admin/account", ["signup"]),
    redirect_to_login() {
      this.$router.replace("/login");
    },
    /**
     * @description 提交表单
     */
    // 提交注册信息
    submit() {
      this.$refs.regitrationForm.validate((valid) => {
        if (valid && this.formSignup.password1 == this.formSignup.password2) {
          // 注册
          // 注意 这里的演示没有传验证码
          // 具体需要传递的数据请自行修改代码
          this.signup({
            username: this.formSignup.username,
            email: this.formSignup.email,
            password1: this.formSignup.password1,
            password2: this.formSignup.password2,
          }).then(() => {
            // 重定向对象不存在则返回顶层路径
            this.$router.replace(this.$route.query.redirect || "/");
          });
        } else {
          // 注册表单校验失败
          this.$message.error("表单校验失败，请检查");
        }
      });
    },
  },
};
</script>

<style lang="scss">
</style>
