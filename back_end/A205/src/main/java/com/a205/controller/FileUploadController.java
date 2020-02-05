package com.a205.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
 
@RestController
public class FileUploadController {
    
    @GetMapping("/")
    public String controllerMain() {
        return "Hello~ File Upload Test.";
    }
}
