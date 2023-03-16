package com.biyesheji.bishe.controller;

import com.alibaba.fastjson.JSON;
import com.biyesheji.bishe.bean.Client;
import com.biyesheji.bishe.bean.Corporation;
import com.biyesheji.bishe.bean.QueryInfo;
import com.biyesheji.bishe.dao.ClientDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

@RestController
public class ClientController {
    @Autowired
    ClientDao clientDao;
    @RequestMapping("/allclient")
    public String getClient(QueryInfo queryInfo){
        int clientCounts = clientDao.getClientCounts("%" + queryInfo.getQuery() + "%");
        int pageStart = (queryInfo.getPageNum() - 1) * (queryInfo.getPageSize());
        List<Client> clients = clientDao.getAllClient("%" + queryInfo.getQuery() + "%", pageStart, queryInfo.getPageSize());
        HashMap<String, Object> res = new HashMap<>();
        res.put("clientCounts",clientCounts);
        res.put("clients",clients);
        String res_string = JSON.toJSONString(res);
        return  res_string;
    }

    @RequestMapping("/allcorporationname")
    public String clientGetCorporationname(){
        List<Corporation> corporations = clientDao.clientGetAllCorporationName();
        HashMap<String, Object> res = new HashMap<>();
        res.put("corporations",corporations);
        String res_string = JSON.toJSONString(res);
        return  res_string;
    }

    @RequestMapping("/addclient")
    public String addGoods(@RequestBody Client client){
        client.setClientlevel(0);
        int i = clientDao.addClient(client);
        return i > 0 ? "success":"error";
    }
    @RequestMapping("/getupdateclient")
    public String getUpdateClient(int id){
        Client updateClient = clientDao.getUpdateClient(id);
        String s = JSON.toJSONString(updateClient);
        return s;
    }
    @RequestMapping("/editclient")
    public String editClient(@RequestBody Client client){
        int i = clientDao.editClient(client);
        return i > 0 ? "success":"error";
    }

    @RequestMapping("/deleteclient")
    public String deleteClient(int id){
        int i = clientDao.deleteClient(id);
        return i > 0 ? "success":"error";
    }
    @RequestMapping("/clientlevel")
    public String updateClientLevel(@RequestParam("clientid")Integer id,
                                     @RequestParam("clientlevel")Integer clientlevel){
        int i = clientDao.updateClientLevel(id,clientlevel);
        return i > 0 ? "success":"error";
    }
    @RequestMapping("/clientlevelselect")
    public String ClientLevelSelect(QueryInfo queryInfo){
        int clientCounts = clientDao.getClientLevelCounts(queryInfo.getClientlevelInfo());
        int pageStart = (queryInfo.getPageNum() - 1) * (queryInfo.getPageSize());
        System.out.println(pageStart);
        List<Client> clients = clientDao.getClientLevel(queryInfo.getClientlevelInfo() , pageStart , queryInfo.getPageSize());
        HashMap<String, Object> res = new HashMap<>();
        res.put("clientCounts",clientCounts);
        res.put("clients",clients);
        String res_string = JSON.toJSONString(res);
        return  res_string;
    }
    @RequestMapping("/dealstate")
    public String updateDealState(@RequestParam("id")Integer id,
                                   @RequestParam("isdeal")Boolean isdeal){
        int IntState;
        if(isdeal == true){
            IntState = 1;
        }else{
            IntState = 0;
        }
        int i = clientDao.updateDealState(id,IntState);
        return i > 0 ? "success":"error";
    }
}
