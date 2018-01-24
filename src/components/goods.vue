<template>

  
  <el-container>
    <el-main>



<el-form :inline="true"   class="demo-form-inline">

  <el-form-item>
      <el-input v-model="tableDataName" placeholder="请输入要搜索的信息" style="width:240px"></el-input>
  </el-form-item>
  <el-form-item>
 <el-button type="primary" @click="doFilter">搜索</el-button>
  </el-form-item>
</el-form>


      <el-table :data="tableData.slice((currentPage-1)*thistotal,currentPage*thistotal)" @sort-change="sort_change">
        <el-table-column sortable="custom" prop="id" label="ID" width="140">
        </el-table-column>
        <el-table-column sortable="custom" prop="date" label="日期" width="140">
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
        address: '',


      };
    return {
      tableData: Array(1).fill(item),
     // tableData:'',
     thistotal:15,//每页条数
     currentPage:1,//默认起始页
     all:15,//总条数
     tableDataName:''
    }
  },
  mounted(){
     this.$http.post('/api/s_goods').then((r)=>{
       this.tableData = r.data.table.list;
       this.beiDate = [...r.data.table.list];//完全复制，消除指针，用于复制
        this.all=r.data.table.list.length;
        this.beiall=r.data.table.list.length;
     })
  },
  methods:{
      handleCurrentChange(val) {
        this.currentPage  = val;

      },
      sort_change(column, prop, order){
        if(column.column){
          this.tableData = this.tableData.sort(this.compare(column.prop,column.order))
        }else{
          this.tableData = this.tableData.sort(this.compare('id','ascending'))//默认id升序

        }
      },
      compare(property,order){
        if(property=='id'){
         return function(obj1,obj2){
            var value1 = obj1[property];
            var value2 = obj2[property];
            if(order=='ascending'){
            return value1 - value2;     // 升序
          }else if(order=='descending'){
            return value2 - value1;     //倒序
          }
         }
        }else if(property == 'date'){
          return function(obj1,obj2){
            var value1 = Date.parse(obj1[property]);
            var value2 = Date.parse(obj2[property]);
            if(order=='ascending'){
            return value1 - value2;     // 升序
          }else if(order=='descending'){
            return value2 - value1;     //倒序
          }
         }
        }
    },
    doFilter() {
  if (this.tableDataName == "") {
   this.tableData = [...this.beiDate];//完全复制，消除指针
   this.all = this.beiall;
  return;
  }
  this.tableData = [...this.beiDate];//变换搜索条件的时候，要更新数据
  this.filterTableDataEnd=[];
  this.tableData.forEach((value, index) => {
    for(let p in value){
   if(value[p].toString().toUpperCase().indexOf(this.tableDataName.toUpperCase())>=0){//大小写模糊查询
   this.filterTableDataEnd.push(value);
   break;//防止多次检索同一条
   }
    }
  });
this.tableData = [...this.filterTableDataEnd];
this.all = this.filterTableDataEnd.length;
 },
  },
 

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.demo-form-inline{
  float: right;
}
</style>
