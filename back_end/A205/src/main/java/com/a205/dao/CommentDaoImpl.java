package com.a205.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.a205.dto.Comment;

@Repository
public class CommentDaoImpl implements CommentDao {

    private final static String ns = "com.a205.model.commentmapper.";

    @Autowired
    SqlSession session;

    @Override
    public List<Comment> searchAll() {
        String statement = ns + "select";
        return session.selectList(statement);
    }

    // @Override
    // public Comment search(int no) {
    // String statement = ns + "select";
    // return session.selectOne(statement, no);
    // }

    @Override
    public List<Comment> search(int no) {
        String statement = ns + "select";
        return session.selectList(statement, no);
    }

    @Override
    public boolean add(Comment comment) {
        String statement = ns + "insert";
        return session.insert(statement, comment) > 0;
    }

    @Override
    public boolean update(Comment comment) {
        String statement = ns + "update";
        return session.update(statement, comment) > 0;
    }

    @Override
    public boolean remove(int c_code) {
        String statement = ns + "delete";
        return session.delete(statement, c_code) > 0;
    }
}