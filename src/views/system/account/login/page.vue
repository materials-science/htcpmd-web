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
              ref="loginForm"
              label-position="top"
              :rules="rules"
              :model="formLogin"
              size="default"
            >
              <el-form-item prop="email">
                <el-input
                  type="email"
                  v-model="formLogin.email"
                  placeholder="邮箱"
                >
                  <i slot="prepend" class="fa fa-envelope-o"></i>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  type="password"
                  v-model="formLogin.password"
                  placeholder="密码"
                >
                  <i slot="prepend" class="fa fa-keyboard-o"></i>
                </el-input>
              </el-form-item>
              <el-form-item prop="code">
                <el-input
                  type="text"
                  v-model="formLogin.code"
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
                登录
              </el-button>
            </el-form>
          </el-card>
          <p class="page-login--options" flex="main:justify cross:center">
            <span><d2-icon name="question-circle" /> 忘记密码</span>
            <span @click="redirect_to_signup()">注册用户</span>
          </p>
          <!-- quick login -->
          <el-button
            class="page-login--quick"
            size="default"
            type="info"
            @click="dialogVisible = true"
          >
            快速选择用户（测试功能）
          </el-button>
        </div>
      </account-form>
      <el-dialog
        title="快速选择用户"
        :visible.sync="dialogVisible"
        width="400px"
      >
        <el-row :gutter="10" style="margin: -20px 0px -10px 0px">
          <el-col v-for="(user, index) in users" :key="index" :span="8">
            <div
              class="page-login--quick-user"
              @click="handleUserBtnClick(user)"
            >
              <d2-icon name="user-circle-o" />
              <span>{{ user.name }}</span>
            </div>
          </el-col>
        </el-row>
      </el-dialog>
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
      // 快速选择用户
      dialogVisible: false,
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
      formLogin: {
        email: "ias@szu.edu.cn",
        password: "ias2020",
        code: "v9am",
      },
      // 表单校验
      rules: {
        email: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [
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
    ...mapActions("d2admin/account", ["login"]),
    /**
     * @description 接收选择一个用户快速登录的事件
     * @param {Object} user 用户信息
     */
    handleUserBtnClick(user) {
      this.formLogin.email = user.email;
      this.formLogin.password = user.password;
      this.submit();
    },
    redirect_to_signup() {
      this.$router.replace("/signup");
    },
    /**
     * @description 提交表单
     */
    // 提交登录信息
    submit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // 登录
          // 注意 这里的演示没有传验证码
          // 具体需要传递的数据请自行修改代码
          this.login({
            email: this.formLogin.email,
            password: this.formLogin.password,
          }).then(() => {
            // 重定向对象不存在则返回顶层路径
            this.$router.replace(this.$route.query.redirect || "/");
          });
        } else {
          // 登录表单校验失败
          this.$message.error("表单校验失败，请检查");
        }
      });
    },
  },
};
</script>

<style lang="scss">
// 快速选择用户面板
.page-login--quick-user {
  @extend %flex-center-col;
  padding: 10px 0px;
  border-radius: 4px;
  &:hover {
    background-color: $color-bg;
    i {
      color: $color-text-normal;
    }
    span {
      color: $color-text-normal;
    }
  }
  i {
    font-size: 36px;
    color: $color-text-sub;
  }
  span {
    font-size: 12px;
    margin-top: 10px;
    color: $color-text-sub;
  }
}
</style>
