<template>
  <div id="Vlist">
    <div class="text-r">
      <router-link to="/video/addvlistweb">
        <el-button type="primary">添加视频webuploader</el-button>
      </router-link>
    </div>
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
        label="封面">
        <template slot-scope="scope">
          <img style="display:block;width:100px;margin:0 auto;" :src="scope.row.iconUrl" alt="">
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        property="name"
        label="类型">
      </el-table-column>
      <el-table-column
        align="center"
        property="title"
        label="标题">
      </el-table-column>
      <el-table-column
        align="center"
        property="playTimes"
        label="播放次数">
      </el-table-column>
      <el-table-column
        align="center"
        property="collectTimes"
        label="收藏次数">
      </el-table-column>
      <el-table-column
        align="center"
        label="禁用状态">
        <template slot-scope="scope">
          <el-switch
            @change="videoDisable(scope.row.id)"
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
      <el-table-column label="操作" align="center" width="160">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)">删除</el-button>
            <!-- 编辑弹窗 -->
            <el-dialog title="编辑" :visible.sync="dialogFormVisible" width="30%">
              <el-form :model="editForm" label-width="80px">
                <el-form-item label="标题">
                  <el-input v-model="editForm.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                  <el-select v-model="editForm.categoryId">
                    <el-option v-for="(v,i) in getCategory" :key="i" :value="v.id" :label="v.label"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveTitle(scope.row.id)">确 定</el-button>
              </div>
            </el-dialog>
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
  name: 'Vlist',
  data () {
    return {
      av: 0, // 启用
      iav: 1, // 禁用
      loading: true,
      editForm: {
        title: '',
        categoryId: ''
      },
      dialogFormVisible: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
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
  computed: {
    ...mapGetters(['getCategory'])
  },
  mounted () {
    this.getList()
  },
  methods: {
    ...mapActions(['videoDisable', 'videoCategory']),
    // 编辑保存
    saveTitle (id) {
      this.loading = true
      let trans = {
        title: this.editForm.title,
        categoryId: Number(this.editForm.categoryId),
        videoId: id
      }
      this.api.videoEditApi(trans)
        .then((res) => {
          if (res.code === 200) {
            this.dialogFormVisible = false
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            setTimeout(() => {
              this.getList()
            }, 800)
          }
        })
    },
    // 列表
    getList () {
      let trans = {
        currentPage: this.currentPage, // 当前页
        pageSize: this.pageSize // 一页有多少条
      }
      let pam = {}
      for (let i in trans) {
        if (trans[i]) {
          pam[i] = trans[i]
        }
      }
      this.api.videoListApi(pam)
        .then((res) => {
          if (res.code === 200) {
            console.log(res)
            this.total = res.data.total
            this.tableData = res.data.list
            setTimeout(() => {
              this.loading = false
            }, 800)
          }
        })
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
      this.loading = true
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.loading = true
      this.currentPage = val
      this.getList()
    },
    handleEdit (row) {
      this.dialogFormVisible = true
      this.editForm.title = row.title
      console.log(row)
      this.videoCategory()
    },
    handleDelete (id) {
      this.loading = true
      this.api.videoRemoveApi(id)
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
    }
  }
}
</script>

<style scoped>

</style>
