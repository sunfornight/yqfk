<template>
  <div>
    <!-- 导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item class="activepage">用户列表</el-breadcrumb-item>
        <el-breadcrumb-item >小程序轮播图</el-breadcrumb-item>
        <el-breadcrumb-item >主页推送</el-breadcrumb-item>
        <el-breadcrumb-item >防护商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 用户列表主体部分 -->
    <el-card>
        <el-row :gutter="30">
            <el-col :span="10">
                <!-- 搜索栏 -->
                <el-input placeholder="请输入搜索内容" v-model="queryInfo.query" clearable @clear="getUserList">
                    <el-button slot="append" icon="iconfont icon-sousuo" @click="getUserList"></el-button>
                </el-input>
                <!-- 按钮 -->
            </el-col>
                <el-col :span="4">
                <el-button type="primary"  @click="addDialogVisible = true">添加用户</el-button>   
            </el-col>       
        </el-row>

        <!-- 用户列表 -->
        <el-table :data="userList" border stripe>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="用户名" prop="username" align="center"></el-table-column>
            <el-table-column label="邮箱" prop="email" align="center"></el-table-column>
            <el-table-column label="密码" prop="password" align="center"></el-table-column>
            <el-table-column label="角色" prop="role" width="120" align="center"></el-table-column>
            <el-table-column label="登录次数" prop="visits" width="90" align="center"></el-table-column>
            <el-table-column label="状态" prop="state" width="90" align="center">
                <!--作用域插槽 scope.row 存储了当前行的信息 -->
                <template slot-scope="scope"><!--数据模板-->
                    <el-switch v-model="scope.row.state" @change="userStateChanged(scope.row)"></el-switch>
                </template>                 
            </el-table-column>
            <el-table-column label="图片信息" prop="picbase64" width="360" align="center">
                <template slot-scope="scope">
                  <img :src=scope.row.touxiang min-width="70" height="70">
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <!-- 修改 -->
                    <el-tooltip effect="dark" content="编辑" placement="top-start" :enterable="false">
                        <el-button type="primary"  icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
                    </el-tooltip>
                    <!-- 删除 -->
                    <el-tooltip effect="dark" content="删除" placement="top-start" :enterable="false">
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(scope.row.id)"></el-button>
                    </el-tooltip>
                    <!-- 权限 -->
                    <el-tooltip effect="dark" content="权限设置" placement="top-start" :enterable="false">
                        <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页组件 size-change:每页最大变化数 current-page:当前最大变化数 layout功能组件-->
        <div>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pageNum"
                :page-sizes="[1, 2, 5, 100]"
                :page-size="queryInfo.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </el-card>

    <!-- 新增用户区域 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="addForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="addForm.password"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="addForm.email"></el-input>
            </el-form-item>
            <el-form-item  label="图片" prop="touxiang">
                <template>
                        <img :src="addForm.touxiang" />
                        <el-form-item>
                        <el-upload
                            class="upload-demo"
                            ref="upload"
                            action=""
                            :http-request="upload"
                            multiple=""
                            :auto-upload="false"
                        >
                            <el-button slot="trigger" size="small" type="primary"
                            >选取图片</el-button
                            >
                            <el-button
                            style="margin-left: 10px"
                            size="small"
                            type="success"
                            @click="submitUpload"
                            >确认提交</el-button
                            >
                            <div slot="tip" class="el-upload__tip">
                            选择完图片记得确认提交哦！
                            </div>
                        </el-upload>
                        </el-form-item>
                </template>
            </el-form-item>
        </el-form>
        <!-- 内容底部区域 -->
        <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="addUser">确定</el-button>
        </span>
    </el-dialog>
    <!-- 修改对话框 -->
    <el-dialog title="修改用户信息" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
        <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="editForm.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="editForm.password"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="editForm.email"></el-input>
            </el-form-item>
        </el-form>
        <!-- 内容底部区域 -->
        <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="editUserInfo">确定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
    created(){
        this.getUserList();
    },
    data(){
        return{
            //查询信息实体
            queryInfo:{
                query:"",
                pageNum:1,//当前页
                pageSize:5//每页最大数
            },
            userList:[],
            total:0,//总记录数
            addDialogVisible: false,//对话框状态
            // 添加表单信息
            addForm:{
                username:'',
                password:'',
                email:'',
                touxiang:'',
            },
            //修改用户信息
            editForm:{
                
            },
            //显示/因此修改用户栏
            editDialogVisible:false,
            // 添加表单验证
             addFormRules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'change' },
                    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur'}
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'change' },
                    { min: 5, max: 30, message: '请输入正确邮箱格式', trigger: 'blur'}
                ],
             },
            // 修改表单验证
            editFormRules:{
                password: [
                    { required: true, message: '请输入密码', trigger: 'change' },
                    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur'}
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'change' },
                    { min: 5, max: 15, message: '请输入正确邮箱格式', trigger: 'blur'}
                ],
            }
        }
    },
    methods:{
        async getUserList(){
            const {data:res} = await this.$http.get("alluser",{params:this.queryInfo});
            this.userList = res.users;
            this.total = res.userCounts;
        },
        // 最大数
        handleSizeChange(newSize){
            this.queryInfo.pageSize = newSize;
            this.getUserList();
        },
        // pageNum触发动作
        handleCurrentChange(newPage){
            this.queryInfo.pageNum = newPage; 
            this.getUserList();   
        },
        async userStateChanged(userInfo){
            const {data:res} = await this.$http.put(`userstate?id=${userInfo.id}&state=${userInfo.state}`);
            if (res!="success"){
                userInfo.id = !userInfo.id;
                return this.$message.error("操作失败！！！");
            }
            this.$message.success("操作成功!!!");
        },
        addDialogClosed(){
            this.$refs.addFormRef.resetFields();
        },
        addUser(){
            this.$refs.addFormRef.validate(async valid=>{
                if(!valid)return;
                const {data:res} = await this.$http.post("adduser",this.addForm);
                if(res!="success"){
                    return this.$message.error("操作失败！！！");
                }
                this.$message.success("操作成功!!!");
                this.addDialogVisible = false;
                this.getUserList();
            });
        },
        async deleteUser(id){
            const confirmResult = await this.$confirm("是否确定删除该用户信息","提示",{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }).catch(err => err)
            if(confirmResult!='confirm'){
                return this.$message.info("已撤销删除");
            }
            const {data:res} = await this.$http.delete("deleteuser?id="+id);
            if(res != "success"){
                return this.$message.error("删除失败！");
            }
            this.$message.success("删除成功！");
            this.getUserList();
        },
        //显示对话框
        async showEditDialog(id){
            const {data:res} = await this.$http.get("getupdate?id="+id);
            this.editForm = res;
            this.editDialogVisible = true;
        },
        // 关闭窗口
        editDialogClosed(){
            this.$refs.editFormRef.resetFields();
        },
        // 确认修改
        editUserInfo(){
            this.$refs.editFormRef.validate(async valid =>{
                if(!valid) return;
                const {data:res} = await this.$http.put("edituser",this.editForm);
                if(res!="success")return this.$message.error("操作失败！");
                this.$message.success("操作成功！");
                this.editDialogVisible = false;
                this.getUserList();
            })
        },
        //添加头像
            submitUpload() {
            this.$refs.upload.submit();
            },
            //通过onchanne触发方法获得文件列表
            handleChange(file, fileList) {
            this.fileList = fileList;
            },
            handlePreview(file) {
            },
            async upload(file) {
                let fd = new FormData();
                //文件信息中raw才是真的文件
                fd.append("files", file.file);
                await this.$http.post(`/uploadUi`, fd).then((res) => {
                this.addForm.touxiang = res.data;
                alert("图片选取成功");
                });
            },
    }
}
</script>

<style scoped>

</style>
