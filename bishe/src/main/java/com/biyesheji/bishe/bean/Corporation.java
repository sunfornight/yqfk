package com.biyesheji.bishe.bean;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.lang.reflect.Array;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Corporation {
    private int corporationid;//公司id
    private String corporationname;//公司名称
    private boolean isvisit;//是否拜访
    private String corporationlocation;//公司区域
    private String corporationaddress;//公司地址
    private boolean corporationbidding;//是否招投标
    private double corporationactualpayment;//实缴数
    private double corporationregister;//注册数
    private int corporationsocialsecuritynumber;//社保人数
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(locale="zh", timezone="GMT+32", pattern="yyyy-MM-dd")
    private Date corporationgxdqdate;//高新到期时间
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(locale="zh", timezone="GMT+32", pattern="yyyy-MM-dd")
    private Date corporationrqdqdate;//软企到期时间（空默认为无）
//    @DateTimeFormat(pattern = "yyyy-MM-dd")
//    @JsonFormat(locale="zh", timezone="GMT+32", pattern="yyyy-MM-dd")
    private String corporationISO9001;//ISO9001（date类型，可设多个）
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(locale="zh", timezone="GMT+32", pattern="yyyy-MM-dd")
    private Date corporationISO20000;//ISO20000（date类型，可设多个）
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(locale="zh", timezone="GMT+32", pattern="yyyy-MM-dd")
    private Date corporationISO27000;//ISO27000（date类型，可设多个）
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(locale="zh", timezone="GMT+32", pattern="yyyy-MM-dd")
    private Date  corporationfivestar;//五星售后（date类型，空为默认为无）
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(locale="zh", timezone="GMT+32", pattern="yyyy-MM-dd")
    private Date  corporationcombination;//两化融合（空默认为无）
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(locale="zh", timezone="GMT+32", pattern="yyyy-MM-dd")
    private Date  corporationjitc;//贯标（date类型，空默认为无）
//    @DateTimeFormat(pattern = "yyyy-MM-dd")
//    @JsonFormat(locale="zh", timezone="GMT+8", pattern="yyyy-MM-dd")
//    private List<Date> corporationISO9001;//ISO9001（date类型，可设多个）
//    @DateTimeFormat(pattern = "yyyy-MM-dd")
//    @JsonFormat(locale="zh", timezone="GMT+8", pattern="yyyy-MM-dd")
//    private List<Date> corporationISO20000;//ISO20000（date类型，可设多个）
//    @DateTimeFormat(pattern = "yyyy-MM-dd")
//    @JsonFormat(locale="zh", timezone="GMT+8", pattern="yyyy-MM-dd")
//    private List<Date> corporationISO27000;//ISO27000（date类型，可设多个）
//    @DateTimeFormat(pattern = "yyyy-MM-dd")
//    @JsonFormat(locale="zh", timezone="GMT+8", pattern="yyyy-MM-dd")
//    private List<Date> corporationfivestar;//五星售后（date类型，空为默认为无）
//    @DateTimeFormat(pattern = "yyyy-MM-dd")
//    @JsonFormat(locale="zh", timezone="GMT+8", pattern="yyyy-MM-dd")
//    private List<Date> corporationcombination;//两化融合（空默认为无）
//    @DateTimeFormat(pattern = "yyyy-MM-dd")
//    @JsonFormat(locale="zh", timezone="GMT+8", pattern="yyyy-MM-dd")
//    private List<Date> corporationjitc;//贯标（date类型，空默认为无）
    private String corporationsupplement1;//其它补充1
    private String corporationsupplement2;//其它补充2
    private int corporationwebsite;//网站数量
    private int corporationapplet;//小程序数量
    private int corporationcertification;//高企认证次数
    private String corporation3C;//3C多日期
    private String corporationelse;//其它信息
}
