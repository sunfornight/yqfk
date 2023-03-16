package com.biyesheji.bishe.dao;


import com.biyesheji.bishe.bean.Lunbotu;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LunbotuDao {
    public int getPicsCounts();
    public List<Lunbotu> getAllPics(@Param("pageStart") int PageStart, @Param("pageSize")int pageSize);
    public int getShownPicsCounts();
    public List<Lunbotu> getShownPics(@Param("pageStart") int PageStart, @Param("pageSize")int pageSize);
    public int updateState(@Param("id") Integer id,@Param("state") Integer state);
    public int addPics( Lunbotu lunbotu);
    public int deletePics(int id);
    public List<Lunbotu> getWxLunbotu();
}
