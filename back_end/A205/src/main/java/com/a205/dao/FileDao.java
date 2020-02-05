package com.a205.dao;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.a205.dto.UploadFile;
 	
@Repository
public interface FileDao{
	void save(UploadFile uploadFile);
	Iterable<UploadFile> findAll();
	Optional<UploadFile> findById(int id);
}