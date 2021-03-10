import AlertComponent from './Alert'
// 初始化
const Alert = {}

Alert.install =  (Vue) => {
  const AlertConstructor = Vue.extend(AlertComponent)
  const instance = new AlertConstructor()
  instance.$mount(document.createElement('div'))
  document.body.appendChild(instance.$el)
  // 添加实例方法
  Vue.prototype.$alert =  (msg) =>{
    instance.type = 'alert'
    instance.msg = msg
    instance.isShow = true
  }
  Vue.prototype.$confirm =  (msg, success, cancel) =>{
    instance.type = 'confirm'
    instance.msg = msg
    instance.isShow = true
    if(success) {
      instance.success = success
    }
    if(cancel) {
      instance.cancel = cancel
    }
  }
}
export default Alert