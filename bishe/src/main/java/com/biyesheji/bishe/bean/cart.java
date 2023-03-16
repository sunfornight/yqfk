package com.biyesheji.bishe.bean;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data//自动生成set、get方法的注解
@AllArgsConstructor//自动生成有参构造函数的注解
@NoArgsConstructor//自动生成无参构造函数的注解
public class cart {
    private int id;
    private int goodsid;
    private int amount;
    private String goodsname;
}
