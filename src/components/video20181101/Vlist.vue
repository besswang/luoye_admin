<template>
  <div id="Vlist">
    <div class="text-r">
      <el-button type="primary" @click.native="addvlistFn">添加视频</el-button>
      <router-link to="/video/addvlistweb">
        <el-button type="primary">添加视频webuploader</el-button>
      </router-link>
    </div>
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
          <img style="display:block;width:100px;margin:0 auto;" :src="scope.row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        property="classify"
        label="类型">
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
      <el-table-column label="操作" align="center" width="160">
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
    <!-- 编辑弹窗 -->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="editForm" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="editForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="state" @change="selectChange">
            <el-option v-for="(v,i) in types" :key="i" :value="v"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Vlist',
  data () {
    return {
      editForm: {
        title: ''
      },
      types: ['角色一', '角色二'],
      state: '默认角色',
      dialogFormVisible: false,
      currentPage4: 4,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        img: 'http://img3.imgtn.bdimg.com/it/u=108228188,2741176027&fm=26&gp=0.jpg',
        classify: '动漫',
        title: '上海市普陀区金沙江路 1518 弄',
        bonum: '10',
        shounum: '11'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        img: 'http://img1.3lian.com/2015/a1/63/d/121.jpg',
        classify: '美食',
        title: '上海市普陀区金沙江路 1517 弄',
        bonum: '20',
        shounum: '22'
      }]
    }
  },
  methods: {
    // 添加视频
    addvlistFn  () {
      this.$router.push('/video/addvlist')
    },
    selectChange (val) {
      console.log(val)
      switch (val) {
        case '角色一':
          // this.addForm.userType = 0
          break
        case '角色二':
          // this.addForm.userType = 1
          break
      }
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    handleEdit (index, row) {
      this.dialogFormVisible = true
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
