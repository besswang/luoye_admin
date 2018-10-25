<template>
  <div id="bannerlist">
    <el-row>
      <el-col :span="22">
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
      </el-col>
      <el-col :span="2" class="text-r">
        <el-button type="primary" @click="addFn">添加</el-button>
      </el-col>
    </el-row>
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
        label="banner">
        <template slot-scope="scope">
          <div style="width:200px;height:60px;overflow:hidden;margin:0 auto">
              <img style="display:block;width:100%;" :src="scope.row.img" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        property="startEnd"
        label="起止时间">
      </el-table-column>
      <el-table-column
        align="center"
        property="date"
        label="编辑时间">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="editFn(scope.row.id)">编辑</el-button>
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
  name: 'BannerList',
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
