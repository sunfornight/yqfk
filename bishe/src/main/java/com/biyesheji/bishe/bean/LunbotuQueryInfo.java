package com.biyesheji.bishe.bean;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LunbotuQueryInfo {
    private  int pageNum=1;//当前页
    private  int pageSize=1;//每页最大数

}
