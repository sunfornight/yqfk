package com.biyesheji.bishe.controller;

import com.alibaba.fastjson.JSON;
import com.biyesheji.bishe.bean.QueryInfo;
import com.biyesheji.bishe.bean.Tuisong;
import com.biyesheji.bishe.dao.TuisongDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

@RestController
public class TuisongController {
    @Autowired
    private TuisongDao tuisongDao;
    @RequestMapping("/alltuisongs")
    public String allTuisong(){
        List<Tuisong> alltuisong = tuisongDao.alltuisong();
        String res_string = JSON.toJSONString(alltuisong);
        return  res_string;
    }

    @RequestMapping("/alltuisong")
    public String getTuisong(QueryInfo queryInfo){
        int tuisongCounts = tuisongDao.getTuisongCounts("%" + queryInfo.getQuery() + "%");
        int pageStart = (queryInfo.getPageNum() - 1) * (queryInfo.getPageSize());
        List<Tuisong> tuisong = tuisongDao.getAllTuisong("%" + queryInfo.getQuery() + "%", pageStart, queryInfo.getPageSize());
        HashMap<String, Object> res = new HashMap<>();
        res.put("tuisongCounts",tuisongCounts);
        res.put("tuisong",tuisong);
        String res_string = JSON.toJSONString(res);
        return  res_string;
    }

    @RequestMapping("/tuisongstate")
    public  String updateTuisongState(@RequestParam("id")Integer id,
                                    @RequestParam("state")Boolean state){
        int IntState;
        if(state == true){
            IntState = 1;
        }else{
            IntState = 0;
        }
        System.out.println(state);
        int i = tuisongDao.updateState(id,IntState);
        return i > 0 ? "success":"error";
    }

    @RequestMapping("/addtuisong")
    public String addTuisong(@RequestBody Tuisong tuisong){
        tuisong.setState(false);
        int i = tuisongDao.addTuisong(tuisong);
        return i > 0 ? "success":"error";
    }

    @RequestMapping("/getupdatetuisong")
    public String getUpdateTuisong(int id){
        Tuisong tuisong = tuisongDao.getUpdateTuisong(id);
        String s = JSON.toJSONString(tuisong);
        return s;
    }

    @RequestMapping("/edittuisong")
    public String editTuisong(@RequestBody Tuisong tuisong){
        int i = tuisongDao.editTuisong(tuisong);
        return i > 0 ? "success":"error";
    }

    @RequestMapping("/deletetuisong")
    public String deleteTuisong(int id){
        int i = tuisongDao.deleteTuisong(id);
        return i > 0 ? "success":"error";
    }

    @RequestMapping("/wxtuisong")
    public List<Tuisong> getShownTuisong(){
        List<Tuisong> wxTuisong = tuisongDao.getWxTuisong();
        return  wxTuisong;
    }

    @RequestMapping("/wxalltuisong")
    public List<Tuisong> getShownAllTuisong(){
        List<Tuisong> wxAllTuisong = tuisongDao.getWxAllTuisong();
        return  wxAllTuisong;
    }
}
