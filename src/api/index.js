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
  harvestGrantApi: params => Fetch(jk.harvestGrant, {method: 'post', body: params}),
  // banner列表
  bannerListApi: params => Fetch(jk.bannerList, {method: 'post', body: params}),
  // banner删除
  bannerRemoveApi: params => Fetch(`${jk.bannerRemove}${params}`, {method: 'get'}),
  // banner 添加
  bannerAddApi: params => Fetch(jk.bannerAdd, {method: 'post', body: params}),
  // banner-启用/禁用
  bannerDisableApi: params => Fetch(`${jk.bannerDisable}${params}`, {method: 'get'}),
  // banner-编辑
  bannerEditApi: params => Fetch(jk.bannerEdit, {method: 'post', body: params}),
  // 视频列表
  videoListApi: params => Fetch(jk.videoList, {method: 'post', body: params}),
  // 视频-禁用/启用
  videoDisableApi: params => Fetch(`${jk.videoDisable}${params}`, {method: 'get'}),
  // 视频-编辑
  videoEditApi: params => Fetch(jk.videoEdit, {method: 'post', body: params}),
  // 视频-分类
  videoCategoryApi: () => Fetch(jk.videoCategory, {method: 'get'}),
  // 视频-删除
  videoRemoveApi: params => Fetch(`${jk.videoRemove}${params}`, {method: 'get'}),
  // 视频-是否推荐
  videoSpreadApi: params => Fetch(`${jk.videoSpread}${params}`, {method: 'get'}),
  // 分类管理-分类列表
  categoryListApi: params => Fetch(jk.categoryList, {method: 'post', body: params}),
  // 分类管理-新增分类
  categoryAddApi: params => Fetch(jk.categoryAdd, {method: 'post', body: params}),
  // 是否禁用
  categoryDisableApi: params => Fetch(`${jk.categoryDisable}${params}`, {method: 'get'}),
  // 是否推荐
  categorySpreadApi: params => Fetch(`${jk.categorySpread}${params}`, {method: 'get'}),
  // 父级分类
  parentCategoryApi: params => Fetch(`${jk.parentCategory}${params}`, {method: 'get'}),
  // 分类管理-编辑
  categoryEditApi: params => Fetch(jk.categoryEdit, {method: 'post', body: params}),
  // 广告管理-列表
  advertListApi: params => Fetch(jk.advertList, {method: 'post', body: params}),
  // 广告管理-是否禁用
  advertDisableApi: params => Fetch(`${jk.advertDisable}${params}`, {method: 'get'}),
  // 广告管理-添加
  advertAddApi: params => Fetch(jk.advertAdd, {method: 'post', body: params})
}
