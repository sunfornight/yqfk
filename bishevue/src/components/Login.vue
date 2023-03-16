<template>
  <div class="login_container">
      <!-- 登录块 -->
      <div class="login_box">
          <!-- 头像 -->
          <div class="avatar_box">
              <img src="../assets/login.png" alt>
          </div>
          <!-- 表单区域 -->
          <el-form ref="loginFormRef" :rules="loginRules" :model="loginForm" label-width="0">
              <!-- 用户名 -->
              <el-form-item prop="username">
                  <el-input v-model="loginForm.username" prefix-icon="iconfont icon-yonghuming"></el-input>
              </el-form-item>
              <!-- 密码 -->
              <el-form-item prop="password">
                  <el-input v-model="loginForm.password" prefix-icon="iconfont icon-shurumima" type="password"></el-input>
              </el-form-item>              
              <!-- 按钮 -->
              <el-form-item class="btns">
                  <el-button type="success" round @click="resetForm">重置</el-button>
                  <el-button type="primary" round @click="login">登录</el-button>
              </el-form-item>             
          </el-form>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            loginForm:{
                username:"admin",
                password:"123456"
            },
            // 表单验证
            loginRules: {
                // 校验用户名
                username: [
                    { required: true, message: '用户名为必填项', trigger: 'blur' },//必填验证
                    { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }//长度验证
                ],
                // 校验密码
                password: [
                    { required: true, message: '用户密码为必填项', trigger: 'blur' },
                    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
                ],
            }
        }
    },
    methods:{
        //重置事件
        resetForm(){
            // console.log(this.$refs);
            this.$refs.loginFormRef.resetFields();
        },
        //登录事件
        login(){
            this.$refs.loginFormRef.validate(async valid =>{
                if(!valid)
                    reutrn;
                //跳转到9000/test访问后台
                const {data:res} = await this.$http.post("login",this.loginForm);
                if(res.flag == "ok"){
                    this.$message.success("登入成功！");
                    window.sessionStorage.setItem("user",JSON.stringify(res.user) );//存储user对象
                    this.$router.push({path:'/home'});
                    
                }else{
                    this.$message.success("登入失败！");
                }
            });
        }
    }
}
</script>

<style scoped>
/* 根节点样式 */
    .login_container{
        /* background-color:#2b4b6b; */
        background: #0f0c29;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #24243e, #302b63, #0f0c29);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #24243e, #302b63, #0f0c29); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        height: 100%;
    }
    .login_box{
        width: 450px;
        height: 300px;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
    .avatar_box{
        width: 130px;
        height: 130px;
        border: 1 solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px rgb(82, 92, 148);
        position: absolute;
        left: 50%;
        transform: translate(-50%,-120%);
        background-color: rgb(34, 27, 77);
    }
    .avatar_box img{
        width: 100%;
        height:100%;
        border-radius:50%;
        background-color:rgb(12, 21, 34);
    }
    .btns{
        display: flex;
        justify-content: flex-end;
    }
    .login_form{
        position:absolute;
        bottom: 0%;
        width: 100%;
        padding: 0 10px;
        box-sizing: border-box;
    }
</style>