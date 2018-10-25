<template>
  <div id="Mlist">
    <el-row>
      <el-col :span="22">
        <el-form ref="form" :model="MlistForm" :inline="true">
          <el-form-item>
            <el-select v-model="state" @change="selectChange">
              <el-option v-for="(v,i) in types" :key="i" :value="v"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="MlistForm.name" placeholder="邮箱/昵称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">搜索</el-button>
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
        property="tel"
        label="手机号">
      </el-table-column>
      <el-table-column
        align="center"
        property="name"
        label="昵称">
      </el-table-column>
      <el-table-column
        align="center"
        property="date"
        label="最后一次登陆时间">
      </el-table-column>
      <el-table-column label="操作" align="center" width="260">
        <template slot-scope="scope">
          <el-row class="flex flex-a-i">
            <el-col :span="12">
              <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
              <el-button size="mini" type="primary" @click.native="editFn(scope.row.id)">编辑</el-button>
            </el-col>
            <el-col :span="12">
              <el-switch
                style="display: block"
                v-model="scope.row.freeze"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="解冻"
                inactive-text="冻结">
              </el-switch>
            </el-col>
          </el-row>
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
  name: 'Mlist',
  data () {
    return {
      currentPage4: 4,
      types: ['所有状态', '冻结', '未冻结'],
      state: '所有状态',
      MlistForm: {
        stateValue: '',
        name: ''
      },
      tableData: [{
        id: 1,
        date: '2016-05-02',
        tel: '15057187176',
        name: '王小虎',
        img: 'http://img3.imgtn.bdimg.com/it/u=108228188,2741176027&fm=26&gp=0.jpg',
        title: '上海市普陀区金沙江路 1518 弄',
        bonum: '10',
        shounum: '11',
        freeze: true
      }, {
        id: 2,
        date: '2016-05-04',
        tel: '15057187177',
        name: '王小虎',
        img: 'http://img1.3lian.com/2015/a1/63/d/121.jpg',
        title: '上海市普陀区金沙江路 1517 弄',
        bonum: '20',
        shounum: '22',
        freeze: false
      }]
    }
  },
  methods: {
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
