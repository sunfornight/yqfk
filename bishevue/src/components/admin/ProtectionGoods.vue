<template>
  <div>
    <!-- 导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item >用户列表</el-breadcrumb-item>
        <el-breadcrumb-item >小程序轮播图</el-breadcrumb-item>
        <el-breadcrumb-item >主页推送</el-breadcrumb-item>
        <el-breadcrumb-item class="activepage">防护商品</el-breadcrumb-item>
        <el-breadcrumb-item ></el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 商品列表主体部分 -->
    <el-card>
      
        <el-row :gutter="30">
            <el-col :span="10">
                <!-- 搜索栏 -->
                <el-input placeholder="请按物品名称搜索" v-model="queryInfo.query" clearable @clear="getGoodsList">
                    <el-button slot="append" icon="iconfont icon-sousuo" @click="getGoodsList"></el-button>
                </el-input>
                <!-- 按钮 -->
            </el-col>
                <el-col :span="4">
                <el-button type="primary"  @click="addDialogVisible = true">商品添加</el-button>   
            </el-col>       
        </el-row>

        <!-- 商品列表 -->
        <el-table  :data="goodsList" border stripe>
            <el-table-column type="index"   width="60" align="center"></el-table-column>
            <el-table-column label="商品名称" prop="goodsname"  width="120" align="center"></el-table-column>
            <el-table-column label="出产商" prop="chandi" width="120" align="center"></el-table-column>
            <el-table-column label="生产日期" prop="shengyubaozhiqi" width="120" align="center"></el-table-column>
            <el-table-column label="用途" prop="goodsusage" width="120" align="center"></el-table-column>
            <el-table-column label="定价" prop="price" width="60" align="center"></el-table-column>
            <el-table-column label="单位" prop="unit" width="60" align="center"></el-table-column>
            <el-table-column label="数量" prop="amount" width="180" align="center">
                <template slot-scope="scope">
                    <el-input-number size="mini" v-model="scope.row.amount" @change="goodsAmountChanged(scope.row)" :min="0" ></el-input-number>
                </template>
            </el-table-column>
            <el-table-column label="是否上架" prop="state" width="120" align="center">
                <!--作用域插槽 scope.row 存储了当前行的信息 -->
                <template slot-scope="scope"><!--数据模板-->
                    <el-switch v-model="scope.row.state" @change="goodsStateChanged(scope.row)"></el-switch>
                </template>                 
            </el-table-column>
            <el-table-column label="图片信息" prop="picbase64" width="360" align="center">
                <template slot-scope="scope">
                  <img :src=scope.row.picbase64 min-width="70" height="70">
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
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteGoods(scope.row.id)"></el-button>
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

    <!-- 新增商品区域 -->
    <el-dialog title="添加商品" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
            <el-form-item label="物品名称" prop="goodsname">
                <el-input v-model="addForm.goodsname"></el-input>
            </el-form-item>
            <el-form-item label="出产商" prop="chandi">
                <el-input v-model="addForm.chandi"></el-input>
            </el-form-item>
            <el-form-item label="数量" prop="amount">
                <el-input v-model="addForm.amount"></el-input>
            </el-form-item>
            <el-form-item label="生产日期" prop="shengyubaozhiqi">
                <template>
                    <div class="block">
                        <el-date-picker
                        v-model="addForm.shengyubaozhiqi"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日">
                        </el-date-picker>
                    </div>
                </template>
            </el-form-item>
            <el-form-item label="单价" prop="price">
                <el-input v-model="addForm.price"></el-input>
            </el-form-item>
            <el-form-item label="单位" prop="unit">
                <el-input v-model="addForm.unit"></el-input>
            </el-form-item>            
            <el-form-item label="用途" prop="goodsusage">
                <el-input v-model="addForm.goodsusage"></el-input>
            </el-form-item>
            <!-- <el-form-item label="图片" prop="picpath">
                <el-input v-model="addForm.picpath"></el-input>
            </el-form-item> -->


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
            <el-button type="primary" @click="addGoods">确定</el-button>
        </span>
    </el-dialog>

    <!-- 修改对话框 -->
    <el-dialog title="修改物品信息" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
        <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
            <el-form-item label="物品名称" prop="goodsname">
                <el-input v-model="editForm.goodsname" disabled></el-input>
            </el-form-item>
            <el-form-item label="出产商" prop="chandi">
                <el-input v-model="editForm.chandi" disabled></el-input>
            </el-form-item>
            <el-form-item label="生产日期" prop="shengyubaozhiqi">
                <el-input v-model="editForm.shengyubaozhiqi" disabled></el-input>
            </el-form-item>
            <el-form-item label="单价" prop="price">
                <el-input v-model="editForm.price"></el-input>
            </el-form-item>
            <el-form-item label="单位" prop="unit">
                <el-input v-model="editForm.unit"></el-input>
            </el-form-item>            
            <el-form-item label="用途" prop="goodsusage">
                <el-input v-model="editForm.goodsusage" disabled></el-input>
            </el-form-item>
        </el-form>
        <!-- 内容底部区域 -->
        <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="editGoodsInfo">确定</el-button>
        </span>
        
    </el-dialog>
  </div>
</template>

