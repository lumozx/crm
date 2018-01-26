<template>

  
  <el-container>

    <el-main>



<el-form :inline="true"   class="demo-form-inline" >

  <el-form-item>
      <el-input v-model="tableDataName" placeholder="请输入要搜索的信息" style="width:240px"></el-input>
  </el-form-item>
  <el-form-item>
 <el-button type="primary" @click="doFilter">搜索</el-button>
  </el-form-item>
   <el-button type="warning" @click="add">新增</el-button>
  </el-form-item>
</el-form>

<!-- dialog -->
<el-dialog title="新增订单" :visible.sync="dialogFormVisible" center>
  <el-form ref="form" :model="form" label-width="80px" size='medium'  >
  <el-form-item label="姓名" style="width: 400px">
    <el-input v-model="form.name"></el-input>
  </el-form-item>

  <el-form-item label="货品名称">
    <el-select v-model="form.good" placeholder="请选择货品名称" @change="change_select">
      <el-option v-for="(s,index) in stock" :label="s.name" :value="s.id" :key="index"></el-option>
    <!-- v-for无论如何也要绑定key -->
    </el-select>
  </el-form-item>
    <el-form-item label="数量" style="width: 400px">
     <el-input-number v-model="num1"  :min="0" :max="max"  label="数量"></el-input-number>
  </el-form-item>
  <el-form-item label="日期">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
    </el-col>

  </el-form-item>

</el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="add_go">确 定</el-button>
  </div>
</el-dialog>

<!-- dialog -->
      <el-table :data="tableData.slice((currentPage-1)*thistotal,currentPage*thistotal)" @sort-change="sort_change">
        <el-table-column  sortable="custom" prop="id" label="ID" width="140">
        </el-table-column>
        <el-table-column sortable="custom" prop="date" label="日期" width="140">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
                    <el-table-column prop="num" label="数量">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
        <el-table-column label="操作">
      <template slot-scope="scope">
        <!-- scope早被弃用,slot-scope代替 -->
        <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
      </template>
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
      tableDataName:'',
      max:999,
      num1:0,//新增订单货物剩余数量
      dialogFormVisible: false,
        form: {
          name: '',//新增订单姓名
          good: '',//新增订单货物名称
          date1: '',
        },
      formLabelWidth: '120px',
      stock : []
    }
  },
  mounted(){
    this.token = sessionStorage.getItem('token');
    this.f_goods()//开始就获取订单数据
  },
  methods:{
    handleCurrentChange(val) {
      this.currentPage  = val;
    },
    f_goods(){
      this.$http.post('/api/s_goods').then((r)=>{
      this.tableData = r.data.table.list;
      this.beiDate = [...r.data.table.list];//完全复制，消除指针，用于复制
      this.all=r.data.table.list.length;
      this.beiall=r.data.table.list.length;//数据条数和数据都备份，用于查找之后进行还原
      })
    },
    //排序
    sort_change(column, prop, order){
      if(column.column){
          this.tableData = this.tableData.sort(this.compare(column.prop,column.order))//根据条件，进行排序
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
    //检索
    doFilter() {
      this.tableData = [...this.beiDate];//用备份数据还原列表,实现初始化
      if (this.tableDataName == "") {
        this.all = this.beiall;//如果搜索值为空，那么用备份页数还原页数
        return;
      }
      this.filterTableDataEnd=[];//搜索结果为空
      this.tableData.forEach((value, index) => {
        for(let p in value){
          if(value[p].toString().toUpperCase().indexOf(this.tableDataName.toUpperCase())>=0){//大小写转为字符串，进行模糊查询
            this.filterTableDataEnd.push(value);
            break;//防止多次检索同一条信息
          }
        }
      });
      this.tableData = [...this.filterTableDataEnd];
      this.all = this.filterTableDataEnd.length;//显示走索结果
    },
    //添加
    add(){
      this.dialogFormVisible = true;
      this.form.name ='';
      this.form.good = '';
      this.num1 = 0;
      this.max = 999;
      this.form.date1 = '';//清理上次数据
      this.$http.post('/api/stock',{token:this.token}).then((r)=>{
        this.stock = r.data.message.message;//绑定新数据
      })
    },
    change_select(v){
      this.stock.forEach((value, index) => {
        if(value['id']==v){
          this.num1 = value['num'];
          this.max = value['num'];//select变化的时候，数量与最大值都变
          return;
        }
      });
    },
    add_go(){ 
      if(this.form.name ==''||this.form.good == ''||this.form.date1 ==''){
        this.$message.error('请填写必要信息');
        return;
      }else{
        this.$message.success('添加成功');
      }
      this.dialogFormVisible = false;//隐藏弹框
      this.f_goods()//刷新数据
    },
    //删除数据
    handleDelete(id){
      this.$confirm('此操作将删除此数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(id)
        this.$message({
        type: 'success',
        message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
        type: 'info',
        message: '已取消删除'
        });          
      });
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.demo-form-inline{
  float: right;
}

</style>
