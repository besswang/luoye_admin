<template>
  <div id="Invite">
    <el-form ref="form" :inline="true">
      <el-form-item>
        <el-date-picker
          v-model="time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native="searchFn">搜索</el-button>
      </el-form-item>
    </el-form>
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
        property="sendUser"
        label="受邀注册人">
      </el-table-column>
      <el-table-column
        align="center"
        label="注册时间">
        <template slot-scope="scope">
          {{timeFn(scope.row.createTime)}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        property="receiveUser"
        label="邀请人">
      </el-table-column>
    </el-table>
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
export default {
  name: 'Invite',
  data () {
    return {
      loading: true,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      time: '',
      startTime: '',
      endTime: '',
      tableData: []
      // tableData: [{
      //   createTime: '2016-05-02',
      //   receiveUser: '707558513@qq.com',
      //   sendUser: '1057120615@qq.com'
      // }]
    }
  },
  mounted () {
    this.inviteList()
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
    inviteList () {
      if (this.time) {
        this.startTime = Date.parse(this.time[0])
        this.endTime = Date.parse(this.time[1])
      } else {
        this.startTime = ''
        this.endTime = ''
      }
      let trans = {
        currentPage: this.currentPage, // 当前页
        pageSize: this.pageSize, // 一页有多少条
        startTime: this.startTime,
        endTime: this.endTime
      }
      let pam = {}
      for (let i in trans) {
        if (trans[i]) {
          pam[i] = trans[i]
        }
      }
      this.api.inviteListApi(pam)
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
    handleSizeChange (val) {
      this.loading = true
      this.pageSize = val
      this.inviteList()
    },
    handleCurrentChange (val) {
      this.loading = true
      this.currentPage = val
      this.inviteList()
    },
    searchFn () {
      this.loading = true
      this.currentPage = 1
      this.inviteList()
    }
  }
}
</script>

<style scoped>

</style>
