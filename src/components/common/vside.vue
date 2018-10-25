<template>
  <div>
    <el-row class="tac">
      <el-col>
        <el-menu
          default-active="1-1"
          :default-openeds='opends'
          class="el-menu-vertical"
          router>
          <el-submenu index="1">
            <template slot="title">
              <span class="menu-title">视频</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/video/list">视频列表</el-menu-item>
              <!-- <el-menu-item index="1-2">视频编辑</el-menu-item> -->
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <span class="menu-title">会员</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/member/list">会员列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <span class="menu-title">运营</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/operation/bannerlist">banner管理</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/operation/classify">分类管理</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="3-1">邀请好友</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="3-1">观看和下载</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="3-1">域名管理</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="3-1">基础定义</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'vside',
  data () {
    return {
      opends: ['1', '2', '3']
    }
  }
}
</script>

<style scoped>
  .tac{
    height:calc(100% - 60px);
    overflow:auto;
    text-align: center;
  }
  .el-menu-vertical{
    overflow:hidden;
    padding-bottom:50px;
  }
  /* .el-menu-vertical >>> .el-submenu__title{
    padding:0;
    padding-left:0 !important;
  } */
  .menu-title{
    font-size:15px;
    font-weight: bold;
    color:#222;
    display:block;
    width:100%;
    height:100%;
    /* background-color: rgb(230, 230, 230); */
  }
  .el-submenu .el-menu-item:first-child{
    margin-top:-14px;
  }
</style>
