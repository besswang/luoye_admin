<template>
  <div id="List">
      <el-table
      :data="tableData"
      style="width: 100%"
      highlight-current-row>
        <el-table-column
          align="center"
          label="编号"
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          align="center"
          property="date"
          label="日期">
        </el-table-column>
        <el-table-column
          align="center"
          label="封面">
          <template slot-scope="scope">
            <img style="display:block;width:100px;" :src="scope.row.img" alt="">
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          property="title"
          label="标题">
        </el-table-column>
        <el-table-column
          align="center"
          property="bonum"
          label="播放次数">
        </el-table-column>
        <el-table-column
          align="center"
          property="bonum"
          label="收藏次数">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
  name: 'List',
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        img: 'http://img3.imgtn.bdimg.com/it/u=108228188,2741176027&fm=26&gp=0.jpg',
        title: '上海市普陀区金沙江路 1518 弄',
        bonum: '10',
        shounum: '11'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        img: 'http://img1.3lian.com/2015/a1/63/d/121.jpg',
        title: '上海市普陀区金沙江路 1517 弄',
        bonum: '20',
        shounum: '22'
      }]
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  }
}
</script>

<style scoped>

</style>
