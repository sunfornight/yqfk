<style scoped>
  h2{
    text-align: center;
    padding: 30px;
    font-size: 28px;
    letter-spacing: 3px;
    color: aqua;
  }
  #chart_example{
    width: 60%;
    height: 600px;
    border: 0px ;
    margin: 0 auto;
  }
</style>
<template >
  <div class="background">
    <h2>用户访问记录</h2>
    <div id="chart_example">    
    </div>
  </div>
</template>
 
<script>
  import * as echarts from 'echarts'
  export default {
    data() {
      return {
          userList:'',
          nameList:'',
          titile:'test22',
          visitsList:'',
      }
    },
    created(){
       this.getUserList();    
    },
    mounted:function() {
        setTimeout(() => {
            let nameList = this.nameList;
            let visitsList = this.visitsList;
            let this_ = this;
            let myChart = echarts.init(document.getElementById('chart_example'));
            let option = {
                color: ['#88abda'],
                tooltip : {
                trigger: 'axis',
                axisPointer : {
                    type : 'shadow'
                }
                },

                xAxis : [
                {
                    name : '用户名',
                    type : 'category',
                    data : this.nameList,
                    axisTick: {
                        alignWithLabel: true,
                    },
                    axisLabel: {  
                        interval:0,  
                        rotate:40,
                        textStyle:{
                            fontSize: 20,
                        }
                    }
                }
                ],
                yAxis : [
                {
                    name :"用户访问次数",
                    type : 'value'
                }
                ],
                series : [
                {
                    name:'用户访问记录',
                    type:'bar',
                    barWidth: '60%',
                    data:this.visitsList
                }
                ]
            };
            myChart.setOption(option);

            window.addEventListener('resize',function() {myChart.resize()});
        }, 1000)
    },
    methods: {
        async getUserList(){
            const {data:res} = await this.$http.get("alluserlist");
            this.userList = res;
            var nameList = [];
            var visitsList = [];
            for(var i=0 ; i<this.userList.length ; i++){
                nameList.push(this.userList[i].username);
                visitsList.push(this.userList[i].visits);
            }
            this.nameList = nameList;
            this.visitsList = visitsList;
        },

    },
    watch: {},
  }
</script>

<style scope>
    .background{
        background-size: 100% 100%;
        height: 100%;
        background: #0f0c29;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #24243e, #302b63, #0f0c29);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #24243e, #302b63, #0f0c29); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }
</style>
 