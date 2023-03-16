<template>
  <div>
    <!-- 导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item >用户列表</el-breadcrumb-item>
        <el-breadcrumb-item >小程序轮播图</el-breadcrumb-item>
        <el-breadcrumb-item class="activepage">主页推送</el-breadcrumb-item>
        <el-breadcrumb-item >防护商品</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 该页推送插图 -->
    <template>
    <el-carousel indicator-position="outside">
        <el-carousel-item v-for="(item,index) in tuisongList" :key="index">
            <img :src="item.picbase64">
        </el-carousel-item>
    </el-carousel>
    </template>

    <!-- 推送列表主体部分 -->
    <el-card>
        <el-row :gutter="30">
            <el-col :span="10">
                <!-- 搜索栏 -->
                <el-input placeholder="请根据作者姓名搜索相关文章" v-model="queryInfo.query" clearable @clear="getTuisongList">
                    <el-button slot="append" icon="iconfont icon-sousuo" @click="getTuisongList"></el-button>
                </el-input>
                <!-- 按钮 -->
            </el-col>
                <el-col :span="4">
                <el-button type="primary"  @click="addDialogVisible = true">新增推送文章</el-button>   
            </el-col>       
        </el-row>

        <!-- 推送列表 -->
        <el-table  :data="tuisongList" border stripe>
            <el-table-column type="index"   width="60" align="center"></el-table-column>            
              <el-table-column label="展示状态" prop="state" width="120" align="center">
                <!--作用域插槽 scope.row 存储了当前行的信息 -->
                <template slot-scope="scope"><!--数据模板-->
                    <el-switch v-model="scope.row.state" @change="tuisongStateChanged(scope.row)"></el-switch>
                </template>                 
            </el-table-column>
            <el-table-column label="标题名称" prop="tuisongtitle"  width="210"  align="center"></el-table-column>
            <el-table-column label="简介" prop="tuisongintroduction" width="180" align="center" show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="文章内容" prop="tuisongarticle" width="180" align="center" show-overflow-tooltip="true" style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;"></el-table-column>
            <el-table-column label="作者姓名" prop="tuisongauthor" width="150" align="center"></el-table-column>
            <el-table-column label="日期" prop="tuisongdate" width="150" align="center"></el-table-column>
            <el-table-column label="图片信息" prop="picbase64" width="240" align="center">
                <template slot-scope="scope">
                  <img :src=scope.row.picbase64 min-width="200" height="200">
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
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTuisong(scope.row.id)"></el-button>
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

        <!-- 新增推送区域 -->
    <el-dialog title="添加推送文章" :visible.sync="addDialogVisible" width="60%" @close="addDialogClosed">
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
            <el-form-item label="推送标题" prop="tuisongtitle">
                <el-input v-model="addForm.tuisongtitle"></el-input>
            </el-form-item>
            <el-form-item label="作者" prop="tuisongauthor">
                <el-input v-model="addForm.tuisongauthor"></el-input>
            </el-form-item>
            <el-form-item label="发表日期" prop="tuisongdate">
                <el-input v-model="addForm.tuisongdate"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="tuisongintroduction">
                <el-input v-model="addForm.tuisongintroduction"></el-input>
            </el-form-item>
            <el-form-item label="文章内容" prop="tuisongarticle">
                <el-input v-model="addForm.tuisongarticle"></el-input>
            </el-form-item>
           <el-form-item  label="图片" prop="picbase64">
                <template>
                        <img :src="addForm.picbase64" />
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
            <el-button type="primary" @click="addTuisong">确定</el-button>
        </span>
    </el-dialog>

    <!-- 修改对话框 -->
    <el-dialog title="修改物品信息" :visible.sync="editDialogVisible" width="60%" @close="editDialogClosed">
        <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
            <el-form-item label="推送标题" prop="tuisongtitle">
                <el-input v-model="editForm.tuisongtitle"></el-input>
            </el-form-item>
            <el-form-item label="作者" prop="tuisongauthor">
                <el-input v-model="editForm.tuisongauthor"></el-input>
            </el-form-item>
            <el-form-item label="发表日期" prop="tuisongdate">
                <el-input v-model="editForm.tuisongdate" disabled></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="tuisongintroduction">
                <el-input v-model="editForm.tuisongintroduction"></el-input>
            </el-form-item>
            <el-form-item label="文章内容" prop="tuisongarticle">
                <el-input v-model="editForm.tuisongarticle"></el-input>
            </el-form-item>
        </el-form>
        <!-- 内容底部区域 -->
        <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="editTuisongInfo">确定</el-button>
        </span>
    </el-dialog>    

  </div>
</template>

