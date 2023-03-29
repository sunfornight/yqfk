# 疫情防控小程序系统——前后端开发文档

## 开发层次

- 系统后台
- 系统管理员端
- 用户小程序

## 开发环境

- 系统后台：MYSQL8.0，JDK11，IDEA，NAVICAT
- 管理员页面：VSCODE
- 用户小程序：小程序开发者工具

## 所需框架

- Springboot，Mybatis，Node.js，Vue
- ElementUi，ColorUI，VantUI



## 前期开发流程

### 后端开发

1. 快速创建spring项目：

![image-20220402103618750](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20220402103618750.png)

2. ![image-20220402103740295](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20220402103740295.png)

3. 勾选

![image-20220402103833529](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20220402103833529.png)

![image-20220402103927860](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20220402103927860.png)

4. 目录结构：

   ![image-20220402124028746](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20220402124028746.png)

5. 数据库配置：

   - resource文件夹下新建application的yml文件

     ![image-20220402124223647](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20220402124223647.png)

   - ```yaml
     
     # mysql
     spring:
     
       datasource:
         #MySQL配置
         driverClassName:  com.mysql.cj.jdbc.Driver
         url: jdbc:mysql://localhost:3306/bishe?useUnicode=true&characterEncoding=UTF-8&useSSL=false&useUnicode=true&characterEncoding=utf-8&serverTimezone=UTC
         username: root
         password: 123456
     
     mybatis:
       mapper-locations: classpath:mapper/*.xml
       type-aliases-package: com.example.demo.model
     server:
       port: 9000
     
     ```

   - ![image-20220402124449450](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20220402124449450.png)

- 启动项目，访问本机9000端口，出现以下提示即数据库连接成功

  ![image-20220402124708521](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20220402124708521.png)

![image-20220402124718140](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20220402124718140.png)

6. 测试Controller:

   - 新建Controller包，注意大写

     ![image-20220402125011207](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20220402125011207.png)

- ```java
  package com.lihui.study.Controller;
  
  import org.springframework.web.bind.annotation.RequestMapping;
  import org.springframework.web.bind.annotation.RestController;
  
  //@RestController是@ResponseBody和@Controller的组合注解。(使用@Controller 注解，在对应的方法上，
  //视图解析器可以解析return 的jsp,html页面，并且跳转到相应页面若返回json等内容到页面，则需要加@ResponseBody注解)
  @RestController
  public class LoginController {
      @RequestMapping("/test")
      public String test(){
          return "Hello Springboot!";
      }
  }
  ```

- 访问/test

- ![image-20220402125529145](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20220402125529145.png)

- 初步搭建成功

7. 处理跨域请求：

   - 新建config配置类

     ![image-20220402130157471](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20220402130157471.png)

- ```java
  package com.biyesheji.bishe.util;
  
  import org.springframework.context.annotation.Configuration;
  import org.springframework.web.servlet.config.annotation.CorsRegistry;
  import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
  
  //全局配置类——配置跨域请求
  @Configuration
  public class WebConfig extends WebMvcConfigurerAdapter {
  
      @Override
      public void addCorsMappings(CorsRegistry registry) {
          /**
           * 1.域访问路径
           * 2.请求来源
           * 3.方法
           * 4.允许携带
           * 5.生命周期
           */
          registry.addMapping("/**")
          .allowedOrigins("Http://localhost:8080","null")
          .allowedMethods("GET","POST","PUT","OPTIONS","DELETE")
          .allowCredentials(true)
          .maxAge(3600);
      }
  }
  ```

### 管理员页面开发

