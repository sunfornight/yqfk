package com.biyesheji.bishe.dao;

import com.biyesheji.bishe.bean.Client;
import com.biyesheji.bishe.bean.Corporation;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository//该注解用于CRUD类
public interface CorporationDao {
    public int getCorporationCounts(@Param("corporationname") String corporationname);
    public List<Corporation>getAllCorporation(@Param("corporationname") String corporationname, @Param("pageStart") int PageStart, @Param("pageSize")int pageSize);
    public int updateVisitState(@Param("id") Integer id,@Param("state") Integer state);
    public int updateBiddingState(@Param("id") Integer id,@Param("state") Integer state);
    public int addCorporation( Corporation corporation);
    public Corporation getUpdateCorporation(int id);
    public int editCorporation(Corporation corporation);
    public int deleteCorporation(int id);
    public List<Client>getClientList(String corporationname);
}
