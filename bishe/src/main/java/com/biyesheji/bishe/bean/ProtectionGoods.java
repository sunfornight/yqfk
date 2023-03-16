package com.biyesheji.bishe.bean;
//防护商品表

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProtectionGoods {


    private int id;
    private String goodsname;//用户名
    private String chandi;//产地
    @JsonFormat(locale="zh", timezone="GMT+8", pattern="yyyy-MM-dd")
    private Date shengyubaozhiqi;//保质期
    private float price;//单价
    private String goodsusage;//用法
    private boolean state;//状态
    private String unit;//单位
    private String picbase64;//base64图片
    private int amount;//数量

    @Override
    public String toString() {
        return "ProtectionGoods{" +
                "id=" + id +
                ", goodsname='" + goodsname + '\'' +
                ", chandi='" + chandi + '\'' +
                ", shengyubaozhiqi=" + shengyubaozhiqi +
                ", price=" + price +
                ", goodsusage='" + goodsusage + '\'' +
                ", state=" + state +
                ", unit='" + unit + '\'' +
                ", picbase64='" + picbase64 + '\'' +
                '}';
    }
}
