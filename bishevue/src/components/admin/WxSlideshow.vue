<template>
  <div>
    <!-- 导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item >用户列表</el-breadcrumb-item>
        <el-breadcrumb-item class="activepage">小程序轮播图</el-breadcrumb-item>
        <el-breadcrumb-item >主页推送</el-breadcrumb-item>
        <el-breadcrumb-item >防护商品</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 该页轮播图 -->
    <template>
    <el-carousel indicator-position="outside">
        <el-carousel-item v-for="(item,index) in picsList" :key="index">
            <img :src="item.picbase64">
        </el-carousel-item>
    </el-carousel>
    </template>

    <!-- 轮播图列表主体部分 -->
    <el-card>
        <el-row :gutter="30">
            
            <el-col :span="19">
                <el-button-group>
                    <el-button type="primary" icon="el-icon-arrow-left" @click="getPicsList">全部</el-button>
                    <el-button type="primary" @click="getShownPicsList">小程序展示<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                </el-button-group>
            </el-col>
                <!-- 添加按钮 -->
            <el-col :span="4">
                <el-button type="primary"  @click="addDialogVisible = true">添加轮播图</el-button>   
            </el-col>     
        </el-row>

        <!-- 轮播图列表 -->
        <el-table  :data="picsList" border stripe>
            <el-table-column type="index"   width="60" align="center"></el-table-column>            
              <el-table-column label="展示状态" prop="state" width="240" align="center">
                <!--作用域插槽 scope.row 存储了当前行的信息 -->
                <template slot-scope="scope"><!--数据模板-->
                    <el-switch v-model="scope.row.state" @change="picsStateChanged(scope.row)"></el-switch>
                </template>                 
            </el-table-column>
            <el-table-column label="图片描述" prop="picdescribe" width="360" align="center" show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="图片信息" prop="picbase64" width="480" align="center">
                <template slot-scope="scope">
                  <img :src=scope.row.picbase64 min-width="270" height="270">
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <!-- 删除 -->
                    <el-tooltip effect="dark" content="删除" placement="top-start" :enterable="false">
                        <el-button type="danger" icon="el-icon-delete" size="medium" @click="deletePics(scope.row.id)"></el-button>
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

        <!-- 新增图片区域 -->
    <el-dialog title="添加轮播图" :visible.sync="addDialogVisible" width="60%" @close="addDialogClosed">
        <el-form :model="addForm"  ref="addFormRef" label-width="100px">
            <el-form-item label="轮播图描述" prop="picdescribe">
                <el-input v-model="addForm.picdescribe"></el-input>
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
            <el-button type="primary" @click="addPics">确定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
created(){
        this.getPicsList();
    },
data(){
  return{
    addDialogVisible:false,
    picsList:[],
    shownpicsList:[],
    queryInfo:{
                pageNum:1,//当前页
                pageSize:5//每页最大数
            },
    total:0,  
    editDialogVisible:false,
    addForm:{
                picdescribe:'',
                picbase64:''
            },
     } 
  },
methods:{
    // 显示全部图片信息
        async getPicsList(){
                const {data:res} = await this.$http.get("allpics",{params:this.queryInfo});
                this.picsList = res.pics;
                this.total = res.picsCounts;
            },
    //显示状态为展示的图片
        async getShownPicsList(){
                const {data:res} = await this.$http.get("shownpics",{params:this.queryInfo});
                this.picsList = res.pics;
                this.total = res.picsCounts;
                // console.log(this.total);
            },
        async picsStateChanged(picsInfo){
            const {data:res} = await this.$http.put(`picsstate?id=${picsInfo.id}&state=${picsInfo.state}`);
            if (res!="success"){
                picsInfo.id = !picsInfo.id;
                return this.$message.error("操作失败！！！");
            }
            this.$message.success("操作成功!!!");
        },
        // pageNum触发动作
        handleCurrentChange(newPage){
            this.queryInfo.pageNum = newPage; 
            this.getPicsList();   
        },
        // 最大数
        handleSizeChange(newSize){
            this.queryInfo.pageSize = newSize;
            this.getPicsList();
        },
        //显示对话框
        async showEditDialog(id){
          const {data:res} = await this.$http.get("getupdatepics?id="+id);
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
      // 上传轮播图图片
            submitUpload() {
            this.$refs.upload.submit();
            },
            //通过onchanne触发方法获得文件列表
            handleChange(file, fileList) {
            this.fileList = fileList;
            console.log(fileList);
            },
            handlePreview(file) {
            console.log(file);
            },
            async upload(file) {
                let fd = new FormData();
                //文件信息中raw才是真的文件
                fd.append("files", file.file);
                console.log(fd);
                await this.$http.post(`/uploadUi`, fd).then((res) => {
                this.addForm.picbase64 = res.data;
                alert("ok");
                console.log("ok");
                });
            },
    // 添加轮播图信息
        addPics(){
            this.$refs.addFormRef.validate(async valid=>{
                if(!valid)return;
                const {data:res} = await this.$http.post("addpics",this.addForm);
                console.log(this.addForm,123456)
                if(res!="success"){
                    return this.$message.error("操作失败！！！");
                }
                this.$message.success("操作成功!!!");
                this.addDialogVisible = false;
                this.getPicsList();
            });
        }, 
      //删除图片
      async deletePics(id){
            const confirmResult = await this.$confirm("是否确定删除该图片信息","提示",{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }).catch(err => err)
            if(confirmResult!='confirm'){
                return this.$message.info("已撤销删除");
            }
            const {data:res} = await this.$http.delete("deletepics?id="+id);
            if(res != "success"){
                return this.$message.error("删除失败！");
            }
            this.$message.success("删除成功！");
            this.getPicsList();
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