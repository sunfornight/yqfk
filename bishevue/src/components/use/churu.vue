<template>
  <div>
    <!-- 导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item >打卡管理</el-breadcrumb-item>
        <el-breadcrumb-item class="activepage">出入申请</el-breadcrumb-item>
        <el-breadcrumb-item >用户访问记录</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 出入申请记录主体部分 -->
    <el-card>
      
        <el-row :gutter="30">
            <el-col :span="10">
                <!-- 搜索栏 -->
                <el-input placeholder="请按姓名搜索" v-model="queryInfo.query" clearable @clear="getChuruList">
                    <el-button slot="append" icon="iconfont icon-sousuo" @click="getChuruList"></el-button>
                </el-input>
                <!-- 按钮 -->    
            </el-col> 
        </el-row>

        <!-- 出入申请记录 -->
        <el-table  :data="churuList" border stripe>
            <el-table-column type="index"   width="60" align="center"></el-table-column>
            <el-table-column label="姓名" prop="name"  width="130" align="center"></el-table-column>
            <el-table-column label="目前所在地址" prop="address" width="150" align="center" show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="前往目的地" prop="destination" width="150" align="center" show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="联系电话" prop="telephone" width="180" align="center"></el-table-column>
            <el-table-column label="是否离开本市" prop="isleave" width="120" align="center" :formatter="formatBoolean"></el-table-column>
            <el-table-column label="预计离开时间" prop="timestart" width="120" align="center" ></el-table-column>
            <el-table-column label="预计归来时间" prop="timeend" width="120" align="center"></el-table-column>
            <el-table-column label="当前温度(单位℃)" prop="temp" width="90" align="center" ></el-table-column>
            <el-table-column label="备注信息" prop="note" width="180" align="center" show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="批准操作" prop="approve" width="150" align="center">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.approve" placeholder="请选择" @change="ChuruApproveChanged(scope.row)">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
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
  </div>
</template>

<script>
export default {
  created(){
        this.getChuruList();
    },
  data(){
    return{
        options: [{
          value: 1,
          label: '未操作'
        }, {
          value: 2,
          label: '准许申请'
        }, {
          value: 3,
          label: '否决申请'
        }],
        url:'',
        name:'',
        value1:'',
      queryInfo:{
                query:"",
                pageNum:1,//当前页
                pageSize:5//每页最大数
            },
      churuList:[],
      total:0,
    }
  },
  methods:{
     async getChuruList(){
            const {data:res} = await this.$http.get("allchuru",{params:this.queryInfo});
            this.churuList = res.churu;
            this.total = res.churuCounts;
            // console.log(this.churuList)
        },
        // 评分修改
        async ChuruApproveChanged(churuInfo){
            // console.log(goodsInfo.id);
            const {data:res} = await this.$http.put(`churuapprove?id=${churuInfo.id}&rate=${churuInfo.approve}`);
            // console.log(res);
            if (res!="success"){
                return this.$message.error("状态修改失败！！！");
            }
            this.$message.success("状态修改成功!!!");
        },
        // pageNum触发动作
        handleCurrentChange(newPage){
            this.queryInfo.pageNum = newPage; 
            this.getChuruList();   
        },
        // 最大数
        handleSizeChange(newSize){
            this.queryInfo.pageSize = newSize;
            this.getChuruList();
        },
        // form表中对布尔值转换成：是与否（否则该值不会在form表中显示）
        //布尔值格式化：cellValue为后台返回的值
        formatBoolean: function (row, column, cellValue) {
            var ret = ''  
            if (cellValue) {
                ret = "是"  
            } else {
                ret = "否"
            }
            return ret;
        } 
  }
}
</script>

<style scoped>

</style>