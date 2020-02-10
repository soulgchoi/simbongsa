package com.a205.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
 
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UploadFile {
 
    //private int f_id;
    private int f_id;
    private String fileName;
    private String keyName;
    //private String fileDownloadUri;
    private long size;
    //private Date insertDate;
 
//    public UploadFile(String fileName, long size) { //, String keyName) {
//        this.fileName = fileName;
//        this.size = size;
//        //this.keyName = keyName;
//    }

}