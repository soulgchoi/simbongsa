package com.a205.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
 
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UploadFile {
 
    private int id;
    private String fileName;
    private long size;
    private String mimeType;
    //private Date insertDate;
 
    public UploadFile(String fileName, long size, String mimeType) {
        this.fileName = fileName;
        this.size = size;
        this.mimeType = mimeType;
    }

    @Override
    public String toString() {
        return "UploadFile [id=" + id + ", fileName=" + fileName + ", size=" + size + ", mimeType=" + mimeType + "]";
    }
    
}