package com.biyesheji.bishe.dao;

import com.biyesheji.bishe.bean.Daka;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository//该注解用于CRUD类
public interface DakaDao {
    public int addDaka(Daka daka);
    public int getDakaCounts(@Param("name") String name);
    public List<Daka> getAllDaka(@Param("name") String name, @Param("pageStart") int PageStart, @Param("pageSize")int pageSize);
    public int updateRate(@Param("id") Integer id,@Param("rate") Integer rate);
    public List<Daka> getWxAllDaka(@Param("name") String name);
    public Daka getWxIdDaka(@Param("id") Integer id);
}
