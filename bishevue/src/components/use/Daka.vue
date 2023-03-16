<template>
  <div>
    <!-- 导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item class="activepage">打卡管理</el-breadcrumb-item>
        <el-breadcrumb-item >出入申请</el-breadcrumb-item>
        <el-breadcrumb-item >用户访问记录</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 打卡记录主体部分 -->
    <el-card>
      
        <el-row :gutter="30">
            <el-col :span="10">
                <!-- 搜索栏 -->
                <el-input placeholder="请按姓名搜索" v-model="queryInfo.query" clearable @clear="getDakaList">
                    <el-button slot="append" icon="iconfont icon-sousuo" @click="getDakaList"></el-button>
                </el-input>
                <!-- 按钮 -->    
            </el-col> 
        </el-row>

        <!-- 打卡记录 -->
        <el-table  :data="dakaList" border stripe>
            <el-table-column type="index"   width="60" align="center"></el-table-column>
            <el-table-column label="打卡日期" prop="date"  width="130" align="center"></el-table-column>
            <el-table-column label="姓名" prop="name"  width="130" align="center"></el-table-column>
            <el-table-column label="性别" prop="sex" width="90" align="center" :formatter="formatSex"></el-table-column>
            <el-table-column label="目前所在地" prop="region" width="150" align="center" show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="详细地址" prop="address" width="150" align="center" show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="联系电话" prop="telephone" width="180" align="center"></el-table-column>
            <el-table-column label="是否发烧、咳嗽等疑似症状" prop="isfever" width="60" align="center" :formatter="formatBoolean"></el-table-column>
            <el-table-column label="是否接触新冠疑似或确诊人员" prop="iscontact" width="60" align="center" :formatter="formatBoolean"></el-table-column>
            <el-table-column label="近期是否有过风险地区旅居史" prop="isoutside" width="60" align="center" :formatter="formatBoolean"></el-table-column>
            <el-table-column label="是否接收到隔离通知" prop="isalert" width="60" align="center" :formatter="formatBoolean"></el-table-column>
            <el-table-column label="当前温度(单位℃)" prop="temp" width="60" align="center" ></el-table-column>
            <el-table-column label="身体异常状况详情" prop="healthstate" width="120" align="center" :formatter="formatHealthState"></el-table-column>
            <el-table-column label="风险评级" prop="rate" width="150" align="center">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.rate" placeholder="请选择" @change="DakaRateChanged(scope.row)">
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
        this.getDakaList();
    },
  data(){
    return{
        options: [{
          value: 1,
          label: '未审核'
        }, {
          value: 2,
          label: '没有风险'
        }, {
          value: 3,
          label: '低风险'
        }, {
          value: 4,
          label: '中风险'
        }, {
          value: 5,
          label: '高风险'
        }],
        url:'',
        name:'',
        value1:'',
      queryInfo:{
                query:"",
                pageNum:1,//当前页
                pageSize:5//每页最大数
            },
      dakaList:[],
      total:0,
    }
  },
  methods:{
     async getDakaList(){
            const {data:res} = await this.$http.get("alldaka",{params:this.queryInfo});
            this.dakaList = res.daka;
            this.total = res.dakaCounts;
            console.log(this.dakaList)
        },
        // 评分修改
        async DakaRateChanged(dakaInfo){
            // console.log(goodsInfo.id);
            const {data:res} = await this.$http.put(`dakarate?id=${dakaInfo.id}&rate=${dakaInfo.rate}`);
            // console.log(res);
            if (res!="success"){
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
            this.getDakaList();   
        },
        // 最大数
        handleSizeChange(newSize){
            this.queryInfo.pageSize = newSize;
            this.getDakaList();
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
        },
        formatSex: function (row, column, cellValue) {
            var ret = ''  
            if (cellValue) {
                ret = "男"  
            } else {
                ret = "女"
            }
            return ret;
        },  
        formatHealthState: function (row, column, cellValue) {
           var ret = ''  
            if (cellValue==0) {
                ret = "无异常"  
            } else if(cellValue==1){
                ret = "其它身体疾病"
            }else if(cellValue==2){
                ret = "确诊病例"
            }else if(cellValue==3){
                ret = "疑似病例"
            }else if(cellValue==4){
                ret = "密切接触者"
            }else if(cellValue==5){
                ret = "发热留观人员"
            }else{
                ret = "无症状感染者" 
            }
            return ret;
        },  
  }
}
</script>

<style scoped>

</style>