<script>
export default {
  created(){
        this.getGoodsList();
    },
  data(){
    return{
        url:'',
        name:'',
        value1:'',
      addFormRules: {
        goodsname: [
            { required: true, message: '请输入商品名', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        chandi: [
            { required: true, message: '请输入产地', trigger: 'change' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
        ],
        // shengyubaozhiqi: [
        //     { required: true, message: '请输入剩余保质期', trigger: 'change' },
        //     { min: 2, max: 12, message: '请输入正确日期格式', trigger: 'blur'}
        // ],
        amount: [
            { required: true, message: '请输入数量', trigger: 'change' },
            { min: 1, max: 12, message: '请输入完整', trigger: 'blur'}
        ],
        price: [
            { required: true, message: '请输入单价', trigger: 'change' },
            { min: 1, max: 12, message: '请输入完整', trigger: 'blur'}
        ],
        unit: [
            { required: true, message: '请输入物品单价的单位', trigger: 'change' },
            { min: 2, max: 12, message: '请输入正确格式', trigger: 'blur'}
        ],
        goodsusage: [
            { required: true, message: '请输入用途用法', trigger: 'change' },
            { min: 2, max: 30, message: '请输入完整', trigger: 'blur'}
        ],
      }, 
      // 修改表单验证
        editFormRules:{
            price: [
                { required: true, message: '请输入单价', trigger: 'change' },
                { min: 2, max: 12, message: '请输入完整', trigger: 'blur'}
            ],
            unit: [
                { required: true, message: '请输入物品单价的单位', trigger: 'change' },
                { min: 1, max: 12, message: '请输入正确格式', trigger: 'blur'}
            ],
        },     
      //添加商品
      addForm:{
                goodsname:'',
                chandi:'',
                shengyubaozhiqi:'',
                price:'',
                goodsusage:'',
                picpath:'',
                unit:'',
                picbase64:''
            },
      editDialogVisible:false,
      editForm:{
                
            },
      addDialogVisible:false,
      queryInfo:{
                query:"",
                pageNum:1,//当前页
                pageSize:5//每页最大数
            },
      goodsList:[],
      total:0,
    }
  },
  methods:{
        //显示对话框
      async showEditDialog(id){
          const {data:res} = await this.$http.get("getupdategoods?id="+id);
          this.editForm = res;
          this.editDialogVisible = true;
      },
  // 关闭窗口
      editDialogClosed(){
          this.$refs.editFormRef.resetFields();
      },
     async getGoodsList(){
            const {data:res} = await this.$http.get("allgoods",{params:this.queryInfo});
            this.goodsList = res.goods;
            this.total = res.goodsCounts;
        },
        // 状态修改
        async goodsStateChanged(goodsInfo){
            // console.log(goodsInfo.id);
            const {data:res} = await this.$http.put(`goodsstate?id=${goodsInfo.id}&state=${goodsInfo.state}`);
            // console.log(res);
            if (res!="success"){
                goodsInfo.id = !goodsInfo.id;
                return this.$message.error("状态修改失败！！！");
            }
            this.$message.success("状态修改成功!!!");
        },
        // 商品数量修改
        async goodsAmountChanged(goodsInfo){
            console.log(goodsInfo.amount)
            const {data:res} = await this.$http.put(`goodsamount?id=${goodsInfo.id}&amount=${goodsInfo.amount}`);
            if (res!="success"){
                goodsInfo.id = !goodsInfo.id;
                return this.$message.error("数量修改失败！！！");
            }
            this.$message.success("数量修改成功!!!");
        },
        // pageNum触发动作
        handleCurrentChange(newPage){
            this.queryInfo.pageNum = newPage; 
            this.getGoodsList();   
        },
        // 最大数
        handleSizeChange(newSize){
            this.queryInfo.pageSize = newSize;
            this.getGoodsList();
        },
        addDialogClosed(){
            this.$refs.addFormRef.resetFields();
        }, 
        //添加商品
        addGoods(){
            this.$refs.addFormRef.validate(async valid=>{
                if(!valid)return;
                const {data:res} = await this.$http.post("addgoods",this.addForm);
                if(res!="success"){
                    return this.$message.error("操作失败！！！");
                }
                this.$message.success("操作成功!!!");
                this.addDialogVisible = false;
                this.getGoodsList();
                console.log(this.addForm);
            });
        },    
        // 确认修改
        editGoodsInfo(){
            this.$refs.editFormRef.validate(async valid =>{
                if(!valid) return;
                const {data:res} = await this.$http.put("editgoods",this.editForm);
                if(res!="success")return this.$message.error("操作失败！");
                this.$message.success("操作成功！");
                this.editDialogVisible = false;
                this.getGoodsList();
            })
        },
      //删除商品
      async deleteGoods(id){
            const confirmResult = await this.$confirm("是否确定删除该类商品","提示",{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }).catch(err => err)
            if(confirmResult!='confirm'){
                return this.$message.info("已撤销删除");
            }
            const {data:res} = await this.$http.delete("deletegoods?id="+id);
            if(res != "success"){
                return this.$message.error("删除失败！");
            }
            this.$message.success("删除成功！");
            this.getGoodsList();
        }, 
    //添加商品图片
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
                alert("图片选取成功");
                // console.log("ok");
                });
            },
  }
}
</script>

<style scoped>

</style>