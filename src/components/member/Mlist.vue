<template>
  <div id="Mlist">
    <el-row>
      <el-col :span="22">
        <el-form ref="form" :inline="true">
          <el-form-item>
            <el-select v-model="status">
              <el-option v-for="(v,i) in types" :key="i" :value="v.value" :label="v.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="info" placeholder="用户名/昵称"></el-input>
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
        property="userName"
        label="用户名">
      </el-table-column>
      <el-table-column
        align="center"
        property="nickName"
        label="昵称">
      </el-table-column>
      <el-table-column
        align="center"
        label="最后一次登陆时间">
        <template slot-scope="scope">
          {{timeFn(scope.row.lastLoginTime)}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="260">
        <template slot-scope="scope">
          <el-row class="flex flex-a-c">
            <!-- <el-col :span="12">
              <el-button size="mini" type="primary" @click.native="editFn(scope.row.id)">编辑</el-button>
            </el-col> -->
            <el-col>
              <el-switch
                @change="disableStatus(scope.row.id)"
                style="display: block"
                :active-value='av'
                :inactive-value='iav'
                v-model="scope.row.status"
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
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Mlist',
  data () {
    return {
      av: 0,
      iav: 1, // 冻结
      loading: true,
      currentPage: 1, // 当前页
      pageSize: 10, // 一页有多少条
      total: 0, // 一共有多少条
      types: [
        {value: '', label: '全部'},
        {value: 0, label: '未冻结'},
        {value: 1, label: '冻结'}
      ],
      status: '', // 冻结状态
      info: '',
      tableData: []
      // tableData: [{
      //   userName: '111',
      //   lastLoginTime: '2016-05-02',
      //   nickName: '王小虎',
      //   status: 0 // 1冻结，0未冻结
      // }]
    }
  },
  computed: {
    ...mapGetters(['getMemberList'])
  },
  mounted () {
    this.getList()
    console.log(this.getMemberList)
  },
  methods: {
    // disableStatus：冻结/解冻
    ...mapActions(['disableStatus', 'userList']),
    // 转时间格式
    timeFn (val) {
      if (val) {
        return this.$global.formatDate(new Date(val), 'YYYY-MM-DD HH:mm:ss')
      } else {
        return ''
      }
    },
    // 获取会员列表
    getList () {
      let trans = {
        currentPage: this.currentPage, // 当前页
        pageSize: this.pageSize, // 一页有多少条
        info: this.info, // 用户名
        status: this.status // 冻结状态
      }
      let pam = {}
      for (let i in trans) {
        if (trans[i]) {
          pam[i] = trans[i]
        }
      }
      // this.userList(pam)
      this.api.userListApi(pam)
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
    // editFn (id) {
    //   this.$router.push({
    //     path: `/member/add/${id}`
    //   })
    // },
    // 增加会员
    addFn () {
      // let id = ' '
      // this.$router.push(`/member/add/${id}`)
      this.$router.push('/member/add')
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
