<template>
  <div id="Wd">
    <!-- 运营-观看和下载 -->
    <el-row>
      <el-col :span="21">
        <el-form ref="form" :inline="true">
          <el-form-item>
            <el-input v-model="userName" placeholder="输入会员编号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="sourceType">
              <el-option v-for="(v,i) in types" :key="i" :value="v.value" :label="v.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.native="onSubmit">搜索</el-button>
          </el-form-item>
          <!-- <el-form-item>
            <el-button type="primary" @click="dialogFormVisible = true">开启不限次数观看</el-button>
          </el-form-item> -->
        </el-form>
      </el-col>
      <el-col :span="3" class="text-r">
        <el-button type="primary" @click="WdIssue">手工发放次数</el-button>
      </el-col>
    </el-row>
    <el-table
    v-loading="loading"
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
        property="userName"
        label="会员账号">
      </el-table-column>
      <el-table-column
        align="center"
        label="行为">
        <template slot-scope="scope">
          {{sourceTypeFn(scope.row.sourceType)}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="可用类型">
        <template slot-scope="scope">
          {{scope.row.availableType == '1' ? '观看':'下载'}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        property="availableNum"
        label="可用次数">
      </el-table-column>
      <el-table-column
        align="center"
        property="createTime"
        label="操作时间">
        <template slot-scope="scope">
          {{timeFn(scope.row.createTime)}}
        </template>
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
        :current-page="currentPage"
        :page-sizes="[10, 20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { SOURCE_TYPE } from '../meta/meta.js'
export default {
  name: 'Wd',
  data () {
    return {
      pageSize: 10,
      currentPage: 1,
      total: 0,
      loading: true,
      BanForm: {
        time: ''
      },
      dialogFormVisible: false,
      types: SOURCE_TYPE,
      sourceType: '',
      userName: '',
      tableData: []
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    // 转时间格式
    timeFn (val) {
      if (val) {
        return this.$global.formatDate(new Date(val), 'YYYY-MM-DD HH:mm:ss')
      } else {
        return ''
      }
    },
    sourceTypeFn (val) {
      switch (val) {
        case '1':
          return '注册'
        case '2':
          return '批量发放'
        case '3':
          return '后台添加'
        case '4':
          return '邀请'
        case '5':
          return '被邀请'
      }
    },
    // 列表
    getList () {
      let trans = {
        currentPage: this.currentPage, // 当前页
        pageSize: this.pageSize, // 一页有多少条
        sourceType: this.sourceType, // 来源类型
        userName: this.userName // 会员编号
      }
      let pam = {}
      for (let i in trans) {
        if (trans[i]) {
          pam[i] = trans[i]
        }
      }
      this.api.harvestListApi(pam)
        .then((res) => {
          if (res.code === 200) {
            this.total = res.data.total
            this.tableData = res.data.list
            setTimeout(() => {
              this.loading = false
            }, 800)
          }
        })
    },
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
      this.loading = true
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.loading = true
      this.currentPage = val
      this.getList()
    },
    onSubmit () {
      this.loading = true
      this.currentPage = 1
      this.getList()
    }
  }
}
</script>

<style scoped>

</style>
