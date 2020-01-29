package com.a205.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;

import com.google.common.net.HttpHeaders;
import com.a205.dto.Comment;
import com.a205.dto.Post;
import com.a205.service.CommentService;

@RestController
@RequestMapping("/rest")
@CrossOrigin(origins = "*")
public class CommentRestController {
    private static final Logger logger = LoggerFactory.getLogger(CommentRestController.class);

    @Autowired
    CommentService service;

    private ResponseEntity<Map<String, Object>> response(Object data, boolean status, HttpStatus hstatus) {
        Map<String, Object> resultMap = new HashMap<String, Object>();
        resultMap.put("status", status);
        resultMap.put("data", data);
        return new ResponseEntity<>(resultMap, hstatus);
    }

    @GetMapping("/Comment/{no}")
    @ApiOperation("No에 해당하는 하나의 답변 정보를 반환한다.")
    public ResponseEntity<Map<String, Object>> getComment(@PathVariable int no) {
        try {
            List<Comment> comment = service.search(no);
            return response(comment, true, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("답변조회실패", e);
            return response(e.getMessage(), false, HttpStatus.CONFLICT);
        }
    }

    @PostMapping("/Comment")
    @ApiOperation("전달받은 답변 정보를 등록한다.")
    public ResponseEntity<Map<String, Object>> insertComment(@RequestBody Comment comment) {
        try {
            boolean result = service.add(comment);
            return response(result, true, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            logger.error("답변 등록 실패", e);
            return response(e.getMessage(), false, HttpStatus.CONFLICT);
        }
    }

    @PutMapping("/Comment")
    @ApiOperation("전달받은 답변 정보를 업데이트한다.")
    public ResponseEntity<Map<String, Object>> updateComment(@RequestBody Comment comment) {
        try {
            boolean result = service.update(comment);
            return response(result, true, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("답변 정보 수정 실패", e);
            return response(e.getMessage(), false, HttpStatus.CONFLICT);
        }
    }

    @DeleteMapping("/Comment/{no}")
    @ApiOperation("전달받은 답변 정보를 삭제한다.")
    public ResponseEntity<Map<String, Object>> deleteComment(@PathVariable int no, HttpSession session) {
        try {
            boolean result = service.remove(no);
            return response(result, true, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("답변 삭제 실패", e);
            return response(e.getMessage(), false, HttpStatus.CONFLICT);
        }
    }
}
