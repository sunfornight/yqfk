package com.biyesheji.bishe.bean;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//分支导航
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubMenu {
    private int id;
    private String title;
    private String path;


}
