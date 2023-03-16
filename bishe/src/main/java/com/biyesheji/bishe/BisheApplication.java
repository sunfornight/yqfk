package com.biyesheji.bishe;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan("com.biyesheji.bishe.dao")
@SpringBootApplication
public class BisheApplication {

    public static void main(String[] args) {
        SpringApplication.run(BisheApplication.class, args);

    }

}
