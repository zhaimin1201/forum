<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li>
            <router-link :to="{name: 'login'}">登入</router-link>
          </li>
          <li class="layui-this">
            找回密码
            <!--重置密码-->
          </li>
        </ul>
        <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
          <div class="layui-tab-item layui-show">
            <!-- 重置密码 -->

            <div class="layui-form layui-form-pane">
              <form method="post">
                <div class="layui-form-item" :class="{ 'form-group--error': $v.formData.username.$error }">
                  <label for="L_email" class="layui-form-label">邮箱</label>
                  <div class="layui-input-inline">
                    <input
                      type="text"
                      v-model.trim="$v.formData.username.$model"
                      placeholder="请输入邮箱地址"
                      autocomplete="off"
                      class="layui-input"
                    />
                  </div>
                  <div class="error" v-if="!$v.formData.username.required||!$v.formData.username.email">
                    请输入正确的邮箱地址
                  </div>
                </div>
                <div class="layui-form-item" :class="{ 'form-group--error': $v.formData.code.$error }">
                  <label for="L_vercode" class="layui-form-label">图形验证码</label>
                  <div class="layui-input-inline" >
                    <input
                      type="text"
                      v-model.trim="$v.formData.code.$model"
                      placeholder="请输入验证码"
                      autocomplete="off"
                      class="layui-input"
                    />
                  </div>
                  <div
                    class="layui-form-mid layui-word-aux svg"
                    v-html="svg"
                    @click="getCapcha()"
                  ></div>
                  <div class="error" v-if="!$v.formData.code.required||!$v.formData.code.minLength">
                    请输入正确的验证码
                  </div>
                </div>
                <div class="layui-form-item">
                  <button type="button" class="layui-btn" @click="regForm()">提交</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength,email } from "vuelidate/lib/validators";
import { getCode,forget } from "@/api/login"
export default {
  name: 'forget',
  data () {
    return {
      svg: "",
      formData: {
        username: "",
        code: ""
      }
    }
  },
  validations() {
    return {
      formData: {
        username: {
          email,
          required,
        },
        code: {
          required,
          minLength: minLength(4),
        },
      },
    };
  },
  mounted() {
    this._getCode();
  },
  methods: {
    _getCode() {
      getCode().then((res)=>{
        if(res.code === 200) {
          this.svg = res.data 
        }
      })
    },
    regForm() {
      this.$v.formData.$touch();
      if(!this.$v.formData.$error) {
        // 所有验证通过
        forget({
          username:this.formData.username,
          code: this.formData.code
        }).then((res)=>{
          console.log(res)
          if (res.code === 200) {
            alert("邮件发送成功")
          }
        })
      }      
    },
  },
}
</script>

<style lang="scss" scoped>
.svg {
  position: relative;
  top: -15px;
}
</style>
