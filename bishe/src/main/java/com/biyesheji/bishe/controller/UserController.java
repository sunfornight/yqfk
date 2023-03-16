package com.biyesheji.bishe.controller;
import com.alibaba.fastjson.JSON;
import com.biyesheji.bishe.bean.QueryInfo;
import com.biyesheji.bishe.bean.User;
import com.biyesheji.bishe.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.List;

@RestController
public class UserController {
    @Autowired//属性的自动注入注解
    private UserDao userDao;
    @RequestMapping("/alluser")//处理 HTTP 请求
    public String getUserList(QueryInfo queryInfo){
        //获取最大列表数和当前编号
        int userCounts = userDao.getUserCounts("%" + queryInfo.getQuery() + "%");
        int pageStart = (queryInfo.getPageNum() - 1) * (queryInfo.getPageSize());
        List<User> users = userDao.getAllUser("%" + queryInfo.getQuery() + "%", pageStart, queryInfo.getPageSize());
        HashMap<String, Object> res = new HashMap<>();
        res.put("userCounts",userCounts);
        res.put("users",users);
        String res_string = JSON.toJSONString(res);
        return  res_string;
    }

    @RequestMapping("/userstate")
    public  String updateUserState(@RequestParam("id")Integer id,
                                   @RequestParam("state")Boolean state){
        int IntState;
        if(state == true){
            IntState = 1;
        }else{
            IntState = 0;
        }
        int i = userDao.updateState(id,IntState);

        return i > 0 ? "success":"error";
    }

    @RequestMapping("/adduser")
    public String addUser(@RequestBody User user){
        user.setRole("普通用户");
        user.setState(false);
        int i = userDao.addUser(user);
        return i > 0 ? "success":"error";
    }

    @RequestMapping("/deleteuser")
    public String deleteUser(int id){
        int i = userDao.deleteUser(id);
        return i > 0 ? "success":"error";
    }

    @RequestMapping("/getupdate")
    public String getUpdateUser(int id){
        User user = userDao.getUpdateUser(id);
        String s = JSON.toJSONString(user);
        return s;
    }

    @RequestMapping("/edituser")
    public String editUser(@RequestBody User user){
        int i = userDao.editUser(user);
        return i > 0 ? "success":"error";
    }

    @RequestMapping("/alluserlist")
    public String getAllUserList(){
        List<User> users = userDao.getAllUserList();
        String res_string = JSON.toJSONString(users);
        return  res_string;
    }

}
