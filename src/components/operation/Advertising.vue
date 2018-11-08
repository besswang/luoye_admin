<template>
  <div id="Wd">
    <el-row>
      <el-col :span="21">
        <el-form ref="ruleForm" :inline="true">
          <el-form-item>
            <el-input v-model="ruleForm.title" placeholder="广告名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="ruleForm.type">
              <el-option v-for="(v,i) in types" :key="i" :value="v.value" :label="v.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.native="onSubmit">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="3" class="text-r">
        <el-button type="primary" @click="addAdverFn">添加</el-button>
      </el-col>
    </el-row>
    <el-table
    v-loading="loading"
    :data="item.list"
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
            @click="editAdverFn(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="advertRemoveFn(scope.$index, item.list, scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="text-r ptb15">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="ruleForm.currentPage"
        :page-sizes="[10, 20, 30]"
        :page-size="ruleForm.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="Number(item.total)">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { ADVER_TYPE_SELECT } from '../meta/meta.js'
export default {
  name: 'Wd',
  data () {
    return {
      av: 0, // 启用
      iav: 1, // 禁用
      loading: false,
      types: ADVER_TYPE_SELECT
    }
  },
  mounted () {
    this.advertList(this.ruleForm)
  },
  computed: {
    ...mapState({
      item: state => state.operation.adverList
    }),
    ...mapGetters({
      ruleForm: 'getSearchAdverForm',
      editForm: 'getEditAdver'
    })
  },
  methods: {
    ...mapActions(['advertDisable', 'advertList', 'editAdverFn', 'addAdverFn', 'advertRemove']),
    advertRemoveFn (index, rows, id) {
      let obj = {
        index: index,
        rows: rows,
        id: id
      }
      this.advertRemove(obj)
    },
    // 转时间格式
    timeFn (val) {
      if (val) {
        return this.$global.formatDate(new Date(val), 'YYYY-MM-DD HH:mm:ss')
      } else {
        return ''
      }
    },
    handleSizeChange (val) {
      this.ruleForm.pageSize = val
      this.advertList(this.ruleForm)
    },
    handleCurrentChange (val) {
      this.ruleForm.currentPage = val
      this.advertList(this.ruleForm)
    },
    onSubmit () {
      this.ruleForm.currentPage = 1
      this.advertList(this.ruleForm)
    }
  }
}
</script>

<style scoped>

</style>
