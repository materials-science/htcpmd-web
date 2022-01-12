<template>
	<div class="page-login">
		<page-background>
			<account-form>
				<!-- logo -->
				<img class="page-login--logo" src="@/assets/images/all.png" />
				<!-- form -->
				<div class="page-login--form" style="transform: scale(1.1)">
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
									placeholder="email"
								>
									<i
										slot="prepend"
										class="fa fa-envelope-o"
									></i>
								</el-input>
							</el-form-item>
							<el-form-item prop="password">
								<el-input
									type="password"
									v-model="formLogin.password"
									placeholder="password"
								>
									<i
										slot="prepend"
										class="fa fa-keyboard-o"
									></i>
								</el-input>
							</el-form-item>
							<el-form-item prop="code">
								<el-input
									type="text"
									v-model="formLogin.code"
									placeholder="validate code"
								>
									<template slot="append">
										<img
											class="login-code"
											src="./image/login-code.png"
										/>
									</template>
								</el-input>
							</el-form-item>
							<el-button
								size="default"
								@click="submit"
								type="primary"
								class="button-login"
							>
								Sign in
							</el-button>
						</el-form>
					</el-card>
					<p
						class="page-login--options"
						flex="main:justify cross:center"
					>
						<span><d2-icon name="question-circle" /> Forget</span>
						<span @click="redirect_to_signup()">Sign up</span>
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
			// 表单
			formLogin: {
				email: "guest@szu.edu.cn",
				password: "guest@ias",
				code: "v9am"
			},
			// 表单校验
			rules: {
				email: [
					{
						required: true,
						message: "Please input email",
						trigger: "blur"
					}
				],
				password: [
					{
						required: true,
						message: "Please input password",
						trigger: "blur"
					}
				],
				code: [
					{
						required: true,
						message: "Please input code",
						trigger: "blur"
					}
				]
			}
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
			this.$refs.loginForm.validate(valid => {
				if (valid) {
					// 登录
					// 注意 这里的演示没有传验证码
					// 具体需要传递的数据请自行修改代码
					this.login({
						email: this.formLogin.email,
						password: this.formLogin.password
					}).then(() => {
						// 重定向对象不存在则返回顶层路径
						this.$router.replace(this.$route.query.redirect || "/");
					});
				} else {
					// 登录表单校验失败
					this.$message.error("Validated form failed, check it.");
				}
			});
		}
	}
};
</script>

<style lang="scss">
// 快速选择用户面板
.page-login--quick-user {
	@extend %flex-col;
	justify-content: center;
	align-items: center;
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
