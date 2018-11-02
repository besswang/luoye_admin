<template>
  <div id="WdIssue">
    <div class="ptb15 mb15">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/operation/wd' }">观看和下载</el-breadcrumb-item>
          <el-breadcrumb-item>手工发放次数</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <el-form ref="form" :model="BanForm" label-width="80px" style="width:50%;">
      <!-- <el-form-item label="发放名目">
        <el-input v-model="BanForm.name" autocomplete="off" placeholder="手工发放名目"></el-input>
      </el-form-item> -->
      <el-form-item label="发放类型">
        <el-radio-group v-model="BanForm.grantType">
          <el-radio :label=1>所有会员</el-radio>
          <el-radio :label=2>指定会员</el-radio>
        </el-radio-group>
      </el-form-item>
      <transition name="fade">
        <div v-show="BanForm.grantType == 2">
          <el-form-item label=" ">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入会员编号"
              v-model="BanForm.toUsers">
            </el-input>
            <i style="font-size: 13px;color: #999;">请用空格或逗号隔开</i>
          </el-form-item>
        </div>
        <!-- <div v-show="BanForm.grantType == 2">
          <el-form-item label="搜索会员">
            <el-autocomplete
              class="inline-input"
              v-model="searchText"
              :fetch-suggestions="querySearch"
              placeholder="请输入会员账号"
              @select="handleSelect"
            ></el-autocomplete>
            <el-button size="mini" type="primary">添加</el-button>
          </el-form-item>
          <el-form-item label=" ">
            <ul class="flex flex-a-c m-ul">
              <li>2233<i class="el-icon-close"></i></li>
              <li>付款<i class="el-icon-close"></i></li>
              <li>222115533<i class="el-icon-close"></i></li>
              <li>付款<i class="el-icon-close"></i></li>
            </ul>
          </el-form-item>
        </div> -->
      </transition>
      <el-form-item label="奖励类型">
        <el-select v-model="BanForm.rewardType">
          <el-option v-for="(v,i) in types" :key="i" :value="v.value" :label="v.label"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="发放时间">
        <el-date-picker
          v-model="BanForm.time"
          type="datetime">
        </el-date-picker>
      </el-form-item> -->
      <el-form-item label="奖励次数">
        <el-input v-model="BanForm.num" autocomplete="off">
          <template slot="append">次</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native="harvestGrant">保存</el-button>
        <el-button @click.native="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'WdIssue',
  data () {
    return {
      restaurants: [
        {'value': '三全鲜食（北新泾店)'},
        {'value': 'Hot honey 首尔炸鸡（仙霞路)'},
        {'value': '新旺角茶餐厅'}],
      searchText: '',
      breadcrumbText: '', // 当前面包屑的文本('编辑'，'增加')
      types: [
        {value: 1, label: '观看'},
        {value: 2, label: '下载'}
      ],
      BanForm: {
        grantType: 1, // 发放类型
        toUsers: '', // 指定成员编号
        rewardType: 1, // 观看/下载
        num: '' // 奖励次数
        // name: '',
        // imageUrl: '' // 头像
        // time: '',
      }
    }
  },
  mounted () {
    let id = this.$route.params.id
    if (id !== ' ') {
      this.breadcrumbText = '编辑'
    } else {
      this.breadcrumbText = '增加'
    }
  },
  methods: {
    cancel () {
      this.$router.go(-1)
    },
    harvestGrant () {
      let pam = {}
      for (let i in this.BanForm) {
        if (this.BanForm[i]) {
          pam[i] = this.BanForm[i]
        }
      }
      this.api.harvestGrantApi(pam)
        .then((res) => {
          if (res.code === 200) {
            this.$router.push('/operation/wd')
          }
        })
    },
    handleSelect (item) {
      console.log(item)
    },
    querySearch (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    // 所属平台
    radioFn (val) {
      console.log(val)
    },
    selectChange (val) {
      console.log(val)
      switch (val) {
        case '角色一':
          this.addForm.userType = 0
          break
        case '角色二':
          this.addForm.userType = 1
          break
      }
    },
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
    }
  }
}
</script>

<style scoped>
  .m-ul>li{
    padding:0 10px;
    border-radius: 3px;
    border: 1px solid #dcdfe6;
    margin-right:5px;
    margin-bottom:5px;
  }
  .m-ul>li>i{
    padding-left:5px;
  }
  .avatar-uploader >>> .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
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
    width: 375px;
    height: 175px;
    line-height: 175px;
    text-align: center;
  }
  .avatar {
    width: 375px;
    height: 175px;
    display: block;
  }
</style>
