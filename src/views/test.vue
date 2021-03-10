<template>
  <div id="app">
    <router-view></router-view>
    <div class="layui-container">
      <form class="layui-form layui-form-pane" action="">
        <div
          class="layui-form-item"
          :class="{ 'form-group--error': $v.formData.name.$error }"
        >
          <label class="layui-form-label">用户名</label>
          <div class="layui-input-inline">
            <input
              type="text"
              name="title"
              v-model.trim="$v.formData.name.$model"
              placeholder="请输入标题"
              autocomplete="off"
              class="layui-input"
            />
          </div>
          <div class="error" v-if="!$v.formData.name.required">请输入正确的姓名</div>
        </div>

        <div
          class="layui-form-item"
          :class="{ 'form-group--error': $v.formData.password.$error }"
        >
          <label class="layui-form-label">密码框</label>
          <div class="layui-input-inline">
            <input
              type="password"
              name="password"
              v-model.trim="$v.formData.password.$model"
              placeholder="请输入密码"
              autocomplete="off"
              class="layui-input"
            />
          </div>
          <div class="error" v-if="!$v.formData.password.required">请输入密码</div>
          <div
            class="layui-form-mid layui-word-aux svg"
            v-html="svg"
            @click="getCapcha()"
          ></div>
        </div>
        <div
          class="layui-form-item"
          :class="{ 'form-group--error': $v.formData.code.$error }"
        >
          <label class="layui-form-label">验证码</label>
          <div class="layui-input-block">
            <input
              type="text"
              name="title"
              v-model.trim="$v.formData.code.$model"
              placeholder="请输入标题"
              autocomplete="off"
              class="layui-input"
            />
          </div>
          <div class="error" v-if="!$v.formData.code.required">请输入正确的密码</div>
        </div>
      </form>
      <button type="button" class="layui-btn" @click="checkForm()">
        点击登陆
      </button>
      <a href="http://www.layui.com" class="find-link">忘记密码</a>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { required, email } from "vuelidate/lib/validators";
export default {
  name: "app",
  data() {
    return {
      svg: "",
      errorMsg: [],
      formData: {
        name: "",
        password: "",
        code: "",
      },
    };
  },
  validations() {
    return {
      formData: {
        name: {
          required,
          email,
        },
        password: {
          required,
        },
        code: {
          required,
        }
      },
    };
  },
  mounted() {
    this.getCapcha();
  },
  methods: {
    getCapcha() {
      axios.get("http://localhost:3000/getCaptcha").then((res) => {
        if (res.status === 200) {
          const obj = res.data;
          if (obj.code === 200) {
            this.svg = obj.data;
          }
        }
      });
    },
    checkForm() {
      this.$v.formData.$touch()
      // this.errorMsg = [];
      // if (!this.name) {
      //   this.errorMsg.push("登录名为空");
      // }
      // if (!this.password) {
      //   this.errorMsg.push("密码不得为空");
      // }
      // if (!this.code) {
      //   this.errorMsg.push("验证码为空");
      // }
    },
  },
};
</script>

<style lang="scss">
#app {
  background: #f2f2f2;
}
.layui-container {
  background: #fff;
}
.layui-form-item {
  .error {
    display: none;
  }
}
.form-group--error {
  .error {
    display: block;
    color: red;
    height: 35px;
    line-height: 35px;
  }
}
.find-link {
  margin-left: 10px;
  &:hover {
    color: #009688;
  }
}
.svg {
  position: relative;
  top: -15px;
}
</style>
