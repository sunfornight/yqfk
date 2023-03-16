package com.biyesheji.bishe.controller;

import com.alibaba.fastjson.JSON;
import com.biyesheji.bishe.bean.QueryInfo;
import com.biyesheji.bishe.dao.GoodDao;
import com.biyesheji.bishe.bean.ProtectionGoods;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;

@RestController
public class UploadPicturesController {
    @RequestMapping(value = "/uploadUi", method = RequestMethod.POST)
    @ResponseBody
    public String UploadUi(@RequestParam("files") MultipartFile file) throws IllegalStateException, IOException {
        System.out.println(file.getOriginalFilename() + "图片已传入!!");
        byte[] b = file.getBytes();
        String str = Base64.getEncoder().encodeToString(b);
        return "data:image/jpeg;base64," + str;
    }

    @RequestMapping(value = "/editUi", method = RequestMethod.POST)
    @ResponseBody
    public String UploadUi2(@RequestParam("files") MultipartFile file) throws IllegalStateException, IOException {
        System.out.println(file.getOriginalFilename() + "图片已传入!!");
        byte[] b = file.getBytes();
        String str = Base64.getEncoder().encodeToString(b);
        return "data:image/jpeg;base64," + str;
    }


}
