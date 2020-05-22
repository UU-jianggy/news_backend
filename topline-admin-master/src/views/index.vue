<!--  -->
<template>
  <div>
  <el-table
      id="table"
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize).filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">
      <el-table-column
        label="Type"
        prop="type">
      </el-table-column>
      <el-table-column
        label="Title"
        prop="title"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="Time"
        sortable
        prop="time">
      </el-table-column>
      <el-table-column
        align="right">
        <template slot="header">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="6"
      layout="total, prev, pager, next"
      :total="this.tableData.length">
    </el-pagination>
  </div>
</template>

<script>
import { getList, getCode, deleteId } from '@/api/api'

export default {
  data () {
    return {
      scope: '',
      tableData: [],
      search: '',
      pagesize: 6,
      currentPage: 1
    }
  },
  // 根据leftNav传来的值，判断展示哪个接口的数据；
  beforeCreate () {
    this.bus.$on('openAll', async msg => {
      const { data } = await getCode(msg)
      console.log(data)
      this.tableData = data
    })
    this.bus.$on('getList', msg => {
      this.tableData = msg
      console.log(msg)
    })
  },
  created () {
    this.getData()
  },
  methods: {
    async getData (dataType) {
      const { data } = await getList()
      this.tableData = data
      console.log(this.tableData)
    },
    handleDelete (index, row) {
      console.log(index, row)
      let id = row.id
      let deleteIndex = index
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteId(id)
        this.tableData.splice(deleteIndex, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    open () {
      this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', 'HTML 片段', {
        dangerouslyUseHTMLString: true
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.currentPage = val
    }
  }
}

</script>
<style lang='less' scoped>
</style>
