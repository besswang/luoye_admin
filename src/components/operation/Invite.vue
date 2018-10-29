<template>
  <div id="Invite">
    <el-form ref="form" :model="BanForm" :inline="true">
      <el-form-item>
        <el-date-picker
          v-model="BanForm.time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
      </el-form-item>
    </el-form>
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
        property="name"
        label="受邀注册人">
      </el-table-column>
      <el-table-column
        align="center"
        property="date"
        label="注册时间">
      </el-table-column>
      <el-table-column
        align="center"
        property="name"
        label="邀请人">
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
  name: 'Invite',
  data () {
    return {
      BanForm: {
        time: ''
      },
      currentPage4: 4,
      tableData: [{
        id: 1,
        date: '2016-05-02',
        startEnd: '2016-05-02 15:22 - 2016-05-02 15:66',
        name: '王小虎',
        img: 'http://img3.imgtn.bdimg.com/it/u=108228188,2741176027&fm=26&gp=0.jpg',
        title: '上海市普陀区金沙江路 1518 弄',
        bonum: '10',
        shounum: '11'
      }, {
        id: 2,
        date: '2016-05-04',
        startEnd: '2016-05-02 15:22 - 2016-05-02 15:66',
        name: '王小虎',
        img: 'http://img1.3lian.com/2015/a1/63/d/121.jpg',
        title: '上海市普陀区金沙江路 1517 弄',
        bonum: '20',
        shounum: '22'
      }]
    }
  },
  methods: {
    // 编辑
    editFn (id) {
      this.$router.push({
        path: `/operation/banadd/${id}`
      })
    },
    // 增加
    addFn () {
      let id = ' '
      this.$router.push(`/operation/banadd/${id}`)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  }
}
</script>

<style scoped>

</style>
