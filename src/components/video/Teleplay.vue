<template>
  <div id="Vlist">
    <el-form ref="form" :inline="true">
      <el-form-item>
        <el-input v-model="name" placeholder="按照剧集名称搜索"></el-input>
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
        label="集数">
      </el-table-column>
      <el-table-column
        align="center"
        property="collectTimes"
        label="更新至">
      </el-table-column>
      <el-table-column label="操作" align="center" width="240">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row)">管理</el-button>
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
                <el-button type="primary" @click="saveTitle()">确 定</el-button>
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
      name: '',
      videoId: '',
      spreadAv: 1,
      spreadIav: 0,
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
      tableData: []
      // tableData: [{
      //   date: '2016-05-02',
      //   name: '王小虎',
      //   img: 'http://img3.imgtn.bdimg.com/it/u=108228188,2741176027&fm=26&gp=0.jpg',
      //   classify: '动漫',
      //   title: '上海市普陀区金沙江路 1518 弄',
      //   bonum: '10',
      //   shounum: '11'
      // }]
    }
  },
  computed: {
    ...mapGetters(['getCategory'])
  },
  mounted () {
    this.getList()
  },
  methods: {
    ...mapActions(['videoDisable', 'videoCategory', 'videoSpread']),
    searchFn () {
      this.loading = true
      this.currentPage = 1
      this.getList()
    },
    // 编辑保存
    saveTitle () {
      this.loading = true
      let trans = {
        title: this.editForm.title,
        categoryId: Number(this.editForm.categoryId),
        videoId: this.videoId
      }
      let pam = {}
      for (let i in trans) {
        if (trans[i]) {
          pam[i] = trans[i]
        }
      }
      this.api.videoEditApi(pam)
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
            this.total = res.data.total
            this.tableData = res.data.list
            setTimeout(() => {
              this.loading = false
            }, 800)
          }
        })
    },
    selectChange (val) {
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
      this.editForm.categoryId = row.name
      this.videoId = row.id
      this.videoCategory(row)
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
