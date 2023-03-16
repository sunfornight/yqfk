package com.biyesheji.bishe.bean;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PACKAGE)
public class Client {
    private int clientid;//客户id
    private String clientname;//客户名称
    private String clientrole;//客户角色
    private String clienttelephone;//客户联系方式
    private String corporationname;//客户所属公司名称
    private Integer clientlevel;//意向客户等级
    private boolean isdeal;//意向客户等级
    private String clientinterview;//面访情况
}
