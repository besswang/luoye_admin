<template>
  <div id="Main">
    <el-container style="height:100%;">
        <el-header class="header-bg"><v-header></v-header></el-header>
        <el-container style="height:calc(100% - 60px);margin-top:60px;">
          <el-aside class="aside" style="width:240px;">
            <v-side></v-side>
            <div style="height:calc(100% - 668px);border-right: solid 1px #e6e6e6;"></div>
          </el-aside>
          <el-main class="main">
            <router-view></router-view>
          </el-main>
        </el-container>
    </el-container>
  </div>
</template>

<script>
import vHeader from './vheader.vue'
import vSide from './vside.vue'
export default {
  name: 'Main',
  components: {
    vHeader,
    vSide
  },
  data () {
    return {

    }
  }
}
</script>

<style scoped>
#Main{
  height:100%;
}
.header-bg{
    border-bottom: 1px solid #404553;
    background-color: #393D49;
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 1500;
}
</style>
