<template>
  <div id="classify">
    <el-tabs v-model="grade" @tab-click="handleClick">
      <el-tab-pane label="一级分类" name="1"></el-tab-pane>
      <el-tab-pane label="二级分类" name="2"></el-tab-pane>
    </el-tabs>
    <div class="text-r">
      <el-button type="primary" @click.native="addFn()">添加</el-button>
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
        label="Icon">
        <template slot-scope="scope">
          <div style="width:60px;height:60px;overflow:hidden;margin:0 auto;border-radius:50%;position:relative">
              <img class="classify-icon" :src="scope.row.iconUrl" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        property="name"
        label="分类">
      </el-table-column>
      <el-table-column
        v-if="showClassOne"
        align="center"
        property="parentName"
        label="父级分类">
      </el-table-column>
      <el-table-column
        align="center"
        label="是否推荐">
        <template slot-scope="scope">
          <el-switch
            @change="categorySpread(scope.row.id)"
            style="display: block"
            :active-value='spreadAv'
            :inactive-value='spreadIav'
            v-model="scope.row.spread"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="是"
            inactive-text="否">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="禁用状态">
        <template slot-scope="scope">
          <el-switch
            @change="categoryDisable(scope.row.id)"
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
    <!-- 弹窗 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form ref="dialogForm" :model="dialogForm" label-width="80px" :rules="ruleDialog">
        <el-form-item label="Icon">
          <el-upload
            :headers="myHeaders"
            class="avatar-uploader"
            action="/luoye_admin/category/icon"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="longUrl" :src="longUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="dialogForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="父级分类" v-show="showClassOne">
          <el-select v-model="dialogForm.parentId" placeholder="请选择父级分类">
            <el-option v-for="(v,i) in getParentCategory" :key="i" :value="v.id" :label="v.label"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="cancel">取 消</el-button>
        <el-button type="primary" @click="addClassify('dialogForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Classify',
  data () {
    var token = window.sessionStorage.getItem('token')
    return {
      categoryId: '',
      title: '',
      myHeaders: {token: token},
      longUrl: '',
      spreadAv: 1,
      spreadIav: 0,
      av: 0, // 启用
      iav: 1, // 禁用
      dialogFormVisible: false, // 弹窗
      showClassOne: false, // 是否显示父级分类
      dialogForm: {
        iconUrl: '',
        name: '', // 分类名称
        parentId: ''
      },
      ruleDialog: {
        name: [
          {required: true, message: '请输入分类名称', trigger: 'blur'}
        ]
      },
      currentPage: 1,
      total: 0,
      pageSize: 10,
      grade: '1', // 1:一级分类；2:二级分类
      loading: true,
      tableData: []
    }
  },
  computed: {
    ...mapGetters(['getParentCategory'])
  },
  mounted () {
    this.getList()
  },
  methods: {
    ...mapActions(['categoryDisable', 'categorySpread', 'parentCategory']),
    cancel () {
      this.dialogFormVisible = false
      this.loading = false
    },
    // 列表
    getList () {
      let trans = {
        currentPage: this.currentPage, // 当前页
        pageSize: this.pageSize, // 一页有多少条
        grade: this.grade
      }
      let pam = {}
      for (let i in trans) {
        if (trans[i]) {
          pam[i] = trans[i]
        }
      }
      this.api.categoryListApi(pam)
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
    handleAvatarSuccess (res, file) {
      // this.dialogForm.iconUrl = URL.createObjectURL(file.raw)
      console.log(res)
      this.dialogForm.iconUrl = res.data.iconUrl
      this.longUrl = res.data.viewUrl
    },
    beforeAvatarUpload (file) {
      const isLt2M = parseInt(file.size) / 1024 / 1024 < 5
      var reg = /image\/\w+/
      if (!reg.test(file.type)) {
        this.$message({
          message: '图片格式只能是gif,jep,jpeg,png',
          type: 'warning'
        })
        return false
      }
      if (!isLt2M) {
        this.$message({
          message: '上传头像图片大小不能超过 5M!',
          type: 'warning'
        })
        return false
      }
    },
    // tab切换
    handleClick (tab, event) {
      this.loading = true
      if (this.grade === '2') {
        // 二级分类下
        this.showClassOne = true
      } else {
        this.showClassOne = false
      }
      this.getList()
    },
    // 编辑
    editFn (item) {
      this.title = '编辑分类'
      this.dialogForm.name = item.name
      this.longUrl = item.iconUrl
      // this.dialogForm.iconUrl = item.iconUrl
      this.dialogFormVisible = true
      this.categoryId = item.id
      if (this.grade === '2') {
        this.showClassOne = false
      }
    },
    // 添加分类
    addFn () {
      // let id = ' '
      // this.$router.push(`/operation/banadd/${id}`)
      // 表单重置
      this.title = '添加分类'
      this.dialogForm.iconUrl = ''
      this.longUrl = ''
      this.dialogForm.parentId = ''
      this.dialogForm.name = ''
      this.dialogFormVisible = true
      console.log(this.grade)
      this.categoryId = ''
      if (this.grade === '2') {
        this.parentCategory(this.grade)
        this.showClassOne = true
      }
    },
    // 添加-保存
    addClassify (formName) {
      console.log(this.categoryId)
      this.loading = true
      if (this.categoryId) { // 编辑
        let trans = {
          categoryId: this.categoryId,
          iconUrl: this.dialogForm.iconUrl,
          name: this.dialogForm.name
        }
        let pam = {}
        for (let i in trans) {
          if (trans[i]) {
            pam[i] = trans[i]
          }
        }
        this.api.categoryEditApi(pam)
          .then((res) => {
            if (res.code === 200) {
              this.dialogFormVisible = false
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              setTimeout(() => {
                this.getList()
              }, 800)
            }
          })
      } else { // 新增
        let addtrans = Object.assign(this.dialogForm, {grade: this.grade})
        let addpam = {}
        for (let i in addtrans) {
          if (addtrans[i]) {
            addpam[i] = addtrans[i]
          }
        }
        this.api.categoryAddApi(addpam)
          .then((res) => {
            if (res.code === 200) {
              this.dialogFormVisible = false
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              setTimeout(() => {
                this.getList()
              }, 800)
            }
          })
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
    handleDelete (index, row) {
      console.log(index, row)
    }
  }
}
</script>

<style scoped>
  .classify-icon{
    display:block;
    height:100%;
    margin:0 auto;
    position: absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    text-align: center;
  }
    .avatar-uploader >>> .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }
</style>
