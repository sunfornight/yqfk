package com.biyesheji.bishe.dao;

import com.biyesheji.bishe.bean.ProtectionGoods;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository//该注解用于CRUD类
public interface GoodDao {
    public int getGoodsCounts(@Param("goodsname") String goodsname);
    public List<ProtectionGoods> getAllGoods(@Param("goodsname") String goodsname, @Param("pageStart") int PageStart, @Param("pageSize")int pageSize);
    public int updateState(@Param("id") Integer id,@Param("state") Integer state);
    public int updateAmount(@Param("id") Integer id,@Param("amount") Integer amount);
    public int addGoods( ProtectionGoods protectionGoods);
    public ProtectionGoods getUpdateGoods(int id);
    public int editGoods(ProtectionGoods goods);
    public int deleteGoods(int id);
    public List<ProtectionGoods> wxgoods();
    public List<ProtectionGoods> wxallgoods();
}
