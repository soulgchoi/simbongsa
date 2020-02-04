package com.a205.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.a205.api.kakao_restAPI;

@Controller
public class ApiController {
	private kakao_restAPI kakao_restapi = new kakao_restAPI();
    
    @RequestMapping(value = "/oauth", produces = "application/json", method = { RequestMethod.GET, RequestMethod.POST })
    public String kakaoLogin(@RequestParam("code") String code) {
        return "home";
    }

}
