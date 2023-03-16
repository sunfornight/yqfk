package com.biyesheji.bishe.bean;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//用户表
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private int id;
    private String username;//用户名
    private String password;//密码
    private String email;//邮箱
    private String role;//角色
    private boolean state;//状态
    private String touxiang;//用户头像
    private Integer visits;//用户访问次数
}
