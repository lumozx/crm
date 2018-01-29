<template>

  
  <el-container>

        <el-main>
    <div>
  <el-button type="primary" @click="bf">备份数据库</el-button>

</div>
<div></div>
    <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column  sortable prop="id" label="ID" width="140">
        </el-table-column>
        <el-table-column sortable prop="date" label="日期" width="140">
        </el-table-column>
        <el-table-column prop="name" label="文件名" width="120">
        </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="warning"
          @click="handleEdit(scope.$index, scope.row)">还原</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog title="操作中。。" :visible.sync="dialogTableVisible">
<el-progress :text-inside="true" :stroke-width="18" :percentage="num" :status="status"></el-progress>
</el-dialog>
</el-main>
  </el-container>

</template>

<script>
export default {
  name: 'bei',
  data() {
    return {
      tableData: [{
        date: '',
        name: '',
        address: ''
      },],
      dialogTableVisible: false,
      formLabelWidth: '120px',
      num:1,
      status:''
    }
  },
  mounted(){
    this.token = sessionStorage.getItem('token');
    this.find_bei();
  },
  methods:{
    find_bei(){
      this.$http.post('/api/bei',{token:this.token}).then((r)=>{
        this.tableData = r.data.message.message;
      })
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    bf(){
      this.dialogTableVisible = true;
      var s = null;
      clearInterval(s);
      var s =setInterval(()=>{
        this.num = this.num+1;
        if(this.num>=99){
          clearInterval(s);
        }
      },100)
      this.$http.post('/api/go',{token:this.token}).then((r)=>{
        if(r.data.message ==true){
          clearInterval(s);
          this.num =100;
          this.status="success";
          //备份成功暂停计时器，跳100%，关闭进度条，状态为成功
          this.$alert("备份成功",{
            confirmButtonText: '确定',
            callback:action =>{
              this.dialogTableVisible = false;
              this.find_bei();
            }
          })
         
        }else{
          clearInterval(s);
          this.status="exception";
          this.$alert("备份失败",{
            confirmButtonText: '确定',
            callback:action =>{
              this.dialogTableVisible = false;
              this.find_bei();
            }
          })
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


</style>
