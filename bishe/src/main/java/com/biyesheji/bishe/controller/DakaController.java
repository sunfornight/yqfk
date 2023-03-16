package com.biyesheji.bishe.controller;

import com.alibaba.fastjson.JSON;
import com.biyesheji.bishe.bean.Daka;
import com.biyesheji.bishe.bean.QueryInfo;
import com.biyesheji.bishe.dao.DakaDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

@RestController
public class DakaController {
    @Autowired
    DakaDao dakaDao;
    @RequestMapping("/adddaka")
    public String addDaka(@RequestBody Daka daka){
//        System.out.println(daka);
        daka.setRate(1);
        System.out.println(daka.getRate()+"!!!");
        int i = dakaDao.addDaka(daka);
        return i > 0 ? "success":"error";
    }

    @RequestMapping("/alldaka")
    public String getDaka(QueryInfo queryInfo){
        int dakaCounts = dakaDao.getDakaCounts("%" + queryInfo.getQuery() + "%");
        int pageStart = (queryInfo.getPageNum() - 1) * (queryInfo.getPageSize());
        List<Daka> daka = dakaDao.getAllDaka("%" + queryInfo.getQuery() + "%", pageStart, queryInfo.getPageSize());
        HashMap<String, Object> res = new HashMap<>();
        res.put("dakaCounts",dakaCounts);
        res.put("daka",daka);
        System.out.println(daka+"!!!");
        String res_string = JSON.toJSONString(res);
        return  res_string;
    }

    @RequestMapping("/dakarate")
    public String updateDakaRate(@RequestParam("id")Integer id,
                                   @RequestParam("rate")Integer rate){
        System.out.println(rate+"rate!!!!!!");
        int i = dakaDao.updateRate(id,rate);
        return i > 0 ? "success":"error";
    }

    @RequestMapping("/wxalldaka")
    public String getWxDaka(String name){
        List<Daka> wxdaka = dakaDao.getWxAllDaka(name);
        String res_string = JSON.toJSONString(wxdaka);
        return  res_string;
    }

    @RequestMapping("/wxiddaka")
    public String getWxIdDaka(Integer id){
        Daka wxiddaka = dakaDao.getWxIdDaka(id);
        String res_string = JSON.toJSONString(wxiddaka);
        return  res_string;
    }

}
