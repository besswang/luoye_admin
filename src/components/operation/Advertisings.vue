<template>
  <div id="Wd">
    <el-row>
      <el-col :span="21">
        <el-form ref="form" :inline="true">
          <el-form-item>
            <el-input v-model="title" placeholder="广告名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="type">
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
        <el-button type="primary" @click="WdIssue">添加</el-button>
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
        property="title"
        label="广告名称">
      </el-table-column>
      <el-table-column
        align="center"
        label="广告类型">
        <template slot-scope="scope">
          {{scope.row.type == '1' ? '启动屏广告':'首页弹屏'}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="执行时间">
        <template slot-scope="scope">
          {{timeFn(scope.row.startTime)}} 至 {{timeFn(scope.row.endTime)}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="禁用状态">
        <template slot-scope="scope">
          <el-switch
            @change="advertDisable(scope.row.id)"
            style="display: block"
            :active-value='av'
            :inactive-value='iav'
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="正常"
            inactive-text="禁用">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="editFn(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteFn(scope.row.id)">删除</el-button>
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
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Wd',
  data () {
    return {
      title: '',
      av: 0, // 启用
      iav: 1, // 禁用
      pageSize: 10,
      currentPage: 1,
      total: 0,
      loading: true,
      BanForm: {
        time: ''
      },
      dialogFormVisible: false,
      types: [
        {value: '', label: '选择类型'},
        {value: '1', label: '启动屏广告'},
        {value: '2', label: '首页弹屏'}
      ],
      type: '',
      tableData: []
    }
  },
  created () {
    // this.advertList(this.searchAdverForm)
  },
  mounted () {
    // this.getList()
  },
  computed: {
    ...mapState('searchAdverForm')
  },
  methods: {
    ...mapActions(['advertDisable', 'advertList']),
    // 转时间格式
    timeFn (val) {
      if (val) {
        return this.$global.formatDate(new Date(val), 'YYYY-MM-DD HH:mm:ss')
      } else {
        return ''
      }
    },
    // 列表
    getList () {
      let trans = {
        currentPage: this.currentPage, // 当前页
        pageSize: this.pageSize, // 一页有多少条
        title: this.title,
        type: this.type
      }
      let pam = {}
      for (let i in trans) {
        if (trans[i]) {
          pam[i] = trans[i]
        }
      }
      this.api.advertListApi(pam)
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
      this.$router.push('/operation/advertadd')
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
