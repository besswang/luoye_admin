<template>
  <div id="classify">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="一级分类" name="0"></el-tab-pane>
      <el-tab-pane label="二级分类" name="1"></el-tab-pane>
    </el-tabs>
    <div class="text-r">
      <el-button type="primary" @click.native="addFn">添加</el-button>
    </div>
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
        label="Icon">
        <template slot-scope="scope">
          <div style="width:60px;height:60px;overflow:hidden;margin:0 auto;border-radius:50%;position:relative">
              <img class="classify-icon" :src="scope.row.img" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        property="classOne"
        label="分类">
      </el-table-column>
      <el-table-column
        v-if="showClassOne"
        align="center"
        property="classTwo"
        label="父级分类">
      </el-table-column>
      <el-table-column
        align="center"
        label="是否启用">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.using"></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="是否推荐">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.using"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="editFn(scope.row.id)">编辑</el-button>
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
    <!-- 弹窗 -->
    <el-dialog title="编辑分类" :visible.sync="dialogFormVisible">
      <el-form :model="dialogForm" label-width="80px">
        <el-form-item label="Icon">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="dialogForm.imageUrl" :src="dialogForm.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="分类名称">
          <el-input v-model="dialogForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="父级分类" v-show="showClassOne">
          <el-select v-model="dialogForm.state" placeholder="请选择父级分类">
            <el-option v-for="(v,i) in types" :key="i" :value="v"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="dialogForm.using"></el-switch>
        </el-form-item>
        <el-form-item label="是否推荐">
          <el-switch v-model="dialogForm.using"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Classify',
  data () {
    return {
      types: ['娱乐', '社会'],
      dialogFormVisible: false, // 弹窗
      showClassOne: false, // 是否显示父级分类
      activeName: 0,
      dialogForm: {
        imageUrl: '',
        name: '', // 分类名称
        state: '', // 父级分类
        using: true // 是否启用
      },
      currentPage4: 4,
      tableData: [{
        id: 1,
        classOne: '娱乐',
        classTwo: '影视',
        using: true,
        date: '2016-05-02',
        startEnd: '2016-05-02 15:22 - 2016-05-02 15:66',
        name: '王小虎',
        img: 'http://img3.imgtn.bdimg.com/it/u=108228188,2741176027&fm=26&gp=0.jpg',
        title: '上海市普陀区金沙江路 1518 弄',
        bonum: '10',
        shounum: '11'
      }, {
        id: 2,
        classOne: '社会',
        classTwo: '生活',
        using: false,
        date: '2016-05-04',
        startEnd: '2016-05-02 15:22 - 2016-05-02 15:66',
        name: '王小虎',
        img: 'http://img1.3lian.com/2015/a1/63/d/121.jpg',
        title: '上海市普陀区金沙江路 1517 弄',
        bonum: '20',
        shounum: '22'
      }]
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // tab切换
    handleClick (tab, event) {
      console.log(tab, event)
      console.log(this.activeName)
      if (this.activeName === '1') {
        // 二级分类下
        this.showClassOne = true
      } else {
        this.showClassOne = false
      }
    },
    // 编辑
    editFn (id) {
      // this.$router.push({
      //   path: `/operation/banadd/${id}`
      // })
      this.dialogFormVisible = true
    },
    // 添加分类
    addFn () {
      // let id = ' '
      // this.$router.push(`/operation/banadd/${id}`)
      this.dialogFormVisible = true
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
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
