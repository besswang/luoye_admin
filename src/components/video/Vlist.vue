<template>
  <div id="Vlist">
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
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="text-r ptb15">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Vlist',
  data () {
    return {
      currentPage4: 4,
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
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
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
