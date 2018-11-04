<template>
  <div id="bannerlist">
    <el-row>
      <el-col :span="22">
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
      </el-col>
      <el-col :span="2" class="text-r">
        <el-button type="primary" @click="addFn">添加</el-button>
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
        label="banner">
        <template slot-scope="scope">
          <div style="width:200px;height:60px;overflow:hidden;margin:0 auto">
              <img style="display:block;width:100%;" :src="scope.row.iconUrl" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="起止时间">
        <template slot-scope="scope">
          {{timeFn(scope.row.onLineTime)}} 至 {{timeFn(scope.row.offLineTime)}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="编辑时间">
        <template slot-scope="scope">
          {{timeFn(scope.row.updateTime)}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="禁用状态">
        <template slot-scope="scope">
          <el-switch
            @change="bannerDisable(scope.row.id)"
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
import { mapActions } from 'vuex'
export default {
  name: 'BannerList',
  data () {
    return {
      av: 0, // 启用
      iav: 1, // 禁用
      time: '',
      startTime: '',
      endTime: '',
      currentPage: 1,
      pageSize: 10,
      total: 0,
      loading: true,
      tableData: [{
        id: 1,
        offLineTime: 1605938486000, // 结束时间
        onLineTime: 1540450878000, // 开始时间
        upateTime: null // 更新时间
      }]
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    ...mapActions(['bannerDisable']),
    deleteFn (id) {
      this.loading = true
      this.api.bannerRemoveApi(id)
        .then((res) => {
          if (res.code === 200) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            setTimeout(() => {
              this.getList()
            }, 800)
          }
        })
    },
    // 转时间格式
    timeFn (val) {
      if (val) {
        return this.$global.formatDate(new Date(val), 'YYYY-MM-DD')
      } else {
        return ''
      }
    },
    // 列表
    getList () {
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
        onLineTime: this.startTime,
        offLineTime: this.endTime
      }
      let pam = {}
      for (let i in trans) {
        if (trans[i]) {
          pam[i] = trans[i]
        }
      }
      this.api.bannerListApi(pam)
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
    // 编辑
    editFn (row) {
      console.log(row)
      this.$router.push({
        path: '/operation/banadd',
        query: row
      })
    },
    // 增加
    addFn () {
      this.$router.push('/operation/banadd')
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
    searchFn () {
      this.loading = true
      this.currentPage = 1
      this.getList()
    }
  }
}
</script>

<style scoped>

</style>
