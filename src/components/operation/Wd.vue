<template>
  <div id="Wd">
    <el-row>
      <el-col :span="21">
        <el-form ref="form" :model="MlistForm" :inline="true">
          <el-form-item>
            <el-input v-model="MlistForm.name" placeholder="输入会员编号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="state" @change="selectChange">
              <el-option v-for="(v,i) in types" :key="i" :value="v"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">搜索</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="dialogFormVisible = true">开启不限次数观看</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="3" class="text-r">
        <el-button type="primary" @click="WdIssue">手工发放次数</el-button>
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
        property="tel"
        label="会员账号">
      </el-table-column>
      <el-table-column
        align="center"
        property="name"
        label="行为">
      </el-table-column>
      <el-table-column
        align="center"
        property="bonum"
        label="观看次数">
      </el-table-column>
      <el-table-column
        align="center"
        property="bonum"
        label="下载次数">
      </el-table-column>
      <el-table-column
        align="center"
        property="date"
        label="操作时间">
      </el-table-column>
    </el-table>
    <el-dialog title='开启不限次数观看' :visible.sync="dialogFormVisible">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
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
  name: 'Wd',
  data () {
    return {
      BanForm: {
        time: ''
      },
      dialogFormVisible: false,
      currentPage4: 4,
      types: ['选择类型', '登陆', '注册', '手工发放', '后台发放'],
      state: '选择类型',
      MlistForm: {
        stateValue: '',
        name: ''
      },
      tableData: [{
        id: 1,
        date: '2016-05-02',
        tel: '15057187176',
        name: '注册',
        img: 'http://img3.imgtn.bdimg.com/it/u=108228188,2741176027&fm=26&gp=0.jpg',
        title: '上海市普陀区金沙江路 1518 弄',
        bonum: '10',
        shounum: '11',
        freeze: true
      }, {
        id: 2,
        date: '2016-05-04',
        tel: '15057187177',
        name: '批量发放',
        img: 'http://img1.3lian.com/2015/a1/63/d/121.jpg',
        title: '上海市普陀区金沙江路 1517 弄',
        bonum: '20',
        shounum: '22',
        freeze: false
      }]
    }
  },
  methods: {
    // 手工发放次数
    WdIssue () {
      this.$router.push('/operation/wd/issue')
    },
    // 编辑
    editFn (id) {
      this.$router.push({
        path: `/member/add/${id}`
      })
    },
    // 增加
    addFn () {
      let id = ' '
      this.$router.push(`/member/add/${id}`)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    onSubmit () {
      console.log(this.MlistForm)
    },
    selectChange (val) {
      console.log(val)
      switch (val) {
        case '所有状态':
          this.MlistForm.stateValue = 0
          break
        case '状态一':
          this.MlistForm.stateValue = 1
          break
      }
    }
    // handleEdit (index, row) {
    //   console.log(index, row)
    // }
  }
}
</script>

<style scoped>

</style>
