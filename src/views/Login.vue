<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li class="layui-this">登入</li>
          <li>
            <router-link :to="{ name: 'reg' }">注册</router-link>
          </li>
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
                  <!-- 密码 -->
                  <div class="layui-form-item">
                    <label for="L_pass" class="layui-form-label">密码</label>
                    <validation-provider
                      name="password"
                      rules="required|min:6"
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
                      立即登录
                    </button>
                    <span style="padding-left: 20px">
                      <router-link :to="{ name: 'forget' }"
                        >忘记密码？</router-link
                      >
                    </span>
                  </div>
                  <div class="layui-form-item fly-form-app">
                    <span>或者使用社交账号登入</span>
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
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { getCode, login } from "@/api/login";
import { v4 as uuidv4 } from "uuid";
export default {
  name: "login",
  data() {
    return {
      svg: "",
      username: "",
      password: "",
      code: "",
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  mounted() {
    // window.vue = this
    //  console.log(window,'window')
    let sid = "";
    if (localStorage.getItem("sid")) {
      sid = localStorage.getItem("sid");
    } else {
      sid = uuidv4();
      localStorage.setItem("sid", sid);
    }
    this.$store.commit("setSid", sid);
    this._getCode(sid);
  },
  methods: {
    async _getCode() {
      let sid = this.$store.state.sid;
      let res = await getCode(sid);
      if ((res.code = 200)) {
        this.svg = res.data;
      }
    },
    async submit() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
        return;
      }
      let params = {
        username: this.username,
        password: this.password,
        code: this.code,
        sid: this.$store.state.sid,
      };
      try {
        let res = await login(params);
        if ((res.code === 200)) {
          this.username = "";
          this.password = "";
          this.code = "";
          requestAnimationFrame(()=>{
            // 表单重置
            this.$refs.observer.reset();
          })
          console.log("登陆成功");
        } else if(res.code === 401) {
          this.$refs.observer.setErrors([res.msg])
        } 
      } catch (err) {
        const data = err.response.data;
        if (data.code === 500) {
          this.$alert("用户名密码校验失败，请检查！");
        } else {
          this.$alert("服务器错误");
        }
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
