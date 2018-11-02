<template>
  <div id="Header">
    <ul class="flex flex-r">
      <li class="flex1"></li>
      <li class="header text-r" @mouseover="overFn" @mouseout="outFn">
        {{nickName}}
        <i class="el-icon-setting"></i>
      </li>
    </ul>
    <ul v-show="showSelect" class="flex flex-c set-ul center" @mouseover="overFn" @mouseout="outFn">
      <li>
        <el-button type="text" @click.native="goAmend">修改密码</el-button>
      </li>
      <li>
        <el-button type="text" @click.native="logout">退出</el-button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Header',
  data () {
    return {
      showSelect: false,
      nickName: ''
    }
  },
  computed: {

  },
  mounted () {
    this.nickName = window.sessionStorage.getItem('nickName')
  },
  methods: {
    ...mapActions(['logout']),
    goAmend () {
      this.$router.push('/amend')
    },
    overFn () {
      this.showSelect = true
    },
    outFn () {
      this.showSelect = false
    }
  }
}
</script>

<style scoped>
.header{
    height: 59px;
    line-height:60px;
    color:#fff;
    cursor: pointer;
}
.header:hover{
  color:#C7C7C7;
}
.set-ul{
  position: absolute;
  right:20px;
  background:#fff;
  -moz-box-shadow:0px 1px 4px #C7C7C7; -webkit-box-shadow:0px 1px 4px #C7C7C7; box-shadow:0px 1px 4px #C7C7C7;
}
.set-ul>li{
  border-bottom:1px solid rgb(230, 230, 230);
  padding:10px 20px;
}
</style>
