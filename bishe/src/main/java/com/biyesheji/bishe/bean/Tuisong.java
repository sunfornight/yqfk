package com.biyesheji.bishe.bean;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Tuisong {
    private int id;
    private String tuisongtitle;
    private String tuisongauthor;
    private String tuisongdate;
    private String tuisongintroduction;
    private String tuisongarticle;
    private String picbase64;
    private boolean state;

}
