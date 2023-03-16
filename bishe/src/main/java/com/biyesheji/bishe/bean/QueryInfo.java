package com.biyesheji.bishe.bean;
//分页

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QueryInfo {
    public  String query;//查询信息 username
    private  int pageNum=1;//当前页
    private  int pageSize=1;//每页最大数
    private int clientlevelInfo;


}
