<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li>
            <router-link :to="{ name: 'login' }">登入</router-link>
          </li>
          <li class="layui-this">注册</li>
        </ul>
        <div
          class="layui-form layui-tab-content"
          id="LAY_ucm"
          style="padding: 20px 0"
        >
          <div class="layui-tab-item layui-show">
            <div class="layui-form layui-form-pane">
              <validation-observer ref="observer" v-slot="{ validate }">
                <form method="post">
                  <!-- 用户命 -->
                  <div class="layui-form-item">
                    <label class="layui-form-label">用户名</label>
                    <validation-provider
                      name="username"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <div class="layui-input-inline">
                        <input
                          type="text"
                          name="username"
                          v-model="username"
                          placeholder="请输入用户名"
                          autocomplete="off"
                          class="layui-input"
                        />
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <!-- 用户昵称 -->
                  <div class="layui-form-item">
                    <label for="L_username" class="layui-form-label"
                      >昵称</label
                    >
                    <validation-provider
                      name="name"
                      rules="required|min:6"
                      v-slot="{ errors }"
                    >
                      <div class="layui-input-inline">
                        <input
                          type="text"
                          name="name"
                          v-model="name"
                          placeholder="请输入用户昵称"
                          autocomplete="off"
                          class="layui-input"
                        />
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <!-- 用户密码 -->
                  <div class="layui-form-item">
                    <label for="L_pass" class="layui-form-label">密码</label>
                    <validation-provider
                      name="password"
                      rules="required|min:6|confirmed:confirmation"
                      v-slot="{ errors }"
                    >
                      <div class="layui-input-inline">
                        <input
                          type="password"
                          name="password"
                          v-model="password"
                          placeholder="请输入密码"
                          autocomplete="off"
                          class="layui-input"
                        />
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <!-- 确认密码 -->

                  <div class="layui-form-item">
                    <label for="L_repass" class="layui-form-label"
                      >确认密码</label
                    >
                    <validation-provider
                      name="srpassword"
                      vid="confirmation"
                      v-slot="{ errors }"
                    >
                      <div class="layui-input-inline">
                        <input
                          type="password"
                          placeholder="请再次输入密码"
                          name="srpassword"
                          v-model="srpassword"
                          autocomplete="off"
                          class="layui-input"
                        />
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <!-- 验证码 -->
                  <div class="layui-form-item">
                    <label for="L_vercode" class="layui-form-label"
                      >验证码</label
                    >
                    <validation-provider
                      name="code"
                      ref="codefield"
                      rules="required|length:4"
                      v-slot="{ errors }"
                    >
                      <div class="layui-input-inline">
                        <input
                          type="text"
                          name="code"
                          v-model="code"
                          autocomplete="off"
                          placeholder="请输入验证码"
                          class="layui-input"
                        />
                      </div>
                      <div
                        class="layui-form-mid layui-word-aux svg"
                        v-html="svg"
                        @click="_getCode()"
                      ></div>
                      <div class="layui-form-mid">
                        <span style="color: #c00">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <button
                      type="button"
                      class="layui-btn"
                      @click="validate().then(submit)"
                    >
                      立即注册
                    </button>
                  </div>
                  <div class="layui-form-item fly-form-app">
                    <span>或者直接使用社交账号快捷注册</span>
                    <a
                      href
                      onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
                      class="iconfont icon-qq"
                      title="QQ登入"
                    ></a>
                    <a
                      href
                      onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
                      class="iconfont icon-weibo"
                      title="微博登入"
                    ></a>
                  </div>
                </form>
              </validation-observer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { required, minLength } from "vuelidate/lib/validators";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { getCode, reg } from "@/api/login";
export default {
  name: "reg",
  data() {
    return {
      svg: "",
      username: "",
      name: "",
      password: "",
      code: "",
      srpassword: "",
      // formData: {
      //   name: "",
      //   password: "",
      //   srpassword: "",
      //   nickname: "",
      //   code: "",
      // },
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  // validations() {
  //   return {
  //     formData: {
  //       name: {
  //         required,
  //         minLength: minLength(4),
  //       },
  //       password: {
  //         required,
  //         minLength: minLength(6),
  //       },
  //       srpassword:  {
  //         required,
  //         minLength: minLength(6),
  //       },
  //       nickname: {
  //         required
  //       },
  //       code: {
  //         required,
  //         minLength: minLength(4),
  //       },
  //     },
  //   };
  // },
  mounted() {
    this._getCode();
  },
  methods: {
    async _getCode() {
      let sid = this.$store.state.sid;
      let res = await getCode(sid);
      if ((res.code = 200)) {
        this.svg = res.data;
      }
    },
    checkForm() {
      this.$v.formData.$touch();
    },
    async submit() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
        return;
      }
      let params = {
        username: this.username,
        password: this.password,
        name: this.name,
        code: this.code,
        sid: this.$store.state.sid,
      };
      try {
        let res = await reg(params);
        if (res.code == 200) {
          this.username = "";
          this.name = "";
          this.password = "";
          this.srpassword = "";
          this.code = "";
          requestAnimationFrame(() => {
            // 表单重置
            this.$refs.observer.reset();
          });
          this.$alert("注册成功");
          setTimeout(() => {
            // 注册成功，跳转到登陆页面
            this.$router.push("/login");
          }, 1000);
        } else if (res.code == 500) {
          // username -> '用户名已注册'
          // res.msg = {username: [], name: [], code}
          console.log(res, "res.msg");
          this.$refs.observer.setErrors(res.msg);
        }
      } catch (err) {
        console.log(err.response, "res.msg");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.svg {
  position: relative;
  top: -15px;
}
</style>
