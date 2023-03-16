package com.biyesheji.bishe.dao;

import com.biyesheji.bishe.bean.Tuisong;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TuisongDao {
    public int getTuisongCounts(@Param("tuisongauthor") String tuisongauthor);
    public List<Tuisong> getAllTuisong(@Param("tuisongauthor") String tuisongauthor, @Param("pageStart") int PageStart, @Param("pageSize")int pageSize);
    public int updateState(@Param("id") Integer id,@Param("state") Integer state);
    public int addTuisong( Tuisong tuisong );
    public Tuisong getUpdateTuisong (int id);
    public int editTuisong (Tuisong tuisong);
    public int deleteTuisong(int id);
    public List<Tuisong> alltuisong();
    public List<Tuisong> getWxTuisong();
    public List<Tuisong> getWxAllTuisong();
}
