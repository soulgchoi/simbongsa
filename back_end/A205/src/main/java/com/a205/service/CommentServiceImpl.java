package com.a205.service;

import java.util.List;

import com.a205.dao.CommentDao;
import com.a205.dto.Comment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentDao dao;

    @Override
    public List<Comment> searchAll() {
        return dao.searchAll();
    }

    @Override
    public List<Comment> search(int no) {
        return dao.search(no);
    }

    @Override
    public boolean add(Comment comment) {
        return dao.add(comment);
    }

    @Override
    public boolean update(Comment comment) {
        return dao.update(comment);
    }

    @Override
    public boolean remove(int c_code) {
        return dao.remove(c_code);
    }
}
