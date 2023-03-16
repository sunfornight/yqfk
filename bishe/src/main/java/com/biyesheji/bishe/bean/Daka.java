package com.biyesheji.bishe.bean;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Daka {
    private int id;
    private String name;
    private String address;
    private String date;
    private int healthstate;
    private boolean isalert;
    private boolean iscontact;
    private boolean isfever;
    private boolean isoutside;
    private boolean pledge;
    private String region;
    private boolean sex;
    private String telephone;
    private double temp;
    private int rate;

}
