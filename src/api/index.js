import Fetch from '../fetch/index'
import jk from './jk'
export default {
  // 登陆
  loginApi: params => Fetch(jk.login, {method: 'post', body: params}),
  // 退出
  logoutApi: () => Fetch(jk.logout, {method: 'get'}),
  // 修改密码
  passwordApi: params => Fetch(jk.password, {method: 'post', body: params}),
  // 添加会员
  addApi: params => Fetch(jk.add, {method: 'post', body: params}),
  // 会员列表
  userListApi: params => Fetch(jk.userList, {method: 'post', body: params}),
  // 冻结状态
  disableStatusApi: params => Fetch(`${jk.disableStatus}${params}`, {method: 'get'}),
  // 邀请列表
  inviteListApi: params => Fetch(jk.inviteList, {method: 'post', body: params}),
  // 观看和下载列表
  harvestListApi: params => Fetch(jk.harvestList, {method: 'post', body: params}),
  // 手工发放次数
  harvestGrantApi: params => Fetch(jk.harvestGrant, {method: 'post', body: params})
}
