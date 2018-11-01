// 二，用getters来获取state的状态，而不是直接使用state
const getters = {
  nickName: state => state.user.userInfo.nickName
}
export default getters
