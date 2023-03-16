package com.biyesheji.bishe.bean;
//轮播图

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Lunbotu {

    private int id;
    private String picbase64;
    private String picdescribe;
    private boolean state;
}
