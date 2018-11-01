import Fetch from '../fetch/index'
import jk from './jk'
export default {
  // 登陆
  loginApi: params => Fetch(jk.login, {method: 'post', body: params}),
  // 退出
  logoutApi: () => Fetch(jk.logout, {method: 'get'}),
  // 修改密码
  passwordApi: params => Fetch(jk.password, {method: 'post', body: params})
}
