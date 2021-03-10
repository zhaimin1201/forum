import axios from "@/utils/request";

/**
 * 获取验证码
 * @param {*} sid 唯一标示
 */
const getCode = (sid) => {
  return axios.get('/public/getCaptcha', {
    params: {
      sid
    }
  })
}
/**
 * 忘记密码
 * @param {*} option 用户信息（邮箱，code）
 */
const forget = (option) => {
  return axios.post('/forget', {
    ...option
  })
}
/**
 * 用户登陆
 * @param {*} loginInfo 用户登陆信息
 */
const login = (loginInfo) => {
  return axios.post('/login/login', {
    ...loginInfo
  })
}
/**
 * 用户注册
 * @param {*} regInfo 用户注册信息
 */
const reg = (regInfo) => {
  return axios.post('/login/reg', {
    ...regInfo
  })
}

export { 
  getCode, 
  forget, 
  login,
  reg 
}