<script>
export default {
created(){
        this.getTuisongList();
    },
data(){
  return{
    url:'',
    addForm:{
      tuisongauthor:'',
      tuisongtitle:'',
      tuisongdate:'',
      tuisongintroduction:'',
      tuisongarticle:'',
      picbase64:'',
    },
    editForm:{   
      tuisongauthor:'',
      tuisongtitle:'',
      tuisongintroduction:'',
      tuisongarticle:'',
        },
    addDialogVisible:false,
    tuisongList:[],
    showntuisongList:[],
    queryInfo:{
                query:'',
                pageNum:1,//当前页
                pageSize:5//每页最大数
            },
    total:0,  
    editDialogVisible:false,
    addFormRules: {
        tuisongtitle: [
            { required: true, message: '请输入文章标题', trigger: 'blur' },
            { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        tuisongauthor: [
            { required: true, message: '请输入作者姓名', trigger: 'change' },
            { min: 2, max: 24, message: '长度在 2 到 24 个字符', trigger: 'blur'}
        ],
        tuisongdate: [
            { required: true, message: '请输入发文日期', trigger: 'change' },
            { min: 1, max: 20, message: '请输入完整', trigger: 'blur'}
        ],
        tuisongintroduction: [
            { required: true, message: '请输入推文简介', trigger: 'change' },
            { min: 2, max: 300, message: '请输入正确格式', trigger: 'blur'}
        ],
        tuisongarticle: [
            { required: true, message: '请输入文章内容', trigger: 'change' },
            { min: 2, max: 3000, message: '请输入完整', trigger: 'blur'}
        ],
      }, 
      // 修改表单验证
        editFormRules:{
            tuisongtitle: [
            { required: true, message: '请编辑文章标题', trigger: 'blur' },
            { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        tuisongauthor: [
            { required: true, message: '请编辑作者姓名', trigger: 'change' },
            { min: 2, max: 24, message: '长度在 2 到 24 个字符', trigger: 'blur'}
        ],
        tuisongintroduction: [
            { required: true, message: '请编辑推文简介', trigger: 'change' },
            { min: 2, max: 300, message: '请输入正确格式', trigger: 'blur'}
        ],
        tuisongarticle: [
            { required: true, message: '请编辑文章内容', trigger: 'change' },
            { min: 2, max: 3000, message: '请输入完整', trigger: 'blur'}
        ],
        },     
     } 
  },
methods:{
    // 显示全部推送信息
        async getTuisongList(){
                const {data:res} = await this.$http.get("alltuisong",{params:this.queryInfo});
                // console.log(res.tuisong)
                this.tuisongList = res.tuisong;
                this.total = res.tuisongCounts;
            },
    //显示状态为展示的推送
        async getShownTuisongList(){
                const {data:res} = await this.$http.get("showntuisong",{params:this.queryInfo});
                this.tuisongList = res.tuisong;
                this.total = res.tuisongCounts;
                // console.log(this.total);
            },
        async tuisongStateChanged(tuisongInfo){
            const {data:res} = await this.$http.put(`tuisongstate?id=${tuisongInfo.id}&state=${tuisongInfo.state}`);
            if (res!="success"){
                tuisongInfo.id = !tuisongInfo.id;
                return this.$message.error("操作失败！！！");
            }
            this.$message.success("操作成功!!!");
        },
        // pageNum触发动作
        handleCurrentChange(newPage){
            this.queryInfo.pageNum = newPage; 
            this.getTuisongList();   
        },
        // 最大数
        handleSizeChange(newSize){
            this.queryInfo.pageSize = newSize;
            this.getTuisongList();
        },
        //显示对话框
        async showEditDialog(id){
          const {data:res} = await this.$http.get("getupdatetuisong?id="+id);
          this.editForm = res;
          this.editDialogVisible = true;
      },
      // 添加窗口
      addDialogClosed(){
            this.$refs.addFormRef.resetFields();
        }, 
        // 关闭窗口
        editDialogClosed(){
          this.$refs.editFormRef.resetFields();
      },
      // 添加插图
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
                console.log(fd);
                await this.$http.post(`/uploadUi`, fd).then((res) => {
                this.addForm.picbase64 = res.data;
                alert("添加成功");
                console.log(this.addForm.picbase64);
                });
            },

    // 添加推送信息
        addTuisong(){
            this.$refs.addFormRef.validate(async valid=>{
                if(!valid)return;
                const {data:res} = await this.$http.post("addtuisong",this.addForm);
                if(res!="success"){
                    return this.$message.error("操作失败！！！");
                }
                this.$message.success("操作成功!!!");
                this.addDialogVisible = false;
                this.getTuisongList();
            });
        }, 
        // 确认修改推送
        editTuisongInfo(){
            this.$refs.editFormRef.validate(async valid =>{
                if(!valid) return;
                const {data:res} = await this.$http.put("edittuisong",this.editForm);
                if(res!="success")return this.$message.error("操作失败！");
                this.$message.success("操作成功！");
                this.editDialogVisible = false;
                this.getTuisongList();
            })
        },
      //删除推送
      async deleteTuisong(id){
            const confirmResult = await this.$confirm("是否确定删除该推送","提示",{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }).catch(err => err)
            if(confirmResult!='confirm'){
                return this.$message.info("已撤销删除");
            }
            const {data:res} = await this.$http.delete("deletetuisong?id="+id);
            if(res != "success"){
                return this.$message.error("删除失败！");
            }
            this.$message.success("删除成功！");
            this.getTuisongList();
        },
    
    }
}
</script>

<style scoped>
  .el-carousel__item img{
      max-width: 100%;
  max-height: 100%;
  display: block;
  margin: auto;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

</style>