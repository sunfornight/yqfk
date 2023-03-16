package com.biyesheji.bishe.controller;

import com.alibaba.fastjson.JSON;
import com.biyesheji.bishe.bean.Lunbotu;
import com.biyesheji.bishe.bean.LunbotuQueryInfo;
import com.biyesheji.bishe.bean.QueryInfo;
import com.biyesheji.bishe.dao.LunbotuDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

@RestController
public class LunbotuController {
    @Autowired
    private LunbotuDao lunbotuDao;
    @RequestMapping("/allpics")
    public String getPics(LunbotuQueryInfo queryInfo){
        int picsCounts = lunbotuDao.getPicsCounts();
        int pageStart = (queryInfo.getPageNum() - 1) * (queryInfo.getPageSize());
        List<Lunbotu> pics = lunbotuDao.getAllPics( pageStart, queryInfo.getPageSize());
        HashMap<String, Object> res = new HashMap<>();
        res.put("picsCounts",picsCounts);
        res.put("pics",pics);
        String res_string = JSON.toJSONString(res);
        return  res_string;
    }

    @RequestMapping("/shownpics")
    public String getShownPics(LunbotuQueryInfo queryInfo){
        int shownPicsCounts = lunbotuDao.getShownPicsCounts();
        int pageStart = (queryInfo.getPageNum() - 1) * (queryInfo.getPageSize());
        List<Lunbotu> shownPics = lunbotuDao.getShownPics(pageStart, queryInfo.getPageSize());
        HashMap<String, Object> res = new HashMap<>();
        res.put("picsCounts",shownPicsCounts);
        res.put("pics",shownPics);
        String res_string = JSON.toJSONString(res);
        return  res_string;
    }
    @RequestMapping("/wxlunbotu")
    public List<Lunbotu> getShownPics(){
        List<Lunbotu> wxLunbotu = lunbotuDao.getWxLunbotu();
        return  wxLunbotu;
    }

    @RequestMapping("/picsstate")
    public  String updatePicsState(@RequestParam("id")Integer id,
                                    @RequestParam("state")Boolean state){
        int IntState;
        if(state == true){
            IntState = 1;
        }else{
            IntState = 0;
        }
        int i = lunbotuDao.updateState(id,IntState);
        return i > 0 ? "success":"error";
    }

    @RequestMapping("/addpics")
    public String addGoods(@RequestBody Lunbotu lunbotu){
        lunbotu.setState(false);
        int i = lunbotuDao.addPics(lunbotu);
        return i > 0 ? "success":"error";
    }

    @RequestMapping("/deletepics")
    public String deletePics(int id){
        int i = lunbotuDao.deletePics(id);
        return i > 0 ? "success":"error";
    }
}
