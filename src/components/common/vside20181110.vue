<template>
  <div>
    <el-row class="tac">
      <el-col>
        <el-menu
          default-active="1-1"
          :default-openeds='opends'
          class="el-menu-vertical"
          router>
          <template>
            <el-submenu :index="'i'" v-for="(item,i) in sideMenu" :key="i">
              <template slot="title">
                <span class="menu-title">{{item.menuTitle}}</span>
              </template>
              <el-menu-item-group v-for="(itemChild,i) in item.children" :key="i">
                <el-menu-item :index="itemChild.path">{{itemChild.subMenuTitle}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </template>
        </el-menu>
      </el-col>
    </el-row>
    <p>{{opends}}</p>
  </div>
</template>

<script>
import { SIDE_MENU } from '../meta/meta.js'
export default {
  name: 'vside',
  data () {
    return {
      sideMenu: SIDE_MENU
    }
  },
  computed: {
    opends: function () {
      let arr = []
      for (let i in SIDE_MENU) {
        arr.push(i)
      }
      return arr
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
