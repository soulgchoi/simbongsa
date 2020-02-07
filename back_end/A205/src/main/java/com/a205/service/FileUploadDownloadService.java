package com.a205.service;

import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.a205.dao.FileDao;
import com.a205.dto.UploadFile;
import com.file.exception.FileDownloadException;
import com.file.exception.FileUploadException;
import com.file.util.FileUploadProperties;

@Service
public class FileUploadDownloadService {
	private final Path fileLocation;

	@Autowired
	FileDao dao;

	public FileUploadDownloadService(FileUploadProperties prop) {
		this.fileLocation = Paths.get(prop.getUploadDir()).toAbsolutePath().normalize();

		try {
			Files.createDirectories(this.fileLocation);
		} catch (Exception e) {
			throw new FileUploadException("파일을 업로드할 디렉토리를 생성하지 못했습니다.", e);
		}
	}

	public String storeFile(MultipartFile file) {
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());

		try {
			// 파일명에 부적합 문자가 있는지 확인한다.
			if (fileName.contains(".."))
				throw new FileUploadException("파일명에 부적합 문자가 포함되어 있습니다. " + fileName);

			Path targetLocation = this.fileLocation.resolve(fileName);

			Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

			return fileName;
		} catch (Exception e) {
			throw new FileUploadException("[" + fileName + "] 파일 업로드에 실패하였습니다. 다시 시도하십시오.", e);
		}
	}

	public Resource loadFileAsResource(String fileName) {
		try {
			Path filePath = this.fileLocation.resolve(fileName).normalize();
			Resource resource = new UrlResource(filePath.toUri());

			if (resource.exists()) {
				return resource;
			} else {
				throw new FileDownloadException(fileName + " 파일을 찾을 수 없습니다.");
			}
		} catch (MalformedURLException e) {
			throw new FileDownloadException(fileName + " 파일을 찾을 수 없습니다.", e);
		}
	}

	public Iterable<UploadFile> getFileList() {
		Iterable<UploadFile> iterable = dao.findAll();

		if (null == iterable) {
			throw new FileDownloadException("업로드 된 파일이 존재하지 않습니다.");
		}

		return iterable;
	}

	public Optional<UploadFile> getUploadFile(int id) {
		Optional<UploadFile> uploadFile = dao.findById(id);

		if (null == uploadFile) {
			throw new FileDownloadException("해당 아이디[" + id + "]로 업로드 된 파일이 존재하지 않습니다.");
		}
		return uploadFile;
	}

}