package com.biyesheji.bishe.controller;

import com.alibaba.fastjson.JSON;
import com.biyesheji.bishe.bean.User;
import com.biyesheji.bishe.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
public class LoginController {

    @Autowired//自动注入
    UserDao userDao;

    @RequestMapping("/login")
    public String login(@RequestBody User user){
        String flag = "error";
        User userByMessage = userDao.getUserByMessage(user.getUsername(), user.getPassword());
        HashMap<String,Object> res = new HashMap<>();
        if(userByMessage!=null){
            int tempvisits = userByMessage.getVisits()+1;
            int id = userByMessage.getId();
            userDao.addVisits(id,tempvisits);
            flag = "ok";
        }

        res.put("flag",flag);
        res.put("user",userByMessage);
        String res_json = JSON.toJSONString(res);
        System.out.println(res_json);
        return  res_json;
    }
}
