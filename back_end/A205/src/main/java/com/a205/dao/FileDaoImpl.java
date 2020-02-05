package com.a205.dao;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.a205.dto.UploadFile;

@Repository
public class FileDaoImpl implements FileDao {

	@Override
	public void save(UploadFile uploadFile) {
	}

	@Override
	public Iterable<UploadFile> findAll() {
		return null;
	}

	@Override
	public Optional<UploadFile> findById(int id) {
		return null;
	}

}
