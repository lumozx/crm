<template>

  
  <el-container>
<!--     <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>王小虎</span>
    </el-header> -->
    <el-main>
      <el-table :data="tableData.slice((currentPage-1)*thistotal,currentPage*thistotal)" @sort-change="sort_change">
        <el-table-column sortable="custom" prop="id" label="ID" width="140">
        </el-table-column>
        <el-table-column prop="date" label="日期" width="140">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
      </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
  background
  :page-size="thistotal"
  layout="prev, pager, next"
  :total="all">
</el-pagination>
    </el-main>
  </el-container>

</template>

<script>
export default {
  name: 'mainobject',
  data () {
    const item = {
      id:'1',
        date: '',
        name: '',
        address: ''
      };
    return {
      tableData: Array(1).fill(item),
     // tableData:'',
     thistotal:15,//每页条数
     currentPage:1,//默认起始页
     all:15//总条数
    }
  },
  mounted(){
     this.$http.post('/api/s_goods').then((r)=>{
       this.tableData = r.data.table.list;
        this.all=r.data.table.list.length
     })
  },
  methods:{
      handleCurrentChange(val) {
        this.currentPage  = val;

      },
      sort_change(column, prop, order){
        this.tableData = this.tableData.reverse()
    
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
