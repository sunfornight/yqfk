package com.biyesheji.bishe.controller;

import com.alibaba.fastjson.JSON;
import com.biyesheji.bishe.bean.Client;
import com.biyesheji.bishe.bean.Corporation;
import com.biyesheji.bishe.bean.QueryInfo;
import com.biyesheji.bishe.dao.CorporationDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@RestController
public class CorporationController {
    @Autowired
    CorporationDao corporationDao;
    @RequestMapping("/allcorporation")
    public String getCorporation(QueryInfo queryInfo){
        int corporationCounts = corporationDao.getCorporationCounts("%" + queryInfo.getQuery() + "%");
        int pageStart = (queryInfo.getPageNum() - 1) * (queryInfo.getPageSize());
        List<Corporation> corporations = corporationDao.getAllCorporation("%" + queryInfo.getQuery() + "%", pageStart, queryInfo.getPageSize());
        HashMap<String, Object> res = new HashMap<>();
        System.out.println(corporations);
        res.put("corporationCounts",corporationCounts);
        res.put("corporations",corporations);
        String res_string = JSON.toJSONString(res);
        return  res_string;
    }
    @RequestMapping("/visitstate")
    public String updateVisitState(@RequestParam("id")Integer id,
                                   @RequestParam("isvisit")Boolean isvisit){
        System.out.println(isvisit);
        int IntState;
        if(isvisit == true){
            IntState = 1;
        }else{
            IntState = 0;
        }
        int i = corporationDao.updateVisitState(id,IntState);
        return i > 0 ? "success":"error";
    }
    @RequestMapping("/biddingstate")
    public String updateBiddingState(@RequestParam("id")Integer id,
                                   @RequestParam("bidding")Boolean bidding){
        int IntState;
        if(bidding == true){
            IntState = 1;
        }else{
            IntState = 0;
        }
        int i = corporationDao.updateBiddingState(id,IntState);
        return i > 0 ? "success":"error";
    }
    @RequestMapping("/addcorporation")
    public String addGoods(@RequestBody Corporation corporation){
        corporation.setIsvisit(false);
        corporation.setCorporationbidding(false);
        int i = corporationDao.addCorporation(corporation);
        return i > 0 ? "success":"error";
    }
    @RequestMapping("/getupdatecorporation")
    public String getUpdateCorporation(int id){

        Corporation updateCorporation = corporationDao.getUpdateCorporation(id);
        String s = JSON.toJSONString(updateCorporation);
        System.out.println("RES:"+s);
        return s;
    }
    @RequestMapping("/editcorporation")
    public String editCorporation(@RequestBody Corporation corporation){
        int i = corporationDao.editCorporation(corporation);
        return i > 0 ? "success":"error";
    }

    @RequestMapping("/deletecorporation")
    public String deleteCorporation(int id){
        int i = corporationDao.deleteCorporation(id);
        return i > 0 ? "success":"error";
    }

    @RequestMapping("/Corporationallclient")
    public List<Client> getClientList(String corporationname){
        List<Client> clientList = corporationDao.getClientList(corporationname);
//        res.put("corporationCounts",corporationCounts);
//        res.put("corporations",corporations);
//        String res_string = JSON.toJSONString(res);
        return  clientList;
    }
}
