package com.biyesheji.bishe.bean;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Churu {
    private int id;
    private String name;
    private String address;
    private String destination;
    private String timestart;
    private String timeend;
    private boolean isleave;
    private String telephone;
    private double temp;
    private String note;
    private Integer approve;
}
