<template>
    <el-container class="home-container">
        <!-- 头部 -->
        <el-header>
            <div>
                <img :src="user.touxiang" alt>
            </div>
            <span class="head-title">社区疫情防控后台</span>
            <el-button type="primary" @click="logout">退出登录</el-button>
        </el-header>
        
        <!-- 主体 -->
        <el-container>
            <!-- 侧边栏 -->
            <el-aside :width="isCollapse?'64px':'200px'">
                <div class="toggle-button" @click="toggleCollapse">{{isCollapse?'展开>':'收起'}}</div>
                <el-menu
                    background-color="#2d502e"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    :collapse="isCollapse"
                    :router="true"
                    :default-active="activePath">
                    <!-- 一级菜单 -->
                        <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
                            <template slot="title">
                                <i :class="iconsObjects[item.id]"></i>
                                <span>{{item.title}}</span>
                            </template>
                            <!-- 二级菜单 -->
                            <el-menu-item 
                            :index="item_son.path" 
                            v-for="item_son in item.subMenuList" 
                            :key="item_son.id"
                            @click="saveNavState(item_son.path)">
                                <template slot="title">
                                    <i :class="iconsObjects[item_son.id]"></i>
                                    <span>{{item_son.title}}</span>
                                </template>
                            </el-menu-item>
                        </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 主题内容 -->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data(){
        return{
            menuList:[],
            isCollapse:true,
            iconsObjects:{
                '100':'iconfont icon-gailan',
                '200':'iconfont icon-zonglan',
                '101':'iconfont icon-yonghuming',
                '102':'iconfont icon-weixin',
                '103':'iconfont icon-xiaoxi',
                '104':'iconfont icon-ziyuanguanli',
                '201':'iconfont icon-gailan',
                '202':'iconfont icon-jibenxinxi',
                '203':'iconfont icon-xianshi',
                '204':'iconfont icon-yonghuming',
            },
            activePath:'/welcome',//默认路径,
            user:'',
        }
    },
    created(){
        this.getUserInfo();
        this.getMenuList();
        this.activePath = window.sessionStorage.getItem('activePath');
    },
    methods:{
        logout(){
            window.sessionStorage.clear();//清除用户信息
            this.$router.push("/login");
        },
        // 获取侧栏列表信息
        async getMenuList(){
            const {data:res} = await this.$http.get("menus");
            // console.log(res);
            if(res.flag != 200) return this.$message.console.error("获取列表失败！");
            this.menuList = res.menus;
        },
        // 控制侧边栏伸缩
        toggleCollapse(){
            this.isCollapse = !this.isCollapse;
        },
        //保存路径
        saveNavState(activePath){
            window.sessionStorage.setItem('activePath',activePath);
            this.activePath = activePath;
        },
        getUserInfo(){
            this.user=JSON.parse(sessionStorage.getItem('user')) 
        }
    }
}
</script>

<style scoped>
    .home-container{
        height: 100%;
    }
    .el-header{
        background: #00467F;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #A5CC82, #00467F);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #A5CC82, #00467F); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */


        display: flex;
        justify-content: space-between;
        padding-left: 0%;
        font-size: 22px;
        display: flex;
        align-items: center;

    }
    .el-header .head-title{
        letter-spacing: 5px;
        font-size: 32px;   
        margin-left: 50px;
        font-weight: 580;
    }
    .el-header img{
        width: 57px;
        height: 57px;
        border-radius: 50%;
        margin-left: 5px;
    }
    .el-aside{
        background-color: #345e45;
    }
    .el-aside .el-menu{
        border-right: none;
    }
    .toggle-button{
        background-color: #A5CC82;
        font-size: 14px;
        font-weight: 680;
        line-height: 24px;
        color: #000;
        text-align: center;
        letter-spacing: 4px;
        cursor:pointer;
    }
    .el-submenu i{  
        margin-right: 15px;
    }
</style>