1. 下载node.js并安装vue，详情可借鉴[安装教程](https://blog.csdn.net/m0_52937388/article/details/117793625?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522164887576016780265449800%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=164887576016780265449800&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_click~default-2-117793625.142^v5^pc_search_result_control_group,157^v4^control&utm_term=vue%E4%B8%8B%E8%BD%BD&spm=1018.2226.3001.4187)

2. 选定工作空间，建立vue工作空间，启动vue ui：

   ![image-20220402130736795](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20220402130736795.png)

3. 进入vueui界面创建项目

   - 新建vue工作空间

     ![image-20220402131054123](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20220402131054123.png)

- ![image-20220402131133955](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20220402131133955.png)

- ![image-20220402131155477](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20220402131155477.png)

- 勾选：

  ![image-20220402131256513](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20220402131256513.png)

![image-20220402131404404](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20220402131404404.png)

- 选择vue2.x版本创建

  ![image-20220402131435666](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20220402131435666.png)

![image-20220402131521107](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20220402131521107.png)

- 稍作等待

- 进入界面

  ![image-20220402131755043](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20220402131755043.png)

- 添加ElementUI插件

  ![image-20220402131854866](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20220402131854866.png)

- 添加axios依赖

  ![image-20220402132021111](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20220402132021111.png)

- 添加Less依赖

  ![image-20220402132137268](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20220402132137268.png)

- ![image-20220402132218541](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20220402132218541.png)

- 点击任务，点击serve，点击运行，启动app

  ![image-20220402132339981](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20220402132339981.png)

4. 使用VsCode打开我们建立的vue项目

   - 项目目录

     ![image-20220402132610592](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20220402132610592.png)

- 清空App.vue成如下

  ![image-20220402132804808](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20220402132804808.png)

- 防止报错，删除views文件夹下的About.vue以及Home.vue

- index.js清空成如下

  ![image-20220402132945242](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20220402132945242.png)

-![image-20220402133049447](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20220402133049447.png)

- 熟悉目录结构：assets文件夹存放公共资源，components放入组件模板，plugins存放插件例如elementui,main.js是全局配置

5. main.js配置，配置router，axios

   ```js
   import Vue from 'vue'
   import App from './App.vue'
   import router from './router'
   import './plugins/element.js'
   import './assets/css/global.css'
   import './assets/icon_font/iconfont.css'
   
   import echarts from 'echarts'
   
   // 引入axios处理跨域请求
   import axios from 'axios'
   // 挂载axios
   Vue.prototype.$http = axios
   // 设置访问根路径
   axios.defaults.baseURL = "http://localhost:9000"
   
   Vue.config.productionTip = false
   
   new Vue({
     router,
     render: h => h(App)
   }).$mount('#app')
   
   ```

6. router文件夹下新建index.js，配置路由

   ```js
   import Vue from 'vue'
   import VueRouter from 'vue-router'
   import Login from '../components/Login.vue'
   Vue.use(VueRouter)
   
   const routes = [
    {
      path:"/",
      redirect:"/login"
    },
    {
      path:"/login",
      component: Login
    }
   ]
   
   const router = new VueRouter({ 
     routes
   })
   
   //挂载路由导航
   router.beforeEach((to,from,next)=>{
     if(to.path=='/login') return next();//若访问首页则放行
     //获取user信息
     const userFlag = window.sessionStorage.getItem("user");
     console.log(userFlag);
     if(!userFlag) return next('/login');//未获取到user信息，返回登入页面
     next();//放行
   })
   export default router
   ```

### 数据库设计

- 一级菜单表

  ![image-20220403113319675](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20220403113319675.png)

- 二级菜单表

  ![image-20220403113400099](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20220403113400099.png)

- 用户信息表

  ![image-20220403113426520](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20220403113426520.png)

- 防疫商品表

  ![image-20220403113452529](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20220403113452529.png)

- 文章推送表

  ![image-20220403113520738](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20220403113520738.png)

- 轮播图控制表

  ![image-20220403113544546](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20220403113544546.png)

- 疫情每日打卡表

  ![image-20220403113607931](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20220403113607931.png)

- 用户出入申请表

  ![image-20220403113625118](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20220403113625118.png)

- ![image-20220406151524073](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20220406151524073.png)

- 存在resource-static-js下
- ![image-20220406151549045](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20220406151549045.png)

- 