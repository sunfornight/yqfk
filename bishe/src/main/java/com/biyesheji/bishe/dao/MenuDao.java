package com.biyesheji.bishe.dao;

import com.biyesheji.bishe.bean.MainMenu;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuDao {
    public List<MainMenu> getMenus();
}
