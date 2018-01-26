<template>
  <div class="hello">
    <div id="logo"><img src="../assets/logo.png"></div>
<div style="margin: 20px;"></div>
<el-form   label-width="80px" :model="formLabelAlign">
  <el-form-item label="用户名">
    <el-input v-model="formLabelAlign.username"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="formLabelAlign.password" type="password"></el-input>
  </el-form-item>
  <el-form-item label="验证码">
    <el-input  placeholder="请输入验证码" v-model="formLabelAlign.type" style="width:61%"></el-input>     <div class="code"  id="checkCode" @click="createCode" ></div>
  </el-form-item>
       <el-button   @click="validateCode" id="my_button" type="primary" style="width: 420px;margin-left: 75px">登录</el-button>

</el-form>



  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      formLabelAlign: {
        username: '',
        password: '',
        type: ''
      },
    }
  },
  mounted(){
    if(sessionStorage.getItem("token")){
      this.$router.push({ name: 's_goods'})
    }
    this.createCode()
  },
  methods:{
    createCode() {
      this.code = "";
      var codeLength = 6; //验证码的长度
      var checkCode = document.getElementById("checkCode");
      var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 
      'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //所有候选组成验证码的字符，当然也可以用中文的
      for (var i = 0; i < codeLength; i++){
        var charNum = Math.floor(Math.random() * 52);
        this.code += codeChars[charNum];
      }
      if (checkCode) 
      {
        checkCode.className = "code";
        checkCode.innerHTML = this.code;
      }
    },
    validateCode(){
     if (this.formLabelAlign.type.length <= 0){
        this.$alert("请输入验证码！",{
        confirmButtonText: '确定',
        });
     }
     else if (this.formLabelAlign.type.toUpperCase() != this.code.toUpperCase()){
        this.$alert("验证码输入有误！",{
        confirmButtonText: '确定',
        });
        this.createCode();
     }
     else if(this.formLabelAlign.username==''||this.formLabelAlign.password==''){
        this.$alert("用户名或密码不能为空！",{
        confirmButtonText: '确定',
        });
     }else{
        this.$http.post('/api/login',{username:this.formLabelAlign.username,password:this.formLabelAlign.password}).then((r)=> {
        if(!r.data){
          this.$alert("账号密码错误！",{
          confirmButtonText: '确定',
        });
        }else{
          sessionStorage.setItem("token", r.data.token); 
          this.$router.push({ name: 's_goods'})
          }
        });
      }        
    }    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello{
  width: 500px;
  margin: 0 auto;

}
.code{
  font-family:Arial;
  ont-style:italic;
  color:blue;
  font-size:30px;
  border:0;
  padding:2px 3px;
  letter-spacing:3px;
  font-weight:bolder;                        
  cursor:pointer;
  width:150px;
  line-height:40px;
  text-align:center;
  display: inline-block;
  height: 40px;
  vertical-align: top
}
a{
  text-decoration:none;
  font-size:12px;
  color:#288bc4;
}
a:hover{
  text-decoration:underline;
}
#logo{
  text-align: center
}
</style>
