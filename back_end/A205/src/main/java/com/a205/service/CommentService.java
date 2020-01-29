package com.a205.service;

import java.util.List;

import com.a205.dto.Comment;

public interface CommentService {
    public List<Comment> searchAll();

    // public Comment search(int no);
    public List<Comment> search(int no);

    public boolean add(Comment comment);

    public boolean update(Comment comment);

    public boolean remove(int c_code);
}
