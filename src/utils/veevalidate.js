import { extend, localize } from 'vee-validate';
import { required, email, min, length, confirmed } from 'vee-validate/dist/rules';
import zh from 'vee-validate/dist/locale/zh_CN.json'

extend('required',required)
extend('email',email)
extend('min',min)
extend('length',length)
extend('confirmed',confirmed)

localize('zh_CN', {
  messages: {
    ...zh.messages,
    required: '请输入{_field_}'
  },
  names: {
    email: '邮箱',
    password: '密码',
    name: '昵称',
    username: '账号',
    code: '验证码',
    srpassword: '确认密码'
  },
  fields: {
    // 自定义
  }
})